module.exports = ({ admin, environment }) => async context => {
  var db = admin.firestore();
  //   console.log(
  //     'This will be run every month at 00:01 AM Australian Eastern Standard Time!'
  //   )

  const nowDate = admin.firestore.Timestamp.now().toDate();
  const pastMonth = admin.firestore.Timestamp.now().toDate();
  pastMonth.setMonth(pastMonth.getMonth() - 1);
  // adjust from decrepancy between utc and bris time
  pastMonth.setHours(pastMonth.getHours() + 10);
  // Zero the hours
  pastMonth.setHours(0, 0, 0);
  // Zero the milliseconds
  pastMonth.setMilliseconds(0);

  const pastMonthTS = admin.firestore.Timestamp.fromDate(pastMonth);
  // console.log(pastMonthTS)
  const movements = await db
    .collection(environment.schema.movements)
    .where("last_modified", ">=", pastMonthTS)
    .get();

  if (movements.empty) {
    console.log("No movements have been updated this month");
    return;
  } else {
    // console.log(`${movements.size} updated this month`)
  }

  const promises = [];
  movements.forEach(movement => {
    // console.log(movement.id)
    promises.push(createMonthlySnap(movement.id));
  });
  return Promise.all(promises);

  async function createMonthlySnap(movId) {
    // creates or updates the current snapshot of the tree
    const nowDate = admin.firestore.Timestamp.now().toDate();
    nowDate.setHours(nowDate.getHours() + 10);
    const movRef = db.collection(environment.schema.movements).doc(movId);
    const snapRef = movRef
      .collection("snapshots")
      .doc(nowDate.getMonth() + "-" + nowDate.getFullYear()); // <-- add todays date as UID
    const movSnap = await movRef.get().catch(err => {
      console.error(new Error("Oops, something went wrong: " + err));
    });
    if (!movSnap.exists) {
      console.log(`Movement ${movId} doesn't exist`);
      return;
    }

    const monthNames = [
      "December",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const newSnapshot = {
      backgroundColor: movSnap.get("style.backgroundColor"), // mov.styles.backgroundColor
      color: getColor(movSnap.get("style.backgroundColor")), // get from mov.styles.backgroundColor
      createdBy: {
        displayName: "MT System",
        email: "movementtrackerapp@gmail.com",
        photoURL: "/app-logo-128x128.png",
        uid: "system"
      },
      date: admin.firestore.Timestamp.now(),
      title: `${monthNames[nowDate.getMonth() + 1]} ${nowDate.getFullYear()}` // < -- make this the text date 'Month-Year'
    };
    snapRef.set(newSnapshot).catch(err => {
      console.error(err);
    });

    // Copy Lists
    // console.log(movRef.path);
    // movRef.path
    copyCollection(`${movRef.path}/lists`, `${snapRef.path}/lists`)
      .then(() => console.log("copy complete"))
      .catch(error => console.log("copy failed. " + error));

    // Copy members
    copyCollection(`${movRef.path}/members`, `${snapRef.path}/members`)
      .then(() => console.log("copy complete"))
      .catch(error => console.log("copy failed. " + error));

    // Copy styles
    copyCollection(`${movRef.path}/styles`, `${snapRef.path}/styles`)
      .then(() => console.log("copy complete"))
      .catch(error => console.log("copy failed. " + error));

    // Copy trees
    copyCollection(`${movRef.path}/trees`, `${snapRef.path}/trees`)
      .then(() => console.log("copy complete"))
      .catch(error => console.log("copy failed. " + error));

    function getColor(h) {
      return (100 *
        (parseInt(h[1] + h[2], 16) / 255 +
          parseInt(h[3] + h[4], 16) / 255 +
          parseInt(h[5] + h[6], 16) / 255)) /
        3 >=
        50
        ? "black"
        : "white";
    }
  }
};

async function copyCollection(srcCollectionName, destCollectionName) {
  const documents = await firestore.collection(srcCollectionName).get();
  let writeBatch = firebaseAdmin.firestore().batch();
  const destCollection = firestore.collection(destCollectionName);
  let i = 0;
  for (const doc of documents.docs) {
    doc.listCollections().then(collections => {
      for (let collection of collections) {
        let newPath = `${destCollection.doc(doc.id).path}/${collection.id}`;
        console.log(`Found subcollection with id: ${collection.id}`);
        copyCollection(collection.path, newPath);
      }
    });
    writeBatch.set(destCollection.doc(doc.id), doc.data());
    i++;
    if (i > 400) {
      // write batch only allows maximum 500 writes per batch
      i = 0;
      console.log("Intermediate committing of batch operation");
      await writeBatch.commit();
      writeBatch = firebaseAdmin.firestore().batch();
    }
  }
  if (i > 0) {
    console.log(
      "Firebase batch operation completed. Doing final committing of batch operation."
    );
    await writeBatch.commit();
  } else {
    console.log("Firebase batch operation completed.");
  }
}
