const admin = require("../../../utils/test-admin");
const environment = require("../../../environments/environment.test.js");
const context = {
  admin,
  environment
};

const Func = require("../saveSnaps.js");
const db = admin.firestore();

const movCol = db.collection(environment.schema.movements);

describe("snapshots: saveSnaps", () => {
  let func;
  let funcContext;
  let data;
  let movDoc;
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

  beforeEach(async () => {
    func = Func(context);
    funcContext = {
      auth: {
        uid: "testUserId",
        token: {
          name: "test user",
          email: "test@user.com"
        }
      }
    };
    // create a mov doc
    movDoc = db.collection(environment.schema.movements).doc("test-movement");
    await movDoc.set({
      name: "test movement",
      last_modified: admin.firestore.Timestamp.fromDate(new Date()),
      style: {
        backgroundColor: "#FFFFFF"
      }
    });

    await db
      .collection(environment.schema.movements)
      .doc("test-movement")
      .collection("components")
      .doc("trees")
      .set({ tree: [], noParents: [] });
    await db
      .collection(environment.schema.movements)
      .doc("test-movement")
      .collection("components")
      .doc("stats")
      .set({});
    await db
      .collection(environment.schema.movements)
      .doc("test-movement")
      .collection("components")
      .doc("members")
      .set({});
  });

  it("should create a new snapshot doc", async () => {
    // const date = admin.firestore.Timestamp.fromDate(new Date())
    const date = new Date();
    date.setHours(date.getHours() + 10);
    // date.setMonth(date.getMonth() - 1)
    const response = await func(funcContext);
    // console.log(`${date.getMonth()}-${date.getFullYear()}`)
    const doc = await db
      .collection(environment.schema.movements)
      .doc("test-movement")
      .collection("snapshots")
      .doc(`${date.getMonth()}-${date.getFullYear()}`)
      .get();

    const output = doc.data();
    expect(output.backgroundColor).toBe("#FFFFFF");
    expect(output.roleStats).toStrictEqual([]);
    expect(output.complexStats).toStrictEqual([]);
    expect(output.color).toBe("black");
    expect(output.createdBy).toStrictEqual({
      displayName: "MT System",
      email: "movementtrackerapp@gmail.com",
      photoURL: "/app-logo-128x128.png",
      uid: "system"
    });
    expect(output.date).toBeTruthy();
    expect(output.members).toStrictEqual({});
    expect(output.noParents).toStrictEqual([]);
    expect(output.modStats).toStrictEqual([]);
    expect(output.title).toBe(
      `${monthNames[date.getMonth() + 1]} ${date.getFullYear()}`
    );
    expect(output.totals).toStrictEqual({ treeTotal: {}, noParentTotal: {} });
    expect(output.tree).toStrictEqual([]);
    // expect(output.last_modified._seconds).toBeGreaterThanOrEqual(date._seconds)
  });

  afterAll(async () => {
    // delete all data from db
    // await nowRef.delete()
    // console.log(movDoc)
    if (movDoc) await movDoc.delete();
    // const col = await movCol.get()
    // col.forEach(doc => {
    //   doc.ref.delete()
    // })
    // console.log(await movCol.listDocuments())
    // const movements = await movCol.listDocuments()
    // console.log(movements)
    //
    // await styleRef.delete()
  });
});
