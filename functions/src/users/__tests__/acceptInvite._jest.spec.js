const admin = require("../../../utils/test-admin");
const environment = require("../../../environments/environment.test.js");
const context = {
  environment
};

const Func = require("../acceptInvite.js");
const db = getFirestore();

const movCol = db.collection(environment.schema.movements);

describe("users: acceptInvite", () => {
  let func;
  let funcContext;
  let movDoc;
  let change;

  describe("onChange", () => {
    beforeEach(async () => {
      func = Func(context);

      movDoc = db.collection(environment.schema.movements).doc("test-movement");
      await movDoc.set({
        name: "test name",
        id: "test-movement",
        last_modified: ""
      });
      change = {
        before: await movDoc
          .collection("styles")
          .doc("styleId")
          .get(),
        after: await movDoc
          .collection("styles")
          .doc("styleId")
          .get()
      };

      // await movDoc
      //   .collection('snapshots')
      //   .doc('now')
      //   .set({
      //     members: {},
      //     stats: {},
      //     tree: [],
      //     noParents: []
      //   })
      funcContext = {
        params: {
          movId: "test-movement"
        }
      };
    });

    it.skip("updates the members in the now doc", async () => {
      // const date = admin.firestore.Timestamp.fromDate(new Date())
      // console.log(change)
      await movDoc.set({
        name: "test name",
        id: "test-movement",
        last_modified: ""
      });
      await movDoc
        .collection("snapshots")
        .doc("now")
        .set({
          members: {
            testMember1: {
              name: "test-member",
              id: "testMember1",
              role: "styleId",
              mods: [],
              notes: "test-note",
              parent: "root",
              display: {
                label: "test-member",
                background: "#ffaaaa",
                color: "#000000",
                outline: "#ffaaaa",
                underline: false,
                shape: "not-round"
              }
            }
          },
          stats: {},
          tree: [],
          noParents: []
        });
      await movDoc
        .collection("styles")
        .doc("styleId")
        .set({
          label: "old test style",
          type: "base",
          style: {
            color: "#000000",
            underline: false,
            outline: "#ffaaaa",
            round: false,
            background: "#ffaaaa"
          }
        });
      change.after = await movDoc
        .collection("styles")
        .doc("styleId")
        .get();

      await movDoc
        .collection("styles")
        .doc("styleId")
        .set({
          label: "test style",
          type: "base",
          style: {
            color: "#00000f",
            underline: false,
            outline: "#ffaafa",
            shape: "round",
            background: "#ffbaaa"
          }
        });
      change.after = await movDoc
        .collection("styles")
        .doc("styleId")
        .get();
      await func(change, funcContext);
      const doc = await movDoc
        .collection("snapshots")
        .doc("now")
        .get();
      const output = doc.data();
      // console.log(output.members)
      expect(output.members).toEqual({
        testMember1: {
          name: "test-member",
          id: "testMember1",
          role: "styleId",
          mods: [],
          notes: "test-note",
          parent: "root",
          origin: "root",
          display: {
            label: "test-member",
            color: "#00000f",
            underline: false,
            outline: "#ffaafa",
            shape: "round",
            background: "#ffbaaa"
          }
        }
      });
    });

    it.skip("updates the stats in the now doc", async () => {
      // const date = admin.firestore.Timestamp.fromDate(new Date())
      // console.log(change)
      await movDoc.set({
        name: "test name",
        id: "test-movement",
        last_modified: ""
      });
      await movDoc
        .collection("snapshots")
        .doc("now")
        .set({
          members: {
            testMember1: {
              name: "test-member",
              id: "testMember1",
              role: "styleId",
              mods: [],
              notes: "test-note",
              parent: "root",
              display: {
                label: "test-member",
                background: "#ffaaaa",
                color: "#000000",
                outline: "#ffaaaa",
                underline: false,
                shape: "not-round"
              }
            }
          },
          stats: {
            styleId: {
              label: "old test style",
              type: "base",
              style: {
                color: "#000000",
                underline: false,
                outline: "#ffaaaa",
                round: false,
                background: "#ffaaaa"
              }
            }
          },
          tree: [],
          noParents: []
        });
      await movDoc
        .collection("styles")
        .doc("styleId")
        .set({
          label: "old test style",
          type: "base",
          style: {
            color: "#000000",
            underline: false,
            outline: "#ffaaaa",
            round: false,
            background: "#ffaaaa"
          }
        });
      change.after = await movDoc
        .collection("styles")
        .doc("styleId")
        .get();

      await movDoc
        .collection("styles")
        .doc("styleId")
        .set({
          label: "test style",
          desc: "test description",
          type: "base",
          style: {
            color: "#00000f",
            underline: false,
            outline: "#ffaafa",
            shape: "round",
            background: "#ffbaaa"
          }
        });
      change.after = await movDoc
        .collection("styles")
        .doc("styleId")
        .get();
      await func(change, funcContext);
      const doc = await movDoc
        .collection("snapshots")
        .doc("now")
        .get();
      const output = doc.data();
      const stat = output.stats.styleId;
      // console.log(output.members)
      expect(stat.label).toBe("test style");
      expect(stat.desc).toBe("test description");
      expect(stat.style).toEqual({
        color: "#00000f",
        underline: false,
        outline: "#ffaafa",
        shape: "round",
        background: "#ffbaaa"
      });
    });

    it.todo(
      "should publishes a list of members to be updated to the members_changed topic"
    );

    // This now happens in a different function
    it.skip("updates the last modified key", async () => {
      const date = admin.firestore.Timestamp.fromDate(new Date());
      // console.log(change)
      await movDoc
        .collection("styles")
        .doc("styleId")
        .set({
          label: "test style"
        });
      // create the message
      change.json = {
        after: {},
        params: { movId: "test-movement" }
      };
      change.json.after = await movDoc
        .collection("styles")
        .doc("styleId")
        .get();
      await movDoc.set({
        name: "test name",
        id: "test-movement",
        last_modified: ""
      });
      const response = await func(change, funcContext);
      const doc = await movDoc.get();
      const output = doc.data();
      // console.log(doc.exists)

      expect(output.last_modified._seconds).toBeGreaterThanOrEqual(
        date._seconds
      );
    });

    afterAll(async () => {
      // delete all data from db
      movDoc.delete();
    });
  });
});
