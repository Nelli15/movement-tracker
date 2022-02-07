const admin = require('../../../utils/test-admin')
const environment = require('../../../environments/environment.test.js')
const context = {
  admin,
  environment
}

const Func = require('../copy.js')
const db = getFirestore()

const movCol = db.collection(environment.schema.movements)

describe('movements: copy', () => {
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

  it.todo('should copy the movement doc')

  it.todo('should create a movement role doc for the user that initiated it')

  it.todo('should copy all the style docs to the new movement')

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
