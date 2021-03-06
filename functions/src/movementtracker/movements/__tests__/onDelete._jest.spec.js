const admin = require('../../../utils/test-admin')
const environment = require('../../../environments/environment.test.js')
const context = {
  admin,
  environment
}

const Func = require('../onDelete.js')
const db = getFirestore()

const movCol = db.collection(environment.schema.movements)

describe('movements: onDelete', () => {
  let func
  let funcContext
  let data
  let MovDoc

  beforeEach(async () => {
    func = Func(context)
    funcContext = {
      auth: {
        uid: 'testUserId',
        token: {
          name: 'test user',
          email: 'test@user.com'
        }
      }
    }
  })

  it.todo('should update the last updated value in the movement')

  afterAll(async () => {
    // delete all data from db
    // await nowRef.delete()
    // console.log(movDoc)
    // if (movDoc) await movDoc.delete()
    const col = await movCol.get()
    col.forEach(doc => {
      doc.ref.delete()
    })
    // console.log(await movCol.listDocuments())
    // const movements = await movCol.listDocuments()
    // console.log(movements)
    //
    // await styleRef.delete()
  })
})
