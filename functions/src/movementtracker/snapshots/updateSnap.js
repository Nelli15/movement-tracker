import { getFirestore, Timestamp } from "firebase-admin/firestore";
module.exports = ({ environment }) => async data => {
  // context.app will be undefined if the request doesn't include a valid
  // App Check token.
  // if (context.app == undefined && process.env.FUNCTIONS_EMULATOR !== "true") {
  //   console.error(
  //     "failed-precondition",
  //     "The function must be called from an App Check verified app."
  //   );
  // }

  let db = getFirestore();
  let movId = data.movId;
  console.log('movId', movId)
  // creates or updates the current snapshot of the tree
  const nowDate = Timestamp.now().toDate();
  nowDate.setHours(nowDate.getHours() + 10);
  const movRef = db.collection(environment.schema.movements).doc(movId);
  const snapRef = movRef
    .collection("snapshots")
    .doc(
      nowDate.getFullYear() + "-" + String(nowDate.getMonth()).padStart(2, "0")
    ); // <-- add todays date as UID
  let snapDoc = await snapRef.get();
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
    createdBy: data.createdBy
      ? data.createdBy
      : {
          displayName: "MT System",
          email: "movementtrackerapp@gmail.com",
          photoURL: "/app-logo-128x128.png",
          uid: "system"
        },
    date: Timestamp.now(),
    title: snapDoc.get("title")
      ? snapDoc.get("title")
      : `${monthNames[nowDate.getMonth() + 1]} ${nowDate.getFullYear()}` // < -- make this the text date 'Month-Year'
  };
  snapRef.set(newSnapshot).catch(err => {
    console.error(err);
  });

  let copyCollection = async (srcCollectionName, destCollectionName) => {
    const documents = await db.collection(srcCollectionName).get();
    let writeBatch = db.batch();
    const destCollection = db.collection(destCollectionName);
    let i = 0;
    for (const doc of documents.docs) {
      doc.ref.listCollections().then(collections => {
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
        writeBatch = db.batch();
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
  };

  // Copy Lists
  // console.log(movRef.path);
  // movRef.path
  let promises = [
    copyCollection(`${movRef.path}/lists`, `${snapRef.path}/lists`),

    // Copy members
    copyCollection(`${movRef.path}/members`, `${snapRef.path}/members`),

    // Copy styles
    copyCollection(`${movRef.path}/styles`, `${snapRef.path}/styles`),

    // Copy trees
    copyCollection(`${movRef.path}/trees`, `${snapRef.path}/trees`)
  ];

  return Promise.all(promises)
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
};
