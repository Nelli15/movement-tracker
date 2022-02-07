jest.setTimeout(100000)
const admin = require('./src/utils/test-admin')
const environment = require('./src/environments/environment.test.js')
const context = {
  admin,
  environment
}

const Func = require('./converter')
const db = getFirestore()

const movCol = db.collection('movements')

describe('mt-trees-rebuildTree', () => {
  let func
  let funcContext
  let data
  let MovDoc = movCol.doc('FTwJSGQTN5yRd3iN3DFr')
  

  beforeAll(async () => {
    await MovDoc.collection('requests').doc('ellis.nick96@gmail.com').set({
      email: "ellis.nick96@gmail.com",
      name: "Nick Ellis",
      photoUrl: "https://lh3.googleusercontent.com/-W69WtXG1wL0/AAAAAAAAAAI/AAAAAAAAA5Q/hSepozSl8ew/photo.jpg",
      uid: "6aMqcBCqoFPeG9MOlYw6XZQKXrN2"
      })
    func = Func(context)
    funcContext = {
      auth: {
        uid: 'testUserId',
        token: {
          name: 'test user',
          email: 'test@user.com'
        }
      },
      params: {
          movId: "test-movement"
        }
    }
    
  })

  it.skip('respond to a change of member in parent doc', async () => {
      await movDoc
        .collection("trees")
        .doc("main-tree")
        .set({id:"main-tree",
        label: "Main Tree"});
        let treeDoc = movDoc
        .collection("trees")
        .doc("main-tree")
        await treeDoc
        .set({id:"main-tree",
        label: "Main Tree"});
      change.before = await movDoc
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
    const userRoles = []
    let colSnap = await db.collection('app-users').get()
    let docs = colSnap.docs
    // expect(docs.length).toBeEqual(userRoles.length)
    for (let userRole of userRoles){
      let doc = docs.find((el, ind) => { return el.id === userRole.uid})
      // role defintion is defined
      expect(doc).toBeDefined()
      let data = doc.data()

      expect(data).toEqual(userRole)
    }
  })

  it.skip('should import subtrees', async () => {
    let snap = await MovDoc.get()
    data = snap.data()

    expect(data.id).toEqual("FTwJSGQTN5yRd3iN3DFr")
    expect(data.name).toEqual("UQ")
    expect(data.style).toEqual({
      "backgroundColor": "#51247a",
    })
    expect(data.uid).toEqual(undefined)
  })

  it.skip('should update subtree on updateId change', () => {
    
  });

  it.skip('should not change anything if updateId of subtree changes to the current updateId', () => {
    
  });


  afterAll(async () => {
    // delete all data from db
    // await nowRef.delete()
    // if (movDoc) await movDoc.delete()
    // const col = await movCol.get()
    // col.forEach(doc => {
    //   doc.ref.delete()
    // })
    // const movements = await movCol.listDocuments()
    //
    // await styleRef.delete()
  })
})
