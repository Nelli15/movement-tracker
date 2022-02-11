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

describe.skip('movements: converter', () => {
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
          trees: ["main-tree"], name: 'test user',
          email: 'test@user.com'
        }
      }
    }
    await func()
  })

  it.only('should update app users', async () => {
    const userRoles = [
      {
        uid: '6aMqcBCqoFPeG9MOlYw6XZQKXrN2',
        photoURL: 'https://lh3.googleusercontent.com/-W69WtXG1wL0/AAAAAAAAAAI/AAAAAAAAA5Q/hSepozSl8ew/photo.jpg', 
        name: 'Nick Ellis',
        email: 'ellis.nick96@gmail.com'
      },
      {
        
        photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mB6jiSigeuNue_MiQVx8Ax0kA5WHi-Dk5KjyAgv',
        uid: '7mJP4yQd2HfBTvl5fnyyCY3fjc03',
        name: 'Becc Baron',
        email: 'becc.baron@powertochange.org.au',
           
      },
      {
        
        uid: 'AXIfC9FkMFTV3ac1nOE1J7v5tZ02',
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GhmwdVkcOc8qjWY9xO-vAgE6Dc3u5gk1n0lnrgC=s96-c',       name: 'Mitchell Poloni',
        email: 'mitchell.poloni@powertochange.org.au',
           
      },
      {
        
        uid: 'B5Rqbz4oL8aksdn0Ce8mopL6Cop2',
        photoURL: 'https://lh3.googleusercontent.com/-NcULbAAvjrA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclphyDGH0OXJ4Udt8pyZrWJ9yDlEg/s96-c/photo.jpg',
        name: 'Tiarne Robinson',
        email: 'tiarne.robinson@powertochange.org.au',
           
      },
      {
        
        uid: 'CBz070nluQUXvIxMOKSqhazBgNg2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJypaAkXZ32pFmoNh_HyYWdXKExGYxRyOW_qGRhi=s96-c',        name: 'Genevieve Brook',
        email: 'genevieve.brook@powertochange.org.au',
           
      },
      {
        
        uid: 'CmA9RXvt59cd2qF2EuCU9pY2VV92',
        photoURL: null,
        name: 'Kieran Boyle',
        email: 'kieranboyle@yahoo.com',
           
      },
      {
        
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJzWsiU49BCtDRsSDEVWk4V_dB56c48V4vjn1erq=s96-c',
        uid: 'Df6vSN1YXyTJWYfvYYatXIM0Mbf1',       name: 'Peter Brook',
        email: 'peter.brook@powertochange.org.au',
           
      },
      {
        
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJzBP_V-TH_x1biwt1l8TQJxyYiFnKijyMR9rdel=s96-c',  uid: 'ENSM8aAOFMPCBaRPyIdhWdUjgV92',      name: 'Petra Poloni',
        email: 'petra.poloni@powertochange.org.au',
           
      },
      {
        
        uid: 'FOSvxPgpmhhO7NlrIOppfkkKWA12',
        photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mB0oz-fPctKBpvFksSVqxQ7GwTfSinEYQlXqWrwAA',
        name: 'Paul Wang',
        email: 'paulwang528@gmail.com',
           
      },
      {
        
        uid: 'Hci0sJf21BMRJEXea1GTZM7xSEE2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwngcy64mCRWdxY9RdfmjPO9xQNwgV2DvXpoqGc=s96-c',        name: 'James Woollett',
        email: 'james.woollett@powertochange.org.au',
           
      },
      {
        
        uid: 'N8zrH6ac3YdJmTwnE6enTDCCuno1',
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GjAyLWNsKalzPgjyjR2bwFv2vw_fvg6x7C28ACREg=s96-c',     name: 'Jack Ryan',
        email: 'jackmryan2002@gmail.com',
           
      },
      {
        
        uid: 'Nezxt06kWChpLKyHQ8Hdm42vIjE3',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJxNwbUFin5VXbXfwtudwecCWZhezUyPx8_a_t7R=s96-c',        
        name: 'Nick Ellis',
        email: 'nick.ellis@powertochange.org.au'
      },
      {
        
        uid: 'QARxGdyJMUhtqUbEGglJ7E1QQPu2',
        photoURL: null,
        name: 'Rachel Augustine',
        email: 'rachelaugustine0303@gmail.com',
           
      },
      {
        
        uid: 'RkuTR4hVNHYu16lQQjIfjLGWrD13',
        photoURL: 'https://lh6.googleusercontent.com/-VWRldw7XfPQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYx2EtjHsXt1ioW7xZ8y1IvcBLbQ/photo.jpg',
        name: 'Daniel Plumbe',
        email: 'dplumbe@gmail.com'
      },
      {
        
        uid: 'RsL1i8GSAmNAOkJykeEIuCpyUU12',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJyvxZJajZTXsAzwBJ-ytzxBjpOuN38OR061xuTB=s96-c',        name: 'Yasmin Henry',
        email: 'yasmin.henry@powertochange.org.au',
           
      },
      {
        uid: 'VYxrJJDnCkPxTT3tkl3eGsZfOTd2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwTKugCucEAdjfJb0-NXEcsdFVFRCikRbE5SS0y=s96-c',        name: 'Andrew Baron',
        email: 'andrew.baron@powertochange.org.au',
      },
      {
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJyzhjfvfG5vpN-r1OjCRNmbec4vhLNQt1gUdF8j=s96-c',
        uid: 'YvD2N3HrcKV4p1N7nGnLozmmeeH3',
        name: 'Jessie Ellis',
        email: 'jessie.ellis@powertochange.org.au',
           
      },
      {
        
        photoURL: 'https://lh3.googleusercontent.com/-L_Cw_zrWZWc/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcIA-z_iaeLEVvEmfPft2yb_H3Vkw/photo.jpg',
        uid: 'bYddKL7yrrW7YZ6TD2Ch3IrMEWB3',
        name: 'Joshua Grice',
        email: 'joshuagrice00@gmail.com'
      },
      {
        
        uid: 'dEDDE5dIPHb0L77ykLvY9vRPnoJ3',
        photoURL: null,
        name: "Carla Coetzee",
        email: 'carla.h.coetzee@gmail.com'
      },
      {
        
        uid: 'dzEm7aI9RjQQsFnstjZU6ZiaefS2',
        photoURL: null,
        name: 'Florence Leung',
        email: 'florence.leung@powertochange.org.au',
           
      },
      {
        
        uid: 'nVqvwbR9dbMzdKXCskk8Fo3qzYw1',
        photoURL: 'https://lh4.googleusercontent.com/-_F11HYcrLek/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckB6S3fx99Q5txqlDuYqeCZelWE1A/photo.jpg',
        name: 'Nicholas Grice',
        email: 'nicholasgrice00@gmail.com',
           
      },
      {
        
        uid: 'pM6aIlE4hHYBStyJK7m1MDSVCdF2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJzhXkVXxXVGoVsteAJAHQ_KbUo9S5_sjOPtRz1d=s96-c',        name: 'Daniel Rudge',
        email: 'daniel.rudge@powertochange.org.au',
           
      },
      {
        
        photoURL: 'https://lh4.googleusercontent.com/-kd2kA7xvgOU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnUxAFwz0tbe7lH-WTNGDwK33-wfQ/s96-c/photo.jpg',
        uid: 'sRWVjtWCMIVRyEqtVtXtPmr712r1',
        name: 'Sean Cosijn',
        email: 'seancosijn@gmail.com',
           
      },
      {
        
        photoURL: null,
        uid: 'ukcZVFWfg3frYwaxTE0GKAUfiAi2',
        name: 'Wei Lo',
        email: 'lowei@powertochange.org.au',
           
      },
      {
        
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgLt2Epq7e1NoHfnMqZ24u7pdLp-hN5SJzapyav',
        uid: 'vbbjkWTI6Egr3wcuLXZR82ehhok2',
        name: 'Jonathan Ho',
        email: 'jho00@me.com',
           
      },
      {
        photoURL: null,
        uid: 'zMr6FSRbIFUeU3JunAa3DOEjPmF3',
        name: 'Emma Adams',
        email: 'emmaadams01@outlook.com',  
      }
    ]
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

  it('should update movement doc', async () => {
    let snap = await MovDoc.get()
    data = snap.data()

    expect(data.id).toEqual("FTwJSGQTN5yRd3iN3DFr")
    expect(data.name).toEqual("UQ")
    expect(data.style).toEqual({
      "backgroundColor": "#51247a",
    })
    expect(data.uid).toEqual(undefined)
  })

  it('should update the member docs ', async () => {
   
    const expectedMembers = [
      {
      mods: [
        'RYvrItrcLBumN2l1B2ZB',
        ':0am 2101y1n )0t',
        '46akFzeUaeqBWC3IBXV2',
        'KhRaG31GtlG5mpnThUdH',
        '3ohW3FU65MTUnJuQHkvB',
        'UDpXKKGAB0JpICs1Jfi5'
      ],
      notes: '',
      role: '11ttn nu101dGd m',
      customFields: {},
      display: {
        color: '#000000',
        shape: 'not-round',
        underline: false,
        label: 'Sean Cosijn',
        outline: '#ffffff',
        background: '#ffffff'
      },
      trees: ["main-tree"], name: 'Sean Cosijn',
      id: '03OBFstGenJLSwkPyoIe',
      trees: ["main-tree"]
    },
      {
        id: '0F7QAUqwwjR8WwfU6roJ',
        mods: [ 'o86cGQi6TP7AWM4qpYSr', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: 'default',
        customFields: {},
        display: {
          color: '#ffffff',
          shape: 'not-round',
          underline: false,
          label: 'Mitch Poloni',
          outline: '#0042a9',
          background: '#0042a9'
        },
        trees: ["main-tree"], name: 'Mitch Poloni'
      },
      {
        id: '1675Xwq0bFBMZO0XmvsP',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Will Shorrock-Browne',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Will Shorrock-Browne'
      },
      {
        id: '1Otp49vJ6Krcyvwcn4Mb',
        mods: [],
        notes: 'Please make members that you want deleted a child of this member',
        role: 'mH7ZmSClmCXE4DlXMNRD',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: '--TO BE DELETED--'
      },
      {
        id: '2e1etGimRhzJdEDLqHYm',
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'Discipled by Jessie for 3 weeks in Sem 1 2020. Self opted out due to unavailability. Regularly checked in with re: events and conferences. \n' +
          'Invited to events and Breakthrough 2021. ',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Sophie James',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Sophie James'
      },
      {
        id: '2oGzh8Nb5rCjF246qgWB',
        mods: [
          ':0am 2101y1n )0t',
          '0 u5rSSaraMtTM61',
          '46akFzeUaeqBWC3IBXV2',
          '7RmRpoE0w86et5oFJV6Q',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: '',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Nicholas Grice',
          outline: '#000000',
          background: '#b1dd8b'
        },
        trees: ["main-tree"], name: 'Nicholas Grice'
      },
      {
        id: '3VcOYykTqk3aueEM1qz4',
        mods: [ '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2', ':0am 2101y1n )0t' ],
        notes: 'Encourage him to share his faith regularly',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: 'Josheph Krebs',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Josheph Krebs'
      },
      {
        id: '41g0Esm7MYlYVjWummPM',
        mods: [
          '46akFzeUaeqBWC3IBXV2',
          'UDpXKKGAB0JpICs1Jfi5',
          't tEe475  iaa00 '
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'James Yelland',
          outline: '#474747',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'James Yelland'
      },
      {
        id: '5HyKxGyIg9rVtled64g7',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Tahlia'
      },
      {
        id: '5LWB5cBbj9EIpd6bk2I3',
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Jonathan Tiss',
          outline: '#000000',
          background: '#ffaaaa'
        },
        trees: ["main-tree"], name: 'Jonathan Tiss'
      },
      {
        id: '5SMB4YnkuYLSRpv3Vb7K',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Sinead'
      },
      {
        id: '5jajm7QQP6bExdVhhG8k',
        mods: [
          '0d yiM7aTa1aet0T',
          'rYMogPL8oQOx8bJdAMa2',
          'j6Zq9tbZXweMbboALDs8',
          ':0am 2101y1n )0t',
          'xcCy4Blwgkd9WLuVErNF',
          '0 u5rSSaraMtTM61'
        ],
        notes: 'Became a Christian through CE with Lauren Venz in 2019.\n' +
          'Online survey contact 2021 - wants to learn to share her faith',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: 'Abbey',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Abbey P'
      },
      {
        id: '6U8f3cPHbILYvrNrW3UV',
        mods: [
          'RYvrItrcLBumN2l1B2ZB',
          '46akFzeUaeqBWC3IBXV2',
          '3ohW3FU65MTUnJuQHkvB',
          ':0am 2101y1n )0t',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: '',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [1] Jack Ryan',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Jack Ryan'
      },
      {
        id: '711TRvfJpvVwFjL6Dnti',
        mods: [ '3ohW3FU65MTUnJuQHkvB', '46akFzeUaeqBWC3IBXV2' ],
        notes: "Has learned more, and is currently processing - doesn't want to make a commitment just yet",       role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Cooper G'
      },
      {
        id: '7dkOAcvhXgbUlCsuXYLZ',
        mods: [
          'RYvrItrcLBumN2l1B2ZB',
          'rYMogPL8oQOx8bJdAMa2',
          'KA7mWeXalOkMuY2pgXHR'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Lydia'
      },
      {
        id: '8TSC0q4pjKZXj8Batzq0',
        mods: [
          ':0am 2101y1n )0t',
          'rYMogPL8oQOx8bJdAMa2',
          'xcCy4Blwgkd9WLuVErNF',
          'KA7mWeXalOkMuY2pgXHR',
          'RYvrItrcLBumN2l1B2ZB'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Leanne de Jongh'
      },
      {
        id: '8ZSvPVPsvyc7K0vdk2ez',
        mods: [
          '0 u5rSSaraMtTM61',
          'rYMogPL8oQOx8bJdAMa2',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Rasika Jayawardhana',
          outline: '#474747',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Rasika Grice'
      },
      {
        id: '8qCpKI0Tutff2OJrVvBx',
        mods: [ '46akFzeUaeqBWC3IBXV2', ':0am 2101y1n )0t' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Manish'
      },
      {
        id: '9BX1jaJYTqzAeFloX4bI',
        mods: [ '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: "Riley O'Shannessy"
      },
      {
        id: '9QMzsDjII6aor6F4gRgx',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Was connecting with Josh\n',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Ethan Waugh'
      },{
        id: 'AYrrEdMNFaOw0Cdb2TRf',
        mods: [],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Luke'
      },
      {
        id: 'BDRF0vdLVKsTtfdOwGnL',
        mods: [],
        notes: 'Was connected to Josh',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Owen'
      },
      {
        id: 'C1nQX607TTJiHSaJQdSF',
        mods: [ 'MrAa9r 99   irA ', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [5] Naziah Siddiddique',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["noParents"], name: 'Naziah Siddiddique'
      },
      {
        id: 'CHtIeJThnGhzAeWWks5g',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: 'OT student  - attended Salt 2x  early Sem 2 2020. \n' +
          '\n' +
          'Invited to events and Breakthrough  - unsure about committing to events due to uni schedule\n',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Bri Vandersee'
      },
      {
        id: 'CIo4dNwnNuslhMuPblY9',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: 'Need to find time to meet. Still awaiting response.',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Georgia Forster'
      },
      {
        id: 'DLy4fRpkzW8IkP2JGn6i',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: 'default',
        customFields: {},
        display: {
          color: '#ffffff',
          shape: 'not-round',
          underline: false,
          label: 'Jessie Ellis',
          outline: '#0042a9',
          background: '#0042a9'
        },
        trees: ["main-tree"], name: 'Jessie Ellis'
      },
      {
        id: 'DdFgHnVDTtKLjbdOeEyR',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Jamie Mackintosh'
      },
      {
        id: 'DyFunsfjR9vg2TclhCNP',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Sophie'
      },
      {
        id: 'EARQFdxmZsJgVhFUh4qn',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: 'wants to be discipled (?)',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Madison Dowie'
      },
      {
        id: 'FClWLoiM7zyzV7RzwJr7',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Hamish',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Hamish'
      },
      {
        id: 'FKeSTfqt39M2Q0zkMie7',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Austin'
      },
      {
        id: 'FRe93Gn4ICmPF8suHxsB',
        mods: [
          ':0am 2101y1n )0t',
          't tEe475  iaa00 ',
          '46akFzeUaeqBWC3IBXV2',
          '7RmRpoE0w86et5oFJV6Q',
          'KhRaG31GtlG5mpnThUdH'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [3] Josh Grice',
          outline: '#000000',
          background: '#b1dd8b'
        },
        trees: ["main-tree"], name: 'Josh Grice'
      },
      {
        id: 'FnPh5VIW2GgaJKiZjUQ8',
        mods: [ '0d yiM7aTa1aet0T', '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Ashlea Wong',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Ashlea Wong'
      },
      {
        id: 'FuiywanMGBuUQgpSchxY',
        mods: [
          '46akFzeUaeqBWC3IBXV2',
          ':0am 2101y1n )0t',
          'xcCy4Blwgkd9WLuVErNF',
          '0 u5rSSaraMtTM61'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Sandy Ghermann',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Sandy Ghermann'
      },
      {
        id: 'GKr2gWle6N4msCwBcPvV',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: 'Will see if she wants to catch up after exams to chat about evidence for God.',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Cas Maclean'
      },
      {
        id: 'H0EWkGM7CF7ZCAl3u6Wc',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Mitch to give Nick and update',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Dougal'
      },
      {
        id: 'H52Kf6Alu5knusGxEGrB',
        mods: [ 'el1rE8E rArnt0a1', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Selina Wang [INT]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["noParents"], name: 'Selina Wang'
      },
      {
        id: 'HaorE8zql5fNXzssp5Cu',
        mods: [
          '46akFzeUaeqBWC3IBXV2',
          ':0am 2101y1n )0t',
          'UDpXKKGAB0JpICs1Jfi5',
          'j6Zq9tbZXweMbboALDs8'
        ],
        notes: 'Encourage him to be sharing his faith',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Chris',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Chris'
      },
      {
        id: 'HayQhdlGsKxKbfPlo5ON',
        mods: [
          '0 u5rSSaraMtTM61',
          '0d yiM7aTa1aet0T',
          'rYMogPL8oQOx8bJdAMa2',
          'UDpXKKGAB0JpICs1Jfi5',
          ':0am 2101y1n )0t'
        ],
        notes: 'Has completed First Steps. Compass material currently',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Chantelle',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Chantelle Moimoi'
      },
      {
        id: 'Hp5MIwIkt14arBicSK27',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'was connecting with Josh',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Ethan Lo'
      },
      {
        id: 'IrJsboJQoqiGgb71EwXJ',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Connected to OCF,\n' +
          'Comes to Salt and learning to lead DBS. Good potential for a student discipler\n' +
          'Also  worship at Catalyst',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Herman'
      },
      {
        id: 'JNgyOyrypDRS7XlDoLvO',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Felicity Anderson'
      },
      {
        id: 'KIysPYAG8YsT6dMYqhS6',
        mods: [
          ':0am 2101y1n )0t',
          '0 u5rSSaraMtTM61',
          'rYMogPL8oQOx8bJdAMa2',
          '7RmRpoE0w86et5oFJV6Q',
          'UDpXKKGAB0JpICs1Jfi5',
          'RYvrItrcLBumN2l1B2ZB'
        ],
        notes: 'Train Plan: Finding disciples this semester. ',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Emma Adams',
          outline: '#474747',
          background: '#b1dd8b'
        },
        trees: ["main-tree"], name: 'Emma Adams'
      },
      {
        id: 'KyOhn6L12Nd1YlwAAtwF',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Potential Dship',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Lachlan Cooley',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Lachlan Cooley'
      },
      {
        id: 'LGhHDHpSP4H2LHF2C5RY',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Pablo Parra'
      },
      {
        id: 'LvE0yC4ljZurVias8jex',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: ' - Invited to do dship with Jessie in May 2021 said no due to availability\n' +
          ' - O-week postcard contact - interested to learn how to share her faith. \n' +
          ' - Investigating different Christian clubs. Followed up by Jessie and Sean Week 1 2021. \n' +
          " - Attended salt with Yasmin 5-6x on  Thursdays. Couldn't attend Breakthrough, not planning on MYC. \n" +
          ' - Studying primary ed. ',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Lizzy Hopper'
      },
      {
        id: 'N0bpRvG0h1vu7Wk7lrbN',
        mods: [
          'rYMogPL8oQOx8bJdAMa2',
          '3ohW3FU65MTUnJuQHkvB',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: 'Following up with Hazel',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Juliet',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Juliet Biemann'
      },
      {
        id: 'N3CcEWZsAHvOCC3Y0XrD',
        mods: [
          'rYMogPL8oQOx8bJdAMa2',
          ':0am 2101y1n )0t',
          '3ohW3FU65MTUnJuQHkvB',
          'UDpXKKGAB0JpICs1Jfi5',
          'RYvrItrcLBumN2l1B2ZB'
        ],
        notes: '',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Lily Biggs'
      },
      {
        id: 'NGtvLRwCmSqu4p51wRR4',
        mods: [],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Freeman'
      },
      {
        id: 'O0WpvvNuAQ1EK4nQp6qq',
        mods: [
          '46akFzeUaeqBWC3IBXV2',
          '0 u5rSSaraMtTM61',
          ':0am 2101y1n )0t',
          '0d yiM7aTa1aet0T',
          'j6Zq9tbZXweMbboALDs8'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Liam Black',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["main-tree"], name: 'Liam Black'
      },
      {
        id: 'OD81zpaLxCyADdkyZ6Cj',
        mods: [ '46akFzeUaeqBWC3IBXV2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: 'Was connecting with Ken',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Allan'
      },
      {
        id: 'OEdGg5FL2Oq0IlcfQue8',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'Alpha? Goes to QUT',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Steffi'
      },
      {
        id: 'OFm9vtWv54mDrkIZ5zMD',
        mods: [ 'KA7mWeXalOkMuY2pgXHR', '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Super keen on learning more about God. Will probably become a christian soon.',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Harry'
      },
      {
        id: 'OPFH9KNwqXeYRvopnoFM',
        mods: [ 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [3] Angelo Flores',
          outline: '#474747',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Angelo Flores'
      },
      {
        id: 'OUoFZow0aN1cq2ICip1G',
        mods: [
          'rYMogPL8oQOx8bJdAMa2',
          'el1rE8E rArnt0a1',
          'j6Zq9tbZXweMbboALDs8',
          'xcCy4Blwgkd9WLuVErNF',
          '0d yiM7aTa1aet0T',
          ':0am 2101y1n )0t',
          '0 u5rSSaraMtTM61'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Bella Lombule'
      },
      {
        id: 'OxsxDa0Fwpo6Jm4L9G3U',
        mods: [
          'RYvrItrcLBumN2l1B2ZB',
          '0 u5rSSaraMtTM61',
          ':0am 2101y1n )0t',
          'rYMogPL8oQOx8bJdAMa2',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: 'Reassessing availability and leadership commitments ',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Rachel Augustine',
          outline: '#000000',
          background: '#b1dd8b'
        },
        trees: ["main-tree"], name: 'Rachel Augustine'
      },
      {
        id: 'PtKGhRuTQIckzpB0a9Hx',
        mods: [],
        notes: '',
        role: 'mH7ZmSClmCXE4DlXMNRD',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: '--Involved Christian with No Parent--'
      },
      {
        id: 'QLjMOU3G8Vi9aPLJGWnT',
        mods: [],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Zahlia'
      },
      {
        id: 'QXgeY465UVsKnfdwFW48',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Olivia Durrheim'
      },
      {
        id: 'QeIm063qu8xHAgcvK34c',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: 'not FAT yet, seeing how she goes at Breakthrough, trying to get her to come to SALT',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Catriona Rice'
      },
      {
        id: 'RgcNYB5Y6tehuiPF3fiU',
        mods: [ ':0am 2101y1n )0t', 'MM raida3utaTd 1', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [6] Paul Wang',
          outline: '#000000',
          background: '#b1dd8b'
        },
        trees: ["main-tree"], name: 'Paul Wang'
      },
      {
        id: 'Rz0JcTPlcajfgO5UwKFL',
        mods: [
          'rYMogPL8oQOx8bJdAMa2',
          '3ohW3FU65MTUnJuQHkvB',
          ':0am 2101y1n )0t',
          'xcCy4Blwgkd9WLuVErNF'
        ],
        notes: 'Build- Potential disciple, seems quite teachable, availability unsure (law)',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Jasmine Pearce'
      },
      {
        id: 'SA4jQtdFuI0srEDYDa3o',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Alice Middleton',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Alice Middleton'
      },
      {
        id: 'SisCsMdoKIAjnCX19y52',
        mods: [ '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2', 'el1rE8E rArnt0a1' ],
        notes: 'Mitch to encourage Josh to reconnect/get update',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: 'David',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'David'
      },
      {
        id: 'SvRZTpTmTOQ7NBP7ixJD',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Catching Up  to talk about God',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'James Baumgart'
      },
      {
        id: 'TYsR7mwU7C7XwOfzsIcZ',
        mods: [ '46akFzeUaeqBWC3IBXV2', 'MM raida3utaTd 1' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Frank'
      },
      {
        id: 'Ufyr7Qb9hJqlsR6rykBP',
        mods: [ 'RYvrItrcLBumN2l1B2ZB', '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Challenged to discipleship after schoolies. Would love to take him through first steps/equivalent',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Lewis Reed'
      },
      {
        id: 'UtOHfX9BDZhmhUAYjrM2',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', '0 u5rSSaraMtTM61' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Shienne',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Shienne'
      },
      {
        id: 'VmtdU8nxHjWZduJEhlXm',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Caleb Webb',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Caleb Webb'
      },
      {
        id: 'VqNOBhniLhWQN397vZFp',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'Attended welcome bbq in 2020 and 2021 - studying arts/law\n' +
          ' - has connected with Dan re: law group\n',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Rachel King'
      },
      {
        id: 'Vx9Ls5n10O2NX3RhmB4M',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: 'Trying to get her to SALT',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Amy Lazarus'
      },
      {
        id: 'WZ1GggK61NUYI2BebS36',
        mods: [
          '0 u5rSSaraMtTM61',
          'rYMogPL8oQOx8bJdAMa2',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: 'Discipled by Yasmin in Sem 2 2019 for a few sessions. Discipled by Jessie 2020 (Sem 1 and 2). Taking a break from dship 2021, due to focusing on family and mental health. Continue to invite to conferences and events. Jessie to check in/catch up a few times a semester.  Attended Schoolies 2019, 2020. ',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Kayla Turnbull',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Kayla Turnbull'
      },
      {
        id: 'YQo4XDW0bguEuYKyqxVL',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Brooke'
      },
      {
        id: 'YrZB0KJL94BSnecnK6t4',
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Sophia Cossa',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Sophia Cossa'
      },
      {
        id: 'aE7Mu556fCJIhvxJY00y',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: 'default',
        customFields: {},
        display: {
          color: '#ffffff',
          shape: 'not-round',
          underline: false,
          label: 'Tiarne Robinson',
          outline: '#0042a9',
          background: '#0042a9'
        },
        trees: ["main-tree"], name: 'Tiarne Gray'
      },
      {
        id: 'ae8cnpOcO5ONsTaQqj9l',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Jasmin Maxwell'
      },
      {
        id: 'b6htdXEpqVWVkVbPfqwj',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: 'default',
        customFields: {},
        display: {
          color: '#ffffff',
          shape: 'not-round',
          underline: false,
          label: 'Nick Ellis',
          outline: '#0042a9',
          background: '#0042a9'
        },
        trees: ["main-tree"], name: 'Nick Ellis'
      },
      {
        id: 'bprNzBn8L1OQeudiGfPg',
        mods: [ '0 u5rSSaraMtTM61', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Martin',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Martin'
      },
      {
        id: 'c6dRupke4wlwBpyCyWOv',
        mods: [
          ':0am 2101y1n )0t',
          '46akFzeUaeqBWC3IBXV2',
          'UDpXKKGAB0JpICs1Jfi5',
          '3ohW3FU65MTUnJuQHkvB'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Zac',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Zac Maxwell'
      },
      {
        id: 'clKfwO2Gln88sDOYGgeL',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Rory'
      },
      {
        id: 'dV1qaOGk3FnzZFNUw1oZ',
        mods: [ '0 u5rSSaraMtTM61', '0d yiM7aTa1aet0T', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'Now at ACU',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Jenna Maurel',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Jenna Maurel'
      },
      {
        id: 'der2XOL3Gdqua6LyH1xj',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'Emma continuing to connect with. Plan: invite to Alpha?',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Evie'
      },
      {
        id: 'dgYClNToNO7TjQKgEipH',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 't tEe475  iaa00 ' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Megan Jones'
      },
      {
        id: 'egWR7TXlgjZErk9aqvMP',
        mods: [ 'KA7mWeXalOkMuY2pgXHR', '7RmRpoE0w86et5oFJV6Q' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Welton'
      },
      {
        id: 'f3J1jw9TOZfMOFNLLIQK',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Moses'
      },
      {
        id: 'fdvFS9D1VJ2cDGgD3nSX',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'SDA',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Bronwen Nel'
      },
      {
        id: 'flK72VhEp2aAgnA40uCy',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Yodi Siu'
      },
      {
        id: 'fnbxJCK4oF9458qiVtIx',
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'Build/Train stage. Plan: provide small and supported opportunities for leadership. Supported also by Tiarne? Nick says is she sharing her faith regularly\n',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Brynlea Gibson',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Brynlea Gibson'
      },
      {
        id: 'hXjOUHeBH2Vukl857uVz',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Ocean'
      },
      {
        id: 'iALW2O72jJSCVfk1NSTJ',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Leon'
      },
      {
        id: 'iKkzRo4LNx8fZS9LpdFJ',
        mods: [
          '3ohW3FU65MTUnJuQHkvB',
          'rYMogPL8oQOx8bJdAMa2',
          'j6Zq9tbZXweMbboALDs8',
          '0d yiM7aTa1aet0T',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [1] Sarah Millar [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["noParents"], name: 'Sarah Millar'
      },
      {
        id: 'iUd8gP5R3xALE0aaCbxb',
        mods: [ '0d yiM7aTa1aet0T', '3ohW3FU65MTUnJuQHkvB' ],
        notes: 'Was connecting with Josh',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Haowen'
      },
      {
        id: 'iagy3QI3gujOxnRcpo6H',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Abbey Grice'
      },
      {
        id: 'j6TEsBzkZxvWOaVvLp41',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Tamara'
      },
      {
        id: 'j8uBHU5MCo6eaBUidhKA',
        mods: [
          'RYvrItrcLBumN2l1B2ZB',
          'rYMogPL8oQOx8bJdAMa2',
          ':0am 2101y1n )0t',
          't tEe475  iaa00 ',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: 'Graduates end of 2023',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [3] Carla Coetzee',
          outline: '#000000',
          background: '#ffaaaa'
        },
        trees: ["main-tree"], name: 'Carla Coetzee'
      },
      {
        id: 'ketIhx0ruiO4RT7soEYD',
        mods: [
          '46akFzeUaeqBWC3IBXV2',
          't tEe475  iaa00 ',
          '0d yiM7aTa1aet0T',
          ':0am 2101y1n )0t'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Seann',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["main-tree"], name: 'Seann Boo'
      },
      {
        id: 'kl4RSMlI2LqxV2KePQQI',
        mods: [
          '3ohW3FU65MTUnJuQHkvB',
          ' Tta1 a0(:)lSTa9',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: 'With Emma Adams',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [1] Lexie Glasson [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["noParents"], name: 'Lexie Glasson'
      },
      {
        id: 'lY8myi4q6iK5KJ4twseo',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', ':0am 2101y1n )0t' ],
        notes: '',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Levi'
      },
      {
        id: 'lnWb8l2hKNpy7rnPBRlX',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'oOvDZwfqXwDkTsEoWvBk' ],
        notes: '',
        role: 'default',
        customFields: {},
        display: {
          color: '#ffffff',
          shape: 'not-round',
          underline: false,
          label: 'Yasmin Henry',
          outline: '#0042a9',
          background: '#0042a9'
        },
        trees: ["main-tree"], name: 'Yasmin Henry'
      },
      {
        id: 'm118LJ1wLrEYHt8TSBoq',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'RYvrItrcLBumN2l1B2ZB' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Jasmine Chan'
      },
      {
        id: 'm6mCdveLWNgJGyDF9Sjo',
        mods: [
          'rYMogPL8oQOx8bJdAMa2',
          'KA7mWeXalOkMuY2pgXHR',
          ':0am 2101y1n )0t',
          'UDpXKKGAB0JpICs1Jfi5',
          'RYvrItrcLBumN2l1B2ZB'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Annelise Terblanche'
      },
      {
        id: 'm7BhOkFAkPyfOXvSuYND',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Nicholas'
      },
      {
        id: 'nCiB1F8JDdudJO6Xyivy',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: 'Allie has acknowledged that she needs to grow in her faith before she can go sharing it. Emma will take her through First Steps and will track with her. ',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Allie Young'
      },
      {
        id: 'o4GPRVN5JlqsntU4ZEQs',
        mods: [
          'j6Zq9tbZXweMbboALDs8',
          ':0am 2101y1n )0t',
          'rYMogPL8oQOx8bJdAMa2',
          '0d yiM7aTa1aet0T',
          'RYvrItrcLBumN2l1B2ZB'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Simone Hindsberger'
      },
      {
        id: 'o5V7o5UtDsH6QJE09QMN',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Celina'
      },
      {
        id: 'oJ3Twl5YTFghxMadZOja',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Might be a christian but maybe not',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Connor',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["main-tree"], name: 'Connor'
      },
      {
        id: 'p4DWXe5G3efllrPi7SM2',
        mods: [
          'RYvrItrcLBumN2l1B2ZB',
          '46akFzeUaeqBWC3IBXV2',
          ':0am 2101y1n )0t',
          '0 u5rSSaraMtTM61',
          'n42a2Mrlu )thr0r',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: '',
        role: ' a1i n 5mnary0T+',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Kieran Boyle',
          outline: '#000000',
          background: '#b1dd8b'
        },
        trees: ["main-tree"], name: 'Kieran Boyle'
      },
      {
        id: 'pHTIyu3nx6MPhmF7AgXc',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Natalie Iru',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Natalie Iru'
      },
      {
        id: 'pj0ivaS4d6JrHgtSVIke',
        mods: [ 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [3] Israel Escano',
          outline: '#ffaaaa',
          background: '#ffaaaa'
        },
        trees: ["noParents"], name: 'Israel Escano'
      },
      {
        id: 'qOba1QSzmOB2BHL8WqFD',
        mods: [ 'el1rE8E rArnt0a1', 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
        notes: 'With Carla\n',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Tricia Minjung Wu [INT]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["main-tree"], name: 'Tricia Minjung Wu'
      },
      {
        id: 'qe4D4hHsAVrKVv8iLCE2',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'rTrr2d 3ed+1i3aa' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Sarah Murphy'
      },
      {
        id: 'qlahLMCw2qVxmA5o5gpR',
        mods: [
          'rYMogPL8oQOx8bJdAMa2',
          'KA7mWeXalOkMuY2pgXHR',
          ':0am 2101y1n )0t',
          'xcCy4Blwgkd9WLuVErNF'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Kate Harris'
      },
      {
        id: 'rCf4xIzdFb6odSCI2QRO',
        mods: [ '46akFzeUaeqBWC3IBXV2', '3ohW3FU65MTUnJuQHkvB' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Edwin'
      },
      {
        id: 'rVtq0wgniMj2TRLJ6jBN',
        mods: [
          '46akFzeUaeqBWC3IBXV2',
          'UDpXKKGAB0JpICs1Jfi5',
          'KA7mWeXalOkMuY2pgXHR',
          ':0am 2101y1n )0t'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Liam Lay'
      },
      {
        id: 's9GBQtmBPI4mL6VYlPmM',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Diep Ngo'
      },
      {
        id: 'sCk0ORSlIKlI4TEMoj6L',
        mods: [ ' Tta1 a0(:)lSTa9', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'Was meeting with Lauren. Reconnect with in Sem 2',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Vrinda Eswaran [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        trees: ["noParents"], name: 'Vrinda Eswaran'
      },
      {
        id: 'sL2bXbm2oeu3nrFkyTzj',
        mods: [
          'RYvrItrcLBumN2l1B2ZB',
          '46akFzeUaeqBWC3IBXV2',
          ':0am 2101y1n )0t',
          't tEe475  iaa00 ',
          'n42a2Mrlu )thr0r',
          '7RmRpoE0w86et5oFJV6Q',
          'IHpI6i86UwHaBHKlDfsn',
          'KhRaG31GtlG5mpnThUdH',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [3] Daniel Plumbe',
          outline: '#000000',
          background: '#ffaaaa'
        },
        trees: ["main-tree"], name: 'Daniel Plumbe'
      },
      {
        id: 'siH75ijS6P0c3E6DRe4d',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: 'New Christian',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Hazel'
      },
      {
        id: 'siuoK9YsLPm7iEopYACR',
        mods: [
          ':0am 2101y1n )0t',
          '0 u5rSSaraMtTM61',
          '46akFzeUaeqBWC3IBXV2',
          'UDpXKKGAB0JpICs1Jfi5'
        ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Stephen Philpot',
          outline: '#000000',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Stephen Philpot'
      },
      {
        id: 'tAWgKRf9DSaQLAcTjQ3z',
        mods: [ '46akFzeUaeqBWC3IBXV2', 'KA7mWeXalOkMuY2pgXHR' ],
        notes: "Haven't met in a while - will try to contact him again soon to see if interest is still there",    role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Dylan T'
      },
      {
        id: 'tT0IRk2dmBdLQyeMBKfB',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Yang L'
      },
      {
        id: 'v11qo1Q8Zy1NB34uvxmP',
        mods: [
          'rYMogPL8oQOx8bJdAMa2',
          '3ohW3FU65MTUnJuQHkvB',
          'rTrr2d 3ed+1i3aa'
        ],
        notes: 'Malyon Bible College student (completed 1 year of OT)  plans to return to OT 2022. Interested in events and conferences as able. Invited to Breakthrough. ',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Rachael Dingwall'
      },
      {
        id: 'v5XZdAcEsZDKSTfC2LgH',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: "Insta Survey Contact -  indicated wanted to learn to share faith. Followed up by Jessie and Jack in Week 1 2021. Interested in Josh's bible study on Thursdays. Interested in Breakthrough. Appeared less likely to try Salt this semester. Studying Biomed",
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["noParents"], name: 'Isobelle Trevatt'
      },
      {
        id: 'vj2kpzZI9sprpsAqR3ax',
        mods: [],
        notes: '',
        role: 'default',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Florence Leung'
      },
      {
        id: 'w9aPvaYAoM8mdOHvxhNQ',
        mods: [ 'rYMogPL8oQOx8bJdAMa2', ':0am 2101y1n )0t' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Arya Clark'
      },
      {
        id: 'wXFzr07Qu7ID9TuoMTeD',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Cedric',
          outline: '#fcb177',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Cedric'
      },
      {
        id: 'xUlTHb5PuuZjA9w3tEry',
        mods: [ ' Tta1 a0(:)lSTa9' ],
        notes: 'CE with Liam Black',
        role: '(7lr10aTrtmd e (',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Caleb'
      },
      {
        id: 'yNCl3NiDFOkJvtrUh1ib',
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: '',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Caleb '
      },
      {
        id: 'yPQP77fEJfzPB7AvFkUO',
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        role: 'default',
        customFields: {},
        display: {
          color: '#ffffff',
          shape: 'not-round',
          underline: false,
          label: 'Gen Brook',
          outline: '#0042a9',
          background: '#0042a9'
        },
        trees: ["main-tree"], name: 'Genevieve Brook'
      },
      {
        id: 'zbTCywlmeHOCBa8h7o6F',
        mods: [ '46akFzeUaeqBWC3IBXV2', 'RYvrItrcLBumN2l1B2ZB' ],
        notes: 'Lives with Dan and has come to a couple of things',
        role: '11ttn nu101dGd m',
        customFields: {},
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Crispian Yedmass',
          outline: '#ffffff',
          background: '#ffffff'
        },
        trees: ["main-tree"], name: 'Crispian Yedmass'
      }
    ]
    let colSnap = await MovDoc.collection('members').get()
    let docs = colSnap.docs
    // expect(docs.length).toEqual(expectedMembers.length)
    for (let expectedMember of expectedMembers) {
      
      let doc = docs.find((el, ind) => { return el.id === expectedMember.id})
      data = doc.data()

      expect(data).toEqual(expectedMember)
    }
  })

  it('should update movement user docs', async () => {
    const userRoles = [
      {
        role: 'owner',
        uid: '6aMqcBCqoFPeG9MOlYw6XZQKXrN2',
        photoURL: 'https://lh3.googleusercontent.com/-W69WtXG1wL0/AAAAAAAAAAI/AAAAAAAAA5Q/hSepozSl8ew/photo.jpg',  roleSortCriteria: [
          "mH7ZmSClmCXE4DlXMNRD",
          "default",
          " a1i n 5mnary0T+",
          "  yy0saT Aam  me",
          "11ttn nu101dGd m",
          "SM(6 sM1EEn+ Aui",
          "(7lr10aTrtmd e (",
          "3ao5OGXsDa6eWIwqzfkv",
          "itiIt0ATVAEucjjYFEmE",
        ],
        name: 'Nick Ellis',
        email: 'ellis.nick96@gmail.com'
      },
      {
        role: 'overseer',
        photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mB6jiSigeuNue_MiQVx8Ax0kA5WHi-Dk5KjyAgv',
        uid: '7mJP4yQd2HfBTvl5fnyyCY3fjc03',
        name: 'Becc Baron',
        email: 'becc.baron@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'AXIfC9FkMFTV3ac1nOE1J7v5tZ02',
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GhmwdVkcOc8qjWY9xO-vAgE6Dc3u5gk1n0lnrgC=s96-c',       name: 'Mitchell Poloni',
        email: 'mitchell.poloni@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'B5Rqbz4oL8aksdn0Ce8mopL6Cop2',
        photoURL: 'https://lh3.googleusercontent.com/-NcULbAAvjrA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclphyDGH0OXJ4Udt8pyZrWJ9yDlEg/s96-c/photo.jpg',
        name: 'Tiarne Robinson',
        email: 'tiarne.robinson@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'CBz070nluQUXvIxMOKSqhazBgNg2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJypaAkXZ32pFmoNh_HyYWdXKExGYxRyOW_qGRhi=s96-c',        name: 'Genevieve Brook',
        email: 'genevieve.brook@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'CmA9RXvt59cd2qF2EuCU9pY2VV92',
        photoURL: null,
        name: 'Kieran Boyle',
        email: 'kieranboyle@yahoo.com',
        roleSortCriteria: []
      },
      {
        role: 'overseer',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJzWsiU49BCtDRsSDEVWk4V_dB56c48V4vjn1erq=s96-c',
        uid: 'Df6vSN1YXyTJWYfvYYatXIM0Mbf1',       name: 'Peter Brook',
        email: 'peter.brook@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'super editor',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJzBP_V-TH_x1biwt1l8TQJxyYiFnKijyMR9rdel=s96-c',  uid: 'ENSM8aAOFMPCBaRPyIdhWdUjgV92',      name: 'Petra Poloni',
        email: 'petra.poloni@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'FOSvxPgpmhhO7NlrIOppfkkKWA12',
        photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mB0oz-fPctKBpvFksSVqxQ7GwTfSinEYQlXqWrwAA',
        name: 'Paul Wang',
        email: 'paulwang528@gmail.com',
        roleSortCriteria: []
      },
      {
        role: 'overseer',
        uid: 'Hci0sJf21BMRJEXea1GTZM7xSEE2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwngcy64mCRWdxY9RdfmjPO9xQNwgV2DvXpoqGc=s96-c',        name: 'James Woollett',
        email: 'james.woollett@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'N8zrH6ac3YdJmTwnE6enTDCCuno1',
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GjAyLWNsKalzPgjyjR2bwFv2vw_fvg6x7C28ACREg=s96-c',     name: 'Jack Ryan',
        email: 'jackmryan2002@gmail.com',
        roleSortCriteria: []
      },
      {
        role: 'owner',
        uid: 'Nezxt06kWChpLKyHQ8Hdm42vIjE3',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJxNwbUFin5VXbXfwtudwecCWZhezUyPx8_a_t7R=s96-c',        roleSortCriteria: [
          "mH7ZmSClmCXE4DlXMNRD",
          "default",
          " a1i n 5mnary0T+",
          "  yy0saT Aam  me",
          "SM(6 sM1EEn+ Aui",
          "(7lr10aTrtmd e (",
          "11ttn nu101dGd m",
          "3ao5OGXsDa6eWIwqzfkv",
          "itiIt0ATVAEucjjYFEmE",
        ],
        name: 'Nick Ellis',
        email: 'nick.ellis@powertochange.org.au'
      },
      {
        role: 'editor',
        uid: 'QARxGdyJMUhtqUbEGglJ7E1QQPu2',
        photoURL: null,
        name: 'Rachel Augustine',
        email: 'rachelaugustine0303@gmail.com',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'RkuTR4hVNHYu16lQQjIfjLGWrD13',
        photoURL: 'https://lh6.googleusercontent.com/-VWRldw7XfPQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYx2EtjHsXt1ioW7xZ8y1IvcBLbQ/photo.jpg',
        roleSortCriteria: [
          "mH7ZmSClmCXE4DlXMNRD",
          "default",
          " a1i n 5mnary0T+",
          "  yy0saT Aam  me",
          "(7lr10aTrtmd e (",
          "11ttn nu101dGd m",
          "itiIt0ATVAEucjjYFEmE",
          "3ao5OGXsDa6eWIwqzfkv",
        ],
        name: 'Daniel Plumbe',
        email: 'dplumbe@gmail.com'
      },
      {
        role: 'editor',
        uid: 'RsL1i8GSAmNAOkJykeEIuCpyUU12',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJyvxZJajZTXsAzwBJ-ytzxBjpOuN38OR061xuTB=s96-c',        name: 'Yasmin Henry',
        email: 'yasmin.henry@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'overseer',
        uid: 'VYxrJJDnCkPxTT3tkl3eGsZfOTd2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwTKugCucEAdjfJb0-NXEcsdFVFRCikRbE5SS0y=s96-c',        name: 'Andrew Baron',
        email: 'andrew.baron@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJyzhjfvfG5vpN-r1OjCRNmbec4vhLNQt1gUdF8j=s96-c',
        uid: 'YvD2N3HrcKV4p1N7nGnLozmmeeH3',       name: 'Jessie Ellis',
        email: 'jessie.ellis@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        photoURL: 'https://lh3.googleusercontent.com/-L_Cw_zrWZWc/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcIA-z_iaeLEVvEmfPft2yb_H3Vkw/photo.jpg',
        uid: 'bYddKL7yrrW7YZ6TD2Ch3IrMEWB3',
        roleSortCriteria: [
          "mH7ZmSClmCXE4DlXMNRD",
          "default",
          " a1i n 5mnary0T+",
          "  yy0saT Aam  me",
          "(7lr10aTrtmd e (",
          "11ttn nu101dGd m",
          "3ao5OGXsDa6eWIwqzfkv",
          "itiIt0ATVAEucjjYFEmE",
        ],
        name: 'Joshua Grice',
        email: 'joshuagrice00@gmail.com'
      },
      {
        role: 'editor',
        uid: 'dEDDE5dIPHb0L77ykLvY9vRPnoJ3',
        photoURL: null,
        roleSortCriteria: [
          "default",
          " a1i n 5mnary0T+",
          "  yy0saT Aam  me",
          "(7lr10aTrtmd e (",
          "11ttn nu101dGd m",
          "3ao5OGXsDa6eWIwqzfkv",
          "itiIt0ATVAEucjjYFEmE",
          "mH7ZmSClmCXE4DlXMNRD",
        ],
        name: "Carla Coetzee",
        email: 'carla.h.coetzee@gmail.com'
      },
      {
        role: 'editor',
        uid: 'dzEm7aI9RjQQsFnstjZU6ZiaefS2',
        photoURL: null,
        name: 'Florence Leung',
        email: 'florence.leung@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        uid: 'nVqvwbR9dbMzdKXCskk8Fo3qzYw1',
        photoURL: 'https://lh4.googleusercontent.com/-_F11HYcrLek/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckB6S3fx99Q5txqlDuYqeCZelWE1A/photo.jpg',
        name: 'Nicholas Grice',
        email: 'nicholasgrice00@gmail.com',
        roleSortCriteria: []
      },
      {
        role: 'overseer',
        uid: 'pM6aIlE4hHYBStyJK7m1MDSVCdF2',
        photoURL: 'https://lh3.googleusercontent.com/a/AATXAJzhXkVXxXVGoVsteAJAHQ_KbUo9S5_sjOPtRz1d=s96-c',        name: 'Daniel Rudge',
        email: 'daniel.rudge@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        photoURL: 'https://lh4.googleusercontent.com/-kd2kA7xvgOU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnUxAFwz0tbe7lH-WTNGDwK33-wfQ/s96-c/photo.jpg',
        uid: 'sRWVjtWCMIVRyEqtVtXtPmr712r1',
        name: 'Sean Cosijn',
        email: 'seancosijn@gmail.com',
        roleSortCriteria: []
      },
      {
        role: 'overseer',
        photoURL: null,
        uid: 'ukcZVFWfg3frYwaxTE0GKAUfiAi2',
        name: 'Wei Lo',
        email: 'lowei@powertochange.org.au',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgLt2Epq7e1NoHfnMqZ24u7pdLp-hN5SJzapyav',
        uid: 'vbbjkWTI6Egr3wcuLXZR82ehhok2',
        name: 'Jonathan Ho',
        email: 'jho00@me.com',
        roleSortCriteria: []
      },
      {
        role: 'editor',
        photoURL: null,
        uid: 'zMr6FSRbIFUeU3JunAa3DOEjPmF3',
        name: 'Emma Adams',
        email: 'emmaadams01@outlook.com',
        roleSortCriteria: []
      }
    ]
    let colSnap = await MovDoc.collection('users').get()
    let docs = colSnap.docs
    expect(docs.length).toEqual(userRoles.length)
    for (let userRole of userRoles){
      let doc = docs.find((el, ind) => { return el.id === userRole.uid})
      // role defintion is defined
      expect(doc).toBeDefined()
      let data = doc.data()

      expect(data).toEqual(userRole)
    }
  })

  it('should not touch invites', async () => {
    const userRoles = [
      {
        email: 'allanli0138@gmail.com',
        "accepted": false,
          "email": "allanli0138@gmail.com",
          "fromEmail": "nick.ellis@powertochange.org.au",
          "fromName": "Nick Ellis",
          "movementId": "FTwJSGQTN5yRd3iN3DFr",
          "movementName": "UQ Local",
          "role": "editor",
          "sent": false,
          "timestamp": {
            "_nanoseconds": 340000000,
            "_seconds": 1635129279,
          },
      },
      {
        "accepted": false,
        "email": "oceankwok423@gmail.com",
        "fromEmail": "nick.ellis@powertochange.org.au",
        "fromName": "Nick Ellis",
        "movementId": "FTwJSGQTN5yRd3iN3DFr",
        "movementName": "UQ Local",
        "role": "editor",
        "sent": false,
        "timestamp": {
          "_nanoseconds": 368000000,
          "_seconds": 1635129279,
        },
      }
    ]
    let colSnap = await MovDoc.collection('invites').get()
    let docs = colSnap.docs
    expect(docs.length).toEqual(userRoles.length)
    for (let userRole of userRoles){
      let doc = docs.find((el, ind) => { return el.id === userRole.email})
      // role defintion is defined
      expect(doc).toBeDefined()
      let data = doc.data()

      expect(data).toEqual(userRole)
    }
  });

  it('should not touch requests', async () => {
    const userRoles = [{
      email: "ellis.nick96@gmail.com",
      name: "Nick Ellis",
      photoUrl: "https://lh3.googleusercontent.com/-W69WtXG1wL0/AAAAAAAAAAI/AAAAAAAAA5Q/hSepozSl8ew/photo.jpg",
      uid: "6aMqcBCqoFPeG9MOlYw6XZQKXrN2"
      }]
    let colSnap = await MovDoc.collection('requests').get()
    let docs = colSnap.docs
    expect(docs.length).toEqual(userRoles.length)
    for (let userRole of userRoles){
      let doc = docs.find((el, ind) => { return el.id === userRole.email})
      // role defintion is defined
      expect(doc).toBeDefined()
      let data = doc.data()

      expect(data).toEqual(userRole)
    }
  });

  it('should add role-definitions', async () => {
    const roleDefinitions = [
      {
        id: 'owner',
        label: "Owner",
        rules: {
          snapshots_view: true,
          snapshots_update: true,
          events_create: true,
          members_create: true,
          members_export: true,
          members_edit: true,
          members_delete: true,
          members_view: true,
          subTrees_add: true,
          subTrees_remove: true,
          movement_edit: true,
          movement_copy: true,
          movement_carbonCopy: true,
          movement_delete: true,
          trends_view: true,
          trends_movementGraphs_create: true,
          trends_movementGraphs_delete: true,
          trends_movementGraphs_view: true,
          access_view: true,
          access_users_revoke: true,
          access_users_invite: true,
          access_userRoles_create: true,
          access_userRoles_delete: true,
          access_userRoles_edit: true,
          trees_create: true,
          trees_export: true,
          trees_delete: true,
          trees_view: true,
          settings_view: true,
          settings_calc_view: true,
          settings_calc_create: true,
          settings_calc_edit: true,
          settings_calc_delete: true,
          settings_complex_view: true,
          settings_complex_create: true,
          settings_complex_delete: true,
          settings_complex_edit: true,
          settings_mods_view: true,
          settings_mods_create: true,
          settings_mods_delete: true,
          settings_mods_edit: true,
          settings_roles_view: true,
          settings_roles_create: true,
          settings_roles_delete: true,
          settings_roles_edit: true
        }
      },
      {
        id: 'superEditor',
        label: "Super Editor",
        rules: {
          snapshots_view: true,
          snapshots_update: true,
          events_create: true,
          members_create: true,
          members_export: true,
          members_edit: true,
          members_delete: true,
          members_view: true,
          subTrees_add: true,
          subTrees_remove: true,
          movement_edit: true,
          movement_copy: true,
          movement_carbonCopy: true,
          movement_delete: false,
          trends_view: true,
          trends_movementGraphs_create: true,
          trends_movementGraphs_delete: true,
          trends_movementGraphs_view: true,
          access_view: true,
          access_users_revoke: true,
          access_users_invite: true,
          access_userRoles_create: true,
          access_userRoles_delete: true,
          access_userRoles_edit: true,
          trees_create: true,
          trees_export: true,
          trees_delete: true,
          trees_view: true,
          settings_view: true,
          settings_calc_view: true,
          settings_calc_create: true,
          settings_calc_edit: true,
          settings_calc_delete: true,
          settings_complex_view: true,
          settings_complex_create: true,
          settings_complex_delete: true,
          settings_complex_edit: true,
          settings_mods_view: true,
          settings_mods_create: true,
          settings_mods_delete: true,
          settings_mods_edit: true,
          settings_roles_view: true,
          settings_roles_create: true,
          settings_roles_delete: true,
          settings_roles_edit: true
        }
      },
      {
        id: 'editor',
        label: "Editor",
        rules: {
          snapshots_view: true,
          snapshots_update: false,
          events_create: true,
          members_create: true,
          members_export: false,
          members_edit: true,
          members_delete: false,
          members_view: true,
          subTrees_add: true,
          subTrees_remove: true,
          movement_edit: true,
          movement_copy: true,
          movement_carbonCopy: false,
          movement_delete: false,
          trends_view: true,
          trends_movementGraphs_create: false,
          trends_movementGraphs_delete: false,
          trends_movementGraphs_view: true,
          access_view: true,
          access_users_revoke: false,
          access_users_invite: false,
          access_userRoles_create: false,
          access_userRoles_delete: false,
          access_userRoles_edit: false,
          trees_create: true,
          trees_export: false,
          trees_delete: false,
          trees_view: true,
          settings_view: true,
          settings_calc_view: true,
          settings_calc_create: false,
          settings_calc_edit: false,
          settings_calc_delete: false,
          settings_complex_view: true,
          settings_complex_create: false,
          settings_complex_delete: false,
          settings_complex_edit: false,
          settings_mods_view: true,
          settings_mods_create: false,
          settings_mods_delete: false,
          settings_mods_edit: false,
          settings_roles_view: true,
          settings_roles_create: false,
          settings_roles_delete: false,
          settings_roles_edit: false
        }
      },
      {
        id: 'viewer',
        label: "Viewer",
        rules: {
          snapshots_view: true,
          snapshots_update: false,
          events_create: false,
          members_create: false,
          members_export: false,
          members_edit: false,
          members_delete: false,
          members_view: true,
          subTrees_add: false,
          subTrees_remove: false,
          movement_edit: false,
          movement_copy: false,
          movement_carbonCopy: false,
          movement_delete: false,
          trends_view: true,
          trends_movementGraphs_create: false,
          trends_movementGraphs_delete: false,
          trends_movementGraphs_view: false,
          access_view: true,
          access_users_revoke: false,
          access_users_invite: false,
          access_userRoles_create: false,
          access_userRoles_delete: false,
          access_userRoles_edit: false,
          trees_create: false,
          trees_export: false,
          trees_delete: false,
          trees_view: true,
          settings_view: true,
          settings_calc_view: true,
          settings_calc_create: false,
          settings_calc_edit: false,
          settings_calc_delete: false,
          settings_complex_view: true,
          settings_complex_create: false,
          settings_complex_delete: false,
          settings_complex_edit: false,
          settings_mods_view: true,
          settings_mods_create: false,
          settings_mods_delete: false,
          settings_mods_edit: false,
          settings_roles_view: true,
          settings_roles_create: false,
          settings_roles_delete: false,
          settings_roles_edit: false
        }
      },
      {
        id: 'overseer',
        label: "Overseer",
        rules: {
          snapshots_view: true,
          snapshots_update: false,
          events_create: false,
          members_create: false,
          members_export: false,
          members_edit: false,
          members_delete: false,
          members_view: true,
          subTrees_add: false,
          subTrees_remove: false,
          movement_edit: false,
          movement_copy: false,
          movement_carbonCopy: false,
          movement_delete: false,
          trends_view: true,
          trends_movementGraphs_create: false,
          trends_movementGraphs_delete: false,
          trends_movementGraphs_view: false,
          access_view: true,
          access_users_revoke: false,
          access_users_invite: false,
          access_userRoles_create: false,
          access_userRoles_delete: false,
          access_userRoles_edit: false,
          trees_create: false,
          trees_export: false,
          trees_delete: false,
          trees_view: true,
          settings_view: true,
          settings_calc_view: true,
          settings_calc_create: false,
          settings_calc_edit: false,
          settings_calc_delete: false,
          settings_complex_view: true,
          settings_complex_create: false,
          settings_complex_delete: false,
          settings_complex_edit: false,
          settings_mods_view: true,
          settings_mods_create: false,
          settings_mods_delete: false,
          settings_mods_edit: false,
          settings_roles_view: true,
          settings_roles_create: false,
          settings_roles_delete: false,
          settings_roles_edit: false
        }
      }
    ]
    let colSnap = await MovDoc.collection('user-role-definitions').get()
    let docs = colSnap.docs
    expect(docs.length).toEqual(roleDefinitions.length)
    for (let roleDefinition of roleDefinitions){
      let doc = docs.find((el, ind) => { return el.id === roleDefinition.id})
      // role defintion is defined
      expect(doc).toBeDefined()
      let data = doc.data()

      expect(data).toEqual(roleDefinition)
    }
  })

  it('should update styles', async () => {
    const styles = [
      {
        icon: 'EC',
        label: 'Exploring Christianity',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#ff9c39',
          colorOverride: null
        },
        desc: 'A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)'
      },
      {
        label: 'Student Leader',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#31ccec',
          round: false,
          background: '#31ccec'
        },
        desc: 'An official student leader on campus'
      },
      {
        label: 'Non-Christian',
        type: 'role',
        target: 0,
        style: {
          color: '#ffffff',
          shape: 'round-diag',
          underline: false,
          outline: '#b82218',
          round: true,
          background: '#b82218'
        },
        desc: 'A Member who is not yet a Christian (must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-christian know that they are exploring Christianity within Power to Change?)'
      },
      {
        icon: '3',
        label: 'Year 3',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Third Year Student'
      },
      {
        icon: '5',
        label: 'Year 5',
        type: 'mod',
        target: 0,        
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: ' Fifth year student'
      },
      {
        label: 'New Christian through Movement',
        type: 'mod',
        target: 0,
        icon: '',
        style: {
          color: '#ff0000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: true
        },
        desc: 'A Member who became a Christian through this Movement at any point in time'
      },
      {
        label: 'Christian',
        type: 'role', 
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#d1cabc',
          round: false,
          background: '#d1cabc'
        },
        desc: 'A Member who is a christian (must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)'
      },
      {
        label: 'Associate / Volunteer',
        type: 'role',
        target: 0,
        style: {
          color: '#ffffff',
          shape: 'round-right',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#3076ba',
          round: false,
          background: '#3076ba',
          colorOverride: false
        },
        desc: 'This Member assists the Movement in an official capacity but is not part of the missionary or student leader teams'
      },
      {
        icon: '2',
        label: 'Year 2',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Second year student'
      },
      {
        
        label: '*Male',
        type: 'mod',
        target: 0,
        icon: '',
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member who is male'
      },
      {
        
        label: 'Summer Project',
        type: 'mod',
        target: 0,
        icon: '',
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Has attended a Summer Project in Australia\n'
      },
      {
        
        label: 'Alpha (Completed)',
        type: 'mod',
        target: 0,
        icon: '',
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#ff9c39',
          colorOverride: false
        },
        desc: 'A Non Christian who is coming to Alpha'
      },
      {
        
        label: 'Disciple',
        type: 'mod',
        target: 0,
        icon: '',
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: true,
          outline: '#ff8000',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member being discipled on campus'
      },
      {
        label: 'Lifetime Labourer',
        type: 'complex',
        target: 0,
        condition: {   class: 'expression',
          operator: 'AND',   elements: [
            {
              class: "condition",
              gen: "member",
              "id": "IHpI6i86UwHaBHKlDfsn",
              included: true
            },     {
              class: "expression",
              operator: "OR",
              elements: [
                {
                  class: "condition",
                  gen: "member",
                  "id": "11ttn nu101dGd m",
                  included: true
                },
                {
                  class:"condition",
                  gen:"member",
                  id:" a1i n 5mnary0T+",
                  included:true,
                }
              ]        },
            {
              gen: "member",
              "id": "n42a2Mrlu )thr0r",
              included: true,
              class: "condition",
            }
          ]
        },
        desc: 'Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the "5 Things" in place?'
      },
      {
        label: '5 Things (Completed)',
        type: 'mod',
        target: 0,
        icon: '',
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: "Has completed 'My 5 Things' or Equivalent"
      },
      {
        label: 'No Specified Gender',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
            "class": "condition",
            "gen": "member",
            "id": "rYMogPL8oQOx8bJdAMa2",
            "included": false,
          },
          {
            "class": "condition",
            "gen": "member",
            "id": "46akFzeUaeqBWC3IBXV2",
            "included": false,
          },
          {
            "class": "condition",
            "gen": "member",
            "id": "mH7ZmSClmCXE4DlXMNRD",
            "included": false,
          }], class: 'expression' },
        desc: 'A member without an assigned gender'
      },
      {
        icon: '1',
        label: 'Year 1',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'First year student'
      },
      {
        label: 'Involved Christian/Total',
        type: 'calc',
        target: 0,
        condition: { operator: 'multiply', elements: [
          {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "id": "uMzNgQ5eRzJe84aER4RN",
              },
              {
                "class": "condition",
                "id": "treeTotal",
              },
            ],
            "operator": "divide",
          },
          {
            "class": "number",
            "value": "100",
          },
          ], class: 'expression' },
        unit: '%',
        desc: '',
      },
      {
        label: 'Multiplier (Aspirational)',
        type: 'mod',
        target: 0,
        icon: '',
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member committed to finidng 2 Disciples and a CE'
      },
      {
         
        label: 'Remaining Fruit',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "0d yiM7aTa1aet0T",
              "included": true,
            },
          ], class: 'expression' },
        desc: 'Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.'
      },
      {
        icon: '7',
        label: 'Year 7',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Seventh year student'
      },
      {
        icon: '6',
        label: 'Year 6',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Sixth year student'
      },
      {
        icon: 'RO',
        label: 'Regular Outreach',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member who is intentionally sharing their faith regularly (at least once every two weeks)'        
      },
      {
        label: 'Remaining Fruit/Total',
        type: 'calc',
        target: 0,
        condition: { operator: 'multiply', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "id": "L7Ypv2NtQUSVhcJRQTgO",
                },
                {
                  "class": "condition",
                  "id": "treeTotal",
                },
              ],
              "operator": "divide",
            },
            {
              "class": "number",
              "value": "100",
            },
          ], class: 'expression' },
        unit: '%',
        desc: ''
      },
      {
        label: 'First Steps (Completed)',
        type: 'mod',
        target: 0,
         icon: '',
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member who has completed First Steps'
      },
      {
        label: 'Student Leaders/Total',
        type: 'calc',
        target: 0,
        condition: { operator: 'multiply', elements: [{
          "class": "expression",
          "elements": [
            {
              "class": "condition",
              "id": " a1i n 5mnary0T+",
            },
            {
              "class": "condition",
              "id": "treeTotal",
            },
          ],
          "operator": "divide",
        },
        {
          "class": "number",
          "value": "100",
        }], class: 'expression' },
        unit: '%',
        desc: ''
      },
      {
        icon: '',
        label: 'Prayer',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member involved in a prayer time with others from this Movement'
      },
      {
        label: 'Committed Followers/Total',
        type: 'calc',
        target: 0,
        unit: '%',
        condition: { operator: 'multiply', elements: [{
          "class": "expression",
          "elements": [
            {
              "class": "condition",
              "id": "qXEKtqJjrZB4KbZZcXtw",
            },
            {
              "class": "condition",
              "id": "treeTotal",
            },
          ],
          "operator": "divide",
        },
        {
          "class": "number",
          "value": "100",
        }], class: 'expression' },
        desc: ''
      },
      {
        label: 'Outreach/Disciples',
        type: 'calc',
        target: 0,
        condition: { operator: 'multiply', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "id": "hkPIB0YcW8UuFh5Seodp",
                },
                {
                  "class": "condition",
                  "id": ":0am 2101y1n )0t",
                },
              ],
              "operator": "divide",
            },
            {
              "class": "number",
              "value": "100",
            },], class: 'expression' },
        unit: '%',
        desc: 'Disciples doing regular outreach '
      },
      {
        label: 'No Year',
        type: 'complex',
        target: '2',
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "3ohW3FU65MTUnJuQHkvB",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "0 u5rSSaraMtTM61",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "t tEe475  iaa00 ",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "0aS0 altn5ndGS d",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "MrAa9r 99   irA ",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "MM raida3utaTd 1",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "KA7mWeXalOkMuY2pgXHR",
              "included": false,
            }], class: 'expression' },
        desc: "A member who doesn't have an assigned year"
      },
      {
        label: 'Multiplying Disciples - Send',
        type: 'complex',
        target: '20',
        condition: { operator: 'AND', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "member",
                  "id": "11ttn nu101dGd m",
                  "included": true,
                },
                {
                  "class": "condition",
                  "gen": "member",
                  "id": " a1i n 5mnary0T+",
                  "included": true,
                },
              ],
              "operator": "OR",
            },
            {
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "children",
                  "id": ":0am 2101y1n )0t",
                  "included": true,
                },
                {
                  "class": "expression",
                  "elements": [
                    {
                      "class": "condition",
                      "gen": "member",
                      "id": "RYvrItrcLBumN2l1B2ZB",
                      "included": true,
                    },
                    {
                      "class": "condition",
                      "gen": "children",
                      "id": " Tta1 a0(:)lSTa9",
                      "included": true,
                    },
                  ],
                  "operator": "OR",
                },
              ],
              "operator": "AND",
            },], class: 'expression' },
        desc: '"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.\n' +
          '\n' +
          'Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)"'
      },
      {
        label: 'Multiplier',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "default",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "children",
              "id": ":0am 2101y1n )0t",
              "included": true,
              "number": "2",
            },
            {
              "class": "condition",
              "gen": "children",
              "id": " Tta1 a0(:)lSTa9",
              "included": true,
            },], class: 'expression' },
        desc: 'A student with two disciples and a CE '
      },
      {
        label: 'Missionary',
        type: 'role',
        target: 0,
        style: {
          color: '#ffffff',
          shape: 'round-left',
          underline: false,
          outline: '#4c6a87',
          round: false,
          background: '#4c6a87'
        },
        desc: 'A vocational Member of the Movement'
      },
      {
        icon: 'INT',
        label: 'International Student',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'A Member who is enrolled as an international student'
      },
      {
        label: 'Completed Basic Follow Up',
        type: 'complex',
        target: 0,
        condition: { operator: 'OR', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "UDpXKKGAB0JpICs1Jfi5",
              "included": true,
            }], class: 'expression' },
        desc: 'Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. '
      },
      {
        label: 'Disciple doing outreach regularly',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": ":0am 2101y1n )0t",
              "included": true,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "RYvrItrcLBumN2l1B2ZB",
              "included": true,
            },], class: 'expression' },
        desc: 'A member who is discipled and also regularly sharing their faith'
      },
      {
        label: 'Non-Christian Connecting with a Student',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "parent",
                  "id": "11ttn nu101dGd m",
                  "included": true,
                },
                {
                  "class": "condition",
                  "gen": "parent",
                  "id": " a1i n 5mnary0T+",
                  "included": true,
                },
              ],
              "operator": "OR",
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "(7lr10aTrtmd e (",
              "included": true,
            }], class: 'expression' },
        desc: 'The number of non-christians connected to a student'
      },
      {
        icon: 'PR',
        label: 'On Prac',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member who is currently on prac'
      },
      {
        icon: '',
        label: 'Exploring Christianity (Completed)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.'
      },
      {
        label: '--System--',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A subsection of this Movement'
      },
      {
        icon: 'FY',
        label: 'Final Year',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'Is graduating within 12 months'
      },
      {
        icon: '',
        label: 'Global Missions',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Has attended a Global Missions project'
      },
      {
        icon: '',
        label: '5 Things (Current)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: "Is currently doing 'My 5 Things' or Equivalent"
      },
      {
        icon: '',
        label: 'Bridge',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member who is involved/connected to Local and ISM'
      },
      {
        label: 'Committed Followers - Train',
        type: 'complex',
        target: '40',
        condition: { operator: 'AND', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "member",
                  "id": " a1i n 5mnary0T+",
                  "included": true,
                },
                {
                  "class": "condition",
                  "gen": "member",
                  "id": "11ttn nu101dGd m",
                  "included": true,
                },
              ],
              "operator": "OR",
            },
            {
              "class": "condition",
              "gen": "member",
              "id": ":0am 2101y1n )0t",
              "included": true,
            },
            {
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "children",
                  "id": ":0am 2101y1n )0t",
                  "included": false,
                },
                {
                  "class": "condition",
                  "gen": "children",
                  "id": " Tta1 a0(:)lSTa9",
                  "included": false,
                },
              ],
              "operator": "OR",
            }], class: 'expression' },
        desc: '"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).\n' +
          '\n' +
          'Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students."'
      },
    {
        icon: 'NOC',
        label: 'Not on Campus',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'A Member who is not studying at this campus'
      },
      {
        icon: '',
        label: '*Female',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          shape: 'round',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          shapeOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member who is female'
      },
      {
        icon: '4',
        label: 'Year 4',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Fourth year student'
      },
      {
        label: 'Involved Students - Build',
        type: 'complex',
        target: 0,
        condition: {
          "class": "expression",
          "elements": [
            {
              "class": "condition",
              "gen": "member",
              "id": "11ttn nu101dGd m",
              "included": true,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "RYvrItrcLBumN2l1B2ZB",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "children",
              "id": ":0am 2101y1n )0t",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "children",
              "id": " Tta1 a0(:)lSTa9",
              "included": false,
            },
          ],
          "operator": "AND",
        },
        desc: '"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.\n' +
          '\n' +
          'Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change."'
      },
      {
        icon: '',
        label: 'Involved',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member who is regularly involved, at least 2 activities a week'
      },
      {
        label: 'Evangelistic Contact',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": " Tta1 a0(:)lSTa9",
              "included": true,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "(7lr10aTrtmd e (",
              "included": true,
            },], class: 'expression' },
        desc: 'Number of people you started meeting with regularly to share the gospel (count once from your second meeting).'
      },
      {
        label: 'Evangelistic Contacts/Total',
        type: 'calc',
        target: 0,
        condition: { operator: 'multiply', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "id": "uu56d6XxJqsWgFJJPr3A",
                },
                {
                  "class": "condition",
                  "id": "treeTotal",
                },
              ],
              "operator": "divide",
            },
            {
              "class": "number",
              "value": "100",
            }], class: 'expression' },
        unit: '%',
        desc: ''
      },
      {
        icon: 'FS',
        label: 'First Steps (Current)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A Member who is currently going through First Steps'
      }]
    let colSnap = await MovDoc.collection('styles').get()
    let docs = colSnap.docs
    expect(docs.length).toEqual(styles.length)
    for (let style of styles){
      let doc = docs.find((el, ind) => { return el.get('label') === style.label})
      expect(doc).toBeDefined()
      let data = doc.data()

      expect(data).toEqual(style)
    }
  })

  describe('Trees', () => {
    const treesToTest = {
      'main-tree': {
        doc: {
          id: "main-tree",
          label: "Main Tree"
        },
        parents: {
        "03OBFstGenJLSwkPyoIe": {
          "parent": "p4DWXe5G3efllrPi7SM2",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "RYvrItrcLBumN2l1B2ZB",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
            "KhRaG31GtlG5mpnThUdH",
            "3ohW3FU65MTUnJuQHkvB",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "0F7QAUqwwjR8WwfU6roJ": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "o86cGQi6TP7AWM4qpYSr",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "2oGzh8Nb5rCjF246qgWB": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
            "7RmRpoE0w86et5oFJV6Q",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "3VcOYykTqk3aueEM1qz4": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
          ],
        },
        "5HyKxGyIg9rVtled64g7": {
          "parent": "N3CcEWZsAHvOCC3Y0XrD",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
            " Tta1 a0(:)lSTa9",
          ],
        },
        "5LWB5cBbj9EIpd6bk2I3": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "5jajm7QQP6bExdVhhG8k": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "rYMogPL8oQOx8bJdAMa2",
            "j6Zq9tbZXweMbboALDs8",
            ":0am 2101y1n )0t",
            "xcCy4Blwgkd9WLuVErNF",
            "0 u5rSSaraMtTM61",
          ],
        },
        "6U8f3cPHbILYvrNrW3UV": {
          "parent": "p4DWXe5G3efllrPi7SM2",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "RYvrItrcLBumN2l1B2ZB",
            "46akFzeUaeqBWC3IBXV2",
            "3ohW3FU65MTUnJuQHkvB",
            ":0am 2101y1n )0t",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "7dkOAcvhXgbUlCsuXYLZ": {
          "parent": "j8uBHU5MCo6eaBUidhKA",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "RYvrItrcLBumN2l1B2ZB",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "8TSC0q4pjKZXj8Batzq0": {
          "parent": "KIysPYAG8YsT6dMYqhS6",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
            "xcCy4Blwgkd9WLuVErNF",
            "KA7mWeXalOkMuY2pgXHR",
            "RYvrItrcLBumN2l1B2ZB",
          ],
        },
        "8qCpKI0Tutff2OJrVvBx": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
          ],
        },
        "9QMzsDjII6aor6F4gRgx": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "AYrrEdMNFaOw0Cdb2TRf": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
          ],
        },
        "BDRF0vdLVKsTtfdOwGnL": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "CIo4dNwnNuslhMuPblY9": {
          "parent": "N3CcEWZsAHvOCC3Y0XrD",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "DLy4fRpkzW8IkP2JGn6i": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "DyFunsfjR9vg2TclhCNP": {
          "parent": "N3CcEWZsAHvOCC3Y0XrD",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "FClWLoiM7zyzV7RzwJr7": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "FKeSTfqt39M2Q0zkMie7": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "FRe93Gn4ICmPF8suHxsB": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
            "7RmRpoE0w86et5oFJV6Q",
            "KhRaG31GtlG5mpnThUdH",
          ],
        },
        "FuiywanMGBuUQgpSchxY": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
            "xcCy4Blwgkd9WLuVErNF",
            "0 u5rSSaraMtTM61",
          ],
        },
        "GKr2gWle6N4msCwBcPvV": {
          "parent": "N3CcEWZsAHvOCC3Y0XrD",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "H0EWkGM7CF7ZCAl3u6Wc": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "HaorE8zql5fNXzssp5Cu": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
            "UDpXKKGAB0JpICs1Jfi5",
            "j6Zq9tbZXweMbboALDs8",
          ],
        },
        "HayQhdlGsKxKbfPlo5ON": {
          "parent": "OxsxDa0Fwpo6Jm4L9G3U",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "0d yiM7aTa1aet0T",
            "rYMogPL8oQOx8bJdAMa2",
            "UDpXKKGAB0JpICs1Jfi5",
            ":0am 2101y1n )0t",
          ],
        },
        "Hp5MIwIkt14arBicSK27": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "IrJsboJQoqiGgb71EwXJ": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "KIysPYAG8YsT6dMYqhS6": {
          "parent": "yPQP77fEJfzPB7AvFkUO",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
            "7RmRpoE0w86et5oFJV6Q",
            "UDpXKKGAB0JpICs1Jfi5",
            "RYvrItrcLBumN2l1B2ZB",
          ],
        },
        "KyOhn6L12Nd1YlwAAtwF": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "LGhHDHpSP4H2LHF2C5RY": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "LvE0yC4ljZurVias8jex": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "N3CcEWZsAHvOCC3Y0XrD": {
          "parent": "aE7Mu556fCJIhvxJY00y",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "rYMogPL8oQOx8bJdAMa2",
            ":0am 2101y1n )0t",
            "3ohW3FU65MTUnJuQHkvB",
            "UDpXKKGAB0JpICs1Jfi5",
            "RYvrItrcLBumN2l1B2ZB",
          ],
        },
        "NGtvLRwCmSqu4p51wRR4": {
          "parent": "IrJsboJQoqiGgb71EwXJ",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
          ],
        },
        "O0WpvvNuAQ1EK4nQp6qq": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "0d yiM7aTa1aet0T",
            "j6Zq9tbZXweMbboALDs8",
          ],
        },
        "OD81zpaLxCyADdkyZ6Cj": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "46akFzeUaeqBWC3IBXV2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "OFm9vtWv54mDrkIZ5zMD": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "KA7mWeXalOkMuY2pgXHR",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "OUoFZow0aN1cq2ICip1G": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "el1rE8E rArnt0a1",
            "j6Zq9tbZXweMbboALDs8",
            "xcCy4Blwgkd9WLuVErNF",
            "0d yiM7aTa1aet0T",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
          ],
        },
        "OxsxDa0Fwpo6Jm4L9G3U": {
          "parent": "yPQP77fEJfzPB7AvFkUO",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "RYvrItrcLBumN2l1B2ZB",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "PtKGhRuTQIckzpB0a9Hx": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "mH7ZmSClmCXE4DlXMNRD",
          ],
        },
        "QLjMOU3G8Vi9aPLJGWnT": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
          ],
        },
        "RgcNYB5Y6tehuiPF3fiU": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "MM raida3utaTd 1",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "Rz0JcTPlcajfgO5UwKFL": {
          "parent": "DLy4fRpkzW8IkP2JGn6i",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
            ":0am 2101y1n )0t",
            "xcCy4Blwgkd9WLuVErNF",
          ],
        },
        "SisCsMdoKIAjnCX19y52": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "46akFzeUaeqBWC3IBXV2",
            "el1rE8E rArnt0a1",
          ],
        },
        "SvRZTpTmTOQ7NBP7ixJD": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "TYsR7mwU7C7XwOfzsIcZ": {
          "parent": "HaorE8zql5fNXzssp5Cu",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
            "MM raida3utaTd 1",
          ],
        },
        "Ufyr7Qb9hJqlsR6rykBP": {
          "parent": "03OBFstGenJLSwkPyoIe",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "RYvrItrcLBumN2l1B2ZB",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "YQo4XDW0bguEuYKyqxVL": {
          "parent": "m6mCdveLWNgJGyDF9Sjo",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "aE7Mu556fCJIhvxJY00y": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "b6htdXEpqVWVkVbPfqwj": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "c6dRupke4wlwBpyCyWOv": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
            "UDpXKKGAB0JpICs1Jfi5",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "clKfwO2Gln88sDOYGgeL": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "egWR7TXlgjZErk9aqvMP": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "KA7mWeXalOkMuY2pgXHR",
            "7RmRpoE0w86et5oFJV6Q",
          ],
        },
        "f3J1jw9TOZfMOFNLLIQK": {
          "parent": "Hp5MIwIkt14arBicSK27",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "flK72VhEp2aAgnA40uCy": {
          "parent": "j8uBHU5MCo6eaBUidhKA",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
            " Tta1 a0(:)lSTa9",
          ],
        },
        "hXjOUHeBH2Vukl857uVz": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "iALW2O72jJSCVfk1NSTJ": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "iUd8gP5R3xALE0aaCbxb": {
          "parent": "PtKGhRuTQIckzpB0a9Hx",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "0d yiM7aTa1aet0T",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "iagy3QI3gujOxnRcpo6H": {
          "parent": "yPQP77fEJfzPB7AvFkUO",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "j6TEsBzkZxvWOaVvLp41": {
          "parent": "8TSC0q4pjKZXj8Batzq0",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
            " Tta1 a0(:)lSTa9",
          ],
        },
        "j8uBHU5MCo6eaBUidhKA": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "RYvrItrcLBumN2l1B2ZB",
            "rYMogPL8oQOx8bJdAMa2",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "ketIhx0ruiO4RT7soEYD": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            "t tEe475  iaa00 ",
            "0d yiM7aTa1aet0T",
            ":0am 2101y1n )0t",
          ],
        },
        "lY8myi4q6iK5KJ4twseo": {
          "parent": "vj2kpzZI9sprpsAqR3ax",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "rYMogPL8oQOx8bJdAMa2",
            ":0am 2101y1n )0t",
          ],
        },
        "lnWb8l2hKNpy7rnPBRlX": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
            "oOvDZwfqXwDkTsEoWvBk",
          ],
        },
        "m118LJ1wLrEYHt8TSBoq": {
          "parent": "vj2kpzZI9sprpsAqR3ax",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "RYvrItrcLBumN2l1B2ZB",
          ],
        },
        "m6mCdveLWNgJGyDF9Sjo": {
          "parent": "aE7Mu556fCJIhvxJY00y",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
            ":0am 2101y1n )0t",
            "UDpXKKGAB0JpICs1Jfi5",
            "RYvrItrcLBumN2l1B2ZB",
          ],
        },
        "m7BhOkFAkPyfOXvSuYND": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "o4GPRVN5JlqsntU4ZEQs": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "j6Zq9tbZXweMbboALDs8",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
            "0d yiM7aTa1aet0T",
            "RYvrItrcLBumN2l1B2ZB",
          ],
        },
        "oJ3Twl5YTFghxMadZOja": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "p4DWXe5G3efllrPi7SM2": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "RYvrItrcLBumN2l1B2ZB",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "n42a2Mrlu )thr0r",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "qOba1QSzmOB2BHL8WqFD": {
          "parent": "j8uBHU5MCo6eaBUidhKA",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "el1rE8E rArnt0a1",
            "rYMogPL8oQOx8bJdAMa2",
            " Tta1 a0(:)lSTa9",
          ],
        },
        "qlahLMCw2qVxmA5o5gpR": {
          "parent": "N3CcEWZsAHvOCC3Y0XrD",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
            ":0am 2101y1n )0t",
            "xcCy4Blwgkd9WLuVErNF",
          ],
        },
        "rCf4xIzdFb6odSCI2QRO": {
          "parent": "OD81zpaLxCyADdkyZ6Cj",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "rVtq0wgniMj2TRLJ6jBN": {
          "parent": "6U8f3cPHbILYvrNrW3UV",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            "UDpXKKGAB0JpICs1Jfi5",
            "KA7mWeXalOkMuY2pgXHR",
            ":0am 2101y1n )0t",
          ],
        },
        "sL2bXbm2oeu3nrFkyTzj": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "RYvrItrcLBumN2l1B2ZB",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "n42a2Mrlu )thr0r",
            "7RmRpoE0w86et5oFJV6Q",
            "IHpI6i86UwHaBHKlDfsn",
            "KhRaG31GtlG5mpnThUdH",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "siuoK9YsLPm7iEopYACR": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "tAWgKRf9DSaQLAcTjQ3z": {
          "parent": "03OBFstGenJLSwkPyoIe",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "vj2kpzZI9sprpsAqR3ax": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
          ],
        },
        "w9aPvaYAoM8mdOHvxhNQ": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            ":0am 2101y1n )0t",
          ],
        },
        "wXFzr07Qu7ID9TuoMTeD": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "xUlTHb5PuuZjA9w3tEry": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            " Tta1 a0(:)lSTa9",
          ],
        },
        "yNCl3NiDFOkJvtrUh1ib": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "yPQP77fEJfzPB7AvFkUO": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "zbTCywlmeHOCBa8h7o6F": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            "RYvrItrcLBumN2l1B2ZB",
          ],
        },
      },
        stats: {
          " Tta1 a0(:)lSTa9": {
            "desc": "A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)",
            "id": " Tta1 a0(:)lSTa9",
            "label": "Exploring Christianity",
            "members": [
              "flK72VhEp2aAgnA40uCy",
              "j6TEsBzkZxvWOaVvLp41",
              "xUlTHb5PuuZjA9w3tEry",
              "qOba1QSzmOB2BHL8WqFD",
              "5HyKxGyIg9rVtled64g7",
            ],
            "target": 0,
            "total": 5,
            "unit": null,
          },
          " a1i n 5mnary0T+": {
            "desc": "An official student leader on campus",
            "id": " a1i n 5mnary0T+",
            "label": "Student Leader",
            "members": [
              "OD81zpaLxCyADdkyZ6Cj",
              "lY8myi4q6iK5KJ4twseo",
              "hXjOUHeBH2Vukl857uVz",
              "p4DWXe5G3efllrPi7SM2",
              "j8uBHU5MCo6eaBUidhKA",
              "KIysPYAG8YsT6dMYqhS6",
              "N3CcEWZsAHvOCC3Y0XrD",
              "RgcNYB5Y6tehuiPF3fiU",
              "iUd8gP5R3xALE0aaCbxb",
              "2oGzh8Nb5rCjF246qgWB",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 11,
            "unit": null,
          },
            "(7lr10aTrtmd e (": {
            "desc": "A Member who is not yet a Christian (must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-christian know that they are exploring Christianity within Power to Change?)",
            "id": "(7lr10aTrtmd e (",
            "label": "Non-Christian",
            "members": [
              "flK72VhEp2aAgnA40uCy",
              "m7BhOkFAkPyfOXvSuYND",
              "SvRZTpTmTOQ7NBP7ixJD",
              "FClWLoiM7zyzV7RzwJr7",
              "QLjMOU3G8Vi9aPLJGWnT",
              "CIo4dNwnNuslhMuPblY9",
              "AYrrEdMNFaOw0Cdb2TRf",
              "iALW2O72jJSCVfk1NSTJ",
              "tAWgKRf9DSaQLAcTjQ3z",
              "j6TEsBzkZxvWOaVvLp41",
              "YQo4XDW0bguEuYKyqxVL",
              "xUlTHb5PuuZjA9w3tEry",
              "TYsR7mwU7C7XwOfzsIcZ",
              "GKr2gWle6N4msCwBcPvV",
              "NGtvLRwCmSqu4p51wRR4",
              "rCf4xIzdFb6odSCI2QRO",
              "OFm9vtWv54mDrkIZ5zMD",
              "H0EWkGM7CF7ZCAl3u6Wc",
              "clKfwO2Gln88sDOYGgeL",
              "qOba1QSzmOB2BHL8WqFD",
              "5HyKxGyIg9rVtled64g7",
              "f3J1jw9TOZfMOFNLLIQK",
            ],
            "target": 0,
            "total": 22,
            "unit": null,
          },
          "0 u5rSSaraMtTM61": {
            "desc": "Third Year Student",
            "id": "0 u5rSSaraMtTM61",
            "label": "Year 3",
            "members": [
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "siuoK9YsLPm7iEopYACR",
              "p4DWXe5G3efllrPi7SM2",
              "FuiywanMGBuUQgpSchxY",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "O0WpvvNuAQ1EK4nQp6qq",
              "2oGzh8Nb5rCjF246qgWB",
              "HayQhdlGsKxKbfPlo5ON",
            ],
            "target": 0,
            "total": 10,
            "unit": null,
          },
          "0aS0 altn5ndGS d": {
            "desc": " Fifth year student",
            "id": "0aS0 altn5ndGS d",
            "label": "Year 5",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "0d yiM7aTa1aet0T": {
            "desc": "A Member who became a Christian through this Movement at any point in time",
            "id": "0d yiM7aTa1aet0T",
            "label": "New Christian through Movement",
            "members": [
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "o4GPRVN5JlqsntU4ZEQs",
              "ketIhx0ruiO4RT7soEYD",
              "O0WpvvNuAQ1EK4nQp6qq",
              "iUd8gP5R3xALE0aaCbxb",
              "HayQhdlGsKxKbfPlo5ON",
              "3VcOYykTqk3aueEM1qz4",
              "SisCsMdoKIAjnCX19y52",
            ],
            "target": 0,
            "total": 9,
            "unit": null,
          },
          "11ttn nu101dGd m": {
            "desc": "A Member who is a christian (must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)",
            "id": "11ttn nu101dGd m",
            "label": "Christian",
            "members": [
              "w9aPvaYAoM8mdOHvxhNQ",
              "9QMzsDjII6aor6F4gRgx",
              "Rz0JcTPlcajfgO5UwKFL",
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "5LWB5cBbj9EIpd6bk2I3",
              "siuoK9YsLPm7iEopYACR",
              "LvE0yC4ljZurVias8jex",
              "IrJsboJQoqiGgb71EwXJ",
              "DyFunsfjR9vg2TclhCNP",
              "FRe93Gn4ICmPF8suHxsB",
              "o4GPRVN5JlqsntU4ZEQs",
              "m118LJ1wLrEYHt8TSBoq",
              "KyOhn6L12Nd1YlwAAtwF",
              "HaorE8zql5fNXzssp5Cu",
              "FuiywanMGBuUQgpSchxY",
              "Ufyr7Qb9hJqlsR6rykBP",
              "LGhHDHpSP4H2LHF2C5RY",
              "FKeSTfqt39M2Q0zkMie7",
              "egWR7TXlgjZErk9aqvMP",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "wXFzr07Qu7ID9TuoMTeD",
              "7dkOAcvhXgbUlCsuXYLZ",
              "ketIhx0ruiO4RT7soEYD",
              "yNCl3NiDFOkJvtrUh1ib",
              "sL2bXbm2oeu3nrFkyTzj",
              "zbTCywlmeHOCBa8h7o6F",
              "O0WpvvNuAQ1EK4nQp6qq",
              "BDRF0vdLVKsTtfdOwGnL",
              "c6dRupke4wlwBpyCyWOv",
              "8TSC0q4pjKZXj8Batzq0",
              "03OBFstGenJLSwkPyoIe",
              "HayQhdlGsKxKbfPlo5ON",
              "m6mCdveLWNgJGyDF9Sjo",
              "8qCpKI0Tutff2OJrVvBx",
              "oJ3Twl5YTFghxMadZOja",
              "3VcOYykTqk3aueEM1qz4",
              "qlahLMCw2qVxmA5o5gpR",
              "iagy3QI3gujOxnRcpo6H",
              "SisCsMdoKIAjnCX19y52",
              "rVtq0wgniMj2TRLJ6jBN",
              "Hp5MIwIkt14arBicSK27",
            ],
            "target": 0,
            "total": 42,
            "unit": null,
          },
          "3ao5OGXsDa6eWIwqzfkv": {
            "desc": "This Member assists the Movement in an official capacity but is not part of the missionary or student leader teams",
            "id": "3ao5OGXsDa6eWIwqzfkv",
            "label": "Associate / Volunteer",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "3ohW3FU65MTUnJuQHkvB": {
            "desc": "Second year student",
            "id": "3ohW3FU65MTUnJuQHkvB",
            "label": "Year 2",
            "members": [
              "Rz0JcTPlcajfgO5UwKFL",
              "OD81zpaLxCyADdkyZ6Cj",
              "DyFunsfjR9vg2TclhCNP",
              "CIo4dNwnNuslhMuPblY9",
              "N3CcEWZsAHvOCC3Y0XrD",
              "GKr2gWle6N4msCwBcPvV",
              "iUd8gP5R3xALE0aaCbxb",
              "c6dRupke4wlwBpyCyWOv",
              "03OBFstGenJLSwkPyoIe",
              "rCf4xIzdFb6odSCI2QRO",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 11,
            "unit": null,
          },
          "46akFzeUaeqBWC3IBXV2": {
            "desc": "A Member who is male",
            "id": "46akFzeUaeqBWC3IBXV2",
            "label": "*Male",
            "members": [
              "m7BhOkFAkPyfOXvSuYND",
              "9QMzsDjII6aor6F4gRgx",
              "OD81zpaLxCyADdkyZ6Cj",
              "SvRZTpTmTOQ7NBP7ixJD",
              "FClWLoiM7zyzV7RzwJr7",
              "5LWB5cBbj9EIpd6bk2I3",
              "siuoK9YsLPm7iEopYACR",
              "IrJsboJQoqiGgb71EwXJ",
              "FRe93Gn4ICmPF8suHxsB",
              "hXjOUHeBH2Vukl857uVz",
              "p4DWXe5G3efllrPi7SM2",
              "b6htdXEpqVWVkVbPfqwj",
              "iALW2O72jJSCVfk1NSTJ",
              "tAWgKRf9DSaQLAcTjQ3z",
              "KyOhn6L12Nd1YlwAAtwF",
              "HaorE8zql5fNXzssp5Cu",
              "FuiywanMGBuUQgpSchxY",
              "Ufyr7Qb9hJqlsR6rykBP",
              "LGhHDHpSP4H2LHF2C5RY",
              "0F7QAUqwwjR8WwfU6roJ",
              "FKeSTfqt39M2Q0zkMie7",
              "wXFzr07Qu7ID9TuoMTeD",
              "ketIhx0ruiO4RT7soEYD",
              "yNCl3NiDFOkJvtrUh1ib",
              "sL2bXbm2oeu3nrFkyTzj",
              "RgcNYB5Y6tehuiPF3fiU",
              "TYsR7mwU7C7XwOfzsIcZ",
              "zbTCywlmeHOCBa8h7o6F",
              "O0WpvvNuAQ1EK4nQp6qq",
              "c6dRupke4wlwBpyCyWOv",
              "2oGzh8Nb5rCjF246qgWB",
              "03OBFstGenJLSwkPyoIe",
              "rCf4xIzdFb6odSCI2QRO",
              "OFm9vtWv54mDrkIZ5zMD",
              "8qCpKI0Tutff2OJrVvBx",
              "oJ3Twl5YTFghxMadZOja",
              "H0EWkGM7CF7ZCAl3u6Wc",
              "3VcOYykTqk3aueEM1qz4",
              "clKfwO2Gln88sDOYGgeL",
              "SisCsMdoKIAjnCX19y52",
              "rVtq0wgniMj2TRLJ6jBN",
              "Hp5MIwIkt14arBicSK27",
              "f3J1jw9TOZfMOFNLLIQK",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 44,
            "unit": null,
          },
          "7RmRpoE0w86et5oFJV6Q": {
            "desc": `Has attended a Summer Project in Australia
`,
            "id": "7RmRpoE0w86et5oFJV6Q",
            "label": "Summer Project",
            "members": [
              "FRe93Gn4ICmPF8suHxsB",
              "KIysPYAG8YsT6dMYqhS6",
              "egWR7TXlgjZErk9aqvMP",
              "sL2bXbm2oeu3nrFkyTzj",
              "2oGzh8Nb5rCjF246qgWB",
            ],
            "target": 0,
            "total": 5,
            "unit": null,
          },
          "99e2XOwRbZgb773aGLAg": {
            "desc": "A Non Christian who is coming to Alpha",
            "id": "99e2XOwRbZgb773aGLAg",
            "label": "Alpha (Completed)",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          ":0am 2101y1n )0t": {
            "desc": "A Member being discipled on campus",
            "id": ":0am 2101y1n )0t",
            "label": "Disciple",
            "members": [
              "w9aPvaYAoM8mdOHvxhNQ",
              "Rz0JcTPlcajfgO5UwKFL",
              "lY8myi4q6iK5KJ4twseo",
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "5LWB5cBbj9EIpd6bk2I3",
              "siuoK9YsLPm7iEopYACR",
              "FRe93Gn4ICmPF8suHxsB",
              "o4GPRVN5JlqsntU4ZEQs",
              "p4DWXe5G3efllrPi7SM2",
              "HaorE8zql5fNXzssp5Cu",
              "FuiywanMGBuUQgpSchxY",
              "j8uBHU5MCo6eaBUidhKA",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "ketIhx0ruiO4RT7soEYD",
              "N3CcEWZsAHvOCC3Y0XrD",
              "sL2bXbm2oeu3nrFkyTzj",
              "RgcNYB5Y6tehuiPF3fiU",
              "O0WpvvNuAQ1EK4nQp6qq",
              "c6dRupke4wlwBpyCyWOv",
              "2oGzh8Nb5rCjF246qgWB",
              "8TSC0q4pjKZXj8Batzq0",
              "03OBFstGenJLSwkPyoIe",
              "HayQhdlGsKxKbfPlo5ON",
              "m6mCdveLWNgJGyDF9Sjo",
              "8qCpKI0Tutff2OJrVvBx",
              "3VcOYykTqk3aueEM1qz4",
              "qlahLMCw2qVxmA5o5gpR",
              "rVtq0wgniMj2TRLJ6jBN",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 31,
            "unit": null,
          },
          "G8SRxWpXvfz5aIk9OdgP": {
            "desc": "Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the \"5 Things\" in place?",
            "id": "G8SRxWpXvfz5aIk9OdgP",
            "label": "Lifetime Labourer",
            "members": [
              "sL2bXbm2oeu3nrFkyTzj",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "IHpI6i86UwHaBHKlDfsn": {
            "desc": "Has completed 'My 5 Things' or Equivalent",
            "id": "IHpI6i86UwHaBHKlDfsn",
            "label": "5 Things (Completed)",
            "members": [
              "sL2bXbm2oeu3nrFkyTzj",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "JQtDoHf85B3HCPtyxQvG": {
            "desc": "A member without an assigned gender",
            "id": "JQtDoHf85B3HCPtyxQvG",
            "label": "No Specified Gender",
            "members": [
              "vj2kpzZI9sprpsAqR3ax",
              "QLjMOU3G8Vi9aPLJGWnT",
              "AYrrEdMNFaOw0Cdb2TRf",
              "egWR7TXlgjZErk9aqvMP",
              "xUlTHb5PuuZjA9w3tEry",
              "BDRF0vdLVKsTtfdOwGnL",
              "iUd8gP5R3xALE0aaCbxb",
              "NGtvLRwCmSqu4p51wRR4",
            ],
            "target": 0,
            "total": 8,
            "unit": null,
          },
          "KA7mWeXalOkMuY2pgXHR": {
            "desc": "First year student",
            "id": "KA7mWeXalOkMuY2pgXHR",
            "label": "Year 1",
            "members": [
              "LvE0yC4ljZurVias8jex",
              "tAWgKRf9DSaQLAcTjQ3z",
              "egWR7TXlgjZErk9aqvMP",
              "7dkOAcvhXgbUlCsuXYLZ",
              "8TSC0q4pjKZXj8Batzq0",
              "OFm9vtWv54mDrkIZ5zMD",
              "m6mCdveLWNgJGyDF9Sjo",
              "qlahLMCw2qVxmA5o5gpR",
              "iagy3QI3gujOxnRcpo6H",
              "rVtq0wgniMj2TRLJ6jBN",
            ],
            "target": 0,
            "total": 10,
            "unit": null,
          },
          "KgXPVZZsfjmAgXpzkEhM": {
            "desc": "",
            "id": "KgXPVZZsfjmAgXpzkEhM",
            "label": "Involved Christian/Total",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": "%",
          },
          "KhRaG31GtlG5mpnThUdH": {
            "desc": "A member committed to finidng 2 Disciples and a CE",
            "id": "KhRaG31GtlG5mpnThUdH",
            "label": "Multiplier (Aspirational)",
            "members": [
              "FRe93Gn4ICmPF8suHxsB",
              "sL2bXbm2oeu3nrFkyTzj",
              "03OBFstGenJLSwkPyoIe",
            ],
            "target": 0,
            "total": 3,
            "unit": null,
          },
          "L7Ypv2NtQUSVhcJRQTgO": {
            "desc": "Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.",
            "label": "Remaining Fruit",
            "members": [
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "o4GPRVN5JlqsntU4ZEQs",
              "ketIhx0ruiO4RT7soEYD",
              "O0WpvvNuAQ1EK4nQp6qq",
              "iUd8gP5R3xALE0aaCbxb",
              "HayQhdlGsKxKbfPlo5ON",
              "3VcOYykTqk3aueEM1qz4",
              "SisCsMdoKIAjnCX19y52",
            ],
            "target": 0,
            "total": 9,
            "unit": null,
            id: "L7Ypv2NtQUSVhcJRQTgO"
          },
          "MM raida3utaTd 1": {
            "desc": "Seventh year student",
            "id": "MM raida3utaTd 1",
            "label": "Year 7",
            "members": [
              "RgcNYB5Y6tehuiPF3fiU",
              "TYsR7mwU7C7XwOfzsIcZ",
            ],
            "target": 0,
            "total": 2,
            "unit": null,
          },
          "MrAa9r 99   irA ": {
            "desc": "Sixth year student",
            "id": "MrAa9r 99   irA ",
            "label": "Year 6",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "RYvrItrcLBumN2l1B2ZB": {
            "desc": "A Member who is intentionally sharing their faith regularly (at least once every two weeks)",   
            "id": "RYvrItrcLBumN2l1B2ZB",
            "label": "Regular Outreach",
            "members": [
              "o4GPRVN5JlqsntU4ZEQs",
              "p4DWXe5G3efllrPi7SM2",
              "m118LJ1wLrEYHt8TSBoq",
              "Ufyr7Qb9hJqlsR6rykBP",
              "j8uBHU5MCo6eaBUidhKA",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "7dkOAcvhXgbUlCsuXYLZ",
              "N3CcEWZsAHvOCC3Y0XrD",
              "sL2bXbm2oeu3nrFkyTzj",
              "zbTCywlmeHOCBa8h7o6F",
              "8TSC0q4pjKZXj8Batzq0",
              "03OBFstGenJLSwkPyoIe",
              "m6mCdveLWNgJGyDF9Sjo",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 15,
            "unit": null,
          },
          "TOyelCxBBIRZQ3KzG0ux": {
            "desc": "",
            "id": "TOyelCxBBIRZQ3KzG0ux",
            "label": "Remaining Fruit/Total",
            "members": [],
            "target": 0,
            "total": 10.843373493975903,
            "unit": "%",
          },
          "UDpXKKGAB0JpICs1Jfi5": {
            "desc": "A Member who has completed First Steps",
            "id": "UDpXKKGAB0JpICs1Jfi5",
            "label": "First Steps (Completed)",
            "members": [
              "siuoK9YsLPm7iEopYACR",
              "p4DWXe5G3efllrPi7SM2",
              "HaorE8zql5fNXzssp5Cu",
              "j8uBHU5MCo6eaBUidhKA",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "N3CcEWZsAHvOCC3Y0XrD",
              "sL2bXbm2oeu3nrFkyTzj",
              "c6dRupke4wlwBpyCyWOv",
              "2oGzh8Nb5rCjF246qgWB",
              "03OBFstGenJLSwkPyoIe",
              "HayQhdlGsKxKbfPlo5ON",
              "m6mCdveLWNgJGyDF9Sjo",
              "rVtq0wgniMj2TRLJ6jBN",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 15,
            "unit": null,
          },
          "UOdVYd9CBSFvDcs24PRJ": {
            "desc": "",
            "id": "UOdVYd9CBSFvDcs24PRJ",
            "label": "Student Leaders/Total",
            "members": [],
            "target": 0,
            "total": 13.253012048192772,
            "unit": "%",
          },
          "XPHi4AUKU8bks8dS6VAo": {
            "desc": "A Member involved in a prayer time with others from this Movement",
            "id": "XPHi4AUKU8bks8dS6VAo",
            "label": "Prayer",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "YUJsTf91aoNqHPcNKtxj": {
            "desc": "",
            "id": "YUJsTf91aoNqHPcNKtxj",
            "label": "Committed Followers/Total",
            "members": [],
            "target": 0,
            "total": 7.228915662650602,
            "unit": "%",
          },
          "ZsiPiQwDCXfNuvgOE6RV": {
            "desc": "Disciples doing regular outreach ",
            "id": "ZsiPiQwDCXfNuvgOE6RV",
            "label": "Outreach/Disciples",
            "members": [],
            "target": 0,
            "total": 35.483870967741936,
            "unit": "%",
          },
          "cl07bEKOEIZ8ytnfEf69": {
            "desc": "A member who doesn't have an assigned year",
            "id": "cl07bEKOEIZ8ytnfEf69",
            "label": "No Year",
            "members": [
              "flK72VhEp2aAgnA40uCy",
              "w9aPvaYAoM8mdOHvxhNQ",
              "m7BhOkFAkPyfOXvSuYND",
              "9QMzsDjII6aor6F4gRgx",
              "DLy4fRpkzW8IkP2JGn6i",
              "lY8myi4q6iK5KJ4twseo",
              "SvRZTpTmTOQ7NBP7ixJD",
              "FClWLoiM7zyzV7RzwJr7",
              "5LWB5cBbj9EIpd6bk2I3",
              "vj2kpzZI9sprpsAqR3ax",
              "PtKGhRuTQIckzpB0a9Hx",
              "IrJsboJQoqiGgb71EwXJ",
              "QLjMOU3G8Vi9aPLJGWnT",
              "o4GPRVN5JlqsntU4ZEQs",
              "AYrrEdMNFaOw0Cdb2TRf",
              "hXjOUHeBH2Vukl857uVz",
              "b6htdXEpqVWVkVbPfqwj",
              "iALW2O72jJSCVfk1NSTJ",
              "m118LJ1wLrEYHt8TSBoq",
              "KyOhn6L12Nd1YlwAAtwF",
              "HaorE8zql5fNXzssp5Cu",
              "j6TEsBzkZxvWOaVvLp41",
              "Ufyr7Qb9hJqlsR6rykBP",
              "YQo4XDW0bguEuYKyqxVL",
              "LGhHDHpSP4H2LHF2C5RY",
              "0F7QAUqwwjR8WwfU6roJ",
              "FKeSTfqt39M2Q0zkMie7",
              "wXFzr07Qu7ID9TuoMTeD",
              "yNCl3NiDFOkJvtrUh1ib",
              "lnWb8l2hKNpy7rnPBRlX",
              "aE7Mu556fCJIhvxJY00y",
              "xUlTHb5PuuZjA9w3tEry",
              "zbTCywlmeHOCBa8h7o6F",
              "BDRF0vdLVKsTtfdOwGnL",
              "yPQP77fEJfzPB7AvFkUO",
              "NGtvLRwCmSqu4p51wRR4",
              "8qCpKI0Tutff2OJrVvBx",
              "oJ3Twl5YTFghxMadZOja",
              "H0EWkGM7CF7ZCAl3u6Wc",
              "3VcOYykTqk3aueEM1qz4",
              "clKfwO2Gln88sDOYGgeL",
              "qOba1QSzmOB2BHL8WqFD",
              "SisCsMdoKIAjnCX19y52",
              "Hp5MIwIkt14arBicSK27",
              "5HyKxGyIg9rVtled64g7",
              "f3J1jw9TOZfMOFNLLIQK",
            ],
            "target": "2",
            "total": 46,
            "unit": null,
          },
          "covZf40QClhwnN7xPRl2": {
            "desc": `\"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.

Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)\"`,
            "id": "covZf40QClhwnN7xPRl2",
            "label": "Multiplying Disciples - Send",
            "members": [
              "p4DWXe5G3efllrPi7SM2",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "N3CcEWZsAHvOCC3Y0XrD",
              "sL2bXbm2oeu3nrFkyTzj",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": "20",
            "total": 6,
            "unit": null,
          },
          "dMs0DJmz3n53DNvKFYux": {
            "desc": "A student with two disciples and a CE ",
            "id": "dMs0DJmz3n53DNvKFYux",
            "label": "Multiplier",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "default": {
            "desc": "A vocational Member of the Movement",
            "id": "default",
            "label": "Missionary",
            "members": [
              "DLy4fRpkzW8IkP2JGn6i",
              "vj2kpzZI9sprpsAqR3ax",
              "b6htdXEpqVWVkVbPfqwj",
              "0F7QAUqwwjR8WwfU6roJ",
              "lnWb8l2hKNpy7rnPBRlX",
              "aE7Mu556fCJIhvxJY00y",
              "yPQP77fEJfzPB7AvFkUO",
            ],
            "target": 0,
            "total": 7,
            "unit": null,
          },
          "el1rE8E rArnt0a1": {
            "desc": "A Member who is enrolled as an international student",
            "id": "el1rE8E rArnt0a1",
            "label": "International Student",
            "members": [
              "OUoFZow0aN1cq2ICip1G",
              "qOba1QSzmOB2BHL8WqFD",
              "SisCsMdoKIAjnCX19y52",
            ],
            "target": 0,
            "total": 3,
            "unit": null,
          },
          "gUPCtQRdfYjdrotyfUht": {
            "desc": "Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. ",
            "id": "gUPCtQRdfYjdrotyfUht",
            "label": "Completed Basic Follow Up",
            "members": [
              "siuoK9YsLPm7iEopYACR",
              "p4DWXe5G3efllrPi7SM2",
              "HaorE8zql5fNXzssp5Cu",
              "j8uBHU5MCo6eaBUidhKA",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "N3CcEWZsAHvOCC3Y0XrD",
              "sL2bXbm2oeu3nrFkyTzj",
              "c6dRupke4wlwBpyCyWOv",
              "2oGzh8Nb5rCjF246qgWB",
              "03OBFstGenJLSwkPyoIe",
              "HayQhdlGsKxKbfPlo5ON",
              "m6mCdveLWNgJGyDF9Sjo",
              "rVtq0wgniMj2TRLJ6jBN",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 15,
            "unit": null,
          },
          "hkPIB0YcW8UuFh5Seodp": {
            "desc": "A member who is discipled and also regularly sharing their faith",
            "id": "hkPIB0YcW8UuFh5Seodp",
            "label": "Disciple doing outreach regularly",
            "members": [
              "o4GPRVN5JlqsntU4ZEQs",
              "p4DWXe5G3efllrPi7SM2",
              "j8uBHU5MCo6eaBUidhKA",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "N3CcEWZsAHvOCC3Y0XrD",
              "sL2bXbm2oeu3nrFkyTzj",
              "8TSC0q4pjKZXj8Batzq0",
              "03OBFstGenJLSwkPyoIe",
              "m6mCdveLWNgJGyDF9Sjo",
              "6U8f3cPHbILYvrNrW3UV",
            ],
            "target": 0,
            "total": 11,
            "unit": null,
          },
          "hogn1UUCuMhDOCtwvkAk": {
            "desc": "The number of non-christians connected to a student",
            "id": "hogn1UUCuMhDOCtwvkAk",
            "label": "Non-Christian Connecting with a Student",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "iF7g2h2sXmYM7i7FaYxk": {
            "desc": "A Member who is currently on prac",
            "id": "iF7g2h2sXmYM7i7FaYxk",
            "label": "On Prac",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "j6Zq9tbZXweMbboALDs8": {
            "desc": "Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.",
            "id": "j6Zq9tbZXweMbboALDs8",
            "label": "Exploring Christianity (Completed)",
            "members": [
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "o4GPRVN5JlqsntU4ZEQs",
              "HaorE8zql5fNXzssp5Cu",
              "O0WpvvNuAQ1EK4nQp6qq",
            ],
            "target": 0,
            "total": 5,
            "unit": null,
          },
          "mH7ZmSClmCXE4DlXMNRD": {
            "desc": "A subsection of this Movement",
            "id": "mH7ZmSClmCXE4DlXMNRD",
            "label": "--System--",
            "members": [
              "PtKGhRuTQIckzpB0a9Hx",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "n42a2Mrlu )thr0r": {
            "desc": "Is graduating within 12 months",
            "id": "n42a2Mrlu )thr0r",
            "label": "Final Year",
            "members": [
              "p4DWXe5G3efllrPi7SM2",
              "sL2bXbm2oeu3nrFkyTzj",
            ],
            "target": 0,
            "total": 2,
            "unit": null,
          },
          "o86cGQi6TP7AWM4qpYSr": {
            "desc": "Has attended a Global Missions project",
            "id": "o86cGQi6TP7AWM4qpYSr",
            "label": "Global Missions",
            "members": [
              "0F7QAUqwwjR8WwfU6roJ",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "oDXJHWBEdnwNOx6oR0sc": {
            "desc": "Is currently doing 'My 5 Things' or Equivalent",
            "id": "oDXJHWBEdnwNOx6oR0sc",
            "label": "5 Things (Current)",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "oOvDZwfqXwDkTsEoWvBk": {
            "desc": "A Member who is involved/connected to Local and ISM",
            "id": "oOvDZwfqXwDkTsEoWvBk",
            "label": "Bridge",
            "members": [
              "lnWb8l2hKNpy7rnPBRlX",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "qXEKtqJjrZB4KbZZcXtw": {
            "desc": `\"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).

Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students.\"`,
            "id": "qXEKtqJjrZB4KbZZcXtw",
            "label": "Committed Followers - Train",
            "members": [
              "FRe93Gn4ICmPF8suHxsB",
              "j8uBHU5MCo6eaBUidhKA",
              "N3CcEWZsAHvOCC3Y0XrD",
              "sL2bXbm2oeu3nrFkyTzj",
              "RgcNYB5Y6tehuiPF3fiU",
              "2oGzh8Nb5rCjF246qgWB",
            ],
            "target": "40",
            "total": 6,
            "unit": null,
          },
          "rTrr2d 3ed+1i3aa": {
            "desc": "A Member who is not studying at this campus",
            "id": "rTrr2d 3ed+1i3aa",
            "label": "Not on Campus",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "rYMogPL8oQOx8bJdAMa2": {
            "desc": "A Member who is female",
            "id": "rYMogPL8oQOx8bJdAMa2",
            "label": "*Female",
            "members": [
              "flK72VhEp2aAgnA40uCy",
              "w9aPvaYAoM8mdOHvxhNQ",
              "Rz0JcTPlcajfgO5UwKFL",
              "DLy4fRpkzW8IkP2JGn6i",
              "lY8myi4q6iK5KJ4twseo",
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "LvE0yC4ljZurVias8jex",
              "DyFunsfjR9vg2TclhCNP",
              "o4GPRVN5JlqsntU4ZEQs",
              "CIo4dNwnNuslhMuPblY9",
              "m118LJ1wLrEYHt8TSBoq",
              "j6TEsBzkZxvWOaVvLp41",
              "j8uBHU5MCo6eaBUidhKA",
              "YQo4XDW0bguEuYKyqxVL",
              "KIysPYAG8YsT6dMYqhS6",
              "OxsxDa0Fwpo6Jm4L9G3U",
              "7dkOAcvhXgbUlCsuXYLZ",
              "lnWb8l2hKNpy7rnPBRlX",
              "N3CcEWZsAHvOCC3Y0XrD",
              "aE7Mu556fCJIhvxJY00y",
              "GKr2gWle6N4msCwBcPvV",
              "yPQP77fEJfzPB7AvFkUO",
              "8TSC0q4pjKZXj8Batzq0",
              "HayQhdlGsKxKbfPlo5ON",
              "m6mCdveLWNgJGyDF9Sjo",
              "qOba1QSzmOB2BHL8WqFD",
              "qlahLMCw2qVxmA5o5gpR",
              "iagy3QI3gujOxnRcpo6H",
              "5HyKxGyIg9rVtled64g7",
            ],
            "target": 0,
            "total": 30,
            "unit": null,
          },
          "t tEe475  iaa00 ": {
            "desc": "Fourth year student",
            "id": "t tEe475  iaa00 ",
            "label": "Year 4",
            "members": [
              "FRe93Gn4ICmPF8suHxsB",
              "j8uBHU5MCo6eaBUidhKA",
              "ketIhx0ruiO4RT7soEYD",
              "sL2bXbm2oeu3nrFkyTzj",
            ],
            "target": 0,
            "total": 4,
            "unit": null,
          },
          "treeTotal": {
            "desc": "Number of members on the Tree",
            "id": "treeTotal",
            "label": "Total on Tree",
            "total": 83,
          },
          "uMzNgQ5eRzJe84aER4RN": {
            "desc": `\"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.

Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change.\"`,
            "id": "uMzNgQ5eRzJe84aER4RN",
            "label": "Involved Students - Build",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "uccncwo7eGV0atXPCFW9": {
            "desc": "A member who is regularly involved, at least 2 activities a week",
            "id": "uccncwo7eGV0atXPCFW9",
            "label": "Involved",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "uu56d6XxJqsWgFJJPr3A": {
            "desc": "Number of people you started meeting with regularly to share the gospel (count once from your second meeting).",
            "id": "uu56d6XxJqsWgFJJPr3A",
            "label": "Evangelistic Contact",
            "members": [
              "flK72VhEp2aAgnA40uCy",
              "j6TEsBzkZxvWOaVvLp41",
              "xUlTHb5PuuZjA9w3tEry",
              "qOba1QSzmOB2BHL8WqFD",
              "5HyKxGyIg9rVtled64g7",
            ],
            "target": 0,
            "total": 5,
            "unit": null,
          },
          "wA08VoUz4sIPERRSyujq": {
            "desc": "",
            "id": "wA08VoUz4sIPERRSyujq",
            "label": "Evangelistic Contacts/Total",
            "members": [],
            "target": 0,
            "total": 6.024096385542169,
            "unit": "%",
          },
          "xcCy4Blwgkd9WLuVErNF": {
            "desc": "A Member who is currently going through First Steps",
            "id": "xcCy4Blwgkd9WLuVErNF",
            "label": "First Steps (Current)",
            "members": [
              "Rz0JcTPlcajfgO5UwKFL",
              "5jajm7QQP6bExdVhhG8k",
              "OUoFZow0aN1cq2ICip1G",
              "FuiywanMGBuUQgpSchxY",
              "8TSC0q4pjKZXj8Batzq0",
              "qlahLMCw2qVxmA5o5gpR",
            ],
            "target": 0,
            "total": 6,
            "unit": null,
          },
      },
        tree: {
        "tree": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "id": "5LWB5cBbj9EIpd6bk2I3",
                    "key": "FRe93Gn4ICmPF8suHxsB-5LWB5cBbj9EIpd6bk2I3",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "FKeSTfqt39M2Q0zkMie7",
                    "key": "FRe93Gn4ICmPF8suHxsB-FKeSTfqt39M2Q0zkMie7",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "H0EWkGM7CF7ZCAl3u6Wc",
                    "key": "FRe93Gn4ICmPF8suHxsB-H0EWkGM7CF7ZCAl3u6Wc",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "O0WpvvNuAQ1EK4nQp6qq",
                    "key": "FRe93Gn4ICmPF8suHxsB-O0WpvvNuAQ1EK4nQp6qq",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "SisCsMdoKIAjnCX19y52",
                    "key": "FRe93Gn4ICmPF8suHxsB-SisCsMdoKIAjnCX19y52",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "oJ3Twl5YTFghxMadZOja",
                    "key": "FRe93Gn4ICmPF8suHxsB-oJ3Twl5YTFghxMadZOja",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "wXFzr07Qu7ID9TuoMTeD",
                    "key": "FRe93Gn4ICmPF8suHxsB-wXFzr07Qu7ID9TuoMTeD",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                ],
                "id": "FRe93Gn4ICmPF8suHxsB",
                "key": "0F7QAUqwwjR8WwfU6roJ-FRe93Gn4ICmPF8suHxsB",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "3VcOYykTqk3aueEM1qz4",
                    "key": "RgcNYB5Y6tehuiPF3fiU-3VcOYykTqk3aueEM1qz4",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "TYsR7mwU7C7XwOfzsIcZ",
                        "key": "HaorE8zql5fNXzssp5Cu-TYsR7mwU7C7XwOfzsIcZ",
                        "parent": "HaorE8zql5fNXzssp5Cu",
                        "type": "normal",
                      },
                    ],
                    "id": "HaorE8zql5fNXzssp5Cu",
                    "key": "RgcNYB5Y6tehuiPF3fiU-HaorE8zql5fNXzssp5Cu",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "LGhHDHpSP4H2LHF2C5RY",
                    "key": "RgcNYB5Y6tehuiPF3fiU-LGhHDHpSP4H2LHF2C5RY",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "iALW2O72jJSCVfk1NSTJ",
                    "key": "RgcNYB5Y6tehuiPF3fiU-iALW2O72jJSCVfk1NSTJ",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "yNCl3NiDFOkJvtrUh1ib",
                    "key": "RgcNYB5Y6tehuiPF3fiU-yNCl3NiDFOkJvtrUh1ib",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                ],
                "id": "RgcNYB5Y6tehuiPF3fiU",
                "key": "0F7QAUqwwjR8WwfU6roJ-RgcNYB5Y6tehuiPF3fiU",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "c6dRupke4wlwBpyCyWOv",
                "key": "0F7QAUqwwjR8WwfU6roJ-c6dRupke4wlwBpyCyWOv",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
            ],
            "id": "0F7QAUqwwjR8WwfU6roJ",
            "key": "root-0F7QAUqwwjR8WwfU6roJ",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "Rz0JcTPlcajfgO5UwKFL",
                "key": "DLy4fRpkzW8IkP2JGn6i-Rz0JcTPlcajfgO5UwKFL",
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "type": "normal",
              },
            ],
            "id": "DLy4fRpkzW8IkP2JGn6i",
            "key": "root-DLy4fRpkzW8IkP2JGn6i",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "9QMzsDjII6aor6F4gRgx",
                "key": "PtKGhRuTQIckzpB0a9Hx-9QMzsDjII6aor6F4gRgx",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "AYrrEdMNFaOw0Cdb2TRf",
                "key": "PtKGhRuTQIckzpB0a9Hx-AYrrEdMNFaOw0Cdb2TRf",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "BDRF0vdLVKsTtfdOwGnL",
                "key": "PtKGhRuTQIckzpB0a9Hx-BDRF0vdLVKsTtfdOwGnL",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "f3J1jw9TOZfMOFNLLIQK",
                    "key": "Hp5MIwIkt14arBicSK27-f3J1jw9TOZfMOFNLLIQK",
                    "parent": "Hp5MIwIkt14arBicSK27",
                    "type": "normal",
                  },
                ],
                "id": "Hp5MIwIkt14arBicSK27",
                "key": "PtKGhRuTQIckzpB0a9Hx-Hp5MIwIkt14arBicSK27",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "NGtvLRwCmSqu4p51wRR4",
                    "key": "IrJsboJQoqiGgb71EwXJ-NGtvLRwCmSqu4p51wRR4",
                    "parent": "IrJsboJQoqiGgb71EwXJ",
                    "type": "normal",
                  },
                ],
                "id": "IrJsboJQoqiGgb71EwXJ",
                "key": "PtKGhRuTQIckzpB0a9Hx-IrJsboJQoqiGgb71EwXJ",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "LvE0yC4ljZurVias8jex",
                "key": "PtKGhRuTQIckzpB0a9Hx-LvE0yC4ljZurVias8jex",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "rCf4xIzdFb6odSCI2QRO",
                    "key": "OD81zpaLxCyADdkyZ6Cj-rCf4xIzdFb6odSCI2QRO",
                    "parent": "OD81zpaLxCyADdkyZ6Cj",
                    "type": "normal",
                  },
                ],
                "id": "OD81zpaLxCyADdkyZ6Cj",
                "key": "PtKGhRuTQIckzpB0a9Hx-OD81zpaLxCyADdkyZ6Cj",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "QLjMOU3G8Vi9aPLJGWnT",
                "key": "PtKGhRuTQIckzpB0a9Hx-QLjMOU3G8Vi9aPLJGWnT",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "egWR7TXlgjZErk9aqvMP",
                "key": "PtKGhRuTQIckzpB0a9Hx-egWR7TXlgjZErk9aqvMP",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "hXjOUHeBH2Vukl857uVz",
                "key": "PtKGhRuTQIckzpB0a9Hx-hXjOUHeBH2Vukl857uVz",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "iUd8gP5R3xALE0aaCbxb",
                "key": "PtKGhRuTQIckzpB0a9Hx-iUd8gP5R3xALE0aaCbxb",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
            ],
            "id": "PtKGhRuTQIckzpB0a9Hx",
            "key": "root-PtKGhRuTQIckzpB0a9Hx",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "id": "5HyKxGyIg9rVtled64g7",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-5HyKxGyIg9rVtled64g7",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "CIo4dNwnNuslhMuPblY9",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-CIo4dNwnNuslhMuPblY9",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "DyFunsfjR9vg2TclhCNP",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-DyFunsfjR9vg2TclhCNP",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "GKr2gWle6N4msCwBcPvV",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-GKr2gWle6N4msCwBcPvV",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "qlahLMCw2qVxmA5o5gpR",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-qlahLMCw2qVxmA5o5gpR",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                ],
                "id": "N3CcEWZsAHvOCC3Y0XrD",
                "key": "aE7Mu556fCJIhvxJY00y-N3CcEWZsAHvOCC3Y0XrD",
                "parent": "aE7Mu556fCJIhvxJY00y",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "YQo4XDW0bguEuYKyqxVL",
                    "key": "m6mCdveLWNgJGyDF9Sjo-YQo4XDW0bguEuYKyqxVL",
                    "parent": "m6mCdveLWNgJGyDF9Sjo",
                    "type": "normal",
                  },
                ],
                "id": "m6mCdveLWNgJGyDF9Sjo",
                "key": "aE7Mu556fCJIhvxJY00y-m6mCdveLWNgJGyDF9Sjo",
                "parent": "aE7Mu556fCJIhvxJY00y",
                "type": "normal",
              },
            ],
            "id": "aE7Mu556fCJIhvxJY00y",
            "key": "root-aE7Mu556fCJIhvxJY00y",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "Ufyr7Qb9hJqlsR6rykBP",
                        "key": "03OBFstGenJLSwkPyoIe-Ufyr7Qb9hJqlsR6rykBP",
                        "parent": "03OBFstGenJLSwkPyoIe",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "tAWgKRf9DSaQLAcTjQ3z",
                        "key": "03OBFstGenJLSwkPyoIe-tAWgKRf9DSaQLAcTjQ3z",
                        "parent": "03OBFstGenJLSwkPyoIe",
                        "type": "normal",
                      },
                    ],
                    "id": "03OBFstGenJLSwkPyoIe",
                    "key": "p4DWXe5G3efllrPi7SM2-03OBFstGenJLSwkPyoIe",
                    "parent": "p4DWXe5G3efllrPi7SM2",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "rVtq0wgniMj2TRLJ6jBN",
                        "key": "6U8f3cPHbILYvrNrW3UV-rVtq0wgniMj2TRLJ6jBN",
                        "parent": "6U8f3cPHbILYvrNrW3UV",
                        "type": "normal",
                      },
                    ],
                    "id": "6U8f3cPHbILYvrNrW3UV",
                    "key": "p4DWXe5G3efllrPi7SM2-6U8f3cPHbILYvrNrW3UV",
                    "parent": "p4DWXe5G3efllrPi7SM2",
                    "type": "normal",
                  },
                ],
                "id": "p4DWXe5G3efllrPi7SM2",
                "key": "b6htdXEpqVWVkVbPfqwj-p4DWXe5G3efllrPi7SM2",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "8qCpKI0Tutff2OJrVvBx",
                        "key": "2oGzh8Nb5rCjF246qgWB-8qCpKI0Tutff2OJrVvBx",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "FClWLoiM7zyzV7RzwJr7",
                        "key": "2oGzh8Nb5rCjF246qgWB-FClWLoiM7zyzV7RzwJr7",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "FuiywanMGBuUQgpSchxY",
                        "key": "2oGzh8Nb5rCjF246qgWB-FuiywanMGBuUQgpSchxY",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "KyOhn6L12Nd1YlwAAtwF",
                        "key": "2oGzh8Nb5rCjF246qgWB-KyOhn6L12Nd1YlwAAtwF",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "SvRZTpTmTOQ7NBP7ixJD",
                        "key": "2oGzh8Nb5rCjF246qgWB-SvRZTpTmTOQ7NBP7ixJD",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "ketIhx0ruiO4RT7soEYD",
                        "key": "2oGzh8Nb5rCjF246qgWB-ketIhx0ruiO4RT7soEYD",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                    ],
                    "id": "2oGzh8Nb5rCjF246qgWB",
                    "key": "sL2bXbm2oeu3nrFkyTzj-2oGzh8Nb5rCjF246qgWB",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "OFm9vtWv54mDrkIZ5zMD",
                    "key": "sL2bXbm2oeu3nrFkyTzj-OFm9vtWv54mDrkIZ5zMD",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "clKfwO2Gln88sDOYGgeL",
                    "key": "sL2bXbm2oeu3nrFkyTzj-clKfwO2Gln88sDOYGgeL",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "m7BhOkFAkPyfOXvSuYND",
                    "key": "sL2bXbm2oeu3nrFkyTzj-m7BhOkFAkPyfOXvSuYND",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "siuoK9YsLPm7iEopYACR",
                    "key": "sL2bXbm2oeu3nrFkyTzj-siuoK9YsLPm7iEopYACR",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "zbTCywlmeHOCBa8h7o6F",
                    "key": "sL2bXbm2oeu3nrFkyTzj-zbTCywlmeHOCBa8h7o6F",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                ],
                "id": "sL2bXbm2oeu3nrFkyTzj",
                "key": "b6htdXEpqVWVkVbPfqwj-sL2bXbm2oeu3nrFkyTzj",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "xUlTHb5PuuZjA9w3tEry",
                "key": "b6htdXEpqVWVkVbPfqwj-xUlTHb5PuuZjA9w3tEry",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
            ],
            "id": "b6htdXEpqVWVkVbPfqwj",
            "key": "root-b6htdXEpqVWVkVbPfqwj",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "5jajm7QQP6bExdVhhG8k",
                "key": "lnWb8l2hKNpy7rnPBRlX-5jajm7QQP6bExdVhhG8k",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "OUoFZow0aN1cq2ICip1G",
                "key": "lnWb8l2hKNpy7rnPBRlX-OUoFZow0aN1cq2ICip1G",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "7dkOAcvhXgbUlCsuXYLZ",
                    "key": "j8uBHU5MCo6eaBUidhKA-7dkOAcvhXgbUlCsuXYLZ",
                    "parent": "j8uBHU5MCo6eaBUidhKA",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "flK72VhEp2aAgnA40uCy",
                    "key": "j8uBHU5MCo6eaBUidhKA-flK72VhEp2aAgnA40uCy",
                    "parent": "j8uBHU5MCo6eaBUidhKA",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "qOba1QSzmOB2BHL8WqFD",
                    "key": "j8uBHU5MCo6eaBUidhKA-qOba1QSzmOB2BHL8WqFD",
                    "parent": "j8uBHU5MCo6eaBUidhKA",
                    "type": "normal",
                  },
                ],
                "id": "j8uBHU5MCo6eaBUidhKA",
                "key": "lnWb8l2hKNpy7rnPBRlX-j8uBHU5MCo6eaBUidhKA",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "o4GPRVN5JlqsntU4ZEQs",
                "key": "lnWb8l2hKNpy7rnPBRlX-o4GPRVN5JlqsntU4ZEQs",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "w9aPvaYAoM8mdOHvxhNQ",
                "key": "lnWb8l2hKNpy7rnPBRlX-w9aPvaYAoM8mdOHvxhNQ",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
            ],
            "id": "lnWb8l2hKNpy7rnPBRlX",
            "key": "root-lnWb8l2hKNpy7rnPBRlX",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "lY8myi4q6iK5KJ4twseo",
                "key": "vj2kpzZI9sprpsAqR3ax-lY8myi4q6iK5KJ4twseo",
                "parent": "vj2kpzZI9sprpsAqR3ax",
                "type": "normal",
              },
              {
                "children": [],
                "id": "m118LJ1wLrEYHt8TSBoq",
                "key": "vj2kpzZI9sprpsAqR3ax-m118LJ1wLrEYHt8TSBoq",
                "parent": "vj2kpzZI9sprpsAqR3ax",
                "type": "normal",
              },
            ],
            "id": "vj2kpzZI9sprpsAqR3ax",
            "key": "root-vj2kpzZI9sprpsAqR3ax",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "j6TEsBzkZxvWOaVvLp41",
                        "key": "8TSC0q4pjKZXj8Batzq0-j6TEsBzkZxvWOaVvLp41",
                        "parent": "8TSC0q4pjKZXj8Batzq0",
                        "type": "normal",
                      },
                    ],
                    "id": "8TSC0q4pjKZXj8Batzq0",
                    "key": "KIysPYAG8YsT6dMYqhS6-8TSC0q4pjKZXj8Batzq0",
                    "parent": "KIysPYAG8YsT6dMYqhS6",
                    "type": "normal",
                  },
                ],
                "id": "KIysPYAG8YsT6dMYqhS6",
                "key": "yPQP77fEJfzPB7AvFkUO-KIysPYAG8YsT6dMYqhS6",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "HayQhdlGsKxKbfPlo5ON",
                    "key": "OxsxDa0Fwpo6Jm4L9G3U-HayQhdlGsKxKbfPlo5ON",
                    "parent": "OxsxDa0Fwpo6Jm4L9G3U",
                    "type": "normal",
                  },
                ],
                "id": "OxsxDa0Fwpo6Jm4L9G3U",
                "key": "yPQP77fEJfzPB7AvFkUO-OxsxDa0Fwpo6Jm4L9G3U",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
              {
                "children": [],
                "id": "iagy3QI3gujOxnRcpo6H",
                "key": "yPQP77fEJfzPB7AvFkUO-iagy3QI3gujOxnRcpo6H",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
            ],
            "id": "yPQP77fEJfzPB7AvFkUO",
            "key": "root-yPQP77fEJfzPB7AvFkUO",
            "parent": "root",
            "type": "normal",
          },
        ],
      }
      },
      'noParents': {
        doc: {
          id: "noParents",
          label: "No Parents"
        },
        parents: {"1675Xwq0bFBMZO0XmvsP": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "1Otp49vJ6Krcyvwcn4Mb": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "mH7ZmSClmCXE4DlXMNRD",
      ],
    },
    "2e1etGimRhzJdEDLqHYm": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0 u5rSSaraMtTM61",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "41g0Esm7MYlYVjWummPM": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "46akFzeUaeqBWC3IBXV2",
        "UDpXKKGAB0JpICs1Jfi5",
        "t tEe475  iaa00 ",
      ],
    },
    "5SMB4YnkuYLSRpv3Vb7K": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "711TRvfJpvVwFjL6Dnti": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "3ohW3FU65MTUnJuQHkvB",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "8ZSvPVPsvyc7K0vdk2ez": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0 u5rSSaraMtTM61",
        "rYMogPL8oQOx8bJdAMa2",
        "UDpXKKGAB0JpICs1Jfi5",
      ],
    },
    "9BX1jaJYTqzAeFloX4bI": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0d yiM7aTa1aet0T",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "C1nQX607TTJiHSaJQdSF": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "MrAa9r 99   irA ",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "CHtIeJThnGhzAeWWks5g": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "3ohW3FU65MTUnJuQHkvB",
      ],
    },
    "DdFgHnVDTtKLjbdOeEyR": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "KA7mWeXalOkMuY2pgXHR",
      ],
    },
    "EARQFdxmZsJgVhFUh4qn": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "KA7mWeXalOkMuY2pgXHR",
      ],
    },
    "FnPh5VIW2GgaJKiZjUQ8": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0d yiM7aTa1aet0T",
        "0 u5rSSaraMtTM61",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "H52Kf6Alu5knusGxEGrB": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "el1rE8E rArnt0a1",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "JNgyOyrypDRS7XlDoLvO": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "3ohW3FU65MTUnJuQHkvB",
      ],
    },
    "N0bpRvG0h1vu7Wk7lrbN": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "3ohW3FU65MTUnJuQHkvB",
        "UDpXKKGAB0JpICs1Jfi5",
      ],
    },
    "OEdGg5FL2Oq0IlcfQue8": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "OPFH9KNwqXeYRvopnoFM": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "t tEe475  iaa00 ",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "QXgeY465UVsKnfdwFW48": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "QeIm063qu8xHAgcvK34c": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "KA7mWeXalOkMuY2pgXHR",
      ],
    },
    "SA4jQtdFuI0srEDYDa3o": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "UtOHfX9BDZhmhUAYjrM2": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "0 u5rSSaraMtTM61",
      ],
    },
    "VmtdU8nxHjWZduJEhlXm": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "VqNOBhniLhWQN397vZFp": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "Vx9Ls5n10O2NX3RhmB4M": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "KA7mWeXalOkMuY2pgXHR",
      ],
    },
    "WZ1GggK61NUYI2BebS36": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0 u5rSSaraMtTM61",
        "rYMogPL8oQOx8bJdAMa2",
        "UDpXKKGAB0JpICs1Jfi5",
      ],
    },
    "YrZB0KJL94BSnecnK6t4": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0 u5rSSaraMtTM61",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "ae8cnpOcO5ONsTaQqj9l": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "KA7mWeXalOkMuY2pgXHR",
      ],
    },
    "bprNzBn8L1OQeudiGfPg": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0 u5rSSaraMtTM61",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "dV1qaOGk3FnzZFNUw1oZ": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0 u5rSSaraMtTM61",
        "0d yiM7aTa1aet0T",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "der2XOL3Gdqua6LyH1xj": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "dgYClNToNO7TjQKgEipH": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "rYMogPL8oQOx8bJdAMa2",
        "t tEe475  iaa00 ",
      ],
    },
    "fdvFS9D1VJ2cDGgD3nSX": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "fnbxJCK4oF9458qiVtIx": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "0 u5rSSaraMtTM61",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "iKkzRo4LNx8fZS9LpdFJ": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "3ohW3FU65MTUnJuQHkvB",
        "rYMogPL8oQOx8bJdAMa2",
        "j6Zq9tbZXweMbboALDs8",
        "0d yiM7aTa1aet0T",
        "UDpXKKGAB0JpICs1Jfi5",
      ],
    },
    "kl4RSMlI2LqxV2KePQQI": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "3ohW3FU65MTUnJuQHkvB",
        " Tta1 a0(:)lSTa9",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "nCiB1F8JDdudJO6Xyivy": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "3ohW3FU65MTUnJuQHkvB",
      ],
    },
    "o5V7o5UtDsH6QJE09QMN": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "rYMogPL8oQOx8bJdAMa2",
        "KA7mWeXalOkMuY2pgXHR",
      ],
    },
    "pHTIyu3nx6MPhmF7AgXc": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "pj0ivaS4d6JrHgtSVIke": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "t tEe475  iaa00 ",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "qe4D4hHsAVrKVv8iLCE2": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "rTrr2d 3ed+1i3aa",
      ],
    },
    "s9GBQtmBPI4mL6VYlPmM": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "KA7mWeXalOkMuY2pgXHR",
      ],
    },
    "sCk0ORSlIKlI4TEMoj6L": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        " Tta1 a0(:)lSTa9",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "siH75ijS6P0c3E6DRe4d": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },
    "tT0IRk2dmBdLQyeMBKfB": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "(7lr10aTrtmd e (",
        "46akFzeUaeqBWC3IBXV2",
      ],
    },
    "v11qo1Q8Zy1NB34uvxmP": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
        "3ohW3FU65MTUnJuQHkvB",
        "rTrr2d 3ed+1i3aa",
      ],
    },
    "v5XZdAcEsZDKSTfC2LgH": {
      parent: 'root',
      "shadow": null,
      "styles": [
        "11ttn nu101dGd m",
        "rYMogPL8oQOx8bJdAMa2",
      ],
    },},
        stats: {
          " Tta1 a0(:)lSTa9": {
            "desc": "A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)",
            "id": " Tta1 a0(:)lSTa9",
            "label": "Exploring Christianity",
            "members": [
              "sCk0ORSlIKlI4TEMoj6L",
              "kl4RSMlI2LqxV2KePQQI",
            ],
            "target": 0,
            "total": 2,
            "unit": null,
          },
          " a1i n 5mnary0T+": {
            "desc": "An official student leader on campus",
            "id": " a1i n 5mnary0T+",
            "label": "Student Leader",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "(7lr10aTrtmd e (": {
            "desc": "A Member who is not yet a Christian (must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-christian know that they are exploring Christianity within Power to Change?)",
            "id": "(7lr10aTrtmd e (",
            "label": "Non-Christian",
            "members": [
              "tT0IRk2dmBdLQyeMBKfB",
              "C1nQX607TTJiHSaJQdSF",
              "dgYClNToNO7TjQKgEipH",
              "OEdGg5FL2Oq0IlcfQue8",
              "711TRvfJpvVwFjL6Dnti",
              "o5V7o5UtDsH6QJE09QMN",
              "H52Kf6Alu5knusGxEGrB",
              "der2XOL3Gdqua6LyH1xj",
              "sCk0ORSlIKlI4TEMoj6L",
              "kl4RSMlI2LqxV2KePQQI",
            ],
            "target": 0,
            "total": 10,
            "unit": null,
          },
          "0 u5rSSaraMtTM61": {
            "desc": "Third Year Student",
            "id": "0 u5rSSaraMtTM61",
            "label": "Year 3",
            "members": [
              "UtOHfX9BDZhmhUAYjrM2",
              "fnbxJCK4oF9458qiVtIx",
              "YrZB0KJL94BSnecnK6t4",
              "dV1qaOGk3FnzZFNUw1oZ",
              "FnPh5VIW2GgaJKiZjUQ8",
              "WZ1GggK61NUYI2BebS36",
              "8ZSvPVPsvyc7K0vdk2ez",
              "2e1etGimRhzJdEDLqHYm",
              "bprNzBn8L1OQeudiGfPg",
            ],
            "target": 0,
            "total": 9,
            "unit": null,
          },
          "0aS0 altn5ndGS d": {
            "desc": " Fifth year student",
            "id": "0aS0 altn5ndGS d",
            "label": "Year 5",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "0d yiM7aTa1aet0T": {
            "desc": "A Member who became a Christian through this Movement at any point in time",
            "id": "0d yiM7aTa1aet0T",
            "label": "New Christian through Movement",
            "members": [
              "iKkzRo4LNx8fZS9LpdFJ",
              "dV1qaOGk3FnzZFNUw1oZ",
              "FnPh5VIW2GgaJKiZjUQ8",
              "9BX1jaJYTqzAeFloX4bI",
            ],
            "target": 0,
            "total": 4,
            "unit": null,
          },
          "11ttn nu101dGd m": {
            "desc": "A Member who is a christian (must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)",
            "id": "11ttn nu101dGd m",
            "label": "Christian",
            "members": [
              "v5XZdAcEsZDKSTfC2LgH",
              "UtOHfX9BDZhmhUAYjrM2",
              "iKkzRo4LNx8fZS9LpdFJ",
              "VqNOBhniLhWQN397vZFp",
              "JNgyOyrypDRS7XlDoLvO",
              "fnbxJCK4oF9458qiVtIx",
              "pj0ivaS4d6JrHgtSVIke",
              "EARQFdxmZsJgVhFUh4qn",
              "VmtdU8nxHjWZduJEhlXm",
              "ae8cnpOcO5ONsTaQqj9l",
              "nCiB1F8JDdudJO6Xyivy",
              "qe4D4hHsAVrKVv8iLCE2",
              "SA4jQtdFuI0srEDYDa3o",
              "YrZB0KJL94BSnecnK6t4",
              "1675Xwq0bFBMZO0XmvsP",
              "dV1qaOGk3FnzZFNUw1oZ",
              "v11qo1Q8Zy1NB34uvxmP",
              "Vx9Ls5n10O2NX3RhmB4M",
              "CHtIeJThnGhzAeWWks5g",
              "FnPh5VIW2GgaJKiZjUQ8",
              "WZ1GggK61NUYI2BebS36",
              "8ZSvPVPsvyc7K0vdk2ez",
              "41g0Esm7MYlYVjWummPM",
              "fdvFS9D1VJ2cDGgD3nSX",
              "N0bpRvG0h1vu7Wk7lrbN",
              "siH75ijS6P0c3E6DRe4d",
              "QXgeY465UVsKnfdwFW48",
              "2e1etGimRhzJdEDLqHYm",
              "s9GBQtmBPI4mL6VYlPmM",
              "pHTIyu3nx6MPhmF7AgXc",
              "OPFH9KNwqXeYRvopnoFM",
              "9BX1jaJYTqzAeFloX4bI",
              "DdFgHnVDTtKLjbdOeEyR",
              "IEIWmAwKUWYqIqSZyHaE",
              "5SMB4YnkuYLSRpv3Vb7K",
              "QeIm063qu8xHAgcvK34c",
              "bprNzBn8L1OQeudiGfPg",
            ],
            "target": 0,
            "total": 37,
            "unit": null,
          },
          "3ao5OGXsDa6eWIwqzfkv": {
            "desc": "This Member assists the Movement in an official capacity but is not part of the missionary or student leader teams",
            "id": "3ao5OGXsDa6eWIwqzfkv",
            "label": "Associate / Volunteer",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "3ohW3FU65MTUnJuQHkvB": {
            "desc": "Second year student",
            "id": "3ohW3FU65MTUnJuQHkvB",
            "label": "Year 2",
            "members": [
              "iKkzRo4LNx8fZS9LpdFJ",
              "JNgyOyrypDRS7XlDoLvO",
              "nCiB1F8JDdudJO6Xyivy",
              "v11qo1Q8Zy1NB34uvxmP",
              "CHtIeJThnGhzAeWWks5g",
              "711TRvfJpvVwFjL6Dnti",
              "N0bpRvG0h1vu7Wk7lrbN",
              "kl4RSMlI2LqxV2KePQQI",
            ],
            "target": 0,
            "total": 8,
            "unit": null,
          },
          "46akFzeUaeqBWC3IBXV2": {
            "desc": "A Member who is male",
            "id": "46akFzeUaeqBWC3IBXV2",
            "label": "*Male",
            "members": [
              "tT0IRk2dmBdLQyeMBKfB",
              "pj0ivaS4d6JrHgtSVIke",
              "VmtdU8nxHjWZduJEhlXm",
              "1675Xwq0bFBMZO0XmvsP",
              "711TRvfJpvVwFjL6Dnti",
              "41g0Esm7MYlYVjWummPM",
              "OPFH9KNwqXeYRvopnoFM",
              "9BX1jaJYTqzAeFloX4bI",
              "bprNzBn8L1OQeudiGfPg",
            ],
            "target": 0,
            "total": 9,
            "unit": null,
          },
          "7RmRpoE0w86et5oFJV6Q": {
            "desc": `Has attended a Summer Project in Australia
`,
            "id": "7RmRpoE0w86et5oFJV6Q",
            "label": "Summer Project",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "99e2XOwRbZgb773aGLAg": {
            "desc": "A Non Christian who is coming to Alpha",
            "id": "99e2XOwRbZgb773aGLAg",
            "label": "Alpha (Completed)",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          ":0am 2101y1n )0t": {
            "desc": "A Member being discipled on campus",
            "id": ":0am 2101y1n )0t",
            "label": "Disciple",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "G8SRxWpXvfz5aIk9OdgP": {
            "desc": "Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the \"5 Things\" in place?",
            "id": "G8SRxWpXvfz5aIk9OdgP",
            "label": "Lifetime Labourer",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "IHpI6i86UwHaBHKlDfsn": {
            "desc": "Has completed 'My 5 Things' or Equivalent",
            "id": "IHpI6i86UwHaBHKlDfsn",
            "label": "5 Things (Completed)",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "JQtDoHf85B3HCPtyxQvG": {
            "desc": "A member without an assigned gender",
            "id": "JQtDoHf85B3HCPtyxQvG",
            "label": "No Specified Gender",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "KA7mWeXalOkMuY2pgXHR": {
            "desc": "First year student",
            "id": "KA7mWeXalOkMuY2pgXHR",
            "label": "Year 1",
            "members": [
              "EARQFdxmZsJgVhFUh4qn",
              "ae8cnpOcO5ONsTaQqj9l",
              "Vx9Ls5n10O2NX3RhmB4M",
              "o5V7o5UtDsH6QJE09QMN",
              "s9GBQtmBPI4mL6VYlPmM",
              "DdFgHnVDTtKLjbdOeEyR",
              "QeIm063qu8xHAgcvK34c",
            ],
            "target": 0,
            "total": 7,
            "unit": null,
          },
          "KgXPVZZsfjmAgXpzkEhM": {
            "desc": "",
            "id": "KgXPVZZsfjmAgXpzkEhM",
            "label": "Involved Christian/Total",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": "%",
          },
          "KhRaG31GtlG5mpnThUdH": {
            "desc": "A member committed to finidng 2 Disciples and a CE",
            "id": "KhRaG31GtlG5mpnThUdH",
            "label": "Multiplier (Aspirational)",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "L7Ypv2NtQUSVhcJRQTgO": {
            "desc": "Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.",
            "id": "L7Ypv2NtQUSVhcJRQTgO",
            "label": "Remaining Fruit",
            "members": [
              "iKkzRo4LNx8fZS9LpdFJ",
              "dV1qaOGk3FnzZFNUw1oZ",
              "FnPh5VIW2GgaJKiZjUQ8",
              "9BX1jaJYTqzAeFloX4bI",
            ],
            "target": 0,
            "total": 4,
            "unit": null,
          },
          "MM raida3utaTd 1": {
            "desc": "Seventh year student",
            "id": "MM raida3utaTd 1",
            "label": "Year 7",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "MrAa9r 99   irA ": {
            "desc": "Sixth year student",
            "id": "MrAa9r 99   irA ",
            "label": "Year 6",
            "members": [
              "C1nQX607TTJiHSaJQdSF",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "RYvrItrcLBumN2l1B2ZB": {
            "desc": "A Member who is intentionally sharing their faith regularly (at least once every two weeks)",   
            "id": "RYvrItrcLBumN2l1B2ZB",
            "label": "Regular Outreach",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "TOyelCxBBIRZQ3KzG0ux": {
            "desc": "",
            "id": "TOyelCxBBIRZQ3KzG0ux",
            "label": "Remaining Fruit/Total",
            "members": [],
            "target": 0,
            "total": 4.819277108433735,
            "unit": "%",
          },
          "UDpXKKGAB0JpICs1Jfi5": {
            "desc": "A Member who has completed First Steps",
            "id": "UDpXKKGAB0JpICs1Jfi5",
            "label": "First Steps (Completed)",
            "members": [
              "iKkzRo4LNx8fZS9LpdFJ",
              "WZ1GggK61NUYI2BebS36",
              "8ZSvPVPsvyc7K0vdk2ez",
              "41g0Esm7MYlYVjWummPM",
              "N0bpRvG0h1vu7Wk7lrbN",
            ],
            "target": 0,
            "total": 5,
            "unit": null,
          },
          "UOdVYd9CBSFvDcs24PRJ": {
            "desc": "",
            "id": "UOdVYd9CBSFvDcs24PRJ",
            "label": "Student Leaders/Total",
            "members": [],
            "target": 0,
            "total": 13.253012048192772,
            "unit": "%",
          },
          "XPHi4AUKU8bks8dS6VAo": {
            "desc": "A Member involved in a prayer time with others from this Movement",
            "id": "XPHi4AUKU8bks8dS6VAo",
            "label": "Prayer",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "YUJsTf91aoNqHPcNKtxj": {
            "desc": "",
            "id": "YUJsTf91aoNqHPcNKtxj",
            "label": "Committed Followers/Total",
            "members": [],
            "target": 0,
            "total": 7.228915662650602,
            "unit": "%",
          },
          "ZsiPiQwDCXfNuvgOE6RV": {
            "desc": "Disciples doing regular outreach ",
            "id": "ZsiPiQwDCXfNuvgOE6RV",
            "label": "Outreach/Disciples",
            "members": [],
            "target": 0,
            "total": 35.483870967741936,
            "unit": "%",
          },
          "cl07bEKOEIZ8ytnfEf69": {
            "desc": "A member who doesn't have an assigned year",
            "id": "cl07bEKOEIZ8ytnfEf69",
            "label": "No Year",
            "members": [
              "tT0IRk2dmBdLQyeMBKfB",
              "v5XZdAcEsZDKSTfC2LgH",
              "VqNOBhniLhWQN397vZFp",
              "VmtdU8nxHjWZduJEhlXm",
              "OEdGg5FL2Oq0IlcfQue8",
              "qe4D4hHsAVrKVv8iLCE2",
              "SA4jQtdFuI0srEDYDa3o",
              "1675Xwq0bFBMZO0XmvsP",
              "fdvFS9D1VJ2cDGgD3nSX",
              "H52Kf6Alu5knusGxEGrB",
              "der2XOL3Gdqua6LyH1xj",
              "siH75ijS6P0c3E6DRe4d",
              "sCk0ORSlIKlI4TEMoj6L",
              "QXgeY465UVsKnfdwFW48",
              "pHTIyu3nx6MPhmF7AgXc",
              "1Otp49vJ6Krcyvwcn4Mb",
              "9BX1jaJYTqzAeFloX4bI",
              "IEIWmAwKUWYqIqSZyHaE",
              "5SMB4YnkuYLSRpv3Vb7K",
            ],
            "target": "2",
            "total": 19,
            "unit": null,
          },
          "covZf40QClhwnN7xPRl2": {
            "desc": `\"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.

Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)\"`,
            "id": "covZf40QClhwnN7xPRl2",
            "label": "Multiplying Disciples - Send",
            "members": [],
            "target": "20",
            "total": 0,
            "unit": null,
          },
          "dMs0DJmz3n53DNvKFYux": {
            "desc": "A student with two disciples and a CE ",
            "id": "dMs0DJmz3n53DNvKFYux",
            "label": "Multiplier",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "default": {
            "desc": "A vocational Member of the Movement",
            "id": "default",
            "label": "Missionary",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "el1rE8E rArnt0a1": {
            "desc": "A Member who is enrolled as an international student",
            "id": "el1rE8E rArnt0a1",
            "label": "International Student",
            "members": [
              "H52Kf6Alu5knusGxEGrB",
              "IEIWmAwKUWYqIqSZyHaE",
            ],
            "target": 0,
            "total": 2,
            "unit": null,
          },
          "gUPCtQRdfYjdrotyfUht": {
            "desc": "Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. ",
            "id": "gUPCtQRdfYjdrotyfUht",
            "label": "Completed Basic Follow Up",
            "members": [
              "iKkzRo4LNx8fZS9LpdFJ",
              "WZ1GggK61NUYI2BebS36",
              "8ZSvPVPsvyc7K0vdk2ez",
              "41g0Esm7MYlYVjWummPM",
              "N0bpRvG0h1vu7Wk7lrbN",
            ],
            "target": 0,
            "total": 5,
            "unit": null,
          },
          "hkPIB0YcW8UuFh5Seodp": {
            "desc": "A member who is discipled and also regularly sharing their faith",
            "id": "hkPIB0YcW8UuFh5Seodp",
            "label": "Disciple doing outreach regularly",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "hogn1UUCuMhDOCtwvkAk": {
            "desc": "The number of non-christians connected to a student",
            "id": "hogn1UUCuMhDOCtwvkAk",
            "label": "Non-Christian Connecting with a Student",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "iF7g2h2sXmYM7i7FaYxk": {
            "desc": "A Member who is currently on prac",
            "id": "iF7g2h2sXmYM7i7FaYxk",
            "label": "On Prac",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "j6Zq9tbZXweMbboALDs8": {
            "desc": "Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.",
            "id": "j6Zq9tbZXweMbboALDs8",
            "label": "Exploring Christianity (Completed)",
            "members": [
              "iKkzRo4LNx8fZS9LpdFJ",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "mH7ZmSClmCXE4DlXMNRD": {
            "desc": "A subsection of this Movement",
            "id": "mH7ZmSClmCXE4DlXMNRD",
            "label": "--System--",
            "members": [
              "1Otp49vJ6Krcyvwcn4Mb",
            ],
            "target": 0,
            "total": 1,
            "unit": null,
          },
          "n42a2Mrlu )thr0r": {
            "desc": "Is graduating within 12 months",
            "id": "n42a2Mrlu )thr0r",
            "label": "Final Year",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "o86cGQi6TP7AWM4qpYSr": {
            "desc": "Has attended a Global Missions project",
            "id": "o86cGQi6TP7AWM4qpYSr",
            "label": "Global Missions",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "oDXJHWBEdnwNOx6oR0sc": {
            "desc": "Is currently doing 'My 5 Things' or Equivalent",
            "id": "oDXJHWBEdnwNOx6oR0sc",
            "label": "5 Things (Current)",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "oOvDZwfqXwDkTsEoWvBk": {
            "desc": "A Member who is involved/connected to Local and ISM",
            "id": "oOvDZwfqXwDkTsEoWvBk",
            "label": "Bridge",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "qXEKtqJjrZB4KbZZcXtw": {
            "desc": `\"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).

Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students.\"`,
            "id": "qXEKtqJjrZB4KbZZcXtw",
            "label": "Committed Followers - Train",
            "members": [],
            "target": "40",
            "total": 0,
            "unit": null,
          },
          "rTrr2d 3ed+1i3aa": {
            "desc": "A Member who is not studying at this campus",
            "id": "rTrr2d 3ed+1i3aa",
            "label": "Not on Campus",
            "members": [
              "qe4D4hHsAVrKVv8iLCE2",
              "v11qo1Q8Zy1NB34uvxmP",
              "IEIWmAwKUWYqIqSZyHaE",
            ],
            "target": 0,
            "total": 3,
            "unit": null,
          },
          "rYMogPL8oQOx8bJdAMa2": {
            "desc": "A Member who is female",
            "id": "rYMogPL8oQOx8bJdAMa2",
            "label": "*Female",
            "members": [
              "v5XZdAcEsZDKSTfC2LgH",
              "UtOHfX9BDZhmhUAYjrM2",
              "iKkzRo4LNx8fZS9LpdFJ",
              "C1nQX607TTJiHSaJQdSF",
              "VqNOBhniLhWQN397vZFp",
              "JNgyOyrypDRS7XlDoLvO",
              "fnbxJCK4oF9458qiVtIx",
              "EARQFdxmZsJgVhFUh4qn",
              "ae8cnpOcO5ONsTaQqj9l",
              "dgYClNToNO7TjQKgEipH",
              "nCiB1F8JDdudJO6Xyivy",
              "OEdGg5FL2Oq0IlcfQue8",
              "qe4D4hHsAVrKVv8iLCE2",
              "SA4jQtdFuI0srEDYDa3o",
              "YrZB0KJL94BSnecnK6t4",
              "dV1qaOGk3FnzZFNUw1oZ",
              "v11qo1Q8Zy1NB34uvxmP",
              "Vx9Ls5n10O2NX3RhmB4M",
              "CHtIeJThnGhzAeWWks5g",
              "FnPh5VIW2GgaJKiZjUQ8",
              "WZ1GggK61NUYI2BebS36",
              "8ZSvPVPsvyc7K0vdk2ez",
              "fdvFS9D1VJ2cDGgD3nSX",
              "o5V7o5UtDsH6QJE09QMN",
              "N0bpRvG0h1vu7Wk7lrbN",
              "H52Kf6Alu5knusGxEGrB",
              "der2XOL3Gdqua6LyH1xj",
              "siH75ijS6P0c3E6DRe4d",
              "sCk0ORSlIKlI4TEMoj6L",
              "QXgeY465UVsKnfdwFW48",
              "2e1etGimRhzJdEDLqHYm",
              "s9GBQtmBPI4mL6VYlPmM",
              "pHTIyu3nx6MPhmF7AgXc",
              "DdFgHnVDTtKLjbdOeEyR",
              "IEIWmAwKUWYqIqSZyHaE",
              "5SMB4YnkuYLSRpv3Vb7K",
              "QeIm063qu8xHAgcvK34c",
              "kl4RSMlI2LqxV2KePQQI",
            ],
            "target": 0,
            "total": 38,
            "unit": null,
          },
          "t tEe475  iaa00 ": {
            "desc": "Fourth year student",
            "id": "t tEe475  iaa00 ",
            "label": "Year 4",
            "members": [
              "pj0ivaS4d6JrHgtSVIke",
              "dgYClNToNO7TjQKgEipH",
              "41g0Esm7MYlYVjWummPM",
              "OPFH9KNwqXeYRvopnoFM",
            ],
            "target": 0,
            "total": 4,
            "unit": null,
          },
          "treeTotal": {
            "desc": "Number of members on the Tree",
            "id": "treeTotal",
            "label": "Total on Tree",
            "total": 48,
          },
          "uMzNgQ5eRzJe84aER4RN": {
            "desc": `\"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.

Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change.\"`,
            "id": "uMzNgQ5eRzJe84aER4RN",
            "label": "Involved Students - Build",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "uccncwo7eGV0atXPCFW9": {
            "desc": "A member who is regularly involved, at least 2 activities a week",
            "id": "uccncwo7eGV0atXPCFW9",
            "label": "Involved",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          },
          "uu56d6XxJqsWgFJJPr3A": {
            "desc": "Number of people you started meeting with regularly to share the gospel (count once from your second meeting).",
            "id": "uu56d6XxJqsWgFJJPr3A",
            "label": "Evangelistic Contact",
            "members": [
              "sCk0ORSlIKlI4TEMoj6L",
              "kl4RSMlI2LqxV2KePQQI",
            ],
            "target": 0,
            "total": 2,
            "unit": null,
          },
          "wA08VoUz4sIPERRSyujq": {
            "desc": "",
            "id": "wA08VoUz4sIPERRSyujq",
            "label": "Evangelistic Contacts/Total",
            "members": [],
            "target": 0,
            "total": 2.4096385542168677,
            "unit": "%",
          },
          "xcCy4Blwgkd9WLuVErNF": {
            "desc": "A Member who is currently going through First Steps",
            "id": "xcCy4Blwgkd9WLuVErNF",
            "label": "First Steps (Current)",
            "members": [],
            "target": 0,
            "total": 0,
            "unit": null,
          }
        },
        tree: {
        "tree": [
          {
            "children": [],
            "id": "1675Xwq0bFBMZO0XmvsP",
            "key": "root-1675Xwq0bFBMZO0XmvsP",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "1Otp49vJ6Krcyvwcn4Mb",
            "key": "root-1Otp49vJ6Krcyvwcn4Mb",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "2e1etGimRhzJdEDLqHYm",
            "key": "root-2e1etGimRhzJdEDLqHYm",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "41g0Esm7MYlYVjWummPM",
            "key": "root-41g0Esm7MYlYVjWummPM",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "5SMB4YnkuYLSRpv3Vb7K",
            "key": "root-5SMB4YnkuYLSRpv3Vb7K",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "711TRvfJpvVwFjL6Dnti",
            "key": "root-711TRvfJpvVwFjL6Dnti",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "8ZSvPVPsvyc7K0vdk2ez",
            "key": "root-8ZSvPVPsvyc7K0vdk2ez",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "9BX1jaJYTqzAeFloX4bI",
            "key": "root-9BX1jaJYTqzAeFloX4bI",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "C1nQX607TTJiHSaJQdSF",
            "key": "root-C1nQX607TTJiHSaJQdSF",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "CHtIeJThnGhzAeWWks5g",
            "key": "root-CHtIeJThnGhzAeWWks5g",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "DdFgHnVDTtKLjbdOeEyR",
            "key": "root-DdFgHnVDTtKLjbdOeEyR",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "EARQFdxmZsJgVhFUh4qn",
            "key": "root-EARQFdxmZsJgVhFUh4qn",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "FnPh5VIW2GgaJKiZjUQ8",
            "key": "root-FnPh5VIW2GgaJKiZjUQ8",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "H52Kf6Alu5knusGxEGrB",
            "key": "root-H52Kf6Alu5knusGxEGrB",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "JNgyOyrypDRS7XlDoLvO",
            "key": "root-JNgyOyrypDRS7XlDoLvO",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "N0bpRvG0h1vu7Wk7lrbN",
            "key": "root-N0bpRvG0h1vu7Wk7lrbN",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "OEdGg5FL2Oq0IlcfQue8",
            "key": "root-OEdGg5FL2Oq0IlcfQue8",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "OPFH9KNwqXeYRvopnoFM",
            "key": "root-OPFH9KNwqXeYRvopnoFM",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "QXgeY465UVsKnfdwFW48",
            "key": "root-QXgeY465UVsKnfdwFW48",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "QeIm063qu8xHAgcvK34c",
            "key": "root-QeIm063qu8xHAgcvK34c",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "SA4jQtdFuI0srEDYDa3o",
            "key": "root-SA4jQtdFuI0srEDYDa3o",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "UtOHfX9BDZhmhUAYjrM2",
            "key": "root-UtOHfX9BDZhmhUAYjrM2",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "VmtdU8nxHjWZduJEhlXm",
            "key": "root-VmtdU8nxHjWZduJEhlXm",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "VqNOBhniLhWQN397vZFp",
            "key": "root-VqNOBhniLhWQN397vZFp",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "Vx9Ls5n10O2NX3RhmB4M",
            "key": "root-Vx9Ls5n10O2NX3RhmB4M",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "WZ1GggK61NUYI2BebS36",
            "key": "root-WZ1GggK61NUYI2BebS36",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "YrZB0KJL94BSnecnK6t4",
            "key": "root-YrZB0KJL94BSnecnK6t4",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "ae8cnpOcO5ONsTaQqj9l",
            "key": "root-ae8cnpOcO5ONsTaQqj9l",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "bprNzBn8L1OQeudiGfPg",
            "key": "root-bprNzBn8L1OQeudiGfPg",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "dV1qaOGk3FnzZFNUw1oZ",
            "key": "root-dV1qaOGk3FnzZFNUw1oZ",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "der2XOL3Gdqua6LyH1xj",
            "key": "root-der2XOL3Gdqua6LyH1xj",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "dgYClNToNO7TjQKgEipH",
            "key": "root-dgYClNToNO7TjQKgEipH",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "fdvFS9D1VJ2cDGgD3nSX",
            "key": "root-fdvFS9D1VJ2cDGgD3nSX",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "fnbxJCK4oF9458qiVtIx",
            "key": "root-fnbxJCK4oF9458qiVtIx",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "iKkzRo4LNx8fZS9LpdFJ",
            "key": "root-iKkzRo4LNx8fZS9LpdFJ",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "kl4RSMlI2LqxV2KePQQI",
            "key": "root-kl4RSMlI2LqxV2KePQQI",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "nCiB1F8JDdudJO6Xyivy",
            "key": "root-nCiB1F8JDdudJO6Xyivy",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "o5V7o5UtDsH6QJE09QMN",
            "key": "root-o5V7o5UtDsH6QJE09QMN",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "pHTIyu3nx6MPhmF7AgXc",
            "key": "root-pHTIyu3nx6MPhmF7AgXc",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "pj0ivaS4d6JrHgtSVIke",
            "key": "root-pj0ivaS4d6JrHgtSVIke",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "qe4D4hHsAVrKVv8iLCE2",
            "key": "root-qe4D4hHsAVrKVv8iLCE2",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "s9GBQtmBPI4mL6VYlPmM",
            "key": "root-s9GBQtmBPI4mL6VYlPmM",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "sCk0ORSlIKlI4TEMoj6L",
            "key": "root-sCk0ORSlIKlI4TEMoj6L",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "siH75ijS6P0c3E6DRe4d",
            "key": "root-siH75ijS6P0c3E6DRe4d",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "tT0IRk2dmBdLQyeMBKfB",
            "key": "root-tT0IRk2dmBdLQyeMBKfB",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "v11qo1Q8Zy1NB34uvxmP",
            "key": "root-v11qo1Q8Zy1NB34uvxmP",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "v5XZdAcEsZDKSTfC2LgH",
            "key": "root-v5XZdAcEsZDKSTfC2LgH",
            "parent": "root",
            "type": "normal",
          },
        ],
      },
      }
    }
    for(let treeKey in treesToTest) {
      describe(treeKey, () => {
        it('should add tree doc', async () => {
          let treeDoc = treesToTest[treeKey]
          let doc = await MovDoc.collection('trees').doc(treeKey).get()
            // role defintion is defined
            expect(doc).toBeDefined()
            let data = doc.data()
            expect(data).toEqual(treeDoc.doc)
        })

        it('should add tree component', async () => {
          let treeDoc = treesToTest[treeKey]
          let doc = await MovDoc.collection('trees').doc(treeKey).collection('components').doc('tree').get()
            // role defintion is defined
            expect(doc).toBeDefined()
            let data = doc.data()
            expect(data).toEqual(treeDoc.tree)
        })

        it('should add parent component', async () => {
          let treeDoc = treesToTest[treeKey]
          let doc = await MovDoc.collection('trees').doc(treeKey).collection('components').doc('parents').get()
            // role defintion is defined
            expect(doc).toBeDefined()
            let data = doc.data()
            expect(data).toEqual(treeDoc.parents)
        });

        it('should add stats component', async () => {
          let treeDoc = treesToTest[treeKey]
          let doc = await MovDoc.collection('trees').doc(treeKey).collection('components').doc('stats').get()
            // role defintion is defined
            expect(doc).toBeDefined()
            let data = doc.data()
            expect(data).toEqual(treeDoc.stats)
        });
      })
    }
  });

  describe('Lists', () => {
    it('should add member list', async () => {
      const members = {
        OD81zpaLxCyADdkyZ6Cj: { name: 'Allan', id: 'OD81zpaLxCyADdkyZ6Cj' },
        nCiB1F8JDdudJO6Xyivy: { name: 'Allie Young', id: 'nCiB1F8JDdudJO6Xyivy' },
        j6TEsBzkZxvWOaVvLp41: { name: 'Tamara', id: 'j6TEsBzkZxvWOaVvLp41' },
        RgcNYB5Y6tehuiPF3fiU: { name: 'Paul Wang', id: 'RgcNYB5Y6tehuiPF3fiU' },
        lnWb8l2hKNpy7rnPBRlX: { name: 'Yasmin Henry', id: 'lnWb8l2hKNpy7rnPBRlX' },
        FKeSTfqt39M2Q0zkMie7: { name: 'Austin', id: 'FKeSTfqt39M2Q0zkMie7' },
        sCk0ORSlIKlI4TEMoj6L: { name: 'Vrinda Eswaran', id: 'sCk0ORSlIKlI4TEMoj6L' },
        vj2kpzZI9sprpsAqR3ax: { name: 'Florence Leung', id: 'vj2kpzZI9sprpsAqR3ax' },
        Hp5MIwIkt14arBicSK27: { name: 'Ethan Lo', id: 'Hp5MIwIkt14arBicSK27' },
        Vx9Ls5n10O2NX3RhmB4M: { name: 'Amy Lazarus', id: 'Vx9Ls5n10O2NX3RhmB4M' },
        ae8cnpOcO5ONsTaQqj9l: { name: 'Jasmin Maxwell', id: 'ae8cnpOcO5ONsTaQqj9l' },
        egWR7TXlgjZErk9aqvMP: { name: 'Welton', id: 'egWR7TXlgjZErk9aqvMP' },
        pj0ivaS4d6JrHgtSVIke: { name: 'Israel Escano', id: 'pj0ivaS4d6JrHgtSVIke' },
        PtKGhRuTQIckzpB0a9Hx: {
          name: '--Involved Christian with No Parent--',
          id: 'PtKGhRuTQIckzpB0a9Hx'
        },
        '3VcOYykTqk3aueEM1qz4': { name: 'Josheph Krebs', id: '3VcOYykTqk3aueEM1qz4' },
        OxsxDa0Fwpo6Jm4L9G3U: { name: 'Rachel Augustine', id: 'OxsxDa0Fwpo6Jm4L9G3U' },
        VmtdU8nxHjWZduJEhlXm: { name: 'Caleb Webb', id: 'VmtdU8nxHjWZduJEhlXm' },
        N0bpRvG0h1vu7Wk7lrbN: { name: 'Juliet Biemann', id: 'N0bpRvG0h1vu7Wk7lrbN' },
        '2oGzh8Nb5rCjF246qgWB': { name: 'Nicholas Grice', id: '2oGzh8Nb5rCjF246qgWB' },
        AYrrEdMNFaOw0Cdb2TRf: { name: 'Luke', id: 'AYrrEdMNFaOw0Cdb2TRf' },
        SvRZTpTmTOQ7NBP7ixJD: { name: 'James Baumgart', id: 'SvRZTpTmTOQ7NBP7ixJD' },
        m7BhOkFAkPyfOXvSuYND: { name: 'Nicholas', id: 'm7BhOkFAkPyfOXvSuYND' },
        QLjMOU3G8Vi9aPLJGWnT: { name: 'Zahlia', id: 'QLjMOU3G8Vi9aPLJGWnT' },
        yNCl3NiDFOkJvtrUh1ib: { name: 'Caleb ', id: 'yNCl3NiDFOkJvtrUh1ib' },
        xUlTHb5PuuZjA9w3tEry: { name: 'Caleb', id: 'xUlTHb5PuuZjA9w3tEry' },
        m6mCdveLWNgJGyDF9Sjo: { name: 'Annelise Terblanche', id: 'm6mCdveLWNgJGyDF9Sjo' },
        Rz0JcTPlcajfgO5UwKFL: { name: 'Jasmine Pearce', id: 'Rz0JcTPlcajfgO5UwKFL' },
        o4GPRVN5JlqsntU4ZEQs: { name: 'Simone Hindsberger', id: 'o4GPRVN5JlqsntU4ZEQs' },
        oJ3Twl5YTFghxMadZOja: { name: 'Connor', id: 'oJ3Twl5YTFghxMadZOja' },
        '2e1etGimRhzJdEDLqHYm': { name: 'Sophie James', id: '2e1etGimRhzJdEDLqHYm' },
        '9QMzsDjII6aor6F4gRgx': { name: 'Ethan Waugh', id: '9QMzsDjII6aor6F4gRgx' },
        bprNzBn8L1OQeudiGfPg: { name: 'Martin', id: 'bprNzBn8L1OQeudiGfPg' },
        wXFzr07Qu7ID9TuoMTeD: { name: 'Cedric', id: 'wXFzr07Qu7ID9TuoMTeD' },
        BDRF0vdLVKsTtfdOwGnL: { name: 'Owen', id: 'BDRF0vdLVKsTtfdOwGnL' },
        JNgyOyrypDRS7XlDoLvO: { name: 'Felicity Anderson', id: 'JNgyOyrypDRS7XlDoLvO' },
        '1Otp49vJ6Krcyvwcn4Mb': { name: '--TO BE DELETED--', id: '1Otp49vJ6Krcyvwcn4Mb' },
        s9GBQtmBPI4mL6VYlPmM: { name: 'Diep Ngo', id: 's9GBQtmBPI4mL6VYlPmM' },
        DLy4fRpkzW8IkP2JGn6i: { name: 'Jessie Ellis', id: 'DLy4fRpkzW8IkP2JGn6i' },
        '8TSC0q4pjKZXj8Batzq0': { name: 'Leanne de Jongh', id: '8TSC0q4pjKZXj8Batzq0' },
        kl4RSMlI2LqxV2KePQQI: { name: 'Lexie Glasson', id: 'kl4RSMlI2LqxV2KePQQI' },
        OFm9vtWv54mDrkIZ5zMD: { name: 'Harry', id: 'OFm9vtWv54mDrkIZ5zMD' },
        CIo4dNwnNuslhMuPblY9: { name: 'Georgia Forster', id: 'CIo4dNwnNuslhMuPblY9' },
        IrJsboJQoqiGgb71EwXJ: { name: 'Herman', id: 'IrJsboJQoqiGgb71EwXJ' },
        flK72VhEp2aAgnA40uCy: { name: 'Yodi Siu', id: 'flK72VhEp2aAgnA40uCy' },
        tAWgKRf9DSaQLAcTjQ3z: { name: 'Dylan T', id: 'tAWgKRf9DSaQLAcTjQ3z' },
        m118LJ1wLrEYHt8TSBoq: { name: 'Jasmine Chan', id: 'm118LJ1wLrEYHt8TSBoq' },
        '03OBFstGenJLSwkPyoIe': { name: 'Sean Cosijn', id: '03OBFstGenJLSwkPyoIe' },
        DyFunsfjR9vg2TclhCNP: { name: 'Sophie', id: 'DyFunsfjR9vg2TclhCNP' },
        OUoFZow0aN1cq2ICip1G: { name: 'Bella Lombule', id: 'OUoFZow0aN1cq2ICip1G' },
        yPQP77fEJfzPB7AvFkUO: { name: 'Genevieve Brook', id: 'yPQP77fEJfzPB7AvFkUO' },
        N3CcEWZsAHvOCC3Y0XrD: { name: 'Lily Biggs', id: 'N3CcEWZsAHvOCC3Y0XrD' },
        clKfwO2Gln88sDOYGgeL: { name: 'Rory', id: 'clKfwO2Gln88sDOYGgeL' },
        sL2bXbm2oeu3nrFkyTzj: { name: 'Daniel Plumbe', id: 'sL2bXbm2oeu3nrFkyTzj' },
        '5jajm7QQP6bExdVhhG8k': { name: 'Abbey P', id: '5jajm7QQP6bExdVhhG8k' },
        '5LWB5cBbj9EIpd6bk2I3': { name: 'Jonathan Tiss', id: '5LWB5cBbj9EIpd6bk2I3' },
        OEdGg5FL2Oq0IlcfQue8: { name: 'Steffi', id: 'OEdGg5FL2Oq0IlcfQue8' },
        dV1qaOGk3FnzZFNUw1oZ: { name: 'Jenna Maurel', id: 'dV1qaOGk3FnzZFNUw1oZ' },
        siH75ijS6P0c3E6DRe4d: { name: 'Hazel', id: 'siH75ijS6P0c3E6DRe4d' },
        '41g0Esm7MYlYVjWummPM': { name: 'James Yelland', id: '41g0Esm7MYlYVjWummPM' },
        NGtvLRwCmSqu4p51wRR4: { name: 'Freeman', id: 'NGtvLRwCmSqu4p51wRR4' },
        fnbxJCK4oF9458qiVtIx: { name: 'Brynlea Gibson', id: 'fnbxJCK4oF9458qiVtIx' },
        '8ZSvPVPsvyc7K0vdk2ez': { name: 'Rasika Grice', id: '8ZSvPVPsvyc7K0vdk2ez' },
        FClWLoiM7zyzV7RzwJr7: { name: 'Hamish', id: 'FClWLoiM7zyzV7RzwJr7' },
        pHTIyu3nx6MPhmF7AgXc: { name: 'Natalie Iru', id: 'pHTIyu3nx6MPhmF7AgXc' },
        '9BX1jaJYTqzAeFloX4bI': { name: "Riley O'Shannessy", id: '9BX1jaJYTqzAeFloX4bI' },
        H0EWkGM7CF7ZCAl3u6Wc: { name: 'Dougal', id: 'H0EWkGM7CF7ZCAl3u6Wc' },
        VqNOBhniLhWQN397vZFp: { name: 'Rachel King', id: 'VqNOBhniLhWQN397vZFp' },
        b6htdXEpqVWVkVbPfqwj: { name: 'Nick Ellis', id: 'b6htdXEpqVWVkVbPfqwj' },
        j8uBHU5MCo6eaBUidhKA: { name: 'Carla Coetzee', id: 'j8uBHU5MCo6eaBUidhKA' },
        iKkzRo4LNx8fZS9LpdFJ: { name: 'Sarah Millar', id: 'iKkzRo4LNx8fZS9LpdFJ' },
        SA4jQtdFuI0srEDYDa3o: { name: 'Alice Middleton', id: 'SA4jQtdFuI0srEDYDa3o' },
        EARQFdxmZsJgVhFUh4qn: { name: 'Madison Dowie', id: 'EARQFdxmZsJgVhFUh4qn' },
        qOba1QSzmOB2BHL8WqFD: { name: 'Tricia Minjung Wu', id: 'qOba1QSzmOB2BHL8WqFD' },
        '1675Xwq0bFBMZO0XmvsP': { name: 'Will Shorrock-Browne', id: '1675Xwq0bFBMZO0XmvsP' },
        '711TRvfJpvVwFjL6Dnti': { name: 'Cooper G', id: '711TRvfJpvVwFjL6Dnti' },
        OPFH9KNwqXeYRvopnoFM: { name: 'Angelo Flores', id: 'OPFH9KNwqXeYRvopnoFM' },
        HaorE8zql5fNXzssp5Cu: { name: 'Chris', id: 'HaorE8zql5fNXzssp5Cu' },
        '8qCpKI0Tutff2OJrVvBx': { name: 'Manish', id: '8qCpKI0Tutff2OJrVvBx' },
        rCf4xIzdFb6odSCI2QRO: { name: 'Edwin', id: 'rCf4xIzdFb6odSCI2QRO' },
        iALW2O72jJSCVfk1NSTJ: { name: 'Leon', id: 'iALW2O72jJSCVfk1NSTJ' },
        FnPh5VIW2GgaJKiZjUQ8: { name: 'Ashlea Wong', id: 'FnPh5VIW2GgaJKiZjUQ8' },
        HayQhdlGsKxKbfPlo5ON: { name: 'Chantelle Moimoi', id: 'HayQhdlGsKxKbfPlo5ON' },
        YrZB0KJL94BSnecnK6t4: { name: 'Sophia Cossa', id: 'YrZB0KJL94BSnecnK6t4' },
        zbTCywlmeHOCBa8h7o6F: { name: 'Crispian Yedmass', id: 'zbTCywlmeHOCBa8h7o6F' },
        C1nQX607TTJiHSaJQdSF: { name: 'Naziah Siddiddique', id: 'C1nQX607TTJiHSaJQdSF' },
        YQo4XDW0bguEuYKyqxVL: { name: 'Brooke', id: 'YQo4XDW0bguEuYKyqxVL' },
        FuiywanMGBuUQgpSchxY: { name: 'Sandy Ghermann', id: 'FuiywanMGBuUQgpSchxY' },
        LGhHDHpSP4H2LHF2C5RY: { name: 'Pablo Parra', id: 'LGhHDHpSP4H2LHF2C5RY' },
        o5V7o5UtDsH6QJE09QMN: { name: 'Celina', id: 'o5V7o5UtDsH6QJE09QMN' },
        iagy3QI3gujOxnRcpo6H: { name: 'Abbey Grice', id: 'iagy3QI3gujOxnRcpo6H' },
        v5XZdAcEsZDKSTfC2LgH: { name: 'Isobelle Trevatt', id: 'v5XZdAcEsZDKSTfC2LgH' },
        GKr2gWle6N4msCwBcPvV: { name: 'Cas Maclean', id: 'GKr2gWle6N4msCwBcPvV' },
        LvE0yC4ljZurVias8jex: { name: 'Lizzy Hopper', id: 'LvE0yC4ljZurVias8jex' },
        hXjOUHeBH2Vukl857uVz: { name: 'Ocean', id: 'hXjOUHeBH2Vukl857uVz' },
        SisCsMdoKIAjnCX19y52: { name: 'David', id: 'SisCsMdoKIAjnCX19y52' },
        der2XOL3Gdqua6LyH1xj: { name: 'Evie', id: 'der2XOL3Gdqua6LyH1xj' },
        FRe93Gn4ICmPF8suHxsB: { name: 'Josh Grice', id: 'FRe93Gn4ICmPF8suHxsB' },
        KIysPYAG8YsT6dMYqhS6: { name: 'Emma Adams', id: 'KIysPYAG8YsT6dMYqhS6' },
        O0WpvvNuAQ1EK4nQp6qq: { name: 'Liam Black', id: 'O0WpvvNuAQ1EK4nQp6qq' },
        aE7Mu556fCJIhvxJY00y: { name: 'Tiarne Gray', id: 'aE7Mu556fCJIhvxJY00y' },
        qe4D4hHsAVrKVv8iLCE2: { name: 'Sarah Murphy', id: 'qe4D4hHsAVrKVv8iLCE2' },
        qlahLMCw2qVxmA5o5gpR: { name: 'Kate Harris', id: 'qlahLMCw2qVxmA5o5gpR' },
        tT0IRk2dmBdLQyeMBKfB: { name: 'Yang L', id: 'tT0IRk2dmBdLQyeMBKfB' },
        DdFgHnVDTtKLjbdOeEyR: { name: 'Jamie Mackintosh', id: 'DdFgHnVDTtKLjbdOeEyR' },
        p4DWXe5G3efllrPi7SM2: { name: 'Kieran Boyle', id: 'p4DWXe5G3efllrPi7SM2' },
        '6U8f3cPHbILYvrNrW3UV': { name: 'Jack Ryan', id: '6U8f3cPHbILYvrNrW3UV' },
        KyOhn6L12Nd1YlwAAtwF: { name: 'Lachlan Cooley', id: 'KyOhn6L12Nd1YlwAAtwF' },
        WZ1GggK61NUYI2BebS36: { name: 'Kayla Turnbull', id: 'WZ1GggK61NUYI2BebS36' },
        '0F7QAUqwwjR8WwfU6roJ': { name: 'Mitch Poloni', id: '0F7QAUqwwjR8WwfU6roJ' },
        c6dRupke4wlwBpyCyWOv: { name: 'Zac Maxwell', id: 'c6dRupke4wlwBpyCyWOv' },
        '5SMB4YnkuYLSRpv3Vb7K': { name: 'Sinead', id: '5SMB4YnkuYLSRpv3Vb7K' },
        Ufyr7Qb9hJqlsR6rykBP: { name: 'Lewis Reed', id: 'Ufyr7Qb9hJqlsR6rykBP' },
        '7dkOAcvhXgbUlCsuXYLZ': { name: 'Lydia', id: '7dkOAcvhXgbUlCsuXYLZ' },
        fdvFS9D1VJ2cDGgD3nSX: { name: 'Bronwen Nel', id: 'fdvFS9D1VJ2cDGgD3nSX' },
        v11qo1Q8Zy1NB34uvxmP: { name: 'Rachael Dingwall', id: 'v11qo1Q8Zy1NB34uvxmP' },
        H52Kf6Alu5knusGxEGrB: { name: 'Selina Wang', id: 'H52Kf6Alu5knusGxEGrB' },
        IEIWmAwKUWYqIqSZyHaE: { name: 'Chloe', id: 'IEIWmAwKUWYqIqSZyHaE' },
        rVtq0wgniMj2TRLJ6jBN: { name: 'Liam Lay', id: 'rVtq0wgniMj2TRLJ6jBN' },
        CHtIeJThnGhzAeWWks5g: { name: 'Bri Vandersee', id: 'CHtIeJThnGhzAeWWks5g' },
        iUd8gP5R3xALE0aaCbxb: { name: 'Haowen', id: 'iUd8gP5R3xALE0aaCbxb' },
        QXgeY465UVsKnfdwFW48: { name: 'Olivia Durrheim', id: 'QXgeY465UVsKnfdwFW48' },
        UtOHfX9BDZhmhUAYjrM2: { name: 'Shienne', id: 'UtOHfX9BDZhmhUAYjrM2' },
        siuoK9YsLPm7iEopYACR: { name: 'Stephen Philpot', id: 'siuoK9YsLPm7iEopYACR' },
        lY8myi4q6iK5KJ4twseo: { name: 'Levi', id: 'lY8myi4q6iK5KJ4twseo' },
        TYsR7mwU7C7XwOfzsIcZ: { name: 'Frank', id: 'TYsR7mwU7C7XwOfzsIcZ' },
        f3J1jw9TOZfMOFNLLIQK: { name: 'Moses', id: 'f3J1jw9TOZfMOFNLLIQK' },
        ketIhx0ruiO4RT7soEYD: { name: 'Seann Boo', id: 'ketIhx0ruiO4RT7soEYD' },
        QeIm063qu8xHAgcvK34c: { name: 'Catriona Rice', id: 'QeIm063qu8xHAgcvK34c' },
        '5HyKxGyIg9rVtled64g7': { name: 'Tahlia', id: '5HyKxGyIg9rVtled64g7' },
        w9aPvaYAoM8mdOHvxhNQ: { name: 'Arya Clark', id: 'w9aPvaYAoM8mdOHvxhNQ' },
        dgYClNToNO7TjQKgEipH: { name: 'Megan Jones', id: 'dgYClNToNO7TjQKgEipH' }
      }
      let doc = await MovDoc.collection('lists').doc('members').get()
      for (let member in members){
        expect(doc).toBeDefined()
        let data = doc.data()

        expect(data[member]).toEqual(members[member])
      }
    });
    it('should add styles list', async () => {
      const styles = {
        " Tta1 a0(:)lSTa9": {
          "desc": "A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)",
          "icon": "EC",
          "label": "Exploring Christianity",
          "style": {
            "background": "#ff9c39",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        " a1i n 5mnary0T+": {
          "desc": "An official student leader on campus",
          "label": "Student Leader",
          "style": {
            "background": "#31ccec",
            "color": "#000000",
            "outline": "#31ccec",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "(7lr10aTrtmd e (": {
          "desc": "A Member who is not yet a Christian (must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-christian know that they are exploring Christianity within Power to Change?)",
          "label": "Non-Christian",
          "style": {
            "background": "#b82218",
            "color": "#ffffff",
            "outline": "#b82218",
            "round": true,
            "shape": "round-diag",
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "0 u5rSSaraMtTM61": {
          "desc": "Third Year Student",
          "icon": "3",
          "label": "Year 3",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "0aS0 altn5ndGS d": {
          "desc": " Fifth year student",
          "icon": "5",
          "label": "Year 5",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "0d yiM7aTa1aet0T": {
          "desc": "A Member who became a Christian through this Movement at any point in time",
          "icon": "",
          "label": "New Christian through Movement",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#ff0000",
            "colorOverride": true,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "11ttn nu101dGd m": {
          "desc": "A Member who is a christian (must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)",
          "label": "Christian",
          "style": {
            "background": "#d1cabc",
            "color": "#000000",
            "outline": "#d1cabc",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "3ao5OGXsDa6eWIwqzfkv": {
          "desc": "This Member assists the Movement in an official capacity but is not part of the missionary or student leader teams",
          "label": "Associate / Volunteer",
          "style": {
            "background": "#3076ba",
            "backgroundOverride": false,
            "color": "#ffffff",
            "colorOverride": false,
            "outline": "#3076ba",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "shape": "round-right",
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "3ohW3FU65MTUnJuQHkvB": {
          "desc": "Second year student",
          "icon": "2",
          "label": "Year 2",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "46akFzeUaeqBWC3IBXV2": {
          "desc": "A Member who is male",
          "icon": "",
          "label": "*Male",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "7RmRpoE0w86et5oFJV6Q": {
          "desc": `Has attended a Summer Project in Australia
`,
          "icon": "",
          "label": "Summer Project",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "99e2XOwRbZgb773aGLAg": {
          "desc": "A Non Christian who is coming to Alpha",
          "icon": "",
          "label": "Alpha (Completed)",
          "style": {
            "background": "#ff9c39",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        ":0am 2101y1n )0t": {
          "desc": "A Member being discipled on campus",
          "icon": "",
          "label": "Disciple",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#ff8000",
            "outlineOverride": true,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "G8SRxWpXvfz5aIk9OdgP": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "IHpI6i86UwHaBHKlDfsn",
                "included": true,
              },
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "n42a2Mrlu )thr0r",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the \"5 Things\" in place?",
          "label": "Lifetime Labourer",
          "target": 0,
          "type": "complex",
        },
        "IHpI6i86UwHaBHKlDfsn": {
          "desc": "Has completed 'My 5 Things' or Equivalent",
          "icon": "",
          "label": "5 Things (Completed)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "JQtDoHf85B3HCPtyxQvG": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "rYMogPL8oQOx8bJdAMa2",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "46akFzeUaeqBWC3IBXV2",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "mH7ZmSClmCXE4DlXMNRD",
                "included": false,
              },
            ],
            "operator": "AND",
          },
          "desc": "A member without an assigned gender",
          "label": "No Specified Gender",
          "target": 0,
          "type": "complex",
        },
        "KA7mWeXalOkMuY2pgXHR": {
          "desc": "First year student",
          "icon": "1",
          "label": "Year 1",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "KgXPVZZsfjmAgXpzkEhM": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "id": "uMzNgQ5eRzJe84aER4RN",
                  },
                  {
                    "class": "condition",
                    "id": "treeTotal",
                  },
                ],
                "operator": "divide",
              },
              {
                "class": "number",
                "value": "100",
              },
            ],
            "operator": "multiply",
          },
          "desc": "",
          "label": "Involved Christian/Total",
          "target": 0,
          "type": "calc",
          "unit": "%",
        },
        "KhRaG31GtlG5mpnThUdH": {
          "desc": "A member committed to finidng 2 Disciples and a CE",
          "icon": "",
          "label": "Multiplier (Aspirational)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "L7Ypv2NtQUSVhcJRQTgO": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "0d yiM7aTa1aet0T",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.",
          "label": "Remaining Fruit",
          "target": 0,
          "type": "complex",
        },
        "MM raida3utaTd 1": {
          "desc": "Seventh year student",
          "icon": "7",
          "label": "Year 7",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "MrAa9r 99   irA ": {
          "desc": "Sixth year student",
          "icon": "6",
          "label": "Year 6",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "RYvrItrcLBumN2l1B2ZB": {
          "desc": "A Member who is intentionally sharing their faith regularly (at least once every two weeks)",   
          "icon": "RO",
          "label": "Regular Outreach",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "TOyelCxBBIRZQ3KzG0ux": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "id": "L7Ypv2NtQUSVhcJRQTgO",
                  },
                  {
                    "class": "condition",
                    "id": "treeTotal",
                  },
                ],
                "operator": "divide",
              },
              {
                "class": "number",
                "value": "100",
              },
            ],
            "operator": "multiply",
          },
          "desc": "",
          "label": "Remaining Fruit/Total",
          "target": 0,
          "type": "calc",
          "unit": "%",
        },
        "UDpXKKGAB0JpICs1Jfi5": {
          "desc": "A Member who has completed First Steps",
          "icon": "",
          "label": "First Steps (Completed)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "UOdVYd9CBSFvDcs24PRJ": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "id": " a1i n 5mnary0T+",
                  },
                  {
                    "class": "condition",
                    "id": "treeTotal",
                  },
                ],
                "operator": "divide",
              },
              {
                "class": "number",
                "value": "100",
              },
            ],
            "operator": "multiply",
          },
          "desc": "",
          "label": "Student Leaders/Total",
          "target": 0,
          "type": "calc",
          "unit": "%",
        },
        "XPHi4AUKU8bks8dS6VAo": {
          "desc": "A Member involved in a prayer time with others from this Movement",
          "icon": "",
          "label": "Prayer",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "YUJsTf91aoNqHPcNKtxj": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "id": "qXEKtqJjrZB4KbZZcXtw",
                  },
                  {
                    "class": "condition",
                    "id": "treeTotal",
                  },
                ],
                "operator": "divide",
              },
              {
                "class": "number",
                "value": "100",
              },
            ],
            "operator": "multiply",
          },
          "desc": "",
          "label": "Committed Followers/Total",
          "target": 0,
          "type": "calc",
          "unit": "%",
        },
        "ZsiPiQwDCXfNuvgOE6RV": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "id": "hkPIB0YcW8UuFh5Seodp",
                  },
                  {
                    "class": "condition",
                    "id": ":0am 2101y1n )0t",
                  },
                ],
                "operator": "divide",
              },
              {
                "class": "number",
                "value": "100",
              },
            ],
            "operator": "multiply",
          },
          "desc": "Disciples doing regular outreach ",
          "label": "Outreach/Disciples",
          "target": 0,
          "type": "calc",
          "unit": "%",
        },
        "cl07bEKOEIZ8ytnfEf69": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "3ohW3FU65MTUnJuQHkvB",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "0 u5rSSaraMtTM61",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "t tEe475  iaa00 ",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "0aS0 altn5ndGS d",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "MrAa9r 99   irA ",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "MM raida3utaTd 1",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "KA7mWeXalOkMuY2pgXHR",
                "included": false,
              },
            ],
            "operator": "AND",
          },
          "desc": "A member who doesn't have an assigned year",
          "label": "No Year",
          "target": "2",
          "type": "complex",
        },
        "covZf40QClhwnN7xPRl2": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "children",
                    "id": ":0am 2101y1n )0t",
                    "included": true,
                  },
                  {
                    "class": "expression",
                    "elements": [
                      {
                        "class": "condition",
                        "gen": "member",
                        "id": "RYvrItrcLBumN2l1B2ZB",
                        "included": true,
                      },
                      {
                        "class": "condition",
                        "gen": "children",
                        "id": " Tta1 a0(:)lSTa9",
                        "included": true,
                      },
                    ],
                    "operator": "OR",
                  },
                ],
                "operator": "AND",
              },
            ],
            "operator": "AND",
          },
          "desc": `\"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.

Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)\"`,
          "label": "Multiplying Disciples - Send",
          "target": "20",
          "type": "complex",
        },
        "dMs0DJmz3n53DNvKFYux": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "default",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "children",
                "id": ":0am 2101y1n )0t",
                "included": true,
                "number": "2",
              },
              {
                "class": "condition",
                "gen": "children",
                "id": " Tta1 a0(:)lSTa9",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "A student with two disciples and a CE ",
          "label": "Multiplier",
          "target": 0,
          "type": "complex",
        },
        "default": {
          "desc": "A vocational Member of the Movement",
          "label": "Missionary",
          "style": {
            "background": "#4c6a87",
            "color": "#ffffff",
            "outline": "#4c6a87",
            "round": false,
            "shape": "round-left",
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "el1rE8E rArnt0a1": {
          "desc": "A Member who is enrolled as an international student",
          "icon": "INT",
          "label": "International Student",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "gUPCtQRdfYjdrotyfUht": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "UDpXKKGAB0JpICs1Jfi5",
                "included": true,
              },
            ],
            "operator": "OR",
          },
          "desc": "Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. ",
          "label": "Completed Basic Follow Up",
          "target": 0,
          "type": "complex",
        },
        "hkPIB0YcW8UuFh5Seodp": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": ":0am 2101y1n )0t",
                "included": true,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "RYvrItrcLBumN2l1B2ZB",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "A member who is discipled and also regularly sharing their faith",
          "label": "Disciple doing outreach regularly",
          "target": 0,
          "type": "complex",
        },
        "hogn1UUCuMhDOCtwvkAk": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "parent",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "parent",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "(7lr10aTrtmd e (",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "The number of non-christians connected to a student",
          "label": "Non-Christian Connecting with a Student",
          "target": 0,
          "type": "complex",
        },
        "iF7g2h2sXmYM7i7FaYxk": {
          "desc": "A Member who is currently on prac",
          "icon": "PR",
          "label": "On Prac",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "j6Zq9tbZXweMbboALDs8": {
          "desc": "Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.",
          "icon": "",
          "label": "Exploring Christianity (Completed)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "mH7ZmSClmCXE4DlXMNRD": {
          "desc": "A subsection of this Movement",
          "label": "--System--",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "n42a2Mrlu )thr0r": {
          "desc": "Is graduating within 12 months",
          "icon": "FY",
          "label": "Final Year",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "o86cGQi6TP7AWM4qpYSr": {
          "desc": "Has attended a Global Missions project",
          "icon": "",
          "label": "Global Missions",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "oDXJHWBEdnwNOx6oR0sc": {
          "desc": "Is currently doing 'My 5 Things' or Equivalent",
          "icon": "",
          "label": "5 Things (Current)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "oOvDZwfqXwDkTsEoWvBk": {
          "desc": "A Member who is involved/connected to Local and ISM",
          "icon": "",
          "label": "Bridge",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "qXEKtqJjrZB4KbZZcXtw": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "condition",
                "gen": "member",
                "id": ":0am 2101y1n )0t",
                "included": true,
              },
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "children",
                    "id": ":0am 2101y1n )0t",
                    "included": false,
                  },
                  {
                    "class": "condition",
                    "gen": "children",
                    "id": " Tta1 a0(:)lSTa9",
                    "included": false,
                  },
                ],
                "operator": "OR",
              },
            ],
            "operator": "AND",
          },
          "desc": `\"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).

Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students.\"`,
          "label": "Committed Followers - Train",
          "target": "40",
          "type": "complex",
        },
        "rTrr2d 3ed+1i3aa": {
          "desc": "A Member who is not studying at this campus",
          "icon": "NOC",
          "label": "Not on Campus",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "rYMogPL8oQOx8bJdAMa2": {
          "desc": "A Member who is female",
          "icon": "",
          "label": "*Female",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "shape": "round",
            "shapeOverride": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "t tEe475  iaa00 ": {
          "desc": "Fourth year student",
          "icon": "4",
          "label": "Year 4",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "uMzNgQ5eRzJe84aER4RN": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "11ttn nu101dGd m",
                "included": true,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "RYvrItrcLBumN2l1B2ZB",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "children",
                "id": ":0am 2101y1n )0t",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "children",
                "id": " Tta1 a0(:)lSTa9",
                "included": false,
              },
            ],
            "operator": "AND",
          },
          "desc": `\"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.

Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change.\"`,
          "label": "Involved Students - Build",
          "target": 0,
          "type": "complex",
        },
        "uccncwo7eGV0atXPCFW9": {
          "desc": "A member who is regularly involved, at least 2 activities a week",
          "icon": "",
          "label": "Involved",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "uu56d6XxJqsWgFJJPr3A": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": " Tta1 a0(:)lSTa9",
                "included": true,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "(7lr10aTrtmd e (",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "Number of people you started meeting with regularly to share the gospel (count once from your second meeting).",
          "label": "Evangelistic Contact",
          "target": 0,
          "type": "complex",
        },
        "wA08VoUz4sIPERRSyujq": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "id": "uu56d6XxJqsWgFJJPr3A",
                  },
                  {
                    "class": "condition",
                    "id": "treeTotal",
                  },
                ],
                "operator": "divide",
              },
              {
                "class": "number",
                "value": "100",
              },
            ],
            "operator": "multiply",
          },
          "desc": "",
          "label": "Evangelistic Contacts/Total",
          "target": 0,
          "type": "calc",
          "unit": "%",
        },
        "xcCy4Blwgkd9WLuVErNF": {
          "desc": "A Member who is currently going through First Steps",
          "icon": "FS",
          "label": "First Steps (Current)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
      }
      let doc = await MovDoc.collection('lists').doc('styles').get()
        expect(doc).toBeDefined()
        let data = doc.data()

        expect(data).toEqual(styles)
    });
    it('should add trees list', async () => {
      const trees = {
        'main-tree': {
          id: 'main-tree',
          label: 'Main Tree'
        },
        noParents: {
          id: 'noParents',
          label: 'No Parents'
        }
      }
      let doc = await MovDoc.collection('lists').doc('trees').get()
      expect(doc).toBeDefined()
      let data = doc.data()

      expect(data).toEqual(trees)
    });
  })

  it.todo('should update trends')

  describe('should update snapshots', () => {
    let snapsCol = MovDoc.collection('snapshots')
    let testSnaps = {
       '9-2021': {
         snap: {
          title: "October 2021",
          color: 'white',
          backgroundColor: '#51247a',
          createdBy: {
            "displayName": "MT System",
            "email": "movementtrackerapp@gmail.com",
            "photoURL": "/app-logo-128x128.png",
            "uid": "system",
          },
          date: {
            "_nanoseconds": 979000000,
            "_seconds": 1633010469,
          },
         },
         lists: {
           members: {
            nCiB1F8JDdudJO6Xyivy: { name: 'Allie Young', id: 'nCiB1F8JDdudJO6Xyivy' },
            j6TEsBzkZxvWOaVvLp41: { name: 'Tamara', id: 'j6TEsBzkZxvWOaVvLp41' },
            RgcNYB5Y6tehuiPF3fiU: { name: 'Paul Wang', id: 'RgcNYB5Y6tehuiPF3fiU' },
            lnWb8l2hKNpy7rnPBRlX: { name: 'Yasmin Henry', id: 'lnWb8l2hKNpy7rnPBRlX' },
            FKeSTfqt39M2Q0zkMie7: { name: 'Austin', id: 'FKeSTfqt39M2Q0zkMie7' },
            sCk0ORSlIKlI4TEMoj6L: { name: 'Vrinda Eswaran', id: 'sCk0ORSlIKlI4TEMoj6L' },
            Vx9Ls5n10O2NX3RhmB4M: { name: 'Amy Lazarus', id: 'Vx9Ls5n10O2NX3RhmB4M' },
            ae8cnpOcO5ONsTaQqj9l: { name: 'Jasmin Maxwell', id: 'ae8cnpOcO5ONsTaQqj9l' },
            pj0ivaS4d6JrHgtSVIke: { name: 'Israel Escano', id: 'pj0ivaS4d6JrHgtSVIke' },
            PtKGhRuTQIckzpB0a9Hx: {
              name: '--Involved Christian with No Parent--',
              id: 'PtKGhRuTQIckzpB0a9Hx'
            },
            '3VcOYykTqk3aueEM1qz4': { name: 'Josheph Krebs', id: '3VcOYykTqk3aueEM1qz4' },
            OxsxDa0Fwpo6Jm4L9G3U: { name: 'Rachel Augustine', id: 'OxsxDa0Fwpo6Jm4L9G3U' },
            VmtdU8nxHjWZduJEhlXm: { name: 'Caleb Webb', id: 'VmtdU8nxHjWZduJEhlXm' },
            N0bpRvG0h1vu7Wk7lrbN: { name: 'Juliet Biemann', id: 'N0bpRvG0h1vu7Wk7lrbN' },
            '2oGzh8Nb5rCjF246qgWB': { name: 'Nicholas Grice', id: '2oGzh8Nb5rCjF246qgWB' },
            AYrrEdMNFaOw0Cdb2TRf: { name: 'Luke', id: 'AYrrEdMNFaOw0Cdb2TRf' },
            SvRZTpTmTOQ7NBP7ixJD: { name: 'James Baumgart', id: 'SvRZTpTmTOQ7NBP7ixJD' },
            m7BhOkFAkPyfOXvSuYND: { name: 'Nicholas', id: 'm7BhOkFAkPyfOXvSuYND' },
            QLjMOU3G8Vi9aPLJGWnT: { name: 'Zahlia', id: 'QLjMOU3G8Vi9aPLJGWnT' },
            yNCl3NiDFOkJvtrUh1ib: { name: 'Caleb ', id: 'yNCl3NiDFOkJvtrUh1ib' },
            m6mCdveLWNgJGyDF9Sjo: { name: 'Annelise Terblanche', id: 'm6mCdveLWNgJGyDF9Sjo' },
            Rz0JcTPlcajfgO5UwKFL: { name: 'Jasmine Pearce', id: 'Rz0JcTPlcajfgO5UwKFL' },
            o4GPRVN5JlqsntU4ZEQs: { name: 'Simone Hindsberger', id: 'o4GPRVN5JlqsntU4ZEQs' },
            oJ3Twl5YTFghxMadZOja: { name: 'Connor', id: 'oJ3Twl5YTFghxMadZOja' },
            '2e1etGimRhzJdEDLqHYm': { name: 'Sophie James', id: '2e1etGimRhzJdEDLqHYm' },
            bprNzBn8L1OQeudiGfPg: { name: 'Martin', id: 'bprNzBn8L1OQeudiGfPg' },
            wXFzr07Qu7ID9TuoMTeD: { name: 'Cedric', id: 'wXFzr07Qu7ID9TuoMTeD' },
            JNgyOyrypDRS7XlDoLvO: { name: 'Felicity Anderson', id: 'JNgyOyrypDRS7XlDoLvO' },
            '1Otp49vJ6Krcyvwcn4Mb': { name: '--TO BE DELETED--', id: '1Otp49vJ6Krcyvwcn4Mb' },
            s9GBQtmBPI4mL6VYlPmM: { name: 'Diep Ngo', id: 's9GBQtmBPI4mL6VYlPmM' },
            DLy4fRpkzW8IkP2JGn6i: { name: 'Jessie Ellis', id: 'DLy4fRpkzW8IkP2JGn6i' },
            '8TSC0q4pjKZXj8Batzq0': { name: 'Leanne de Jongh', id: '8TSC0q4pjKZXj8Batzq0' },
            kl4RSMlI2LqxV2KePQQI: { name: 'Lexie Glasson', id: 'kl4RSMlI2LqxV2KePQQI' },
            OFm9vtWv54mDrkIZ5zMD: { name: 'Harry', id: 'OFm9vtWv54mDrkIZ5zMD' },
            CIo4dNwnNuslhMuPblY9: { name: 'Georgia Forster', id: 'CIo4dNwnNuslhMuPblY9' },
            flK72VhEp2aAgnA40uCy: { name: 'Yodi Siu', id: 'flK72VhEp2aAgnA40uCy' },
            tAWgKRf9DSaQLAcTjQ3z: { name: 'Dylan T', id: 'tAWgKRf9DSaQLAcTjQ3z' },
            '03OBFstGenJLSwkPyoIe': { name: 'Sean Cosijn', id: '03OBFstGenJLSwkPyoIe' },
            DyFunsfjR9vg2TclhCNP: { name: 'Sophie', id: 'DyFunsfjR9vg2TclhCNP' },
            OUoFZow0aN1cq2ICip1G: { name: 'Bella Lombule', id: 'OUoFZow0aN1cq2ICip1G' },
            yPQP77fEJfzPB7AvFkUO: { name: 'Genevieve Brook', id: 'yPQP77fEJfzPB7AvFkUO' },
            N3CcEWZsAHvOCC3Y0XrD: { name: 'Lily Biggs', id: 'N3CcEWZsAHvOCC3Y0XrD' },
            clKfwO2Gln88sDOYGgeL: { name: 'Rory', id: 'clKfwO2Gln88sDOYGgeL' },
            sL2bXbm2oeu3nrFkyTzj: { name: 'Daniel Plumbe', id: 'sL2bXbm2oeu3nrFkyTzj' },
            '5jajm7QQP6bExdVhhG8k': { name: 'Abbey P', id: '5jajm7QQP6bExdVhhG8k' },
            '5LWB5cBbj9EIpd6bk2I3': { name: 'Jonathan Tiss', id: '5LWB5cBbj9EIpd6bk2I3' },
            OEdGg5FL2Oq0IlcfQue8: { name: 'Steffi', id: 'OEdGg5FL2Oq0IlcfQue8' },
            dV1qaOGk3FnzZFNUw1oZ: { name: 'Jenna Maurel', id: 'dV1qaOGk3FnzZFNUw1oZ' },
            siH75ijS6P0c3E6DRe4d: { name: 'Hazel', id: 'siH75ijS6P0c3E6DRe4d' },
            '41g0Esm7MYlYVjWummPM': { name: 'James Yelland', id: '41g0Esm7MYlYVjWummPM' },
            fnbxJCK4oF9458qiVtIx: { name: 'Brynlea Gibson', id: 'fnbxJCK4oF9458qiVtIx' },
            '8ZSvPVPsvyc7K0vdk2ez': { name: 'Rasika Grice', id: '8ZSvPVPsvyc7K0vdk2ez' },
            FClWLoiM7zyzV7RzwJr7: { name: 'Hamish', id: 'FClWLoiM7zyzV7RzwJr7' },
            pHTIyu3nx6MPhmF7AgXc: { name: 'Natalie Iru', id: 'pHTIyu3nx6MPhmF7AgXc' },
            '9BX1jaJYTqzAeFloX4bI': { name: "Riley O'Shannessy", id: '9BX1jaJYTqzAeFloX4bI' },
            H0EWkGM7CF7ZCAl3u6Wc: { name: 'Dougal', id: 'H0EWkGM7CF7ZCAl3u6Wc' },
            VqNOBhniLhWQN397vZFp: { name: 'Rachel King', id: 'VqNOBhniLhWQN397vZFp' },
            b6htdXEpqVWVkVbPfqwj: { name: 'Nick Ellis', id: 'b6htdXEpqVWVkVbPfqwj' },
            j8uBHU5MCo6eaBUidhKA: { name: 'Carla Coetzee', id: 'j8uBHU5MCo6eaBUidhKA' },
            iKkzRo4LNx8fZS9LpdFJ: { name: 'Sarah Millar', id: 'iKkzRo4LNx8fZS9LpdFJ' },
            SA4jQtdFuI0srEDYDa3o: { name: 'Alice Middleton', id: 'SA4jQtdFuI0srEDYDa3o' },
            EARQFdxmZsJgVhFUh4qn: { name: 'Madison Dowie', id: 'EARQFdxmZsJgVhFUh4qn' },
            qOba1QSzmOB2BHL8WqFD: { name: 'Tricia Minjung Wu', id: 'qOba1QSzmOB2BHL8WqFD' },
            '1675Xwq0bFBMZO0XmvsP': { name: 'Will Shorrock-Browne', id: '1675Xwq0bFBMZO0XmvsP' },
            '711TRvfJpvVwFjL6Dnti': { name: 'Cooper G', id: '711TRvfJpvVwFjL6Dnti' },
            OPFH9KNwqXeYRvopnoFM: { name: 'Angelo Flores', id: 'OPFH9KNwqXeYRvopnoFM' },
            HaorE8zql5fNXzssp5Cu: { name: 'Chris', id: 'HaorE8zql5fNXzssp5Cu' },
            '8qCpKI0Tutff2OJrVvBx': { name: 'Manish', id: '8qCpKI0Tutff2OJrVvBx' },
            iALW2O72jJSCVfk1NSTJ: { name: 'Leon', id: 'iALW2O72jJSCVfk1NSTJ' },
            FnPh5VIW2GgaJKiZjUQ8: { name: 'Ashlea Wong', id: 'FnPh5VIW2GgaJKiZjUQ8' },
            HayQhdlGsKxKbfPlo5ON: { name: 'Chantelle Moimoi', id: 'HayQhdlGsKxKbfPlo5ON' },
            YrZB0KJL94BSnecnK6t4: { name: 'Sophia Cossa', id: 'YrZB0KJL94BSnecnK6t4' },
            zbTCywlmeHOCBa8h7o6F: { name: 'Crispian Yedmass', id: 'zbTCywlmeHOCBa8h7o6F' },
            C1nQX607TTJiHSaJQdSF: { name: 'Naziah Siddiddique', id: 'C1nQX607TTJiHSaJQdSF' },
            YQo4XDW0bguEuYKyqxVL: { name: 'Brooke', id: 'YQo4XDW0bguEuYKyqxVL' },
            FuiywanMGBuUQgpSchxY: { name: 'Sandy Ghermann', id: 'FuiywanMGBuUQgpSchxY' },
            LGhHDHpSP4H2LHF2C5RY: { name: 'Pablo Parra', id: 'LGhHDHpSP4H2LHF2C5RY' },
            o5V7o5UtDsH6QJE09QMN: { name: 'Celina', id: 'o5V7o5UtDsH6QJE09QMN' },
            iagy3QI3gujOxnRcpo6H: { name: 'Abbey Grice', id: 'iagy3QI3gujOxnRcpo6H' },
            v5XZdAcEsZDKSTfC2LgH: { name: 'Isobelle Trevatt', id: 'v5XZdAcEsZDKSTfC2LgH' },
            GKr2gWle6N4msCwBcPvV: { name: 'Cas Maclean', id: 'GKr2gWle6N4msCwBcPvV' },
            LvE0yC4ljZurVias8jex: { name: 'Lizzy Hopper', id: 'LvE0yC4ljZurVias8jex' },
            SisCsMdoKIAjnCX19y52: { name: 'David', id: 'SisCsMdoKIAjnCX19y52' },
            der2XOL3Gdqua6LyH1xj: { name: 'Evie', id: 'der2XOL3Gdqua6LyH1xj' },
            FRe93Gn4ICmPF8suHxsB: { name: 'Josh Grice', id: 'FRe93Gn4ICmPF8suHxsB' },
            KIysPYAG8YsT6dMYqhS6: { name: 'Emma Adams', id: 'KIysPYAG8YsT6dMYqhS6' },
            O0WpvvNuAQ1EK4nQp6qq: { name: 'Liam Black', id: 'O0WpvvNuAQ1EK4nQp6qq' },
            aE7Mu556fCJIhvxJY00y: { name: 'Tiarne Gray', id: 'aE7Mu556fCJIhvxJY00y' },
            qe4D4hHsAVrKVv8iLCE2: { name: 'Sarah Murphy', id: 'qe4D4hHsAVrKVv8iLCE2' },
            qlahLMCw2qVxmA5o5gpR: { name: 'Kate Harris', id: 'qlahLMCw2qVxmA5o5gpR' },
            tT0IRk2dmBdLQyeMBKfB: { name: 'Yang L', id: 'tT0IRk2dmBdLQyeMBKfB' },
            DdFgHnVDTtKLjbdOeEyR: { name: 'Jamie Mackintosh', id: 'DdFgHnVDTtKLjbdOeEyR' },
            p4DWXe5G3efllrPi7SM2: { name: 'Kieran Boyle', id: 'p4DWXe5G3efllrPi7SM2' },
            '6U8f3cPHbILYvrNrW3UV': { name: 'Jack Ryan', id: '6U8f3cPHbILYvrNrW3UV' },
            KyOhn6L12Nd1YlwAAtwF: { name: 'Lachlan Cooley', id: 'KyOhn6L12Nd1YlwAAtwF' },
            WZ1GggK61NUYI2BebS36: { name: 'Kayla Turnbull', id: 'WZ1GggK61NUYI2BebS36' },
            '0F7QAUqwwjR8WwfU6roJ': { name: 'Mitch Poloni', id: '0F7QAUqwwjR8WwfU6roJ' },
            c6dRupke4wlwBpyCyWOv: { name: 'Zac Maxwell', id: 'c6dRupke4wlwBpyCyWOv' },
            '5SMB4YnkuYLSRpv3Vb7K': { name: 'Sinead', id: '5SMB4YnkuYLSRpv3Vb7K' },
            Ufyr7Qb9hJqlsR6rykBP: { name: 'Lewis Reed', id: 'Ufyr7Qb9hJqlsR6rykBP' },
            '7dkOAcvhXgbUlCsuXYLZ': { name: 'Lydia', id: '7dkOAcvhXgbUlCsuXYLZ' },
            fdvFS9D1VJ2cDGgD3nSX: { name: 'Bronwen Nel', id: 'fdvFS9D1VJ2cDGgD3nSX' },
            v11qo1Q8Zy1NB34uvxmP: { name: 'Rachael Dingwall', id: 'v11qo1Q8Zy1NB34uvxmP' },
            H52Kf6Alu5knusGxEGrB: { name: 'Selina Wang', id: 'H52Kf6Alu5knusGxEGrB' },
            IEIWmAwKUWYqIqSZyHaE: { name: 'Chloe', id: 'IEIWmAwKUWYqIqSZyHaE' },
            rVtq0wgniMj2TRLJ6jBN: { name: 'Liam Lay', id: 'rVtq0wgniMj2TRLJ6jBN' },
            CHtIeJThnGhzAeWWks5g: { name: 'Bri Vandersee', id: 'CHtIeJThnGhzAeWWks5g' },
            QXgeY465UVsKnfdwFW48: { name: 'Olivia Durrheim', id: 'QXgeY465UVsKnfdwFW48' },
            UtOHfX9BDZhmhUAYjrM2: { name: 'Shienne', id: 'UtOHfX9BDZhmhUAYjrM2' },
            siuoK9YsLPm7iEopYACR: { name: 'Stephen Philpot', id: 'siuoK9YsLPm7iEopYACR' },
            TYsR7mwU7C7XwOfzsIcZ: { name: 'Frank', id: 'TYsR7mwU7C7XwOfzsIcZ' },
            ketIhx0ruiO4RT7soEYD: { name: 'Seann Boo', id: 'ketIhx0ruiO4RT7soEYD' },
            QeIm063qu8xHAgcvK34c: { name: 'Catriona Rice', id: 'QeIm063qu8xHAgcvK34c' },
            '5HyKxGyIg9rVtled64g7': { name: 'Tahlia', id: '5HyKxGyIg9rVtled64g7' },
            w9aPvaYAoM8mdOHvxhNQ: { name: 'Arya Clark', id: 'w9aPvaYAoM8mdOHvxhNQ' },
            dgYClNToNO7TjQKgEipH: { name: 'Megan Jones', id: 'dgYClNToNO7TjQKgEipH' },
            "8lLE3MQyAZcQvTKiR3rH": {
          "id": "8lLE3MQyAZcQvTKiR3rH",
          "name": "Amy Harri",
        },
    "jr1uvC1fhzIXyQupaepD": {
          "id": "jr1uvC1fhzIXyQupaepD",
          "name": "Blake",
        },
        "kDv1llMqIjlgpHN8EUUT": {
          "id": "kDv1llMqIjlgpHN8EUUT",
          "name": "Petra Poloni",
        },
    "kpG8fY9pkIk1hqcxQWdq": {
          "id": "kpG8fY9pkIk1hqcxQWdq",
          "name": "Sebastian",
        },
          },
           styles: {
             " Tta1 a0(:)lSTa9": {
      "desc": "A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)",
      "icon": "EC",
      "label": "Exploring Christianity",
      "style": {
        "background": "#ff9c39",
        "backgroundOverride": false,
        "color": "#000000",
        "colorOverride": null,
        "outline": "#FFFFFF",
        "outlineOverride": false,
        "prepend": false,
        "round": false,
        "underline": false,
      },
      "target": 0,
      "type": "mod",
    },
    " a1i n 5mnary0T+": {
      "desc": "An official student leader on campus, part of the MB team",
      "label": "Student Leader",
      "style": {
        "background": "#31ccec",
        "color": "#000000",
        "outline": "#31ccec",
        "round": false,
        "underline": false,
      },
      "target": 0,
      "type": "role",
    },
    "(7lr10aTrtmd e (": {
      "desc": "A member who is not yet a Christian (Must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-Xn know that they are exploring Christianity within PTC?)",
      "label": "Non-Christian",
      "style": {
        "background": "#b82218",
        "color": "#ffffff",
        "outline": "#b82218",
        "round": true,
        "shape": "round-diag",
        "underline": false,
      },
      "target": 0,
      "type": "role",
    },
    "0 u5rSSaraMtTM61": {
      "desc": "Third Year Student",
      "icon": "3",
      "label": "Year 3",
      "style": {
        "background": "#FFFFFF",
        "backgroundOverride": false,
        "color": "#000000",
        "outline": "#FFFFFF",
        "prepend": true,
        "round": false,
        "underline": false,
      },
      "target": 0,
      "type": "mod",
    },
    "0aS0 altn5ndGS d": {
      "desc": " Fifth Year Student",
      "icon": "5",
      "label": "Year 5",
      "style": {
        "background": "#FFFFFF",
        "color": "#000000",
        "outline": "#FFFFFF",
        "prepend": true,
        "round": false,
        "underline": false,
      },
      "target": 0,
      "type": "mod",
    },
    "0d yiM7aTa1aet0T": {
      "desc": "A member who became a Christian through this movement",
      "icon": null,
      "label": "New Christian through Movement",
      "style": {
        "background": "#FFFFFF",
        "backgroundOverride": null,
        "color": "#ff0000",
        "colorOverride": true,
        "outline": "#FFFFFF",
        "outlineOverride": null,
        "prepend": false,
        "round": false,
        "underline": false,
      },
      "target": 0,
      "type": "mod",
    },
        "11ttn nu101dGd m": {
          "desc": "A member who is a christian (Must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)",
          "label": "Christian",
          "style": {
            "background": "#d1cabc",
            "color": "#000000",
            "outline": "#d1cabc",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "3ao5OGXsDa6eWIwqzfkv": {
          "desc": "This person assists the movement in an official capacity but is not part of the missionary or Student Leader teams",
          "label": "Associate / Volunteer",
          "style": {
            "background": "#3076ba",
            "backgroundOverride": false,
            "color": "#ffffff",
            "colorOverride": false,
            "outline": "#3076ba",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "shape": "round-right",
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "3ohW3FU65MTUnJuQHkvB": {
          "desc": "Second Year Student",
          "icon": "2",
          "label": "Year 2",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "46akFzeUaeqBWC3IBXV2": {
          "desc": "A person who is Male",
          "icon": null,
          "label": "*Male",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "7RmRpoE0w86et5oFJV6Q": {
          "desc": "Has Attended a Local Summer Project",
          "icon": null,
          "label": "Summer Project",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "99e2XOwRbZgb773aGLAg": {
          "desc": "A Non Christian who is coming to Alpha",
          "icon": null,
          "label": "Alpha (Completed)",
          "style": {
            "background": "#ff9c39",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        ":0am 2101y1n )0t": {
          "desc": "A member being discipled on Campus",
          "icon": null,
          "label": "Disciple",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#ff8000",
            "outlineOverride": true,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "G8SRxWpXvfz5aIk9OdgP": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "IHpI6i86UwHaBHKlDfsn",
                "included": true,
              },
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "n42a2Mrlu )thr0r",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the \"5 Things\" in place?",
          "label": "Lifetime Labourer",
          "target": 0,
          "type": "complex",
        },
        "IHpI6i86UwHaBHKlDfsn": {
          "desc": "Has completed 'My 5 Things' or Equivalent",
          "icon": null,
          "label": "5 Things (Completed)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "JQtDoHf85B3HCPtyxQvG": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "rYMogPL8oQOx8bJdAMa2",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "46akFzeUaeqBWC3IBXV2",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "mH7ZmSClmCXE4DlXMNRD",
                "included": false,
              },
            ],
            "operator": "AND",
          },
          "desc": "A member without an assigned gender",
          "label": "No Specified Gender",
          "target": 0,
          "type": "complex",
        },
        "KA7mWeXalOkMuY2pgXHR": {
          "desc": "First year Student",
          "icon": "1",
          "label": "Year 1",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "KhRaG31GtlG5mpnThUdH": {
          "desc": "A member committed to finidng 2 Disciples and a CE",
          "icon": null,
          "label": "Multiplier (Aspirational)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "L7Ypv2NtQUSVhcJRQTgO": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "0d yiM7aTa1aet0T",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.",
          "label": "Remaining Fruit",
          "target": 0,
          "type": "complex",
        },
        "MM raida3utaTd 1": {
          "desc": "Seventh Year Student",
          "icon": "7",
          "label": "Year 7",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "MrAa9r 99   irA ": {
          "desc": "Sixth Year Student",
          "icon": "6",
          "label": "Year 6",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "RYvrItrcLBumN2l1B2ZB": {
          "desc": "A member who is intentionally sharing their faith regularly (at least once every two weeks)",   
          "icon": "RO",
          "label": "Regular Outreach",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "UDpXKKGAB0JpICs1Jfi5": {
          "desc": "Has completed First Steps or equivalent",
          "icon": null,
          "label": "First Steps (Completed)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "XPHi4AUKU8bks8dS6VAo": {
          "desc": "A member involved in a Prayer time with others from this movement",
          "icon": null,
          "label": "Prayer",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "cl07bEKOEIZ8ytnfEf69": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "3ohW3FU65MTUnJuQHkvB",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "0 u5rSSaraMtTM61",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "t tEe475  iaa00 ",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "0aS0 altn5ndGS d",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "MrAa9r 99   irA ",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "MM raida3utaTd 1",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "KA7mWeXalOkMuY2pgXHR",
                "included": false,
              },
            ],
            "operator": "AND",
          },
          "desc": "A member who doesn't have an assigned year",
          "label": "No Year",
          "target": "2",
          "type": "complex",
        },
        "covZf40QClhwnN7xPRl2": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "children",
                    "id": ":0am 2101y1n )0t",
                    "included": true,
                  },
                  {
                    "class": "expression",
                    "elements": [
                      {
                        "class": "condition",
                        "gen": "member",
                        "id": "RYvrItrcLBumN2l1B2ZB",
                        "included": true,
                      },
                      {
                        "class": "condition",
                        "gen": "children",
                        "id": " Tta1 a0(:)lSTa9",
                        "included": true,
                      },
                    ],
                    "operator": "OR",
                  },
                ],
                "operator": "AND",
              },
            ],
            "operator": "AND",
          },
          "desc": `\"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.

Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)\"`,
          "label": "Multiplying Disciples - Send",
          "target": "20",
          "type": "complex",
        },
        "dMs0DJmz3n53DNvKFYux": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "default",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "children",
                "id": ":0am 2101y1n )0t",
                "included": true,
                "number": "2",
              },
              {
                "class": "condition",
                "gen": "children",
                "id": " Tta1 a0(:)lSTa9",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "A student with two disciples and a CE ",
          "label": "Multiplier",
          "target": 0,
          "type": "complex",
        },
        "default": {
          "desc": "A vocational member of the movement",
          "label": "Missionary",
          "style": {
            "background": "#4c6a87",
            "color": "#ffffff",
            "outline": "#4c6a87",
            "round": false,
            "shape": "round-left",
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "el1rE8E rArnt0a1": {
          "desc": "A member who is enrolled as an international student",
          "icon": "INT",
          "label": "International Student",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "gUPCtQRdfYjdrotyfUht": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "UDpXKKGAB0JpICs1Jfi5",
                "included": true,
              },
            ],
            "operator": "OR",
          },
          "desc": "Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. ",
          "label": "Completed Basic Follow Up",
          "target": 0,
          "type": "complex",
        },
        "hkPIB0YcW8UuFh5Seodp": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": ":0am 2101y1n )0t",
                "included": true,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "RYvrItrcLBumN2l1B2ZB",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "A member who is discipled and also regularly sharing their faith",
          "label": "Disciple doing outreach regularly",
          "target": 0,
          "type": "complex",
        },
        "hogn1UUCuMhDOCtwvkAk": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "parent",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "parent",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "(7lr10aTrtmd e (",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "The number of non-christians connected to a student",
          "label": "Non-Christian Connecting with a Student",
          "target": 0,
          "type": "complex",
        },
        "iF7g2h2sXmYM7i7FaYxk": {
          "desc": "A member who is on currently prac",
          "icon": "PR",
          "label": "On Prac",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "j6Zq9tbZXweMbboALDs8": {
          "desc": "Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.",
          "icon": null,
          "label": "Exploring Christianity (Completed)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "mH7ZmSClmCXE4DlXMNRD": {
          "desc": "A subsection of the UQ local movement",
          "label": "--UQ System--",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "n42a2Mrlu )thr0r": {
          "desc": "A member who is graduating within 12 months",
          "icon": "FS",
          "label": "Final Year",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "o86cGQi6TP7AWM4qpYSr": {
          "desc": "Has attended a Global Missions Project",
          "icon": null,
          "label": "Global Missions",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "oDXJHWBEdnwNOx6oR0sc": {
          "desc": "Is currently doing 'My 5 Things' or Equivalent",
          "icon": null,
          "label": "5 Things (Current)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "oOvDZwfqXwDkTsEoWvBk": {
          "desc": "A member who is involved/connected to Local & ISM",
          "icon": null,
          "label": "Bridge",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "qXEKtqJjrZB4KbZZcXtw": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": " a1i n 5mnary0T+",
                    "included": true,
                  },
                  {
                    "class": "condition",
                    "gen": "member",
                    "id": "11ttn nu101dGd m",
                    "included": true,
                  },
                ],
                "operator": "OR",
              },
              {
                "class": "condition",
                "gen": "member",
                "id": ":0am 2101y1n )0t",
                "included": true,
              },
              {
                "class": "expression",
                "elements": [
                  {
                    "class": "condition",
                    "gen": "children",
                    "id": ":0am 2101y1n )0t",
                    "included": false,
                  },
                  {
                    "class": "condition",
                    "gen": "children",
                    "id": " Tta1 a0(:)lSTa9",
                    "included": false,
                  },
                ],
                "operator": "OR",
              },
            ],
            "operator": "AND",
          },
          "desc": `\"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).

Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students.\"`,
          "label": "Committed Followers - Train",
          "target": "40",
          "type": "complex",
        },
        "rTrr2d 3ed+1i3aa": {
          "desc": "A member who is not studying at this campus",
          "icon": "NOC",
          "label": "Not on Campus",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "rYMogPL8oQOx8bJdAMa2": {
          "desc": "A person who is Female",
          "icon": null,
          "label": "*Female",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "shape": "round",
            "shapeOverride": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "t tEe475  iaa00 ": {
          "desc": "Fourth Year Student",
          "icon": "4",
          "label": "Year 4",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "uMzNgQ5eRzJe84aER4RN": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": "11ttn nu101dGd m",
                "included": true,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "RYvrItrcLBumN2l1B2ZB",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "children",
                "id": ":0am 2101y1n )0t",
                "included": false,
              },
              {
                "class": "condition",
                "gen": "children",
                "id": " Tta1 a0(:)lSTa9",
                "included": false,
              },
            ],
            "operator": "AND",
          },
          "desc": `\"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.

Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change.\"`,
          "label": "Involved Students - Build",
          "target": 0,
          "type": "complex",
        },
        "uccncwo7eGV0atXPCFW9": {
          "desc": "A member who is regularly involved, at least 2 activities a week",
          "icon": null,
          "label": "Involved",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "uu56d6XxJqsWgFJJPr3A": {
          "condition": {
            "class": "expression",
            "elements": [
              {
                "class": "condition",
                "gen": "member",
                "id": " Tta1 a0(:)lSTa9",
                "included": true,
              },
              {
                "class": "condition",
                "gen": "member",
                "id": "(7lr10aTrtmd e (",
                "included": true,
              },
            ],
            "operator": "AND",
          },
          "desc": "Number of people you started meeting with regularly to share the gospel (count once from your second meeting).",
          "label": "Evangelistic Contact",
          "target": 0,
          "type": "complex",
        },
        "xcCy4Blwgkd9WLuVErNF": {
          "desc": "A member who is currently going through First Steps or Equivalent",
          "icon": "FS",
          "label": "First Steps (Current)",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
      },
           trees: {
            'main-tree': {
              id: 'main-tree',
              label: 'Main Tree'
            },
            noParents: {
              id: 'noParents',
              label: 'No Parents'
            }
          }
         },
         members: [
          {
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              ':0am 2101y1n )0t',
              '46akFzeUaeqBWC3IBXV2',
              'KhRaG31GtlG5mpnThUdH',
              '3ohW3FU65MTUnJuQHkvB',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [2]Sean Cosijn [RO]',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Sean Cosijn',
            id: '03OBFstGenJLSwkPyoIe'
          },
          {
            id: '0F7QAUqwwjR8WwfU6roJ',
            mods: [ 'o86cGQi6TP7AWM4qpYSr', '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: 'default',
            customFields: {},
            display: {
              color: '#ffffff',
              shape: 'round-left',
              underline: false,
              label: 'Mitch Poloni',
              background: '#4c6a87',
              outline: '#4c6a87'
            },
            trees: ["main-tree"], name: 'Mitch Poloni'
          },
          {
            id: '1675Xwq0bFBMZO0XmvsP',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Will Shorrock-Browne',
              outline: '#d1cabc',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Will Shorrock-Browne'
          },
          {
            id: '1Otp49vJ6Krcyvwcn4Mb',
            mods: [],
            notes: 'Please make members that you want deleted a child of this member',
            role: 'mH7ZmSClmCXE4DlXMNRD',
            customFields: {},
            display: {
              shape: 'not-round',
              color: '#000000',
              underline: false,
              label: '--TO BE DELETED--',
              outline: '#FFFFFF',
              background: '#FFFFFF'
            },
            trees: ["noParents"], name: '--TO BE DELETED--'
          },
          {
            id: '2e1etGimRhzJdEDLqHYm',
            mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'Discipled by Jessie for 3 weeks in Sem 1 2020. Self opted out due to unavailability. Regularly checked in with re: events and conferences. \n' +
              'Invited to events and Breakthrough 2021. ',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [3]Sophie James',
              outline: '#d1cabc',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Sophie James'
          },
          {
            id: '2oGzh8Nb5rCjF246qgWB',
            mods: [
              ':0am 2101y1n )0t',
              '0 u5rSSaraMtTM61',
              '46akFzeUaeqBWC3IBXV2',
              '7RmRpoE0w86et5oFJV6Q',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: ' a1i n 5mnary0T+',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [3]Nicholas Grice',
              outline: '#ff8000',
              background: '#31ccec'
            },
            trees: ["main-tree"], name: 'Nicholas Grice'
          },
          {
            id: '3VcOYykTqk3aueEM1qz4',
            mods: [ '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2', ':0am 2101y1n )0t' ],
            notes: 'Encourage him to share his faith regularly',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#ff0000',
              shape: 'not-round',
              underline: false,
              label: 'Josheph Krebs',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Josheph Krebs'
          },
          {
            id: '41g0Esm7MYlYVjWummPM',
            mods: [
              '46akFzeUaeqBWC3IBXV2',
              'UDpXKKGAB0JpICs1Jfi5',
              't tEe475  iaa00 '
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [4]James Yelland',
              outline: '#d1cabc',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'James Yelland'
          },
          {
            id: '5HyKxGyIg9rVtled64g7',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
            "color": "#ffffff",
            "label": "Tahlia [EC]",
            "outline": "#b82218",
            "shape": "round-diag",
              underline: false,
            },
            trees: ["main-tree"], name: 'Tahlia'
          },
          {
            id: '5LWB5cBbj9EIpd6bk2I3',
            mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Jonathan Tiss',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Jonathan Tiss'
          },
          {
            id: '5SMB4YnkuYLSRpv3Vb7K',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              shape: 'not-round',
              color: '#000000',
              underline: false,
              label: 'Sinead',
              outline: '#d1cabc',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Sinead'
          },
          {
            id: '5jajm7QQP6bExdVhhG8k',
            mods: [
              '0d yiM7aTa1aet0T',
              'rYMogPL8oQOx8bJdAMa2',
              'j6Zq9tbZXweMbboALDs8',
              ':0am 2101y1n )0t',
              'xcCy4Blwgkd9WLuVErNF',
              '0 u5rSSaraMtTM61'
            ],
            notes: 'Became a Christian through CE with Lauren Venz in 2019.\n' +
              'Online survey contact 2021 - wants to learn to share her faith',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#ff0000',
              shape: 'not-round',
              underline: false,
              label: ' [3]Abbey P [FS]',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Abbey P'
          },
          {
            id: '6U8f3cPHbILYvrNrW3UV',
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              '46akFzeUaeqBWC3IBXV2',
              '3ohW3FU65MTUnJuQHkvB',
              ':0am 2101y1n )0t',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: ' a1i n 5mnary0T+',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [2]Jack Ryan [RO]',
              outline: '#ff8000',
              background: '#31ccec'
            },
            trees: ["main-tree"], name: 'Jack Ryan'
          },
          {
            id: '711TRvfJpvVwFjL6Dnti',
            mods: [ '3ohW3FU65MTUnJuQHkvB', '46akFzeUaeqBWC3IBXV2' ],
            notes: "Has learned more, and is currently processing - doesn't want to make a commitment just yet",       role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
              "color": "#ffffff",
              "label": " [2]Cooper G",
              "outline": "#b82218",
              "shape": "round-diag",
              underline: false,
            },
            trees: ["noParents"], name: 'Cooper G'
          },
          {
            id: '7dkOAcvhXgbUlCsuXYLZ',
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              'rYMogPL8oQOx8bJdAMa2',
              'KA7mWeXalOkMuY2pgXHR'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              background: '#d1cabc',
              "label": " [1]Lydia [RO]",
          "outline": "#d1cabc",
          "shape": "not-round",
            },
            trees: ["main-tree"], name: 'Lydia'
          },
          {
            id: '8TSC0q4pjKZXj8Batzq0',
            mods: [
              ':0am 2101y1n )0t',
              'rYMogPL8oQOx8bJdAMa2',
              'xcCy4Blwgkd9WLuVErNF',
              'KA7mWeXalOkMuY2pgXHR',
              'RYvrItrcLBumN2l1B2ZB'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              shape: 'not-round',
              color: '#000000',
              underline: false,
              label: ' [1]Leanne de Jongh [FS][RO]',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Leanne de Jongh'
          },
          {
            id: '8ZSvPVPsvyc7K0vdk2ez',
            mods: [
              '0 u5rSSaraMtTM61',
              'rYMogPL8oQOx8bJdAMa2',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [3]Rasika Grice',
              outline: '#d1cabc',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Rasika Grice'
          },
          {
            id: '8qCpKI0Tutff2OJrVvBx',
            mods: [ '46akFzeUaeqBWC3IBXV2', ':0am 2101y1n )0t' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              shape: 'not-round',
              color: '#000000',
              underline: false,
              label: 'Manish',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Manish'
          },
          {
            id: '9BX1jaJYTqzAeFloX4bI',
            mods: [ '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              shape: 'not-round',
              color: '#ff0000',
              underline: false,
              label: "Riley O'Shannessy",
              outline: '#d1cabc',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: "Riley O'Shannessy"
          },
          {
            id: 'AYrrEdMNFaOw0Cdb2TRf',
            mods: [],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              shape: 'round-diag',
              color: '#ffffff',
              underline: false,
              label: 'Luke',
              outline: '#b82218',
              background: '#b82218'
            },
            trees: ["main-tree"], name: 'Luke'
          },
          {
            id: 'C1nQX607TTJiHSaJQdSF',
            mods: [ 'MrAa9r 99   irA ', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
            "background": "#b82218",
          "color": "#ffffff",
          "label": " [6]Naziah Siddiddique",
          "outline": "#b82218",
          "shape": "round-diag",
              underline: false,
            },
            trees: ["noParents"], name: 'Naziah Siddiddique'
          },
          {
            id: 'CHtIeJThnGhzAeWWks5g',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
            notes: 'OT student  - attended Salt 2x  early Sem 2 2020. \n' +
              '\n' +
              'Invited to events and Breakthrough  - unsure about committing to events due to uni schedule\n',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              background: '#d1cabc',
              "label": " [2]Bri Vandersee",
          "outline": "#d1cabc",
          "shape": "not-round",
            },
            trees: ["noParents"], name: 'Bri Vandersee'
          },
          {
            id: 'CIo4dNwnNuslhMuPblY9',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
            notes: 'Need to find time to meet. Still awaiting response.',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": " [2]Georgia Forster",
          "outline": "#b82218",
          "shape": "round-diag",
              underline: false,
            },
            trees: ["main-tree"], name: 'Georgia Forster'
          },
          {
            id: 'DLy4fRpkzW8IkP2JGn6i',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: 'default',
            customFields: {},
            display: {
              color: '#ffffff',
              shape: 'round-left',
              underline: false,
              label: 'Jessie Ellis',
              background: '#4c6a87',
              outline: '#4c6a87'
            },
            trees: ["main-tree"], name: 'Jessie Ellis'
          },
          {
            id: 'DdFgHnVDTtKLjbdOeEyR',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              background: '#d1cabc',
              "label": " [1]Jamie Mackintosh",
          "outline": "#d1cabc",
          "shape": "not-round",
            },
            trees: ["noParents"], name: 'Jamie Mackintosh'
          },
          {
            id: 'DyFunsfjR9vg2TclhCNP',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              background: '#d1cabc',
              "label": " [2]Sophie",
          "outline": "#d1cabc",
          "shape": "not-round",
            },
            trees: ["main-tree"], name: 'Sophie'
          },
          {
            id: 'EARQFdxmZsJgVhFUh4qn',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: 'wants to be discipled (?)',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              background: '#d1cabc',
              "label": " [1]Madison Dowie",
          "outline": "#d1cabc",
          "shape": "not-round",
            },
            trees: ["noParents"], name: 'Madison Dowie'
          },
          {
            id: 'FClWLoiM7zyzV7RzwJr7',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Hamish',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Hamish'
          },
          {
            id: 'FKeSTfqt39M2Q0zkMie7',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              label: 'Austin',
              "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Austin'
          },
          {
            id: 'FRe93Gn4ICmPF8suHxsB',
            mods: [
              ':0am 2101y1n )0t',
              't tEe475  iaa00 ',
              '46akFzeUaeqBWC3IBXV2',
              '7RmRpoE0w86et5oFJV6Q',
              'KhRaG31GtlG5mpnThUdH'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [4]Josh Grice",
          "outline": "#ff8000",
              "background": "#d1cabc",
            },
            trees: ["main-tree"], name: 'Josh Grice'
          },
          {
            id: 'FnPh5VIW2GgaJKiZjUQ8',
            mods: [ '0d yiM7aTa1aet0T', '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#ff0000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Ashlea Wong",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Ashlea Wong'
          },
          {
            id: 'FuiywanMGBuUQgpSchxY',
            mods: [
              '46akFzeUaeqBWC3IBXV2',
              ':0am 2101y1n )0t',
              'xcCy4Blwgkd9WLuVErNF',
              '0 u5rSSaraMtTM61'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [3]Sandy Ghermann [FS]',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Sandy Ghermann'
          },
          {
            id: 'GKr2gWle6N4msCwBcPvV',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
            notes: 'Will see if she wants to catch up after exams to chat about evidence for God.',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              underline: false,
              "background": "#b82218",
          "color": "#ffffff",
          "label": " [2]Cas Maclean",
          "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Cas Maclean'
          },
          {
            id: 'H0EWkGM7CF7ZCAl3u6Wc',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: 'Mitch to give Nick and update',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Dougal',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Dougal'
          },
          {
            id: 'H52Kf6Alu5knusGxEGrB',
            mods: [ 'el1rE8E rArnt0a1', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Selina Wang [INT]',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["noParents"], name: 'Selina Wang'
          },
          {
            id: 'HaorE8zql5fNXzssp5Cu',
            mods: [
              '46akFzeUaeqBWC3IBXV2',
              ':0am 2101y1n )0t',
              'UDpXKKGAB0JpICs1Jfi5',
              'j6Zq9tbZXweMbboALDs8'
            ],
            notes: 'Encourage him to be sharing his faith',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Chris',
              "outline": "#ff8000",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Chris'
          },
          {
            id: 'HayQhdlGsKxKbfPlo5ON',
            mods: [
              '0 u5rSSaraMtTM61',
              '0d yiM7aTa1aet0T',
              'rYMogPL8oQOx8bJdAMa2',
              'UDpXKKGAB0JpICs1Jfi5',
              ':0am 2101y1n )0t'
            ],
            notes: 'Has completed First Steps. Compass material currently',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#ff0000',
              shape: 'not-round',
              underline: false,
              label: " [3]Chantelle Moimoi",
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Chantelle Moimoi'
          },
          {
            id: 'JNgyOyrypDRS7XlDoLvO',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              background: '#d1cabc',
              "label": " [2]Felicity Anderson",
          "outline": "#d1cabc",
          "shape": "not-round",
            },
            trees: ["noParents"], name: 'Felicity Anderson'
          },
          {
            id: 'KIysPYAG8YsT6dMYqhS6',
            mods: [
              ':0am 2101y1n )0t',
              '0 u5rSSaraMtTM61',
              'rYMogPL8oQOx8bJdAMa2',
              '7RmRpoE0w86et5oFJV6Q',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: 'Train Plan: Finding disciples this semester. ',
            role: ' a1i n 5mnary0T+',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: ' [3]Emma Adams',
              outline: '#ff8000',
              background: '#31ccec'
            },
            trees: ["main-tree"], name: 'Emma Adams'
          },
          {
            id: 'KyOhn6L12Nd1YlwAAtwF',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: 'Potential Dship',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Lachlan Cooley',
              "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Lachlan Cooley'
          },
          {
            id: 'LGhHDHpSP4H2LHF2C5RY',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
"outline": "#d1cabc",
          "shape": "not-round",
              color: '#000000',
              underline: false,
              label: 'Pablo Parra',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Pablo Parra'
          },
          {
            id: 'LvE0yC4ljZurVias8jex',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: ' - Invited to do dship with Jessie in May 2021 said no due to availability\n' +
              ' - O-week postcard contact - interested to learn how to share her faith. \n' +
              ' - Investigating different Christian clubs. Followed up by Jessie and Sean Week 1 2021. \n' +
              " - Attended salt with Yasmin 5-6x on  Thursdays. Couldn't attend Breakthrough, not planning on MYC. \n" +
              ' - Studying primary ed. ',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
"label": " [1]Lizzy Hopper",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Lizzy Hopper'
          },
          {
            id: 'N0bpRvG0h1vu7Wk7lrbN',
            mods: [
              'rYMogPL8oQOx8bJdAMa2',
              '3ohW3FU65MTUnJuQHkvB',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: 'Following up with Hazel',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [2]Juliet Biemann",
              "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Juliet Biemann'
          },
          {
            id: 'N3CcEWZsAHvOCC3Y0XrD',
            mods: [
              'rYMogPL8oQOx8bJdAMa2',
              ':0am 2101y1n )0t',
              '3ohW3FU65MTUnJuQHkvB',
              'UDpXKKGAB0JpICs1Jfi5',
              'RYvrItrcLBumN2l1B2ZB'
            ],
            notes: '',
            role: ' a1i n 5mnary0T+',
            customFields: {},
            display: {
              "shape": "not-round",
              color: '#000000',
              underline: false,
              "label": " [2]Lily Biggs [RO]",
              outline: '#ff8000',
              background: '#31ccec'
            },
            trees: ["main-tree"], name: 'Lily Biggs'
          },
          {
            id: 'O0WpvvNuAQ1EK4nQp6qq',
            mods: [
              '46akFzeUaeqBWC3IBXV2',
              '0 u5rSSaraMtTM61',
              ':0am 2101y1n )0t',
              '0d yiM7aTa1aet0T',
              'j6Zq9tbZXweMbboALDs8'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
"background": "#d1cabc",
          "color": "#ff0000",
          "label": " [3]Liam Black",
          "outline": "#ff8000",
          "shape": "not-round",
              underline: false,
            },
            trees: ["main-tree"], name: 'Liam Black'
          },
          {
            id: 'OEdGg5FL2Oq0IlcfQue8',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'Alpha? Goes to QUT',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Steffi',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["noParents"], name: 'Steffi'
          },
          {
            id: 'OFm9vtWv54mDrkIZ5zMD',
            mods: [ 'KA7mWeXalOkMuY2pgXHR', '46akFzeUaeqBWC3IBXV2' ],
            notes: 'Super keen on learning more about God. Will probably become a christian soon.',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": " [1]Harry",
          "outline": "#b82218",
          "shape": "round-diag",
              underline: false,
            },
            trees: ["main-tree"], name: 'Harry'
          },
          {
            id: 'OPFH9KNwqXeYRvopnoFM',
            mods: [ 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [4]Angelo Flores",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Angelo Flores'
          },
          {
            id: 'OUoFZow0aN1cq2ICip1G',
            mods: [
              'rYMogPL8oQOx8bJdAMa2',
              'el1rE8E rArnt0a1',
              'j6Zq9tbZXweMbboALDs8',
              'xcCy4Blwgkd9WLuVErNF',
              '0d yiM7aTa1aet0T',
              ':0am 2101y1n )0t',
              '0 u5rSSaraMtTM61'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "shape": "not-round",
              underline: false,
              "color": "#ff0000",
          "label": " [3]Bella Lombule [INT][FS]",
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Bella Lombule'
          },
          {
            id: 'OxsxDa0Fwpo6Jm4L9G3U',
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              '0 u5rSSaraMtTM61',
              ':0am 2101y1n )0t',
              'rYMogPL8oQOx8bJdAMa2',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: 'Reassessing availability and leadership commitments ',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Rachel Augustine [RO]",
          "outline": "#ff8000",
              "background": "#d1cabc",
            },
            trees: ["main-tree"], name: 'Rachel Augustine'
          },
          {
            id: 'PtKGhRuTQIckzpB0a9Hx',
            mods: [],
            notes: '',
            role: 'mH7ZmSClmCXE4DlXMNRD',
            customFields: {},
            display: {
              "background": "#FFFFFF",
              color: '#000000',
              underline: false,
              label: '--Involved Christian with No Parent--',
              "outline": "#FFFFFF",
          "shape": "not-round",
            },
            trees: ["main-tree"], name: '--Involved Christian with No Parent--'
          },
          {
            id: 'QLjMOU3G8Vi9aPLJGWnT',
            mods: [],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Zahlia',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Zahlia'
          },
          {
            id: 'QXgeY465UVsKnfdwFW48',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "outline": "#d1cabc",
          "shape": "not-round",
              color: '#000000',
              underline: false,
              label: 'Olivia Durrheim',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Olivia Durrheim'
          },
          {
            id: 'QeIm063qu8xHAgcvK34c',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: 'not FAT yet, seeing how she goes at Breakthrough, trying to get her to come to SALT',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "label": " [1]Catriona Rice",
          "outline": "#d1cabc",
          "shape": "not-round",
              color: '#000000',
              underline: false,
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Catriona Rice'
          },
          {
            id: 'RgcNYB5Y6tehuiPF3fiU',
            mods: [ ':0am 2101y1n )0t', 'MM raida3utaTd 1', '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: ' a1i n 5mnary0T+',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: " [7]Paul Wang",
              outline: '#ff8000',
              background: '#31ccec'
            },
            trees: ["main-tree"], name: 'Paul Wang'
          },
          {
            id: 'Rz0JcTPlcajfgO5UwKFL',
            mods: [
              'rYMogPL8oQOx8bJdAMa2',
              '3ohW3FU65MTUnJuQHkvB',
              ':0am 2101y1n )0t',
              'xcCy4Blwgkd9WLuVErNF'
            ],
            notes: 'Build- Potential disciple, seems quite teachable, availability unsure (law)',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "shape": "not-round",
              color: '#000000',
              underline: false,
              "label": " [2]Jasmine Pearce [FS]",
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Jasmine Pearce'
          },
          {
            id: 'SA4jQtdFuI0srEDYDa3o',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Alice Middleton',
              "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Alice Middleton'
          },
          {
            id: 'SisCsMdoKIAjnCX19y52',
            mods: [ '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2', 'el1rE8E rArnt0a1' ],
            notes: 'Mitch to encourage Josh to reconnect/get update',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#ff0000',
              shape: 'not-round',
              underline: false,
              "label": "David [INT]",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'David'
          },
          {
            id: 'SvRZTpTmTOQ7NBP7ixJD',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: 'Catching Up  to talk about God',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'James Baumgart',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'James Baumgart'
          },
          {
            id: 'Ufyr7Qb9hJqlsR6rykBP',
            mods: [ 'RYvrItrcLBumN2l1B2ZB', '46akFzeUaeqBWC3IBXV2' ],
            notes: "New Christian from outside of movement - is keen to get involved. Would love to take him through first steps/equivalent",
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
"label": "Lewis Reed [RO]",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Lewis Reed'
          },
          {
            id: 'UtOHfX9BDZhmhUAYjrM2',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', '0 u5rSSaraMtTM61' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Shienne",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Shienne'
          },
          {
            id: 'VmtdU8nxHjWZduJEhlXm',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Caleb Webb',
              "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Caleb Webb'
          },
          {
            id: 'VqNOBhniLhWQN397vZFp',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'Attended welcome bbq in 2020 and 2021 - studying arts/law\n' +
              ' - has connected with Dan re: law group\n',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              label: 'Rachel King',
              "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Rachel King'
          },
          {
            id: 'Vx9Ls5n10O2NX3RhmB4M',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: 'Trying to get her to SALT',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "label": " [1]Amy Lazarus",
          "outline": "#d1cabc",
          "shape": "not-round",
              color: '#000000',
              underline: false,
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Amy Lazarus'
          },
          {
            id: 'WZ1GggK61NUYI2BebS36',
            mods: [
              '0 u5rSSaraMtTM61',
              'rYMogPL8oQOx8bJdAMa2',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: 'Discipled by Yasmin in Sem 2 2019 for a few sessions. Discipled by Jessie 2020 (Sem 1 and 2). Taking a break from dship 2021, due to focusing on family and mental health. Continue to invite to conferences and events. Jessie to check in/catch up a few times a semester.  Attended Schoolies 2019, 2020. ',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Kayla Turnbull",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Kayla Turnbull'
          },
          {
            id: 'YQo4XDW0bguEuYKyqxVL',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Brooke',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Brooke'
          },
          {
            id: 'YrZB0KJL94BSnecnK6t4',
            mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Sophia Cossa",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Sophia Cossa'
          },
          {
            id: 'aE7Mu556fCJIhvxJY00y',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: 'default',
            customFields: {},
            display: {
              color: '#ffffff',
              shape: 'round-left',
              underline: false,
              "label": "Tiarne Gray",
              background: '#4c6a87',
              outline: '#4c6a87'
            },
            trees: ["main-tree"], name: 'Tiarne Gray'
          },
          {
            id: 'ae8cnpOcO5ONsTaQqj9l',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              "label": " [1]Jasmin Maxwell",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Jasmin Maxwell'
          },
          {
            id: 'b6htdXEpqVWVkVbPfqwj',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: 'default',
            customFields: {},
            display: {
              color: '#ffffff',
              shape: 'round-left',
              underline: false,
              label: 'Nick Ellis',
              background: '#4c6a87',
              outline: '#4c6a87'
            },
            trees: ["main-tree"], name: 'Nick Ellis'
          },
          {
            id: 'bprNzBn8L1OQeudiGfPg',
            mods: [ '0 u5rSSaraMtTM61', '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Martin",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Martin'
          },
          {
            id: 'c6dRupke4wlwBpyCyWOv',
            mods: [
              ':0am 2101y1n )0t',
              '46akFzeUaeqBWC3IBXV2',
              'UDpXKKGAB0JpICs1Jfi5',
              '3ohW3FU65MTUnJuQHkvB'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [2]Zac Maxwell",
          "outline": "#ff8000",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Zac Maxwell'
          },
          {
            id: 'clKfwO2Gln88sDOYGgeL',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Rory',
              "outline": "#b82218",
          "shape": "round-diag"
            },
            trees: ["main-tree"], name: 'Rory'
          },
          {
            id: 'dV1qaOGk3FnzZFNUw1oZ',
            mods: [ '0 u5rSSaraMtTM61', '0d yiM7aTa1aet0T', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'Now at ACU',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#ff0000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Jenna Maurel",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Jenna Maurel'
          },
          {
            id: 'der2XOL3Gdqua6LyH1xj',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'Emma continuing to connect with. Plan: invite to Alpha?',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Evie',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["noParents"], name: 'Evie'
          },
          {
            id: 'dgYClNToNO7TjQKgEipH',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 't tEe475  iaa00 ' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": " [4]Megan Jones",
          "outline": "#b82218",
          "shape": "round-diag",
              underline: false,
            },
            trees: ["noParents"], name: 'Megan Jones'
          },
          {
            id: 'fdvFS9D1VJ2cDGgD3nSX',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'SDA',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "outline": "#d1cabc",
          "shape": "not-round",
              color: '#000000',
              underline: false,
              label: 'Bronwen Nel',
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Bronwen Nel'
          },
          {
            id: 'flK72VhEp2aAgnA40uCy',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": "Yodi Siu [EC]",
          "outline": "#b82218",
          "shape": "round-diag",
              underline: false,
            },
            trees: ["main-tree"], name: 'Yodi Siu'
          },
          {
            id: 'fnbxJCK4oF9458qiVtIx',
            mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'Build/Train stage. Plan: provide small and supported opportunities for leadership. Supported also by Tiarne? Nick says is she sharing her faith regularly\n',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Brynlea Gibson",
          "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Brynlea Gibson'
          },
          {
            id: 'iALW2O72jJSCVfk1NSTJ',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Leon',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Leon'
          },
          {
            id: 'iKkzRo4LNx8fZS9LpdFJ',
            mods: [
              '3ohW3FU65MTUnJuQHkvB',
              'rYMogPL8oQOx8bJdAMa2',
              'j6Zq9tbZXweMbboALDs8',
              '0d yiM7aTa1aet0T',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              underline: false,
              "background": "#d1cabc",
          "color": "#ff0000",
          "label": " [2]Sarah Millar",
          "outline": "#d1cabc",
          "shape": "not-round",
            },
            trees: ["noParents"], name: 'Sarah Millar'
          },
          {
            id: 'iagy3QI3gujOxnRcpo6H',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              "label": " [1]Abbey Grice",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Abbey Grice'
          },
          {
            id: 'j6TEsBzkZxvWOaVvLp41',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              underline: false,
              "background": "#b82218",
          "color": "#ffffff",
          "label": "Tamara [EC]",
          "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Tamara'
          },
          {
            id: 'j8uBHU5MCo6eaBUidhKA',
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              'rYMogPL8oQOx8bJdAMa2',
              ':0am 2101y1n )0t',
              't tEe475  iaa00 ',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: 'Graduates end of 2023',
            role: ' a1i n 5mnary0T+',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [4]Carla Coetzee [RO]",
              outline: '#ff8000',
              background: '#31ccec'
            },
            trees: ["main-tree"], name: 'Carla Coetzee'
          },
          {
            id: 'ketIhx0ruiO4RT7soEYD',
            mods: [
              '46akFzeUaeqBWC3IBXV2',
              't tEe475  iaa00 ',
              '0d yiM7aTa1aet0T',
              ':0am 2101y1n )0t'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "background": "#d1cabc",
          "color": "#ff0000",
          "label": " [4]Seann Boo",
          "outline": "#ff8000",
          "shape": "not-round",
          "underline": false,
            },
            trees: ["main-tree"], name: 'Seann Boo'
          },
          {
            id: 'kl4RSMlI2LqxV2KePQQI',
            mods: [
              '3ohW3FU65MTUnJuQHkvB',
              ' Tta1 a0(:)lSTa9',
              'rYMogPL8oQOx8bJdAMa2'
            ],
            notes: 'With Emma Adams',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": " [2]Lexie Glasson [EC]",
          "outline": "#b82218",
          "shape": "round-diag",
          "underline": false,
            },
            trees: ["noParents"], name: 'Lexie Glasson'
          },
          {
            id: 'lnWb8l2hKNpy7rnPBRlX',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'oOvDZwfqXwDkTsEoWvBk' ],
            notes: '',
            role: 'default',
            customFields: {},
            display: {
              color: '#ffffff',
              shape: 'round-left',
              underline: false,
              label: 'Yasmin Henry',
              background: '#4c6a87',
              outline: '#4c6a87'
            },
            trees: ["main-tree"], name: 'Yasmin Henry'
          },
          {
            id: 'm6mCdveLWNgJGyDF9Sjo',
            mods: [
              'rYMogPL8oQOx8bJdAMa2',
              'KA7mWeXalOkMuY2pgXHR',
              ':0am 2101y1n )0t',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "shape": "not-round",
              color: '#000000',
              underline: false,
              "label": " [1]Annelise Terblanche",
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Annelise Terblanche'
          },
          {
            id: 'm7BhOkFAkPyfOXvSuYND',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Nicholas',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["main-tree"], name: 'Nicholas'
          },
          {
            id: 'nCiB1F8JDdudJO6Xyivy',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', '3ohW3FU65MTUnJuQHkvB' ],
            notes: 'Allie has acknowledged that she needs to grow in her faith before she can go sharing it. Emma will take her through First Steps and will track with her. ',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              "label": " [2]Allie Young",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Allie Young'
          },
          {
            id: 'o4GPRVN5JlqsntU4ZEQs',
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              'j6Zq9tbZXweMbboALDs8',
              ':0am 2101y1n )0t',
              'rYMogPL8oQOx8bJdAMa2',
              '0d yiM7aTa1aet0T',
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "shape": "not-round",
              "color": "#ff0000",
          "label": "Simone Hindsberger [RO]",
              underline: false,
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Simone Hindsberger'
          },
          {
            id: 'o5V7o5UtDsH6QJE09QMN',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": " [1]Celina",
          "outline": "#b82218",
          "shape": "round-diag",
          "underline": false,
            },
            trees: ["noParents"], name: 'Celina'
          },
          {
            id: 'oJ3Twl5YTFghxMadZOja',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: 'Might be a christian but maybe not',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              label: 'Connor',
              "outline": "#d1cabc",
          "shape": "not-round",
              "background": "#d1cabc",
            },
            trees: ["main-tree"], name: 'Connor'
          },
          {
            id: 'p4DWXe5G3efllrPi7SM2',
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              '46akFzeUaeqBWC3IBXV2',
              ':0am 2101y1n )0t',
              '0 u5rSSaraMtTM61',
              'n42a2Mrlu )thr0r',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: ' a1i n 5mnary0T+',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: " [3]Kieran Boyle [RO][FS]",
              outline: '#ff8000',
              background: '#31ccec'
            },
            trees: ["main-tree"], name: 'Kieran Boyle'
          },
          {
            id: 'pHTIyu3nx6MPhmF7AgXc',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Natalie Iru',
              "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Natalie Iru'
          },
          {
            id: 'pj0ivaS4d6JrHgtSVIke',
            mods: [ 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [4]Israel Escano",
          "outline": "#d1cabc",
              "background": "#d1cabc",
            },
            trees: ["noParents"], name: 'Israel Escano'
          },
          {
            id: 'qOba1QSzmOB2BHL8WqFD',
            mods: [ 'el1rE8E rArnt0a1', 'rYMogPL8oQOx8bJdAMa2', ' Tta1 a0(:)lSTa9' ],
            notes: 'With Carla\n',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": "Tricia Minjung Wu [INT][EC]",
          "outline": "#b82218",
          "shape": "round-diag",
          "underline": false,
            },
            trees: ["noParents"], name: 'Tricia Minjung Wu'
          },
          {
            id: 'qe4D4hHsAVrKVv8iLCE2',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'rTrr2d 3ed+1i3aa' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              "label": " [NOC]Sarah Murphy",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Sarah Murphy'
          },
          {
            id: 'qlahLMCw2qVxmA5o5gpR',
            mods: [
              'rYMogPL8oQOx8bJdAMa2',
              'KA7mWeXalOkMuY2pgXHR',
              ':0am 2101y1n )0t',
              'xcCy4Blwgkd9WLuVErNF'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "shape": "not-round",
              color: '#000000',
              underline: false,
              "label": " [1]Kate Harris [FS]",
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Kate Harris'
          },
          {
            id: 'rVtq0wgniMj2TRLJ6jBN',
            mods: [
              '46akFzeUaeqBWC3IBXV2',
              'UDpXKKGAB0JpICs1Jfi5',
              'KA7mWeXalOkMuY2pgXHR',
              ':0am 2101y1n )0t'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "shape": "not-round",
              color: '#000000',
              underline: false,
              "label": " [1]Liam Lay",
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Liam Lay'
          },
          {
            id: 's9GBQtmBPI4mL6VYlPmM',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              "label": " [1]Diep Ngo",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Diep Ngo'
          },
          {
            id: 'sCk0ORSlIKlI4TEMoj6L',
            mods: [ ' Tta1 a0(:)lSTa9', 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'Was meeting with Lauren. Reconnect with in Sem 2',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": "Vrinda Eswaran [EC]",
          "outline": "#b82218",
          "shape": "round-diag",
          "underline": false,
            },
            trees: ["noParents"], name: 'Vrinda Eswaran'
          },
          {
            id: 'sL2bXbm2oeu3nrFkyTzj',
            mods: [
              'RYvrItrcLBumN2l1B2ZB',
              '46akFzeUaeqBWC3IBXV2',
              ':0am 2101y1n )0t',
              't tEe475  iaa00 ',
              'n42a2Mrlu )thr0r',
              '7RmRpoE0w86et5oFJV6Q',
              'IHpI6i86UwHaBHKlDfsn',
              'KhRaG31GtlG5mpnThUdH'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [4]Daniel Plumbe [RO][FS]",
          "outline": "#ff8000",
              "background": "#d1cabc",
            },
            trees: ["main-tree"], name: 'Daniel Plumbe'
          },
          {
            id: 'siH75ijS6P0c3E6DRe4d',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: 'New Christian',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              label: 'Hazel',
               "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Hazel'
          },
          {
            id: 'siuoK9YsLPm7iEopYACR',
            mods: [
              ':0am 2101y1n )0t',
              '0 u5rSSaraMtTM61',
              '46akFzeUaeqBWC3IBXV2',
              'UDpXKKGAB0JpICs1Jfi5'
            ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              "label": " [3]Stephen Philpot",
          "outline": "#ff8000",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Stephen Philpot'
          },
          {
            id: 'tAWgKRf9DSaQLAcTjQ3z',
            mods: [ '46akFzeUaeqBWC3IBXV2', 'KA7mWeXalOkMuY2pgXHR' ],
            notes: "Haven't met in a while - will try to contact him again soon to see if interest is still there",    role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
          "label": " [1]Dylan T",
          "outline": "#b82218",
          "shape": "round-diag",
          "underline": false,
            },
            trees: ["main-tree"], name: 'Dylan T'
          },
          {
            id: 'tT0IRk2dmBdLQyeMBKfB',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '(7lr10aTrtmd e (',
            customFields: {},
            display: {
              "background": "#b82218",
          "color": "#ffffff",
              underline: false,
              label: 'Yang L',
              "outline": "#b82218",
          "shape": "round-diag",
            },
            trees: ["noParents"], name: 'Yang L'
          },
          {
            id: 'v11qo1Q8Zy1NB34uvxmP',
            mods: [
              'rYMogPL8oQOx8bJdAMa2',
              '3ohW3FU65MTUnJuQHkvB',
              'rTrr2d 3ed+1i3aa'
            ],
            notes: 'Malyon Bible College student (completed 1 year of OT)  plans to return to OT 2022. Interested in events and conferences as able. Invited to Breakthrough. ',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              "label": " [2][NOC]Rachael Dingwall",
          "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Rachael Dingwall'
          },
          {
            id: 'v5XZdAcEsZDKSTfC2LgH',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: "Insta Survey Contact -  indicated wanted to learn to share faith. Followed up by Jessie and Jack in Week 1 2021. Interested in Josh's bible study on Thursdays. Interested in Breakthrough. Appeared less likely to try Salt this semester. Studying Biomed",
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              label: 'Isobelle Trevatt',
              "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["noParents"], name: 'Isobelle Trevatt'
          },
          {
            id: 'w9aPvaYAoM8mdOHvxhNQ',
            mods: [ 'rYMogPL8oQOx8bJdAMa2', ':0am 2101y1n )0t' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              "shape": "not-round",
              color: '#000000',
              underline: false,
              label: 'Arya Clark',
              outline: '#ff8000',
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Arya Clark'
          },
          {
            id: 'wXFzr07Qu7ID9TuoMTeD',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              label: 'Cedric',
              "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Cedric'
          },
          {
            id: 'yNCl3NiDFOkJvtrUh1ib',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: '',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              underline: false,
              label: 'Caleb ',
              "outline": "#d1cabc",
          "shape": "not-round",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Caleb '
          },
          {
            id: 'yPQP77fEJfzPB7AvFkUO',
            mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
            notes: '',
            role: 'default',
            customFields: {},
            display: {
              color: '#ffffff',
              shape: 'round-left',
              underline: false,
              "label": "Genevieve Brook",
              background: '#4c6a87',
              outline: '#4c6a87'
            },
            trees: ["main-tree"], name: 'Genevieve Brook'
          },
          {
            id: 'zbTCywlmeHOCBa8h7o6F',
            mods: [ '46akFzeUaeqBWC3IBXV2' ],
            notes: 'Lives with Dan and has come to a couple of things',
            role: '11ttn nu101dGd m',
            customFields: {},
            display: {
              color: '#000000',
              shape: 'not-round',
              underline: false,
              label: 'Crispian Yedmass',
              "outline": "#d1cabc",
              background: '#d1cabc'
            },
            trees: ["main-tree"], name: 'Crispian Yedmass'
          }
         ],
         styles: [
           
      {
        icon: 'EC',
        label: 'Exploring Christianity',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#ff9c39',
          colorOverride: null
        },
        desc: 'A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)'
      },
      {
        label: 'Student Leader',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#31ccec',
          round: false,
          background: '#31ccec'
        },
        desc: 'An official student leader on campus, part of the MB team'
      },
      {
        label: 'Non-Christian',
        type: 'role',
        target: 0,
        style: {
          color: '#ffffff',
          shape: 'round-diag',
          underline: false,
          outline: '#b82218',
          round: true,
          background: '#b82218'
        },
        desc: 'A member who is not yet a Christian (Must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-Xn know that they are exploring Christianity within PTC?)'
      },
      {
        icon: '3',
        label: 'Year 3',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Third Year Student'
      },
      {
        icon: '5',
        label: 'Year 5',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: ' Fifth Year Student'
      },
      {
        icon: null,
        label: 'New Christian through Movement',
        type: 'mod',
        target: 0,
        style: {
          color: '#ff0000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: true
        },
        desc: 'A member who became a Christian through this movement'
      },
      {
        label: 'Christian',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#d1cabc',
          round: false,
          background: '#d1cabc'
        },
        desc: 'A member who is a christian (Must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)'
      },
      {
        label: 'Associate / Volunteer',
        type: 'role',
        target: 0,
        style: {
          color: '#ffffff',
          shape: 'round-right',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#3076ba',
          round: false,
          background: '#3076ba',
          colorOverride: false
        },
        desc: 'This person assists the movement in an official capacity but is not part of the missionary or Student Leader teams'
      },
      {
        icon: '2',
        label: 'Year 2',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Second Year Student'
      },
      {
        icon: null,
        label: '*Male',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A person who is Male'
      },
      {
        icon: null,
        label: 'Summer Project',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Has Attended a Local Summer Project'
      },
      {
        icon: null,
        label: 'Alpha (Completed)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#ff9c39',
          colorOverride: false
        },
        desc: 'A Non Christian who is coming to Alpha'
      },
      {
        icon: null,
        label: 'Disciple',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: true,
          outline: '#ff8000',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member being discipled on Campus'
      },
      {
        label: 'Lifetime Labourer',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "IHpI6i86UwHaBHKlDfsn",
              "included": true,
            },
            {
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "member",
                  "id": "11ttn nu101dGd m",
                  "included": true,
                },
                {
                  "class": "condition",
                  "gen": "member",
                  "id": " a1i n 5mnary0T+",
                  "included": true,
                },
              ],
              "operator": "OR",
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "n42a2Mrlu )thr0r",
              "included": true,
            }], class: 'expression' },
        desc: 'Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the "5 Things" in place?'
      },
      {
        icon: null,
        label: '5 Things (Completed)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: "Has completed 'My 5 Things' or Equivalent"
      },
      {
        label: 'No Specified Gender',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "rYMogPL8oQOx8bJdAMa2",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "46akFzeUaeqBWC3IBXV2",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "mH7ZmSClmCXE4DlXMNRD",
              "included": false,
            }], class: 'expression' },
        desc: 'A member without an assigned gender'
      },
      {
        icon: '1',
        label: 'Year 1',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'First year Student'
      },
      {
        icon: null,
        label: 'Multiplier (Aspirational)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member committed to finidng 2 Disciples and a CE'
      },
      {
        label: 'Remaining Fruit',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "0d yiM7aTa1aet0T",
              "included": true,
            }], class: 'expression' },
        desc: 'Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.'
      },
      {
        icon: '7',
        label: 'Year 7',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Seventh Year Student'
      },
      {
        icon: '6',
        label: 'Year 6',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Sixth Year Student'
      },
      {
        icon: 'RO',
        label: 'Regular Outreach',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member who is intentionally sharing their faith regularly (at least once every two weeks)'       
      },
      {
        icon: null,
        label: 'First Steps (Completed)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Has completed First Steps or equivalent'
      },
      {
        icon: null,
        label: 'Prayer',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member involved in a Prayer time with others from this movement'
      },
      {
        label: 'No Year',
        type: 'complex',
        target: '2',
        condition: { operator: 'AND', elements: [
            {
              "class": "condition",
              "gen": "member",
              "id": "3ohW3FU65MTUnJuQHkvB",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "0 u5rSSaraMtTM61",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "t tEe475  iaa00 ",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "0aS0 altn5ndGS d",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "MrAa9r 99   irA ",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "MM raida3utaTd 1",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "KA7mWeXalOkMuY2pgXHR",
              "included": false,
            }], class: 'expression' },
        desc: "A member who doesn't have an assigned year"
      },
      {
        label: 'Multiplying Disciples - Send',
        type: 'complex',
        target: '20',
        condition: { operator: 'AND', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "member",
                  "id": "11ttn nu101dGd m",
                  "included": true,
                },
                {
                  "class": "condition",
                  "gen": "member",
                  "id": " a1i n 5mnary0T+",
                  "included": true,
                },
              ],
              "operator": "OR",
            },
            {
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "children",
                  "id": ":0am 2101y1n )0t",
                  "included": true,
                },
                {
                  "class": "expression",
                  "elements": [
                    {
                      "class": "condition",
                      "gen": "member",
                      "id": "RYvrItrcLBumN2l1B2ZB",
                      "included": true,
                    },
                    {
                      "class": "condition",
                      "gen": "children",
                      "id": " Tta1 a0(:)lSTa9",
                      "included": true,
                    },
                  ],
                  "operator": "OR",
                },
              ],
              "operator": "AND",
            }], class: 'expression' },
        desc: '"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.\n' +
          '\n' +
          'Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)"'
      },
      {
        label: 'Multiplier',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "default",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "children",
              "id": ":0am 2101y1n )0t",
              "included": true,
              "number": "2",
            },
            {
              "class": "condition",
              "gen": "children",
              "id": " Tta1 a0(:)lSTa9",
              "included": true,
            }], class: 'expression' },
        desc: 'A student with two disciples and a CE '
      },
      {
        label: 'Missionary',
        type: 'role',
        target: 0,
        style: {
          color: '#ffffff',
          shape: 'round-left',
          underline: false,
          outline: '#4c6a87',
          round: false,
          background: '#4c6a87'
        },
        desc: 'A vocational member of the movement'
      },
      {
        icon: 'INT',
        label: 'International Student',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'A member who is enrolled as an international student'
      },
      {
        label: 'Completed Basic Follow Up',
        type: 'complex',
        target: 0,
        condition: { operator: 'OR', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "UDpXKKGAB0JpICs1Jfi5",
              "included": true,
            }], class: 'expression' },
        desc: 'Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. '
      },
      {
        label: 'Disciple doing outreach regularly',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": ":0am 2101y1n )0t",
              "included": true,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "RYvrItrcLBumN2l1B2ZB",
              "included": true,
            }], class: 'expression' },
        desc: 'A member who is discipled and also regularly sharing their faith'
      },
      {
        label: 'Non-Christian Connecting with a Student',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "parent",
                  "id": "11ttn nu101dGd m",
                  "included": true,
                },
                {
                  "class": "condition",
                  "gen": "parent",
                  "id": " a1i n 5mnary0T+",
                  "included": true,
                },
              ],
              "operator": "OR",
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "(7lr10aTrtmd e (",
              "included": true,
        }], class: 'expression' },
        desc: 'The number of non-christians connected to a student'
      },
      {
        icon: 'PR',
        label: 'On Prac',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member who is on currently prac'
      },
      {
        icon: null,
        label: 'Exploring Christianity (Completed)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.'
      },
      {
        label: '--UQ System--',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A subsection of the UQ local movement'
      },
      {
        icon: 'FS',
        label: 'Final Year',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'A member who is graduating within 12 months'
      },
      {
        icon: null,
        label: 'Global Missions',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Has attended a Global Missions Project'
      },
      {
        icon: null,
        label: '5 Things (Current)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: "Is currently doing 'My 5 Things' or Equivalent"
      },
      {
        icon: null,
        label: 'Bridge',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member who is involved/connected to Local & ISM'
      },
      {
        label: 'Committed Followers - Train',
        type: 'complex',
        target: '40',
        condition: { operator: 'AND', elements: [{
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "member",
                  "id": " a1i n 5mnary0T+",
                  "included": true,
                },
                {
                  "class": "condition",
                  "gen": "member",
                  "id": "11ttn nu101dGd m",
                  "included": true,
                },
              ],
              "operator": "OR",
            },
            {
              "class": "condition",
              "gen": "member",
              "id": ":0am 2101y1n )0t",
              "included": true,
            },
            {
              "class": "expression",
              "elements": [
                {
                  "class": "condition",
                  "gen": "children",
                  "id": ":0am 2101y1n )0t",
                  "included": false,
                },
                {
                  "class": "condition",
                  "gen": "children",
                  "id": " Tta1 a0(:)lSTa9",
                  "included": false,
                },
              ],
              "operator": "OR",
            }], class: 'expression' },
        desc: '"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).\n' +
          '\n' +
          'Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students."'
      },
      {
        icon: 'NOC',
        label: 'Not on Campus',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'A member who is not studying at this campus'
      },
      {
        icon: null,
        label: '*Female',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          shape: 'round',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          shapeOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A person who is Female'
      },
      {
        icon: '4',
        label: 'Year 4',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Fourth Year Student'
      },
      {
        label: 'Involved Students - Build',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": "11ttn nu101dGd m",
              "included": true,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "RYvrItrcLBumN2l1B2ZB",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "children",
              "id": ":0am 2101y1n )0t",
              "included": false,
            },
            {
              "class": "condition",
              "gen": "children",
              "id": " Tta1 a0(:)lSTa9",
              "included": false,
            }], class: 'expression' },
        desc: '"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.\n' +
          '\n' +
          'Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change."'
      },
      {
        icon: null,
        label: 'Involved',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member who is regularly involved, at least 2 activities a week'
      },
      {
        label: 'Evangelistic Contact',
        type: 'complex',
        target: 0,
        condition: { operator: 'AND', elements: [{
              "class": "condition",
              "gen": "member",
              "id": " Tta1 a0(:)lSTa9",
              "included": true,
            },
            {
              "class": "condition",
              "gen": "member",
              "id": "(7lr10aTrtmd e (",
              "included": true,
            }], class: 'expression' },
        desc: 'Number of people you started meeting with regularly to share the gospel (count once from your second meeting).'
      },
      {
        icon: 'FS',
        label: 'First Steps (Current)',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'A member who is currently going through First Steps or Equivalent'
      }
    ],
          trees: {
          'main-tree': {
            doc: {
              id: "main-tree",
              label: "Main Tree"
            },
            parents: {
              "03OBFstGenJLSwkPyoIe": {
                "parent": "p4DWXe5G3efllrPi7SM2",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "RYvrItrcLBumN2l1B2ZB",
                  ":0am 2101y1n )0t",
                  "46akFzeUaeqBWC3IBXV2",
                  "KhRaG31GtlG5mpnThUdH",
                  "3ohW3FU65MTUnJuQHkvB",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "0F7QAUqwwjR8WwfU6roJ": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "default",
                  "o86cGQi6TP7AWM4qpYSr",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "2oGzh8Nb5rCjF246qgWB": {
                "parent": "sL2bXbm2oeu3nrFkyTzj",
                "shadow": null,
                "styles": [
                  " a1i n 5mnary0T+",
                  ":0am 2101y1n )0t",
                  "0 u5rSSaraMtTM61",
                  "46akFzeUaeqBWC3IBXV2",
                  "7RmRpoE0w86et5oFJV6Q",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "3VcOYykTqk3aueEM1qz4": {
                "parent": "RgcNYB5Y6tehuiPF3fiU",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "0d yiM7aTa1aet0T",
                  "46akFzeUaeqBWC3IBXV2",
                  ":0am 2101y1n )0t",
                ],
              },
              "5HyKxGyIg9rVtled64g7": {
                "parent": "N3CcEWZsAHvOCC3Y0XrD",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "rYMogPL8oQOx8bJdAMa2",
                  " Tta1 a0(:)lSTa9",
                ],
              },
              "5LWB5cBbj9EIpd6bk2I3": {
                "parent": "FRe93Gn4ICmPF8suHxsB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  ":0am 2101y1n )0t",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "5jajm7QQP6bExdVhhG8k": {
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "0d yiM7aTa1aet0T",
                  "rYMogPL8oQOx8bJdAMa2",
                  "j6Zq9tbZXweMbboALDs8",
                  ":0am 2101y1n )0t",
                  "xcCy4Blwgkd9WLuVErNF",
                  "0 u5rSSaraMtTM61",
                ],
              },
              "6U8f3cPHbILYvrNrW3UV": {
                "parent": "p4DWXe5G3efllrPi7SM2",
                "shadow": null,
                "styles": [
                  " a1i n 5mnary0T+",
                  "RYvrItrcLBumN2l1B2ZB",
                  "46akFzeUaeqBWC3IBXV2",
                  "3ohW3FU65MTUnJuQHkvB",
                  ":0am 2101y1n )0t",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "7dkOAcvhXgbUlCsuXYLZ": {
                "parent": "j8uBHU5MCo6eaBUidhKA",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "RYvrItrcLBumN2l1B2ZB",
                  "rYMogPL8oQOx8bJdAMa2",
                  "KA7mWeXalOkMuY2pgXHR",
                ],
              },
              "8TSC0q4pjKZXj8Batzq0": {
                "parent": "KIysPYAG8YsT6dMYqhS6",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  ":0am 2101y1n )0t",
                  "rYMogPL8oQOx8bJdAMa2",
                  "xcCy4Blwgkd9WLuVErNF",
                  "KA7mWeXalOkMuY2pgXHR",
                  "RYvrItrcLBumN2l1B2ZB",
                ],
              },
              "8qCpKI0Tutff2OJrVvBx": {
                "parent": "2oGzh8Nb5rCjF246qgWB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                  ":0am 2101y1n )0t",
                ],
              },
              "AYrrEdMNFaOw0Cdb2TRf": {
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                ],
              },
              "CIo4dNwnNuslhMuPblY9": {
                "parent": "N3CcEWZsAHvOCC3Y0XrD",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "rYMogPL8oQOx8bJdAMa2",
                  "3ohW3FU65MTUnJuQHkvB",
                ],
              },
              "DLy4fRpkzW8IkP2JGn6i": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "default",
                  "rYMogPL8oQOx8bJdAMa2",
                ],
              },
              "DyFunsfjR9vg2TclhCNP": {
                "parent": "N3CcEWZsAHvOCC3Y0XrD",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  "3ohW3FU65MTUnJuQHkvB",
                ],
              },
              "FClWLoiM7zyzV7RzwJr7": {
                "parent": "2oGzh8Nb5rCjF246qgWB",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "FKeSTfqt39M2Q0zkMie7": {
                "parent": "FRe93Gn4ICmPF8suHxsB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "FRe93Gn4ICmPF8suHxsB": {
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  ":0am 2101y1n )0t",
                  "t tEe475  iaa00 ",
                  "46akFzeUaeqBWC3IBXV2",
                  "7RmRpoE0w86et5oFJV6Q",
                  "KhRaG31GtlG5mpnThUdH",
                ],
              },
              "FuiywanMGBuUQgpSchxY": {
                "parent": "2oGzh8Nb5rCjF246qgWB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                  ":0am 2101y1n )0t",
                  "xcCy4Blwgkd9WLuVErNF",
                  "0 u5rSSaraMtTM61",
                ],
              },
              "GKr2gWle6N4msCwBcPvV": {
                "parent": "N3CcEWZsAHvOCC3Y0XrD",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "rYMogPL8oQOx8bJdAMa2",
                  "3ohW3FU65MTUnJuQHkvB",
                ],
              },
              "H0EWkGM7CF7ZCAl3u6Wc": {
                "parent": "FRe93Gn4ICmPF8suHxsB",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "HaorE8zql5fNXzssp5Cu": {
                "parent": "RgcNYB5Y6tehuiPF3fiU",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                  ":0am 2101y1n )0t",
                  "UDpXKKGAB0JpICs1Jfi5",
                  "j6Zq9tbZXweMbboALDs8",
                ],
              },
              "HayQhdlGsKxKbfPlo5ON": {
                "parent": "OxsxDa0Fwpo6Jm4L9G3U",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "0 u5rSSaraMtTM61",
                  "0d yiM7aTa1aet0T",
                  "rYMogPL8oQOx8bJdAMa2",
                  "UDpXKKGAB0JpICs1Jfi5",
                  ":0am 2101y1n )0t",
                ],
              },
              "KIysPYAG8YsT6dMYqhS6": {
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "shadow": null,
                "styles": [
                  " a1i n 5mnary0T+",
                  ":0am 2101y1n )0t",
                  "0 u5rSSaraMtTM61",
                  "rYMogPL8oQOx8bJdAMa2",
                  "7RmRpoE0w86et5oFJV6Q",
                  "UDpXKKGAB0JpICs1Jfi5"
                ],
              },
              "KyOhn6L12Nd1YlwAAtwF": {
                "parent": "2oGzh8Nb5rCjF246qgWB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "LGhHDHpSP4H2LHF2C5RY": {
                "parent": "RgcNYB5Y6tehuiPF3fiU",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "LvE0yC4ljZurVias8jex": {
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  "KA7mWeXalOkMuY2pgXHR",
                ],
              },
              "N3CcEWZsAHvOCC3Y0XrD": {
                "parent": "aE7Mu556fCJIhvxJY00y",
                "shadow": null,
                "styles": [
                  " a1i n 5mnary0T+",
                  "rYMogPL8oQOx8bJdAMa2",
                  ":0am 2101y1n )0t",
                  "3ohW3FU65MTUnJuQHkvB",
                  "UDpXKKGAB0JpICs1Jfi5",
                  "RYvrItrcLBumN2l1B2ZB",
                ],
              },
              "O0WpvvNuAQ1EK4nQp6qq": {
                "parent": "FRe93Gn4ICmPF8suHxsB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                  "0 u5rSSaraMtTM61",
                  ":0am 2101y1n )0t",
                  "0d yiM7aTa1aet0T",
                  "j6Zq9tbZXweMbboALDs8",
                ],
              },
              "OFm9vtWv54mDrkIZ5zMD": {
                "parent": "sL2bXbm2oeu3nrFkyTzj",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "KA7mWeXalOkMuY2pgXHR",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "OUoFZow0aN1cq2ICip1G": {
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  "el1rE8E rArnt0a1",
                  "j6Zq9tbZXweMbboALDs8",
                  "xcCy4Blwgkd9WLuVErNF",
                  "0d yiM7aTa1aet0T",
                  ":0am 2101y1n )0t",
                  "0 u5rSSaraMtTM61",
                ],
              },
              "OxsxDa0Fwpo6Jm4L9G3U": {
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "RYvrItrcLBumN2l1B2ZB",
                  "0 u5rSSaraMtTM61",
                  ":0am 2101y1n )0t",
                  "rYMogPL8oQOx8bJdAMa2",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "PtKGhRuTQIckzpB0a9Hx": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "mH7ZmSClmCXE4DlXMNRD",
                ],
              },
              "QLjMOU3G8Vi9aPLJGWnT": {
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                ],
              },
              "RgcNYB5Y6tehuiPF3fiU": {
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "shadow": null,
                "styles": [
                  " a1i n 5mnary0T+",
                  ":0am 2101y1n )0t",
                  "MM raida3utaTd 1",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "Rz0JcTPlcajfgO5UwKFL": {
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  "3ohW3FU65MTUnJuQHkvB",
                  ":0am 2101y1n )0t",
                  "xcCy4Blwgkd9WLuVErNF",
                ],
              },
              "SisCsMdoKIAjnCX19y52": {
                "parent": "FRe93Gn4ICmPF8suHxsB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "0d yiM7aTa1aet0T",
                  "46akFzeUaeqBWC3IBXV2",
                  "el1rE8E rArnt0a1",
                ],
              },
              "SvRZTpTmTOQ7NBP7ixJD": {
                "parent": "2oGzh8Nb5rCjF246qgWB",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "TYsR7mwU7C7XwOfzsIcZ": {
                "parent": "HaorE8zql5fNXzssp5Cu",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                  "MM raida3utaTd 1",
                ],
              },
              "Ufyr7Qb9hJqlsR6rykBP": {
                "parent": "03OBFstGenJLSwkPyoIe",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "RYvrItrcLBumN2l1B2ZB",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "YQo4XDW0bguEuYKyqxVL": {
                "parent": "m6mCdveLWNgJGyDF9Sjo",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "rYMogPL8oQOx8bJdAMa2",
                ],
              },
              "aE7Mu556fCJIhvxJY00y": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "default",
                  "rYMogPL8oQOx8bJdAMa2",
                ],
              },
              "b6htdXEpqVWVkVbPfqwj": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "default",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "c6dRupke4wlwBpyCyWOv": {
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  ":0am 2101y1n )0t",
                  "46akFzeUaeqBWC3IBXV2",
                  "UDpXKKGAB0JpICs1Jfi5",
                  "3ohW3FU65MTUnJuQHkvB",
                ],
              },
              "clKfwO2Gln88sDOYGgeL": {
                "parent": "sL2bXbm2oeu3nrFkyTzj",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "flK72VhEp2aAgnA40uCy": {
                "parent": "j8uBHU5MCo6eaBUidhKA",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "rYMogPL8oQOx8bJdAMa2",
                  " Tta1 a0(:)lSTa9",
                ],
              },
              "iALW2O72jJSCVfk1NSTJ": {
                "parent": "RgcNYB5Y6tehuiPF3fiU",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "iagy3QI3gujOxnRcpo6H": {
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  "KA7mWeXalOkMuY2pgXHR",
                ],
              },
              "j6TEsBzkZxvWOaVvLp41": {
                "parent": "8TSC0q4pjKZXj8Batzq0",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "rYMogPL8oQOx8bJdAMa2",
                  " Tta1 a0(:)lSTa9",
                ],
              },
              "j8uBHU5MCo6eaBUidhKA": {
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "shadow": null,
                "styles": [
                  " a1i n 5mnary0T+",
                  "RYvrItrcLBumN2l1B2ZB",
                  "rYMogPL8oQOx8bJdAMa2",
                  ":0am 2101y1n )0t",
                  "t tEe475  iaa00 ",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "jr1uvC1fhzIXyQupaepD": {
            "parent": "0F7QAUqwwjR8WwfU6roJ",
            "shadow": null,
            "styles": [
              "(7lr10aTrtmd e (",
              "46akFzeUaeqBWC3IBXV2",
              "j6Zq9tbZXweMbboALDs8",
            ],
              },
              "kDv1llMqIjlgpHN8EUUT": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "default",
                  "rYMogPL8oQOx8bJdAMa2",
                ],
              },
              "ketIhx0ruiO4RT7soEYD": {
                "parent": "2oGzh8Nb5rCjF246qgWB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                  "t tEe475  iaa00 ",
                  "0d yiM7aTa1aet0T",
                  ":0am 2101y1n )0t",
                ],
              },
              "kpG8fY9pkIk1hqcxQWdq": {
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "lnWb8l2hKNpy7rnPBRlX": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "default",
                  "rYMogPL8oQOx8bJdAMa2",
                  "oOvDZwfqXwDkTsEoWvBk",
                ],
              },
              "m6mCdveLWNgJGyDF9Sjo": {
                "parent": "aE7Mu556fCJIhvxJY00y",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  "KA7mWeXalOkMuY2pgXHR",
                  ":0am 2101y1n )0t",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "m7BhOkFAkPyfOXvSuYND": {
                "parent": "sL2bXbm2oeu3nrFkyTzj",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "o4GPRVN5JlqsntU4ZEQs": {
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "RYvrItrcLBumN2l1B2ZB",
                  "j6Zq9tbZXweMbboALDs8",
                  ":0am 2101y1n )0t",
                  "rYMogPL8oQOx8bJdAMa2",
                  "0d yiM7aTa1aet0T",
                ],
              },
              "oJ3Twl5YTFghxMadZOja": {
                "parent": "FRe93Gn4ICmPF8suHxsB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "p4DWXe5G3efllrPi7SM2": {
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "shadow": null,
                "styles": [
                  " a1i n 5mnary0T+",
                  "RYvrItrcLBumN2l1B2ZB",
                  "46akFzeUaeqBWC3IBXV2",
                  ":0am 2101y1n )0t",
                  "0 u5rSSaraMtTM61",
                  "n42a2Mrlu )thr0r",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "qlahLMCw2qVxmA5o5gpR": {
                "parent": "N3CcEWZsAHvOCC3Y0XrD",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  "KA7mWeXalOkMuY2pgXHR",
                  ":0am 2101y1n )0t",
                  "xcCy4Blwgkd9WLuVErNF",
                ],
              },
              "rVtq0wgniMj2TRLJ6jBN": {
                "parent": "6U8f3cPHbILYvrNrW3UV",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                  "UDpXKKGAB0JpICs1Jfi5",
                  "KA7mWeXalOkMuY2pgXHR",
                  ":0am 2101y1n )0t",
                ],
              },
              "sL2bXbm2oeu3nrFkyTzj": {
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "RYvrItrcLBumN2l1B2ZB",
                  "46akFzeUaeqBWC3IBXV2",
                  ":0am 2101y1n )0t",
                  "t tEe475  iaa00 ",
                  "n42a2Mrlu )thr0r",
                  "7RmRpoE0w86et5oFJV6Q",
                  "IHpI6i86UwHaBHKlDfsn",
                  "KhRaG31GtlG5mpnThUdH",
                ],
              },
              "siuoK9YsLPm7iEopYACR": {
                "parent": "sL2bXbm2oeu3nrFkyTzj",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  ":0am 2101y1n )0t",
                  "0 u5rSSaraMtTM61",
                  "46akFzeUaeqBWC3IBXV2",
                  "UDpXKKGAB0JpICs1Jfi5",
                ],
              },
              "tAWgKRf9DSaQLAcTjQ3z": {
                "parent": "03OBFstGenJLSwkPyoIe",
                "shadow": null,
                "styles": [
                  "(7lr10aTrtmd e (",
                  "46akFzeUaeqBWC3IBXV2",
                  "KA7mWeXalOkMuY2pgXHR",
                ],
              },
              "w9aPvaYAoM8mdOHvxhNQ": {
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "rYMogPL8oQOx8bJdAMa2",
                  ":0am 2101y1n )0t",
                ],
              },
              "wXFzr07Qu7ID9TuoMTeD": {
                "parent": "FRe93Gn4ICmPF8suHxsB",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "yNCl3NiDFOkJvtrUh1ib": {
                "parent": "RgcNYB5Y6tehuiPF3fiU",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
              "yPQP77fEJfzPB7AvFkUO": {
                "parent": "root",
                "shadow": null,
                "styles": [
                  "default",
                  "rYMogPL8oQOx8bJdAMa2",
                ],
              },
              "zbTCywlmeHOCBa8h7o6F": {
                "parent": "sL2bXbm2oeu3nrFkyTzj",
                "shadow": null,
                "styles": [
                  "11ttn nu101dGd m",
                  "46akFzeUaeqBWC3IBXV2",
                ],
              },
            },
            stats: {
              "treeTotal":{
          "desc": "Number of Members in this Tree",
          "label": "Total on Tree",
          "total": 70,
        },
        " Tta1 a0(:)lSTa9": {
          "desc": "A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)",
          "id": " Tta1 a0(:)lSTa9",
          "label": "Exploring Christianity",
          "members": [
            "5HyKxGyIg9rVtled64g7",
            "j6TEsBzkZxvWOaVvLp41",
            "flK72VhEp2aAgnA40uCy",
          ],
          "total": 3,
          "type": "override",
        },
        " a1i n 5mnary0T+": {
          "desc": "An official student leader on campus, part of the MB team",
          "id": " a1i n 5mnary0T+",
          "label": "Student Leader",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "RgcNYB5Y6tehuiPF3fiU",
            "KIysPYAG8YsT6dMYqhS6",
            "2oGzh8Nb5rCjF246qgWB",
            "N3CcEWZsAHvOCC3Y0XrD",
            "p4DWXe5G3efllrPi7SM2",
            "j8uBHU5MCo6eaBUidhKA",
          ],
          "total": 7,
          "type": "base",
        },
        "(7lr10aTrtmd e (": {
          "desc": "A member who is not yet a Christian (Must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-Xn know that they are exploring Christianity within PTC?)",
          "id": "(7lr10aTrtmd e (",
          "label": "Non-Christian",
          "members": [
            "m7BhOkFAkPyfOXvSuYND",
            "tAWgKRf9DSaQLAcTjQ3z",
            "FClWLoiM7zyzV7RzwJr7",
            "jr1uvC1fhzIXyQupaepD",
            "CIo4dNwnNuslhMuPblY9",
            "iALW2O72jJSCVfk1NSTJ",
            "5HyKxGyIg9rVtled64g7",
            "TYsR7mwU7C7XwOfzsIcZ",
            "YQo4XDW0bguEuYKyqxVL",
            "clKfwO2Gln88sDOYGgeL",
            "SvRZTpTmTOQ7NBP7ixJD",
            "GKr2gWle6N4msCwBcPvV",
            "H0EWkGM7CF7ZCAl3u6Wc",
            "j6TEsBzkZxvWOaVvLp41",
            "AYrrEdMNFaOw0Cdb2TRf",
            "OFm9vtWv54mDrkIZ5zMD",
            "flK72VhEp2aAgnA40uCy",
            "QLjMOU3G8Vi9aPLJGWnT",
          ],
          "total": 18,
          "type": "base",
        },
        "0 u5rSSaraMtTM61": {
          "desc": "Third Year Student",
          "id": "0 u5rSSaraMtTM61",
          "label": "Year 3",
          "members": [
            "HayQhdlGsKxKbfPlo5ON",
            "KIysPYAG8YsT6dMYqhS6",
            "2oGzh8Nb5rCjF246qgWB",
            "FuiywanMGBuUQgpSchxY",
            "p4DWXe5G3efllrPi7SM2",
            "O0WpvvNuAQ1EK4nQp6qq",
            "siuoK9YsLPm7iEopYACR",
            "OUoFZow0aN1cq2ICip1G",
            "5jajm7QQP6bExdVhhG8k",
            "OxsxDa0Fwpo6Jm4L9G3U",
          ],
          "total": 10,
          "type": "override",
        },
        "0aS0 altn5ndGS d": {
          "desc": " Fifth Year Student",
          "id": "0aS0 altn5ndGS d",
          "label": "Year 5",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "0d yiM7aTa1aet0T": {
          "desc": "A member who became a Christian through this movement",
          "id": "0d yiM7aTa1aet0T",
          "label": "New Christian through Movement",
          "members": [
            "3VcOYykTqk3aueEM1qz4",
            "HayQhdlGsKxKbfPlo5ON",
            "SisCsMdoKIAjnCX19y52",
            "ketIhx0ruiO4RT7soEYD",
            "O0WpvvNuAQ1EK4nQp6qq",
            "OUoFZow0aN1cq2ICip1G",
            "5jajm7QQP6bExdVhhG8k",
            "o4GPRVN5JlqsntU4ZEQs",
          ],
          "total": 8,
          "type": "override",
        },
        "11ttn nu101dGd m": {
          "desc": "A member who is a christian (Must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)",
          "id": "11ttn nu101dGd m",
          "label": "Christian",
          "members": [
            "iagy3QI3gujOxnRcpo6H",
            "7dkOAcvhXgbUlCsuXYLZ",
            "HaorE8zql5fNXzssp5Cu",
            "3VcOYykTqk3aueEM1qz4",
            "Ufyr7Qb9hJqlsR6rykBP",
            "LvE0yC4ljZurVias8jex",
            "5LWB5cBbj9EIpd6bk2I3",
            "Rz0JcTPlcajfgO5UwKFL",
            "zbTCywlmeHOCBa8h7o6F",
            "HayQhdlGsKxKbfPlo5ON",
            "SisCsMdoKIAjnCX19y52",
            "rVtq0wgniMj2TRLJ6jBN",
            "FuiywanMGBuUQgpSchxY",
            "sL2bXbm2oeu3nrFkyTzj",
            "kpG8fY9pkIk1hqcxQWdq",
            "FRe93Gn4ICmPF8suHxsB",
            "qlahLMCw2qVxmA5o5gpR",
            "FKeSTfqt39M2Q0zkMie7",
            "ketIhx0ruiO4RT7soEYD",
            "O0WpvvNuAQ1EK4nQp6qq",
            "oJ3Twl5YTFghxMadZOja",
            "8qCpKI0Tutff2OJrVvBx",
            "yNCl3NiDFOkJvtrUh1ib",
            "siuoK9YsLPm7iEopYACR",
            "c6dRupke4wlwBpyCyWOv",
            "OUoFZow0aN1cq2ICip1G",
            "LGhHDHpSP4H2LHF2C5RY",
            "5jajm7QQP6bExdVhhG8k",
            "wXFzr07Qu7ID9TuoMTeD",
            "DyFunsfjR9vg2TclhCNP",
            "w9aPvaYAoM8mdOHvxhNQ",
            "m6mCdveLWNgJGyDF9Sjo",
            "o4GPRVN5JlqsntU4ZEQs",
            "03OBFstGenJLSwkPyoIe",
            "OxsxDa0Fwpo6Jm4L9G3U",
            "8TSC0q4pjKZXj8Batzq0",
            "KyOhn6L12Nd1YlwAAtwF",
          ],
          "total": 37,
          "type": "base",
        },
        "3ao5OGXsDa6eWIwqzfkv": {
          "desc": "This person assists the movement in an official capacity but is not part of the missionary or Student Leader teams",
          "id": "3ao5OGXsDa6eWIwqzfkv",
          "label": "Associate / Volunteer",
          "members": [],
          "total": 0,
          "type": "base",
        },
        "3ohW3FU65MTUnJuQHkvB": {
          "desc": "Second Year Student",
          "id": "3ohW3FU65MTUnJuQHkvB",
          "label": "Year 2",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "Rz0JcTPlcajfgO5UwKFL",
            "N3CcEWZsAHvOCC3Y0XrD",
            "CIo4dNwnNuslhMuPblY9",
            "GKr2gWle6N4msCwBcPvV",
            "c6dRupke4wlwBpyCyWOv",
            "DyFunsfjR9vg2TclhCNP",
            "03OBFstGenJLSwkPyoIe",
          ],
          "total": 8,
          "type": "override",
        },
        "46akFzeUaeqBWC3IBXV2": {
          "desc": "A person who is Male",
          "id": "46akFzeUaeqBWC3IBXV2",
          "label": "*Male",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "RgcNYB5Y6tehuiPF3fiU",
            "HaorE8zql5fNXzssp5Cu",
            "m7BhOkFAkPyfOXvSuYND",
            "tAWgKRf9DSaQLAcTjQ3z",
            "FClWLoiM7zyzV7RzwJr7",
            "3VcOYykTqk3aueEM1qz4",
            "Ufyr7Qb9hJqlsR6rykBP",
            "5LWB5cBbj9EIpd6bk2I3",
            "zbTCywlmeHOCBa8h7o6F",
            "SisCsMdoKIAjnCX19y52",
            "0F7QAUqwwjR8WwfU6roJ",
            "2oGzh8Nb5rCjF246qgWB",
            "rVtq0wgniMj2TRLJ6jBN",
            "jr1uvC1fhzIXyQupaepD",
            "FuiywanMGBuUQgpSchxY",
            "sL2bXbm2oeu3nrFkyTzj",
            "kpG8fY9pkIk1hqcxQWdq",
            "FRe93Gn4ICmPF8suHxsB",
            "FKeSTfqt39M2Q0zkMie7",
            "iALW2O72jJSCVfk1NSTJ",
            "b6htdXEpqVWVkVbPfqwj",
            "p4DWXe5G3efllrPi7SM2",
            "ketIhx0ruiO4RT7soEYD",
            "O0WpvvNuAQ1EK4nQp6qq",
            "oJ3Twl5YTFghxMadZOja",
            "TYsR7mwU7C7XwOfzsIcZ",
            "8qCpKI0Tutff2OJrVvBx",
            "clKfwO2Gln88sDOYGgeL",
            "SvRZTpTmTOQ7NBP7ixJD",
            "yNCl3NiDFOkJvtrUh1ib",
            "siuoK9YsLPm7iEopYACR",
            "c6dRupke4wlwBpyCyWOv",
            "LGhHDHpSP4H2LHF2C5RY",
            "wXFzr07Qu7ID9TuoMTeD",
            "H0EWkGM7CF7ZCAl3u6Wc",
            "03OBFstGenJLSwkPyoIe",
            "OFm9vtWv54mDrkIZ5zMD",
            "KyOhn6L12Nd1YlwAAtwF",
          ],
          "total": 39,
          "type": "override",
        },
        "7RmRpoE0w86et5oFJV6Q": {
          "desc": "Has Attended a Local Summer Project",
          "id": "7RmRpoE0w86et5oFJV6Q",
          "label": "Summer Project",
          "members": [
            "KIysPYAG8YsT6dMYqhS6",
            "2oGzh8Nb5rCjF246qgWB",
            "sL2bXbm2oeu3nrFkyTzj",
            "FRe93Gn4ICmPF8suHxsB",
          ],
          "total": 4,
          "type": "override",
        },
        "99e2XOwRbZgb773aGLAg": {
          "desc": "A Non Christian who is coming to Alpha",
          "id": "99e2XOwRbZgb773aGLAg",
          "label": "Alpha (Completed)",
          "members": [],
          "total": 0,
          "type": "override",
        },
        ":0am 2101y1n )0t": {
          "desc": "A member being discipled on Campus",
          "id": ":0am 2101y1n )0t",
          "label": "Disciple",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "RgcNYB5Y6tehuiPF3fiU",
            "HaorE8zql5fNXzssp5Cu",
            "3VcOYykTqk3aueEM1qz4",
            "5LWB5cBbj9EIpd6bk2I3",
            "Rz0JcTPlcajfgO5UwKFL",
            "HayQhdlGsKxKbfPlo5ON",
            "KIysPYAG8YsT6dMYqhS6",
            "2oGzh8Nb5rCjF246qgWB",
            "rVtq0wgniMj2TRLJ6jBN",
            "FuiywanMGBuUQgpSchxY",
            "sL2bXbm2oeu3nrFkyTzj",
            "N3CcEWZsAHvOCC3Y0XrD",
            "FRe93Gn4ICmPF8suHxsB",
            "qlahLMCw2qVxmA5o5gpR",
            "p4DWXe5G3efllrPi7SM2",
            "ketIhx0ruiO4RT7soEYD",
            "O0WpvvNuAQ1EK4nQp6qq",
            "8qCpKI0Tutff2OJrVvBx",
            "siuoK9YsLPm7iEopYACR",
            "c6dRupke4wlwBpyCyWOv",
            "OUoFZow0aN1cq2ICip1G",
            "5jajm7QQP6bExdVhhG8k",
            "j8uBHU5MCo6eaBUidhKA",
            "w9aPvaYAoM8mdOHvxhNQ",
            "m6mCdveLWNgJGyDF9Sjo",
            "o4GPRVN5JlqsntU4ZEQs",
            "03OBFstGenJLSwkPyoIe",
            "OxsxDa0Fwpo6Jm4L9G3U",
            "8TSC0q4pjKZXj8Batzq0",
          ],
          "total": 30,
          "type": "override",
        },
        "G8SRxWpXvfz5aIk9OdgP": {
          "desc": "Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the \"5 Things\" in place?",
          "id": "G8SRxWpXvfz5aIk9OdgP",
          "label": "Lifetime Labourer",
          "members": [
            "sL2bXbm2oeu3nrFkyTzj",
          ],
          "total": 1,
          "type": "calc",
        },
        "IHpI6i86UwHaBHKlDfsn": {
          "desc": "Has completed 'My 5 Things' or Equivalent",
          "id": "IHpI6i86UwHaBHKlDfsn",
          "label": "5 Things (Completed)",
          "members": [
            "sL2bXbm2oeu3nrFkyTzj",
          ],
          "total": 1,
          "type": "override",
        },
        "JQtDoHf85B3HCPtyxQvG": {
          "desc": "A member without an assigned gender",
          "id": "JQtDoHf85B3HCPtyxQvG",
          "label": "No Specified Gender",
          "members": [
            "AYrrEdMNFaOw0Cdb2TRf",
            "QLjMOU3G8Vi9aPLJGWnT",
          ],
          "total": 2,
          "type": "calc",
        },
        "KA7mWeXalOkMuY2pgXHR": {
          "desc": "First year Student",
          "id": "KA7mWeXalOkMuY2pgXHR",
          "label": "Year 1",
          "members": [
            "iagy3QI3gujOxnRcpo6H",
            "7dkOAcvhXgbUlCsuXYLZ",
            "tAWgKRf9DSaQLAcTjQ3z",
            "LvE0yC4ljZurVias8jex",
            "rVtq0wgniMj2TRLJ6jBN",
            "qlahLMCw2qVxmA5o5gpR",
            "m6mCdveLWNgJGyDF9Sjo",
            "OFm9vtWv54mDrkIZ5zMD",
            "8TSC0q4pjKZXj8Batzq0",
          ],
          "total": 9,
          "type": "override",
        },
        "KhRaG31GtlG5mpnThUdH": {
          "desc": "A member committed to finidng 2 Disciples and a CE",
          "id": "KhRaG31GtlG5mpnThUdH",
          "label": "Multiplier (Aspirational)",
          "members": [
            "sL2bXbm2oeu3nrFkyTzj",
            "FRe93Gn4ICmPF8suHxsB",
            "03OBFstGenJLSwkPyoIe",
          ],
          "total": 3,
          "type": "override",
        },
        "L7Ypv2NtQUSVhcJRQTgO": {
          "desc": "Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.",
          "id": "L7Ypv2NtQUSVhcJRQTgO",
          "label": "Remaining Fruit",
          "members": [
            "3VcOYykTqk3aueEM1qz4",
            "HayQhdlGsKxKbfPlo5ON",
            "SisCsMdoKIAjnCX19y52",
            "ketIhx0ruiO4RT7soEYD",
            "O0WpvvNuAQ1EK4nQp6qq",
            "OUoFZow0aN1cq2ICip1G",
            "5jajm7QQP6bExdVhhG8k",
            "o4GPRVN5JlqsntU4ZEQs",
          ],
          "total": 8,
          "type": "calc",
        },
        "MM raida3utaTd 1": {
          "desc": "Seventh Year Student",
          "id": "MM raida3utaTd 1",
          "label": "Year 7",
          "members": [
            "RgcNYB5Y6tehuiPF3fiU",
            "TYsR7mwU7C7XwOfzsIcZ",
          ],
          "total": 2,
          "type": "override",
        },
        "MrAa9r 99   irA ": {
          "desc": "Sixth Year Student",
          "id": "MrAa9r 99   irA ",
          "label": "Year 6",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "RYvrItrcLBumN2l1B2ZB": {
          "desc": "A member who is intentionally sharing their faith regularly (at least once every two weeks)",   
          "id": "RYvrItrcLBumN2l1B2ZB",
          "label": "Regular Outreach",
          "members": [
            "7dkOAcvhXgbUlCsuXYLZ",
            "6U8f3cPHbILYvrNrW3UV",
            "Ufyr7Qb9hJqlsR6rykBP",
            "sL2bXbm2oeu3nrFkyTzj",
            "N3CcEWZsAHvOCC3Y0XrD",
            "p4DWXe5G3efllrPi7SM2",
            "j8uBHU5MCo6eaBUidhKA",
            "o4GPRVN5JlqsntU4ZEQs",
            "03OBFstGenJLSwkPyoIe",
            "OxsxDa0Fwpo6Jm4L9G3U",
            "8TSC0q4pjKZXj8Batzq0",
          ],
          "total": 11,
          "type": "override",
        },
        "UDpXKKGAB0JpICs1Jfi5": {
          "desc": "Has completed First Steps or equivalent",
          "id": "UDpXKKGAB0JpICs1Jfi5",
          "label": "First Steps (Completed)",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "HaorE8zql5fNXzssp5Cu",
            "HayQhdlGsKxKbfPlo5ON",
            "KIysPYAG8YsT6dMYqhS6",
            "2oGzh8Nb5rCjF246qgWB",
            "rVtq0wgniMj2TRLJ6jBN",
            "N3CcEWZsAHvOCC3Y0XrD",
            "p4DWXe5G3efllrPi7SM2",
            "siuoK9YsLPm7iEopYACR",
            "c6dRupke4wlwBpyCyWOv",
            "j8uBHU5MCo6eaBUidhKA",
            "m6mCdveLWNgJGyDF9Sjo",
            "03OBFstGenJLSwkPyoIe",
            "OxsxDa0Fwpo6Jm4L9G3U",
          ],
          "total": 14,
          "type": "override",
        },
        "XPHi4AUKU8bks8dS6VAo": {
          "desc": "A member involved in a Prayer time with others from this movement",
          "id": "XPHi4AUKU8bks8dS6VAo",
          "label": "Prayer",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "cl07bEKOEIZ8ytnfEf69": {
          "desc": "A member who doesn't have an assigned year",
          "id": "cl07bEKOEIZ8ytnfEf69",
          "label": "No Year",
          "members": [
            "HaorE8zql5fNXzssp5Cu",
            "m7BhOkFAkPyfOXvSuYND",
            "FClWLoiM7zyzV7RzwJr7",
            "3VcOYykTqk3aueEM1qz4",
            "Ufyr7Qb9hJqlsR6rykBP",
            "5LWB5cBbj9EIpd6bk2I3",
            "zbTCywlmeHOCBa8h7o6F",
            "SisCsMdoKIAjnCX19y52",
            "0F7QAUqwwjR8WwfU6roJ",
            "jr1uvC1fhzIXyQupaepD",
            "kpG8fY9pkIk1hqcxQWdq",
            "FKeSTfqt39M2Q0zkMie7",
            "iALW2O72jJSCVfk1NSTJ",
            "b6htdXEpqVWVkVbPfqwj",
            "PtKGhRuTQIckzpB0a9Hx",
            "oJ3Twl5YTFghxMadZOja",
            "5HyKxGyIg9rVtled64g7",
            "lnWb8l2hKNpy7rnPBRlX",
            "DLy4fRpkzW8IkP2JGn6i",
            "YQo4XDW0bguEuYKyqxVL",
            "8qCpKI0Tutff2OJrVvBx",
            "clKfwO2Gln88sDOYGgeL",
            "SvRZTpTmTOQ7NBP7ixJD",
            "yNCl3NiDFOkJvtrUh1ib",
            "LGhHDHpSP4H2LHF2C5RY",
            "wXFzr07Qu7ID9TuoMTeD",
            "yPQP77fEJfzPB7AvFkUO",
            "kDv1llMqIjlgpHN8EUUT",
            "w9aPvaYAoM8mdOHvxhNQ",
            "H0EWkGM7CF7ZCAl3u6Wc",
            "o4GPRVN5JlqsntU4ZEQs",
            "j6TEsBzkZxvWOaVvLp41",
            "AYrrEdMNFaOw0Cdb2TRf",
            "flK72VhEp2aAgnA40uCy",
            "aE7Mu556fCJIhvxJY00y",
            "KyOhn6L12Nd1YlwAAtwF",
            "QLjMOU3G8Vi9aPLJGWnT",
          ],
          "total": 37,
          "type": "calc",
        },
        "covZf40QClhwnN7xPRl2": {
          "desc": `\"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.

Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)\"`,
          "id": "covZf40QClhwnN7xPRl2",
          "label": "Multiplying Disciples - Send",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "sL2bXbm2oeu3nrFkyTzj",
            "N3CcEWZsAHvOCC3Y0XrD",
            "p4DWXe5G3efllrPi7SM2",
            "OxsxDa0Fwpo6Jm4L9G3U",
          ],
          "total": 5,
          "type": "calc",
        },
        "dMs0DJmz3n53DNvKFYux": {
          "desc": "A student with two disciples and a CE ",
          "id": "dMs0DJmz3n53DNvKFYux",
          "label": "Multiplier",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "default": {
          "desc": "A vocational member of the movement",
          "id": "default",
          "label": "Missionary",
          "members": [
            "0F7QAUqwwjR8WwfU6roJ",
            "b6htdXEpqVWVkVbPfqwj",
            "lnWb8l2hKNpy7rnPBRlX",
            "DLy4fRpkzW8IkP2JGn6i",
            "yPQP77fEJfzPB7AvFkUO",
            "kDv1llMqIjlgpHN8EUUT",
            "aE7Mu556fCJIhvxJY00y",
          ],
          "total": 7,
          "type": "base",
        },
        "el1rE8E rArnt0a1": {
          "desc": "A member who is enrolled as an international student",
          "id": "el1rE8E rArnt0a1",
          "label": "International Student",
          "members": [
            "SisCsMdoKIAjnCX19y52",
            "OUoFZow0aN1cq2ICip1G",
          ],
          "total": 2,
          "type": "override",
        },
        "gUPCtQRdfYjdrotyfUht": {
          "desc": "Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. ",
          "id": "gUPCtQRdfYjdrotyfUht",
          "label": "Completed Basic Follow Up",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "HaorE8zql5fNXzssp5Cu",
            "HayQhdlGsKxKbfPlo5ON",
            "KIysPYAG8YsT6dMYqhS6",
            "2oGzh8Nb5rCjF246qgWB",
            "rVtq0wgniMj2TRLJ6jBN",
            "N3CcEWZsAHvOCC3Y0XrD",
            "p4DWXe5G3efllrPi7SM2",
            "siuoK9YsLPm7iEopYACR",
            "c6dRupke4wlwBpyCyWOv",
            "j8uBHU5MCo6eaBUidhKA",
            "m6mCdveLWNgJGyDF9Sjo",
            "03OBFstGenJLSwkPyoIe",
            "OxsxDa0Fwpo6Jm4L9G3U",
          ],
          "total": 14,
          "type": "calc",
        },
        "hkPIB0YcW8UuFh5Seodp": {
          "desc": "A member who is discipled and also regularly sharing their faith",
          "id": "hkPIB0YcW8UuFh5Seodp",
          "label": "Disciple doing outreach regularly",
          "members": [
            "6U8f3cPHbILYvrNrW3UV",
            "sL2bXbm2oeu3nrFkyTzj",
            "N3CcEWZsAHvOCC3Y0XrD",
            "p4DWXe5G3efllrPi7SM2",
            "j8uBHU5MCo6eaBUidhKA",
            "o4GPRVN5JlqsntU4ZEQs",
            "03OBFstGenJLSwkPyoIe",
            "OxsxDa0Fwpo6Jm4L9G3U",
            "8TSC0q4pjKZXj8Batzq0",
          ],
          "total": 9,
          "type": "calc",
        },
        "hogn1UUCuMhDOCtwvkAk": {
          "desc": "The number of non-christians connected to a student",
          "id": "hogn1UUCuMhDOCtwvkAk",
          "label": "Non-Christian Connecting with a Student",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "iF7g2h2sXmYM7i7FaYxk": {
          "desc": "A member who is on currently prac",
          "id": "iF7g2h2sXmYM7i7FaYxk",
          "label": "On Prac",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "j6Zq9tbZXweMbboALDs8": {
          "desc": "Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.",
          "id": "j6Zq9tbZXweMbboALDs8",
          "label": "Exploring Christianity (Completed)",
          "members": [
            "HaorE8zql5fNXzssp5Cu",
            "jr1uvC1fhzIXyQupaepD",
            "O0WpvvNuAQ1EK4nQp6qq",
            "OUoFZow0aN1cq2ICip1G",
            "5jajm7QQP6bExdVhhG8k",
            "o4GPRVN5JlqsntU4ZEQs",
          ],
          "total": 6,
          "type": "override",
        },
        "mH7ZmSClmCXE4DlXMNRD": {
          "desc": "A subsection of the UQ local movement",
          "id": "mH7ZmSClmCXE4DlXMNRD",
          "label": "--UQ System--",
          "members": [
            "PtKGhRuTQIckzpB0a9Hx",
          ],
          "total": 1,
          "type": "base",
        },
        "n42a2Mrlu )thr0r": {
          "desc": "A member who is graduating within 12 months",
          "id": "n42a2Mrlu )thr0r",
          "label": "Final Year",
          "members": [
            "sL2bXbm2oeu3nrFkyTzj",
            "p4DWXe5G3efllrPi7SM2",
          ],
          "total": 2,
          "type": "override",
        },
        "o86cGQi6TP7AWM4qpYSr": {
          "desc": "Has attended a Global Missions Project",
          "id": "o86cGQi6TP7AWM4qpYSr",
          "label": "Global Missions",
          "members": [
            "0F7QAUqwwjR8WwfU6roJ",
          ],
          "total": 1,
          "type": "override",
        },
        "oDXJHWBEdnwNOx6oR0sc": {
          "desc": "Is currently doing 'My 5 Things' or Equivalent",
          "id": "oDXJHWBEdnwNOx6oR0sc",
          "label": "5 Things (Current)",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "oOvDZwfqXwDkTsEoWvBk": {
          "desc": "A member who is involved/connected to Local & ISM",
          "id": "oOvDZwfqXwDkTsEoWvBk",
          "label": "Bridge",
          "members": [
            "lnWb8l2hKNpy7rnPBRlX",
          ],
          "total": 1,
          "type": "override",
        },
        "qXEKtqJjrZB4KbZZcXtw": {
          "desc": `\"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).

Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students.\"`,
          "id": "qXEKtqJjrZB4KbZZcXtw",
          "label": "Committed Followers - Train",
          "members": [
            "RgcNYB5Y6tehuiPF3fiU",
            "2oGzh8Nb5rCjF246qgWB",
            "sL2bXbm2oeu3nrFkyTzj",
            "N3CcEWZsAHvOCC3Y0XrD",
            "FRe93Gn4ICmPF8suHxsB",
            "j8uBHU5MCo6eaBUidhKA",
          ],
          "total": 6,
          "type": "calc",
        },
        "rTrr2d 3ed+1i3aa": {
          "desc": "A member who is not studying at this campus",
          "id": "rTrr2d 3ed+1i3aa",
          "label": "Not on Campus",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "rYMogPL8oQOx8bJdAMa2": {
          "desc": "A person who is Female",
          "id": "rYMogPL8oQOx8bJdAMa2",
          "label": "*Female",
          "members": [
            "iagy3QI3gujOxnRcpo6H",
            "7dkOAcvhXgbUlCsuXYLZ",
            "LvE0yC4ljZurVias8jex",
            "Rz0JcTPlcajfgO5UwKFL",
            "HayQhdlGsKxKbfPlo5ON",
            "KIysPYAG8YsT6dMYqhS6",
            "N3CcEWZsAHvOCC3Y0XrD",
            "CIo4dNwnNuslhMuPblY9",
            "qlahLMCw2qVxmA5o5gpR",
            "5HyKxGyIg9rVtled64g7",
            "lnWb8l2hKNpy7rnPBRlX",
            "DLy4fRpkzW8IkP2JGn6i",
            "YQo4XDW0bguEuYKyqxVL",
            "GKr2gWle6N4msCwBcPvV",
            "OUoFZow0aN1cq2ICip1G",
            "5jajm7QQP6bExdVhhG8k",
            "yPQP77fEJfzPB7AvFkUO",
            "kDv1llMqIjlgpHN8EUUT",
            "DyFunsfjR9vg2TclhCNP",
            "j8uBHU5MCo6eaBUidhKA",
            "w9aPvaYAoM8mdOHvxhNQ",
            "m6mCdveLWNgJGyDF9Sjo",
            "o4GPRVN5JlqsntU4ZEQs",
            "j6TEsBzkZxvWOaVvLp41",
            "OxsxDa0Fwpo6Jm4L9G3U",
            "8TSC0q4pjKZXj8Batzq0",
            "flK72VhEp2aAgnA40uCy",
            "aE7Mu556fCJIhvxJY00y",
          ],
          "total": 28,
          "type": "override",
        },
        "t tEe475  iaa00 ": {
          "desc": "Fourth Year Student",
          "id": "t tEe475  iaa00 ",
          "label": "Year 4",
          "members": [
            "sL2bXbm2oeu3nrFkyTzj",
            "FRe93Gn4ICmPF8suHxsB",
            "ketIhx0ruiO4RT7soEYD",
            "j8uBHU5MCo6eaBUidhKA",
          ],
          "total": 4,
          "type": "override",
        },
        "uMzNgQ5eRzJe84aER4RN": {
          "desc": `\"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.

Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change.\"`,
          "id": "uMzNgQ5eRzJe84aER4RN",
          "label": "Involved Students - Build",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "uccncwo7eGV0atXPCFW9": {
          "desc": "A member who is regularly involved, at least 2 activities a week",
          "id": "uccncwo7eGV0atXPCFW9",
          "label": "Involved",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "uu56d6XxJqsWgFJJPr3A": {
          "desc": "Number of people you started meeting with regularly to share the gospel (count once from your second meeting).",
          "id": "uu56d6XxJqsWgFJJPr3A",
          "label": "Evangelistic Contact",
          "members": [
            "5HyKxGyIg9rVtled64g7",
            "j6TEsBzkZxvWOaVvLp41",
            "flK72VhEp2aAgnA40uCy",
          ],
          "total": 3,
          "type": "calc",
        },
        "xcCy4Blwgkd9WLuVErNF": {
          "desc": "A member who is currently going through First Steps or Equivalent",
          "id": "xcCy4Blwgkd9WLuVErNF",
          "label": "First Steps (Current)",
          "members": [
            "Rz0JcTPlcajfgO5UwKFL",
            "FuiywanMGBuUQgpSchxY",
            "qlahLMCw2qVxmA5o5gpR",
            "OUoFZow0aN1cq2ICip1G",
            "5jajm7QQP6bExdVhhG8k",
            "8TSC0q4pjKZXj8Batzq0",
          ],
          "total": 6,
          "type": "override",
        },
      },
            tree: {
        "tree": [
          {
            "children": [
              {
                "children": [],
                "id": "o4GPRVN5JlqsntU4ZEQs",
                "key": "lnWb8l2hKNpy7rnPBRlX-o4GPRVN5JlqsntU4ZEQs",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "OUoFZow0aN1cq2ICip1G",
                "key": "lnWb8l2hKNpy7rnPBRlX-OUoFZow0aN1cq2ICip1G",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "5jajm7QQP6bExdVhhG8k",
                "key": "lnWb8l2hKNpy7rnPBRlX-5jajm7QQP6bExdVhhG8k",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "flK72VhEp2aAgnA40uCy",
                    "key": "j8uBHU5MCo6eaBUidhKA-flK72VhEp2aAgnA40uCy",
                    "parent": "j8uBHU5MCo6eaBUidhKA",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "7dkOAcvhXgbUlCsuXYLZ",
                    "key": "j8uBHU5MCo6eaBUidhKA-7dkOAcvhXgbUlCsuXYLZ",
                    "parent": "j8uBHU5MCo6eaBUidhKA",
                    "type": "normal",
                  },
                ],
                "id": "j8uBHU5MCo6eaBUidhKA",
                "key": "lnWb8l2hKNpy7rnPBRlX-j8uBHU5MCo6eaBUidhKA",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "w9aPvaYAoM8mdOHvxhNQ",
                "key": "lnWb8l2hKNpy7rnPBRlX-w9aPvaYAoM8mdOHvxhNQ",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
            ],
            "id": "lnWb8l2hKNpy7rnPBRlX",
            "key": "root-lnWb8l2hKNpy7rnPBRlX",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "AYrrEdMNFaOw0Cdb2TRf",
                "key": "PtKGhRuTQIckzpB0a9Hx-AYrrEdMNFaOw0Cdb2TRf",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "QLjMOU3G8Vi9aPLJGWnT",
                "key": "PtKGhRuTQIckzpB0a9Hx-QLjMOU3G8Vi9aPLJGWnT",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
              {
                "children": [],
                "id": "LvE0yC4ljZurVias8jex",
                "key": "PtKGhRuTQIckzpB0a9Hx-LvE0yC4ljZurVias8jex",
                "parent": "PtKGhRuTQIckzpB0a9Hx",
                "type": "normal",
              },
            ],
            "id": "PtKGhRuTQIckzpB0a9Hx",
            "key": "root-PtKGhRuTQIckzpB0a9Hx",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "Rz0JcTPlcajfgO5UwKFL",
                "key": "DLy4fRpkzW8IkP2JGn6i-Rz0JcTPlcajfgO5UwKFL",
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "type": "normal",
              },
            ],
            "id": "DLy4fRpkzW8IkP2JGn6i",
            "key": "root-DLy4fRpkzW8IkP2JGn6i",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "id": "HayQhdlGsKxKbfPlo5ON",
                    "key": "OxsxDa0Fwpo6Jm4L9G3U-HayQhdlGsKxKbfPlo5ON",
                    "parent": "OxsxDa0Fwpo6Jm4L9G3U",
                    "type": "normal",
                  },
                ],
                "id": "OxsxDa0Fwpo6Jm4L9G3U",
                "key": "yPQP77fEJfzPB7AvFkUO-OxsxDa0Fwpo6Jm4L9G3U",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
              {
                "children": [],
                "id": "iagy3QI3gujOxnRcpo6H",
                "key": "yPQP77fEJfzPB7AvFkUO-iagy3QI3gujOxnRcpo6H",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "j6TEsBzkZxvWOaVvLp41",
                        "key": "8TSC0q4pjKZXj8Batzq0-j6TEsBzkZxvWOaVvLp41",
                        "parent": "8TSC0q4pjKZXj8Batzq0",
                        "type": "normal",
                      },
                    ],
                    "id": "8TSC0q4pjKZXj8Batzq0",
                    "key": "KIysPYAG8YsT6dMYqhS6-8TSC0q4pjKZXj8Batzq0",
                    "parent": "KIysPYAG8YsT6dMYqhS6",
                    "type": "normal",
                  },
                ],
                "id": "KIysPYAG8YsT6dMYqhS6",
                "key": "yPQP77fEJfzPB7AvFkUO-KIysPYAG8YsT6dMYqhS6",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
            ],
            "id": "yPQP77fEJfzPB7AvFkUO",
            "key": "root-yPQP77fEJfzPB7AvFkUO",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "SvRZTpTmTOQ7NBP7ixJD",
                        "key": "2oGzh8Nb5rCjF246qgWB-SvRZTpTmTOQ7NBP7ixJD",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "FClWLoiM7zyzV7RzwJr7",
                        "key": "2oGzh8Nb5rCjF246qgWB-FClWLoiM7zyzV7RzwJr7",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "8qCpKI0Tutff2OJrVvBx",
                        "key": "2oGzh8Nb5rCjF246qgWB-8qCpKI0Tutff2OJrVvBx",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "FuiywanMGBuUQgpSchxY",
                        "key": "2oGzh8Nb5rCjF246qgWB-FuiywanMGBuUQgpSchxY",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "KyOhn6L12Nd1YlwAAtwF",
                        "key": "2oGzh8Nb5rCjF246qgWB-KyOhn6L12Nd1YlwAAtwF",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "ketIhx0ruiO4RT7soEYD",
                        "key": "2oGzh8Nb5rCjF246qgWB-ketIhx0ruiO4RT7soEYD",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                    ],
                    "id": "2oGzh8Nb5rCjF246qgWB",
                    "key": "sL2bXbm2oeu3nrFkyTzj-2oGzh8Nb5rCjF246qgWB",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "m7BhOkFAkPyfOXvSuYND",
                    "key": "sL2bXbm2oeu3nrFkyTzj-m7BhOkFAkPyfOXvSuYND",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "OFm9vtWv54mDrkIZ5zMD",
                    "key": "sL2bXbm2oeu3nrFkyTzj-OFm9vtWv54mDrkIZ5zMD",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "clKfwO2Gln88sDOYGgeL",
                    "key": "sL2bXbm2oeu3nrFkyTzj-clKfwO2Gln88sDOYGgeL",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "zbTCywlmeHOCBa8h7o6F",
                    "key": "sL2bXbm2oeu3nrFkyTzj-zbTCywlmeHOCBa8h7o6F",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "siuoK9YsLPm7iEopYACR",
                    "key": "sL2bXbm2oeu3nrFkyTzj-siuoK9YsLPm7iEopYACR",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                ],
                "id": "sL2bXbm2oeu3nrFkyTzj",
                "key": "b6htdXEpqVWVkVbPfqwj-sL2bXbm2oeu3nrFkyTzj",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "tAWgKRf9DSaQLAcTjQ3z",
                        "key": "03OBFstGenJLSwkPyoIe-tAWgKRf9DSaQLAcTjQ3z",
                        "parent": "03OBFstGenJLSwkPyoIe",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "Ufyr7Qb9hJqlsR6rykBP",
                        "key": "03OBFstGenJLSwkPyoIe-Ufyr7Qb9hJqlsR6rykBP",
                        "parent": "03OBFstGenJLSwkPyoIe",
                        "type": "normal",
                      },
                    ],
                    "id": "03OBFstGenJLSwkPyoIe",
                    "key": "p4DWXe5G3efllrPi7SM2-03OBFstGenJLSwkPyoIe",
                    "parent": "p4DWXe5G3efllrPi7SM2",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "rVtq0wgniMj2TRLJ6jBN",
                        "key": "6U8f3cPHbILYvrNrW3UV-rVtq0wgniMj2TRLJ6jBN",
                        "parent": "6U8f3cPHbILYvrNrW3UV",
                        "type": "normal",
                      },
                    ],
                    "id": "6U8f3cPHbILYvrNrW3UV",
                    "key": "p4DWXe5G3efllrPi7SM2-6U8f3cPHbILYvrNrW3UV",
                    "parent": "p4DWXe5G3efllrPi7SM2",
                    "type": "normal",
                  },
                ],
                "id": "p4DWXe5G3efllrPi7SM2",
                "key": "b6htdXEpqVWVkVbPfqwj-p4DWXe5G3efllrPi7SM2",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
            ],
            "id": "b6htdXEpqVWVkVbPfqwj",
            "key": "root-b6htdXEpqVWVkVbPfqwj",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "id": "YQo4XDW0bguEuYKyqxVL",
                    "key": "m6mCdveLWNgJGyDF9Sjo-YQo4XDW0bguEuYKyqxVL",
                    "parent": "m6mCdveLWNgJGyDF9Sjo",
                    "type": "normal",
                  },
                ],
                "id": "m6mCdveLWNgJGyDF9Sjo",
                "key": "aE7Mu556fCJIhvxJY00y-m6mCdveLWNgJGyDF9Sjo",
                "parent": "aE7Mu556fCJIhvxJY00y",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "CIo4dNwnNuslhMuPblY9",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-CIo4dNwnNuslhMuPblY9",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "DyFunsfjR9vg2TclhCNP",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-DyFunsfjR9vg2TclhCNP",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "GKr2gWle6N4msCwBcPvV",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-GKr2gWle6N4msCwBcPvV",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "qlahLMCw2qVxmA5o5gpR",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-qlahLMCw2qVxmA5o5gpR",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "5HyKxGyIg9rVtled64g7",
                    "key": "N3CcEWZsAHvOCC3Y0XrD-5HyKxGyIg9rVtled64g7",
                    "parent": "N3CcEWZsAHvOCC3Y0XrD",
                    "type": "normal",
                  },
                ],
                "id": "N3CcEWZsAHvOCC3Y0XrD",
                "key": "aE7Mu556fCJIhvxJY00y-N3CcEWZsAHvOCC3Y0XrD",
                "parent": "aE7Mu556fCJIhvxJY00y",
                "type": "normal",
              },
            ],
            "id": "aE7Mu556fCJIhvxJY00y",
            "key": "root-aE7Mu556fCJIhvxJY00y",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "kDv1llMqIjlgpHN8EUUT",
            "key": "root-kDv1llMqIjlgpHN8EUUT",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "id": "3VcOYykTqk3aueEM1qz4",
                    "key": "RgcNYB5Y6tehuiPF3fiU-3VcOYykTqk3aueEM1qz4",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "yNCl3NiDFOkJvtrUh1ib",
                    "key": "RgcNYB5Y6tehuiPF3fiU-yNCl3NiDFOkJvtrUh1ib",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "TYsR7mwU7C7XwOfzsIcZ",
                        "key": "HaorE8zql5fNXzssp5Cu-TYsR7mwU7C7XwOfzsIcZ",
                        "parent": "HaorE8zql5fNXzssp5Cu",
                        "type": "normal",
                      },
                    ],
                    "id": "HaorE8zql5fNXzssp5Cu",
                    "key": "RgcNYB5Y6tehuiPF3fiU-HaorE8zql5fNXzssp5Cu",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "iALW2O72jJSCVfk1NSTJ",
                    "key": "RgcNYB5Y6tehuiPF3fiU-iALW2O72jJSCVfk1NSTJ",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "LGhHDHpSP4H2LHF2C5RY",
                    "key": "RgcNYB5Y6tehuiPF3fiU-LGhHDHpSP4H2LHF2C5RY",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                ],
                "id": "RgcNYB5Y6tehuiPF3fiU",
                "key": "0F7QAUqwwjR8WwfU6roJ-RgcNYB5Y6tehuiPF3fiU",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "kpG8fY9pkIk1hqcxQWdq",
                "key": "0F7QAUqwwjR8WwfU6roJ-kpG8fY9pkIk1hqcxQWdq",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "FKeSTfqt39M2Q0zkMie7",
                    "key": "FRe93Gn4ICmPF8suHxsB-FKeSTfqt39M2Q0zkMie7",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "oJ3Twl5YTFghxMadZOja",
                    "key": "FRe93Gn4ICmPF8suHxsB-oJ3Twl5YTFghxMadZOja",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "wXFzr07Qu7ID9TuoMTeD",
                    "key": "FRe93Gn4ICmPF8suHxsB-wXFzr07Qu7ID9TuoMTeD",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "5LWB5cBbj9EIpd6bk2I3",
                    "key": "FRe93Gn4ICmPF8suHxsB-5LWB5cBbj9EIpd6bk2I3",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "H0EWkGM7CF7ZCAl3u6Wc",
                    "key": "FRe93Gn4ICmPF8suHxsB-H0EWkGM7CF7ZCAl3u6Wc",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "SisCsMdoKIAjnCX19y52",
                    "key": "FRe93Gn4ICmPF8suHxsB-SisCsMdoKIAjnCX19y52",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "O0WpvvNuAQ1EK4nQp6qq",
                    "key": "FRe93Gn4ICmPF8suHxsB-O0WpvvNuAQ1EK4nQp6qq",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                ],
                "id": "FRe93Gn4ICmPF8suHxsB",
                "key": "0F7QAUqwwjR8WwfU6roJ-FRe93Gn4ICmPF8suHxsB",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "jr1uvC1fhzIXyQupaepD",
                "key": "0F7QAUqwwjR8WwfU6roJ-jr1uvC1fhzIXyQupaepD",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "c6dRupke4wlwBpyCyWOv",
                "key": "0F7QAUqwwjR8WwfU6roJ-c6dRupke4wlwBpyCyWOv",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
            ],
            "id": "0F7QAUqwwjR8WwfU6roJ",
            "key": "root-0F7QAUqwwjR8WwfU6roJ",
            "parent": "root",
            "type": "normal",
          },
        ],
      },
          },
          'noParents': {
            doc: {
              id: "noParents",
              label: "No Parents"
            },
            parents: {"1675Xwq0bFBMZO0XmvsP": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "8lLE3MQyAZcQvTKiR3rH": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "el1rE8E rArnt0a1",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
            "oOvDZwfqXwDkTsEoWvBk",
          ],
        },
        "qOba1QSzmOB2BHL8WqFD": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "el1rE8E rArnt0a1",
            "rYMogPL8oQOx8bJdAMa2",
            " Tta1 a0(:)lSTa9",
          ],
        },
        "1Otp49vJ6Krcyvwcn4Mb": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "mH7ZmSClmCXE4DlXMNRD",
          ],
        },
        "2e1etGimRhzJdEDLqHYm": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "41g0Esm7MYlYVjWummPM": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
            "UDpXKKGAB0JpICs1Jfi5",
            "t tEe475  iaa00 ",
          ],
        },
        "5SMB4YnkuYLSRpv3Vb7K": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "711TRvfJpvVwFjL6Dnti": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "3ohW3FU65MTUnJuQHkvB",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "8ZSvPVPsvyc7K0vdk2ez": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "9BX1jaJYTqzAeFloX4bI": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "C1nQX607TTJiHSaJQdSF": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "MrAa9r 99   irA ",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "CHtIeJThnGhzAeWWks5g": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "DdFgHnVDTtKLjbdOeEyR": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "EARQFdxmZsJgVhFUh4qn": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "FnPh5VIW2GgaJKiZjUQ8": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "H52Kf6Alu5knusGxEGrB": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "el1rE8E rArnt0a1",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "JNgyOyrypDRS7XlDoLvO": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "N0bpRvG0h1vu7Wk7lrbN": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "OEdGg5FL2Oq0IlcfQue8": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "OPFH9KNwqXeYRvopnoFM": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "QXgeY465UVsKnfdwFW48": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "QeIm063qu8xHAgcvK34c": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "SA4jQtdFuI0srEDYDa3o": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "UtOHfX9BDZhmhUAYjrM2": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "0 u5rSSaraMtTM61",
          ],
        },
        "VmtdU8nxHjWZduJEhlXm": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "VqNOBhniLhWQN397vZFp": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "Vx9Ls5n10O2NX3RhmB4M": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "WZ1GggK61NUYI2BebS36": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "YrZB0KJL94BSnecnK6t4": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "ae8cnpOcO5ONsTaQqj9l": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "bprNzBn8L1OQeudiGfPg": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "dV1qaOGk3FnzZFNUw1oZ": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "0d yiM7aTa1aet0T",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "der2XOL3Gdqua6LyH1xj": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "dgYClNToNO7TjQKgEipH": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
            "t tEe475  iaa00 ",
          ],
        },
        "fdvFS9D1VJ2cDGgD3nSX": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "fnbxJCK4oF9458qiVtIx": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "iKkzRo4LNx8fZS9LpdFJ": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "3ohW3FU65MTUnJuQHkvB",
            "rYMogPL8oQOx8bJdAMa2",
            "j6Zq9tbZXweMbboALDs8",
            "0d yiM7aTa1aet0T",
            "UDpXKKGAB0JpICs1Jfi5",
          ],
        },
        "kl4RSMlI2LqxV2KePQQI": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "3ohW3FU65MTUnJuQHkvB",
            " Tta1 a0(:)lSTa9",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "nCiB1F8JDdudJO6Xyivy": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
          ],
        },
        "o5V7o5UtDsH6QJE09QMN": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "pHTIyu3nx6MPhmF7AgXc": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "pj0ivaS4d6JrHgtSVIke": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "qe4D4hHsAVrKVv8iLCE2": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "rTrr2d 3ed+1i3aa",
          ],
        },
        "s9GBQtmBPI4mL6VYlPmM": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "KA7mWeXalOkMuY2pgXHR",
          ],
        },
        "sCk0ORSlIKlI4TEMoj6L": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            " Tta1 a0(:)lSTa9",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "siH75ijS6P0c3E6DRe4d": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "tT0IRk2dmBdLQyeMBKfB": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "v11qo1Q8Zy1NB34uvxmP": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
            "3ohW3FU65MTUnJuQHkvB",
            "rTrr2d 3ed+1i3aa",
          ],
        },
        "v5XZdAcEsZDKSTfC2LgH": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },},
            stats: {
              "treeTotal":{
          "desc": "Number of Members in this Tree",
          "label": "Total on Tree",
          "total": 50,
        },
        " Tta1 a0(:)lSTa9": {
          "desc": "A not yet christian currently going through a course to explore Christianity (CE/DBS or Equivalent)",
          "id": " Tta1 a0(:)lSTa9",
          "label": "Exploring Christianity",
          "members": [
            "qOba1QSzmOB2BHL8WqFD",
            "sCk0ORSlIKlI4TEMoj6L",
            "kl4RSMlI2LqxV2KePQQI",
          ],
          "total": 3,
          "type": "override",
        },
        " a1i n 5mnary0T+": {
          "desc": "An official student leader on campus, part of the MB team",
          "id": " a1i n 5mnary0T+",
          "label": "Student Leader",
          "members": [],
          "total": 0,
          "type": "base",
        },
        "(7lr10aTrtmd e (": {
          "desc": "A member who is not yet a Christian (Must be regularly exploring faith through a course (add to the tree from the second session) or they are coming to an activity at least once a week. Ask does the non-Xn know that they are exploring Christianity within PTC?)",
          "id": "(7lr10aTrtmd e (",
          "label": "Non-Christian",
          "members": [
            "tT0IRk2dmBdLQyeMBKfB",
            "qOba1QSzmOB2BHL8WqFD",
            "C1nQX607TTJiHSaJQdSF",
            "o5V7o5UtDsH6QJE09QMN",
            "dgYClNToNO7TjQKgEipH",
            "sCk0ORSlIKlI4TEMoj6L",
            "der2XOL3Gdqua6LyH1xj",
            "OEdGg5FL2Oq0IlcfQue8",
            "711TRvfJpvVwFjL6Dnti",
            "H52Kf6Alu5knusGxEGrB",
            "kl4RSMlI2LqxV2KePQQI",
          ],
          "total": 11,
          "type": "base",
        },
        "0 u5rSSaraMtTM61": {
          "desc": "Third Year Student",
          "id": "0 u5rSSaraMtTM61",
          "label": "Year 3",
          "members": [
            "dV1qaOGk3FnzZFNUw1oZ",
            "WZ1GggK61NUYI2BebS36",
            "8lLE3MQyAZcQvTKiR3rH",
            "YrZB0KJL94BSnecnK6t4",
            "2e1etGimRhzJdEDLqHYm",
            "fnbxJCK4oF9458qiVtIx",
            "bprNzBn8L1OQeudiGfPg",
            "FnPh5VIW2GgaJKiZjUQ8",
            "8ZSvPVPsvyc7K0vdk2ez",
            "UtOHfX9BDZhmhUAYjrM2",
          ],
          "total": 10,
          "type": "override",
        },
        "0aS0 altn5ndGS d": {
          "desc": " Fifth Year Student",
          "id": "0aS0 altn5ndGS d",
          "label": "Year 5",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "0d yiM7aTa1aet0T": {
          "desc": "A member who became a Christian through this movement",
          "id": "0d yiM7aTa1aet0T",
          "label": "New Christian through Movement",
          "members": [
            "dV1qaOGk3FnzZFNUw1oZ",
            "9BX1jaJYTqzAeFloX4bI",
            "FnPh5VIW2GgaJKiZjUQ8",
            "iKkzRo4LNx8fZS9LpdFJ",
          ],
          "total": 4,
          "type": "override",
        },
        "11ttn nu101dGd m": {
          "desc": "A member who is a christian (Must be sharing their faith within Power to Change at least once every 2 weeks, or they involved with another activity at least once a week)",
          "id": "11ttn nu101dGd m",
          "label": "Christian",
          "members": [
            "dV1qaOGk3FnzZFNUw1oZ",
            "WZ1GggK61NUYI2BebS36",
            "8lLE3MQyAZcQvTKiR3rH",
            "YrZB0KJL94BSnecnK6t4",
            "SA4jQtdFuI0srEDYDa3o",
            "CHtIeJThnGhzAeWWks5g",
            "v11qo1Q8Zy1NB34uvxmP",
            "siH75ijS6P0c3E6DRe4d",
            "v5XZdAcEsZDKSTfC2LgH",
            "EARQFdxmZsJgVhFUh4qn",
            "nCiB1F8JDdudJO6Xyivy",
            "JNgyOyrypDRS7XlDoLvO",
            "QXgeY465UVsKnfdwFW48",
            "2e1etGimRhzJdEDLqHYm",
            "fnbxJCK4oF9458qiVtIx",
            "QeIm063qu8xHAgcvK34c",
            "41g0Esm7MYlYVjWummPM",
            "bprNzBn8L1OQeudiGfPg",
            "9BX1jaJYTqzAeFloX4bI",
            "IEIWmAwKUWYqIqSZyHaE",
            "FnPh5VIW2GgaJKiZjUQ8",
            "1675Xwq0bFBMZO0XmvsP",
            "VqNOBhniLhWQN397vZFp",
            "5SMB4YnkuYLSRpv3Vb7K",
            "N0bpRvG0h1vu7Wk7lrbN",
            "8ZSvPVPsvyc7K0vdk2ez",
            "pHTIyu3nx6MPhmF7AgXc",
            "iKkzRo4LNx8fZS9LpdFJ",
            "OPFH9KNwqXeYRvopnoFM",
            "fdvFS9D1VJ2cDGgD3nSX",
            "s9GBQtmBPI4mL6VYlPmM",
            "pj0ivaS4d6JrHgtSVIke",
            "VmtdU8nxHjWZduJEhlXm",
            "Vx9Ls5n10O2NX3RhmB4M",
            "ae8cnpOcO5ONsTaQqj9l",
            "UtOHfX9BDZhmhUAYjrM2",
            "qe4D4hHsAVrKVv8iLCE2",
            "DdFgHnVDTtKLjbdOeEyR",
          ],
          "total": 38,
          "type": "base",
        },
        "3ao5OGXsDa6eWIwqzfkv": {
          "desc": "This person assists the movement in an official capacity but is not part of the missionary or Student Leader teams",
          "id": "3ao5OGXsDa6eWIwqzfkv",
          "label": "Associate / Volunteer",
          "members": [],
          "total": 0,
          "type": "base",
        },
        "3ohW3FU65MTUnJuQHkvB": {
          "desc": "Second Year Student",
          "id": "3ohW3FU65MTUnJuQHkvB",
          "label": "Year 2",
          "members": [
            "CHtIeJThnGhzAeWWks5g",
            "v11qo1Q8Zy1NB34uvxmP",
            "nCiB1F8JDdudJO6Xyivy",
            "JNgyOyrypDRS7XlDoLvO",
            "N0bpRvG0h1vu7Wk7lrbN",
            "iKkzRo4LNx8fZS9LpdFJ",
            "711TRvfJpvVwFjL6Dnti",
            "kl4RSMlI2LqxV2KePQQI",
          ],
          "total": 8,
          "type": "override",
        },
        "46akFzeUaeqBWC3IBXV2": {
          "desc": "A person who is Male",
          "id": "46akFzeUaeqBWC3IBXV2",
          "label": "*Male",
          "members": [
            "tT0IRk2dmBdLQyeMBKfB",
            "41g0Esm7MYlYVjWummPM",
            "bprNzBn8L1OQeudiGfPg",
            "9BX1jaJYTqzAeFloX4bI",
            "1675Xwq0bFBMZO0XmvsP",
            "OPFH9KNwqXeYRvopnoFM",
            "pj0ivaS4d6JrHgtSVIke",
            "VmtdU8nxHjWZduJEhlXm",
            "711TRvfJpvVwFjL6Dnti",
          ],
          "total": 9,
          "type": "override",
        },
        "7RmRpoE0w86et5oFJV6Q": {
          "desc": "Has Attended a Local Summer Project",
          "id": "7RmRpoE0w86et5oFJV6Q",
          "label": "Summer Project",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "99e2XOwRbZgb773aGLAg": {
          "desc": "A Non Christian who is coming to Alpha",
          "id": "99e2XOwRbZgb773aGLAg",
          "label": "Alpha (Completed)",
          "members": [],
          "total": 0,
          "type": "override",
        },
        ":0am 2101y1n )0t": {
          "desc": "A member being discipled on Campus",
          "id": ":0am 2101y1n )0t",
          "label": "Disciple",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "G8SRxWpXvfz5aIk9OdgP": {
          "desc": "Number of students who are in their final semester and are leaving uni with a plan to help fulfill the Great Commission. Do they have the \"5 Things\" in place?",
          "id": "G8SRxWpXvfz5aIk9OdgP",
          "label": "Lifetime Labourer",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "IHpI6i86UwHaBHKlDfsn": {
          "desc": "Has completed 'My 5 Things' or Equivalent",
          "id": "IHpI6i86UwHaBHKlDfsn",
          "label": "5 Things (Completed)",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "JQtDoHf85B3HCPtyxQvG": {
          "desc": "A member without an assigned gender",
          "id": "JQtDoHf85B3HCPtyxQvG",
          "label": "No Specified Gender",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "KA7mWeXalOkMuY2pgXHR": {
          "desc": "First year Student",
          "id": "KA7mWeXalOkMuY2pgXHR",
          "label": "Year 1",
          "members": [
            "o5V7o5UtDsH6QJE09QMN",
            "EARQFdxmZsJgVhFUh4qn",
            "QeIm063qu8xHAgcvK34c",
            "s9GBQtmBPI4mL6VYlPmM",
            "Vx9Ls5n10O2NX3RhmB4M",
            "ae8cnpOcO5ONsTaQqj9l",
            "DdFgHnVDTtKLjbdOeEyR",
          ],
          "total": 7,
          "type": "override",
        },
        "KhRaG31GtlG5mpnThUdH": {
          "desc": "A member committed to finidng 2 Disciples and a CE",
          "id": "KhRaG31GtlG5mpnThUdH",
          "label": "Multiplier (Aspirational)",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "L7Ypv2NtQUSVhcJRQTgO": {
          "desc": "Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.",
          "id": "L7Ypv2NtQUSVhcJRQTgO",
          "label": "Remaining Fruit",
          "members": [
            "dV1qaOGk3FnzZFNUw1oZ",
            "9BX1jaJYTqzAeFloX4bI",
            "FnPh5VIW2GgaJKiZjUQ8",
            "iKkzRo4LNx8fZS9LpdFJ",
          ],
          "total": 4,
          "type": "calc",
        },
        "MM raida3utaTd 1": {
          "desc": "Seventh Year Student",
          "id": "MM raida3utaTd 1",
          "label": "Year 7",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "MrAa9r 99   irA ": {
          "desc": "Sixth Year Student",
          "id": "MrAa9r 99   irA ",
          "label": "Year 6",
          "members": [
            "C1nQX607TTJiHSaJQdSF",
          ],
          "total": 1,
          "type": "override",
        },
        "RYvrItrcLBumN2l1B2ZB": {
          "desc": "A member who is intentionally sharing their faith regularly (at least once every two weeks)",   
          "id": "RYvrItrcLBumN2l1B2ZB",
          "label": "Regular Outreach",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "UDpXKKGAB0JpICs1Jfi5": {
          "desc": "Has completed First Steps or equivalent",
          "id": "UDpXKKGAB0JpICs1Jfi5",
          "label": "First Steps (Completed)",
          "members": [
            "WZ1GggK61NUYI2BebS36",
            "41g0Esm7MYlYVjWummPM",
            "N0bpRvG0h1vu7Wk7lrbN",
            "8ZSvPVPsvyc7K0vdk2ez",
            "iKkzRo4LNx8fZS9LpdFJ",
          ],
          "total": 5,
          "type": "override",
        },
        "XPHi4AUKU8bks8dS6VAo": {
          "desc": "A member involved in a Prayer time with others from this movement",
          "id": "XPHi4AUKU8bks8dS6VAo",
          "label": "Prayer",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "cl07bEKOEIZ8ytnfEf69": {
          "desc": "A member who doesn't have an assigned year",
          "id": "cl07bEKOEIZ8ytnfEf69",
          "label": "No Year",
          "members": [
            "tT0IRk2dmBdLQyeMBKfB",
            "SA4jQtdFuI0srEDYDa3o",
            "qOba1QSzmOB2BHL8WqFD",
            "siH75ijS6P0c3E6DRe4d",
            "v5XZdAcEsZDKSTfC2LgH",
            "QXgeY465UVsKnfdwFW48",
            "sCk0ORSlIKlI4TEMoj6L",
            "der2XOL3Gdqua6LyH1xj",
            "9BX1jaJYTqzAeFloX4bI",
            "IEIWmAwKUWYqIqSZyHaE",
            "1675Xwq0bFBMZO0XmvsP",
            "VqNOBhniLhWQN397vZFp",
            "5SMB4YnkuYLSRpv3Vb7K",
            "pHTIyu3nx6MPhmF7AgXc",
            "1Otp49vJ6Krcyvwcn4Mb",
            "fdvFS9D1VJ2cDGgD3nSX",
            "VmtdU8nxHjWZduJEhlXm",
            "qe4D4hHsAVrKVv8iLCE2",
            "OEdGg5FL2Oq0IlcfQue8",
            "H52Kf6Alu5knusGxEGrB",
          ],
          "total": 20,
          "type": "calc",
        },
        "covZf40QClhwnN7xPRl2": {
          "desc": `\"Definition: Number of people who are following Jesus, engaged in the Great Commission and making new disciples.

Description: These students are discipling others and training others in how to share their faith. These would most likely be your key student leaders (but there could be other senior students who fit this category as well)\"`,
          "id": "covZf40QClhwnN7xPRl2",
          "label": "Multiplying Disciples - Send",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "dMs0DJmz3n53DNvKFYux": {
          "desc": "A student with two disciples and a CE ",
          "id": "dMs0DJmz3n53DNvKFYux",
          "label": "Multiplier",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "default": {
          "desc": "A vocational member of the movement",
          "id": "default",
          "label": "Missionary",
          "members": [],
          "total": 0,
          "type": "base",
        },
        "el1rE8E rArnt0a1": {
          "desc": "A member who is enrolled as an international student",
          "id": "el1rE8E rArnt0a1",
          "label": "International Student",
          "members": [
            "8lLE3MQyAZcQvTKiR3rH",
            "qOba1QSzmOB2BHL8WqFD",
            "IEIWmAwKUWYqIqSZyHaE",
            "H52Kf6Alu5knusGxEGrB",
          ],
          "total": 4,
          "type": "override",
        },
        "gUPCtQRdfYjdrotyfUht": {
          "desc": "Number of people who have been grounded in the basics of the faith through completion of some follow up process, whether face to face or online. ",
          "id": "gUPCtQRdfYjdrotyfUht",
          "label": "Completed Basic Follow Up",
          "members": [
            "WZ1GggK61NUYI2BebS36",
            "41g0Esm7MYlYVjWummPM",
            "N0bpRvG0h1vu7Wk7lrbN",
            "8ZSvPVPsvyc7K0vdk2ez",
            "iKkzRo4LNx8fZS9LpdFJ",
          ],
          "total": 5,
          "type": "calc",
        },
        "hkPIB0YcW8UuFh5Seodp": {
          "desc": "A member who is discipled and also regularly sharing their faith",
          "id": "hkPIB0YcW8UuFh5Seodp",
          "label": "Disciple doing outreach regularly",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "hogn1UUCuMhDOCtwvkAk": {
          "desc": "The number of non-christians connected to a student",
          "id": "hogn1UUCuMhDOCtwvkAk",
          "label": "Non-Christian Connecting with a Student",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "iF7g2h2sXmYM7i7FaYxk": {
          "desc": "A member who is on currently prac",
          "id": "iF7g2h2sXmYM7i7FaYxk",
          "label": "On Prac",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "j6Zq9tbZXweMbboALDs8": {
          "desc": "Has completed a course to explore Christianity, while not a christian (CE/DBS or Equivalent). A christian can have this modifier if they had completed it when they were not yet a christian.",
          "id": "j6Zq9tbZXweMbboALDs8",
          "label": "Exploring Christianity (Completed)",
          "members": [
            "iKkzRo4LNx8fZS9LpdFJ",
          ],
          "total": 1,
          "type": "override",
        },
        "mH7ZmSClmCXE4DlXMNRD": {
          "desc": "A subsection of the UQ local movement",
          "id": "mH7ZmSClmCXE4DlXMNRD",
          "label": "--UQ System--",
          "members": [
            "1Otp49vJ6Krcyvwcn4Mb",
          ],
          "total": 1,
          "type": "base",
        },
        "n42a2Mrlu )thr0r": {
          "desc": "A member who is graduating within 12 months",
          "id": "n42a2Mrlu )thr0r",
          "label": "Final Year",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "o86cGQi6TP7AWM4qpYSr": {
          "desc": "Has attended a Global Missions Project",
          "id": "o86cGQi6TP7AWM4qpYSr",
          "label": "Global Missions",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "oDXJHWBEdnwNOx6oR0sc": {
          "desc": "Is currently doing 'My 5 Things' or Equivalent",
          "id": "oDXJHWBEdnwNOx6oR0sc",
          "label": "5 Things (Current)",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "oOvDZwfqXwDkTsEoWvBk": {
          "desc": "A member who is involved/connected to Local & ISM",
          "id": "oOvDZwfqXwDkTsEoWvBk",
          "label": "Bridge",
          "members": [
            "8lLE3MQyAZcQvTKiR3rH",
          ],
          "total": 1,
          "type": "override",
        },
        "qXEKtqJjrZB4KbZZcXtw": {
          "desc": `\"Definition: Number of people who are walking in the Spirit, involved in the process of spiritual growth sharing their faith and early ministry through biblical community (e.g. churches, fellowships, discipleship groups, online communities).

Description: Students who are actively involved – attending outreach, small groups, being discipled. (these could be some newer student leaders as well). Attending a conference would help distinguish these from Involved Students.\"`,
          "id": "qXEKtqJjrZB4KbZZcXtw",
          "label": "Committed Followers - Train",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "rTrr2d 3ed+1i3aa": {
          "desc": "A member who is not studying at this campus",
          "id": "rTrr2d 3ed+1i3aa",
          "label": "Not on Campus",
          "members": [
            "v11qo1Q8Zy1NB34uvxmP",
            "IEIWmAwKUWYqIqSZyHaE",
            "qe4D4hHsAVrKVv8iLCE2",
          ],
          "total": 3,
          "type": "override",
        },
        "rYMogPL8oQOx8bJdAMa2": {
          "desc": "A person who is Female",
          "id": "rYMogPL8oQOx8bJdAMa2",
          "label": "*Female",
          "members": [
            "dV1qaOGk3FnzZFNUw1oZ",
            "WZ1GggK61NUYI2BebS36",
            "8lLE3MQyAZcQvTKiR3rH",
            "YrZB0KJL94BSnecnK6t4",
            "SA4jQtdFuI0srEDYDa3o",
            "qOba1QSzmOB2BHL8WqFD",
            "C1nQX607TTJiHSaJQdSF",
            "CHtIeJThnGhzAeWWks5g",
            "v11qo1Q8Zy1NB34uvxmP",
            "o5V7o5UtDsH6QJE09QMN",
            "dgYClNToNO7TjQKgEipH",
            "siH75ijS6P0c3E6DRe4d",
            "v5XZdAcEsZDKSTfC2LgH",
            "EARQFdxmZsJgVhFUh4qn",
            "nCiB1F8JDdudJO6Xyivy",
            "JNgyOyrypDRS7XlDoLvO",
            "QXgeY465UVsKnfdwFW48",
            "2e1etGimRhzJdEDLqHYm",
            "sCk0ORSlIKlI4TEMoj6L",
            "fnbxJCK4oF9458qiVtIx",
            "QeIm063qu8xHAgcvK34c",
            "der2XOL3Gdqua6LyH1xj",
            "IEIWmAwKUWYqIqSZyHaE",
            "FnPh5VIW2GgaJKiZjUQ8",
            "VqNOBhniLhWQN397vZFp",
            "5SMB4YnkuYLSRpv3Vb7K",
            "N0bpRvG0h1vu7Wk7lrbN",
            "8ZSvPVPsvyc7K0vdk2ez",
            "pHTIyu3nx6MPhmF7AgXc",
            "iKkzRo4LNx8fZS9LpdFJ",
            "fdvFS9D1VJ2cDGgD3nSX",
            "s9GBQtmBPI4mL6VYlPmM",
            "Vx9Ls5n10O2NX3RhmB4M",
            "ae8cnpOcO5ONsTaQqj9l",
            "UtOHfX9BDZhmhUAYjrM2",
            "qe4D4hHsAVrKVv8iLCE2",
            "OEdGg5FL2Oq0IlcfQue8",
            "H52Kf6Alu5knusGxEGrB",
            "DdFgHnVDTtKLjbdOeEyR",
            "kl4RSMlI2LqxV2KePQQI",
          ],
          "total": 40,
          "type": "override",
        },
        "t tEe475  iaa00 ": {
          "desc": "Fourth Year Student",
          "id": "t tEe475  iaa00 ",
          "label": "Year 4",
          "members": [
            "dgYClNToNO7TjQKgEipH",
            "41g0Esm7MYlYVjWummPM",
            "OPFH9KNwqXeYRvopnoFM",
            "pj0ivaS4d6JrHgtSVIke",
          ],
          "total": 4,
          "type": "override",
        },
        "uMzNgQ5eRzJe84aER4RN": {
          "desc": `\"Definition: Number of engaged disciples who have been equipped with strategy-defined leadership training and entrusted with an opportunity for action, whether face to face or online.

Description: Students connected in the ministry. They would have been met up with for a follow up and are participating in activities – they could be checking us out, or be a senior student who is still around but not as actively involved anymore. They may not have selected into the full vision of Power to Change.\"`,
          "id": "uMzNgQ5eRzJe84aER4RN",
          "label": "Involved Students - Build",
          "members": [],
          "total": 0,
          "type": "calc",
        },
        "uccncwo7eGV0atXPCFW9": {
          "desc": "A member who is regularly involved, at least 2 activities a week",
          "id": "uccncwo7eGV0atXPCFW9",
          "label": "Involved",
          "members": [],
          "total": 0,
          "type": "override",
        },
        "uu56d6XxJqsWgFJJPr3A": {
          "desc": "Number of people you started meeting with regularly to share the gospel (count once from your second meeting).",
          "id": "uu56d6XxJqsWgFJJPr3A",
          "label": "Evangelistic Contact",
          "members": [
            "qOba1QSzmOB2BHL8WqFD",
            "sCk0ORSlIKlI4TEMoj6L",
            "kl4RSMlI2LqxV2KePQQI",
          ],
          "total": 3,
          "type": "calc",
        },
        "xcCy4Blwgkd9WLuVErNF": {
          "desc": "A member who is currently going through First Steps or Equivalent",
          "id": "xcCy4Blwgkd9WLuVErNF",
          "label": "First Steps (Current)",
          "members": [],
          "total": 0,
          "type": "override",
        },
      },
            tree: {
        "tree": [
          {
            "children": [],
            "id": "nCiB1F8JDdudJO6Xyivy",
            "key": "root-nCiB1F8JDdudJO6Xyivy",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "sCk0ORSlIKlI4TEMoj6L",
            "key": "root-sCk0ORSlIKlI4TEMoj6L",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "ae8cnpOcO5ONsTaQqj9l",
            "key": "root-ae8cnpOcO5ONsTaQqj9l",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "Vx9Ls5n10O2NX3RhmB4M",
            "key": "root-Vx9Ls5n10O2NX3RhmB4M",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "pj0ivaS4d6JrHgtSVIke",
            "key": "root-pj0ivaS4d6JrHgtSVIke",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "VmtdU8nxHjWZduJEhlXm",
            "key": "root-VmtdU8nxHjWZduJEhlXm",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "N0bpRvG0h1vu7Wk7lrbN",
            "key": "root-N0bpRvG0h1vu7Wk7lrbN",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "2e1etGimRhzJdEDLqHYm",
            "key": "root-2e1etGimRhzJdEDLqHYm",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "bprNzBn8L1OQeudiGfPg",
            "key": "root-bprNzBn8L1OQeudiGfPg",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "JNgyOyrypDRS7XlDoLvO",
            "key": "root-JNgyOyrypDRS7XlDoLvO",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "1Otp49vJ6Krcyvwcn4Mb",
            "key": "root-1Otp49vJ6Krcyvwcn4Mb",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "s9GBQtmBPI4mL6VYlPmM",
            "key": "root-s9GBQtmBPI4mL6VYlPmM",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "kl4RSMlI2LqxV2KePQQI",
            "key": "root-kl4RSMlI2LqxV2KePQQI",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "OEdGg5FL2Oq0IlcfQue8",
            "key": "root-OEdGg5FL2Oq0IlcfQue8",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "dV1qaOGk3FnzZFNUw1oZ",
            "key": "root-dV1qaOGk3FnzZFNUw1oZ",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "siH75ijS6P0c3E6DRe4d",
            "key": "root-siH75ijS6P0c3E6DRe4d",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "41g0Esm7MYlYVjWummPM",
            "key": "root-41g0Esm7MYlYVjWummPM",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "fnbxJCK4oF9458qiVtIx",
            "key": "root-fnbxJCK4oF9458qiVtIx",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "8ZSvPVPsvyc7K0vdk2ez",
            "key": "root-8ZSvPVPsvyc7K0vdk2ez",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "pHTIyu3nx6MPhmF7AgXc",
            "key": "root-pHTIyu3nx6MPhmF7AgXc",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "9BX1jaJYTqzAeFloX4bI",
            "key": "root-9BX1jaJYTqzAeFloX4bI",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "VqNOBhniLhWQN397vZFp",
            "key": "root-VqNOBhniLhWQN397vZFp",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "iKkzRo4LNx8fZS9LpdFJ",
            "key": "root-iKkzRo4LNx8fZS9LpdFJ",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "SA4jQtdFuI0srEDYDa3o",
            "key": "root-SA4jQtdFuI0srEDYDa3o",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "qOba1QSzmOB2BHL8WqFD",
            "key": "root-qOba1QSzmOB2BHL8WqFD",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "EARQFdxmZsJgVhFUh4qn",
            "key": "root-EARQFdxmZsJgVhFUh4qn",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "1675Xwq0bFBMZO0XmvsP",
            "key": "root-1675Xwq0bFBMZO0XmvsP",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "711TRvfJpvVwFjL6Dnti",
            "key": "root-711TRvfJpvVwFjL6Dnti",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "OPFH9KNwqXeYRvopnoFM",
            "key": "root-OPFH9KNwqXeYRvopnoFM",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "8lLE3MQyAZcQvTKiR3rH",
            "key": "root-8lLE3MQyAZcQvTKiR3rH",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "FnPh5VIW2GgaJKiZjUQ8",
            "key": "root-FnPh5VIW2GgaJKiZjUQ8",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "YrZB0KJL94BSnecnK6t4",
            "key": "root-YrZB0KJL94BSnecnK6t4",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "C1nQX607TTJiHSaJQdSF",
            "key": "root-C1nQX607TTJiHSaJQdSF",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "o5V7o5UtDsH6QJE09QMN",
            "key": "root-o5V7o5UtDsH6QJE09QMN",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "v5XZdAcEsZDKSTfC2LgH",
            "key": "root-v5XZdAcEsZDKSTfC2LgH",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "der2XOL3Gdqua6LyH1xj",
            "key": "root-der2XOL3Gdqua6LyH1xj",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "qe4D4hHsAVrKVv8iLCE2",
            "key": "root-qe4D4hHsAVrKVv8iLCE2",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "tT0IRk2dmBdLQyeMBKfB",
            "key": "root-tT0IRk2dmBdLQyeMBKfB",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "DdFgHnVDTtKLjbdOeEyR",
            "key": "root-DdFgHnVDTtKLjbdOeEyR",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "WZ1GggK61NUYI2BebS36",
            "key": "root-WZ1GggK61NUYI2BebS36",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "5SMB4YnkuYLSRpv3Vb7K",
            "key": "root-5SMB4YnkuYLSRpv3Vb7K",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "fdvFS9D1VJ2cDGgD3nSX",
            "key": "root-fdvFS9D1VJ2cDGgD3nSX",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "v11qo1Q8Zy1NB34uvxmP",
            "key": "root-v11qo1Q8Zy1NB34uvxmP",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "H52Kf6Alu5knusGxEGrB",
            "key": "root-H52Kf6Alu5knusGxEGrB",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "CHtIeJThnGhzAeWWks5g",
            "key": "root-CHtIeJThnGhzAeWWks5g",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "QXgeY465UVsKnfdwFW48",
            "key": "root-QXgeY465UVsKnfdwFW48",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "UtOHfX9BDZhmhUAYjrM2",
            "key": "root-UtOHfX9BDZhmhUAYjrM2",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "QeIm063qu8xHAgcvK34c",
            "key": "root-QeIm063qu8xHAgcvK34c",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "dgYClNToNO7TjQKgEipH",
            "key": "root-dgYClNToNO7TjQKgEipH",
            "parent": "root",
            "type": "normal",
          },
        ],
      }
          }
        }
       },
       '7NFvLujN24kELCq5IDpl': {
         snap: {
          title: "February 2020",
          color: 'white',
          backgroundColor: '#51247A',
          createdBy: {
            "displayName": "Nick Ellis",
            "email": "nick.ellis@powertochange.org.au",
            "photoURL": "https://lh5.googleusercontent.com/-B6KrEgf-WVc/AAAAAAAAAAI/AAAAAAAAA38/LPms8bJkrIU/photo.jpg",
            "uid": "Nezxt06kWChpLKyHQ8Hdm42vIjE3",
          },
          "date": {
          "_nanoseconds": 132000000,
          "_seconds": 1585730709,
        },
          },
          lists: {
            members: {"0F7QAUqwwjR8WwfU6roJ": {
          "id": "0F7QAUqwwjR8WwfU6roJ",
          "name": "Mitch Poloni",
        },
        "0jMy2Yfnc5IYmHYE4RJM": {
          "id": "0jMy2Yfnc5IYmHYE4RJM",
          "name": "Krista Woolston (ACU)",
        },
        "1Otp49vJ6Krcyvwcn4Mb": {
          "id": "1Otp49vJ6Krcyvwcn4Mb",
          "name": "--TO BE DELETED--",
        },
        "1t2B7PaShPpjRZ3Duh5Y": {
          "id": "1t2B7PaShPpjRZ3Duh5Y",
          "name": "Kwan",
        },
        "2e1etGimRhzJdEDLqHYm": {
          "id": "2e1etGimRhzJdEDLqHYm",
          "name": "Sophie James",
        },
        "2o3b6aKcthpAiA2tIilF": {
          "id": "2o3b6aKcthpAiA2tIilF",
          "name": "Ben Kirkitscha",
        },
        "2oGzh8Nb5rCjF246qgWB": {
          "id": "2oGzh8Nb5rCjF246qgWB",
          "name": "Nicholas Grice",
        },
        "3Qt16BHwZX85VMCaYhFC": {
          "id": "3Qt16BHwZX85VMCaYhFC",
          "name": "Alexander Shorey",
        },
        "3VcOYykTqk3aueEM1qz4": {
          "id": "3VcOYykTqk3aueEM1qz4",
          "name": "Josheph Krebs",
        },
        "3xuK59nxOssO0zFD7D9v": {
          "id": "3xuK59nxOssO0zFD7D9v",
          "name": "Alexander Winn",
        },
        "41g0Esm7MYlYVjWummPM": {
          "id": "41g0Esm7MYlYVjWummPM",
          "name": "James Yelland",
        },
        "53PMXNHlgOjFg9QBK5SX": {
          "id": "53PMXNHlgOjFg9QBK5SX",
          "name": "Emma Ott",
        },
        "56ekIfJ67uKDrEwI6zoU": {
          "id": "56ekIfJ67uKDrEwI6zoU",
          "name": "Shashim",
        },
        "5LWB5cBbj9EIpd6bk2I3": {
          "id": "5LWB5cBbj9EIpd6bk2I3",
          "name": "Jonathan Tiss",
        },
        "5jajm7QQP6bExdVhhG8k": {
          "id": "5jajm7QQP6bExdVhhG8k",
          "name": "Abbey",
        },
        "5pcbcwguBcO2YJWWlkta": {
          "id": "5pcbcwguBcO2YJWWlkta",
          "name": "Suzanna Waris",
        },
        "6E6OkRDM7CyrunonAGbb": {
          "id": "6E6OkRDM7CyrunonAGbb",
          "name": "Nicolle Donaldson",
        },
        "6I21kvhx7VAO4PEnepwU": {
          "id": "6I21kvhx7VAO4PEnepwU",
          "name": "Juliana Chuey",
        },
        "6Inj7uIdHwJvE5XLCqAo": {
          "id": "6Inj7uIdHwJvE5XLCqAo",
          "name": "Jonathan Ho",
        },
        "6SivpPUyHgZlQowBggOj": {
          "id": "6SivpPUyHgZlQowBggOj",
          "name": "Conrad",
        },
        "6U8f3cPHbILYvrNrW3UV": {
          "id": "6U8f3cPHbILYvrNrW3UV",
          "name": "Jack Ryan",
        },
        "7MncUuOnLX5iJLLNQAwp": {
          "id": "7MncUuOnLX5iJLLNQAwp",
          "name": "PJ Wilken",
        },
        "7rI78zAz5T98Wk92XLUQ": {
          "id": "7rI78zAz5T98Wk92XLUQ",
          "name": "Nathan",
        },
        "8ZSvPVPsvyc7K0vdk2ez": {
          "id": "8ZSvPVPsvyc7K0vdk2ez",
          "name": "Rasika Jayawardhana",
        },
        "8lLE3MQyAZcQvTKiR3rH": {
          "id": "8lLE3MQyAZcQvTKiR3rH",
          "name": "Amy Harri",
        },
        "9J2c8om4WuzAy0UQQCUX": {
          "id": "9J2c8om4WuzAy0UQQCUX",
          "name": "Peter Gray",
        },
        "9WxxF3KXUIHLqrM5YkV5": {
          "id": "9WxxF3KXUIHLqrM5YkV5",
          "name": "Simon",
        },
        "9tHXG5w7QyxK8m1IG8dJ": {
          "id": "9tHXG5w7QyxK8m1IG8dJ",
          "name": "Caitlin Bowie",
        },
        "BW4ZO4Od3kwou2XDA8VY": {
          "id": "BW4ZO4Od3kwou2XDA8VY",
          "name": "Cameron Boyle",
        },
        "C1nQX607TTJiHSaJQdSF": {
          "id": "C1nQX607TTJiHSaJQdSF",
          "name": "Naziah Siddiddique",
        },
        "CrpiwLij89zxheml5PZ0": {
          "id": "CrpiwLij89zxheml5PZ0",
          "name": "Sam McDougall",
        },
        "DLy4fRpkzW8IkP2JGn6i": {
          "id": "DLy4fRpkzW8IkP2JGn6i",
          "name": "Jessie Ellis",
        },
        "E0lAYwkDBtjgQ9u3e4xS": {
          "id": "E0lAYwkDBtjgQ9u3e4xS",
          "name": "Lauren Venz",
        },
        "F8Oxq5JXKhF8DHVaVPYS": {
          "id": "F8Oxq5JXKhF8DHVaVPYS",
          "name": "Ian",
        },
        "FClWLoiM7zyzV7RzwJr7": {
          "id": "FClWLoiM7zyzV7RzwJr7",
          "name": "Hamish",
        },
        "FKiquYXVsHlHFAnDyhp1": {
          "id": "FKiquYXVsHlHFAnDyhp1",
          "name": "Ray",
        },
        "FRe93Gn4ICmPF8suHxsB": {
          "id": "FRe93Gn4ICmPF8suHxsB",
          "name": "Josh Grice",
        },
        "FnPh5VIW2GgaJKiZjUQ8": {
          "id": "FnPh5VIW2GgaJKiZjUQ8",
          "name": "Ashlea Wong",
        },
        "FuiywanMGBuUQgpSchxY": {
          "id": "FuiywanMGBuUQgpSchxY",
          "name": "Sandy Ghermann",
        },
        "GCzXCx3Ib7EOrYiqYXAu": {
          "id": "GCzXCx3Ib7EOrYiqYXAu",
          "name": "Kristin Laurens",
        },
        "GEFvZB4Vh5tqKOdaez1e": {
          "id": "GEFvZB4Vh5tqKOdaez1e",
          "name": "Ashley-Hope Walker",
        },
        "GPV2PwtSEsQ2SvDVAUm9": {
          "id": "GPV2PwtSEsQ2SvDVAUm9",
          "name": "Leon",
        },
        "GhD6U3mX41TODXRgV1jb": {
          "id": "GhD6U3mX41TODXRgV1jb",
          "name": "Claire Marshall",
        },
        "H18XI319zInCTeSFYY5N": {
          "id": "H18XI319zInCTeSFYY5N",
          "name": "Dong Bao",
        },
        "H52Kf6Alu5knusGxEGrB": {
          "id": "H52Kf6Alu5knusGxEGrB",
          "name": "Selina Wang",
        },
        "HaorE8zql5fNXzssp5Cu": {
          "id": "HaorE8zql5fNXzssp5Cu",
          "name": "Chris",
        },
        "HayQhdlGsKxKbfPlo5ON": {
          "id": "HayQhdlGsKxKbfPlo5ON",
          "name": "Chantelle",
        },
        "J4LwWjd9iDBxppVZZZWa": {
          "id": "J4LwWjd9iDBxppVZZZWa",
          "name": "Thomas O'brien",
        },
        "J4dgQr1z58seefVlP03V": {
          "id": "J4dgQr1z58seefVlP03V",
          "name": "Samson Yates",
        },
        "Jswlc07RSvDKZLwEI4JX": {
          "id": "Jswlc07RSvDKZLwEI4JX",
          "name": "Liam Worrall",
        },
        "KIysPYAG8YsT6dMYqhS6": {
          "id": "KIysPYAG8YsT6dMYqhS6",
          "name": "Emma Adams",
        },
        "KnvNYpkNiyqI0jOAmbnj": {
          "id": "KnvNYpkNiyqI0jOAmbnj",
          "name": "Ahmed",
        },
        "KyOhn6L12Nd1YlwAAtwF": {
          "id": "KyOhn6L12Nd1YlwAAtwF",
          "name": "Lachlan Cooley",
        },
        "LwAIkYOnrnrdV1eA1kFW": {
          "id": "LwAIkYOnrnrdV1eA1kFW",
          "name": "Emma Bowman",
        },
        "N0bpRvG0h1vu7Wk7lrbN": {
          "id": "N0bpRvG0h1vu7Wk7lrbN",
          "name": "Juliet",
        },
        "O0WpvvNuAQ1EK4nQp6qq": {
          "id": "O0WpvvNuAQ1EK4nQp6qq",
          "name": "Liam Black",
        },
        "OPFH9KNwqXeYRvopnoFM": {
          "id": "OPFH9KNwqXeYRvopnoFM",
          "name": "Angelo Flores",
        },
        "OxsxDa0Fwpo6Jm4L9G3U": {
          "id": "OxsxDa0Fwpo6Jm4L9G3U",
          "name": "Rachel Augustine",
        },
        "PePFwnaxBILBrLk3M1xQ": {
          "id": "PePFwnaxBILBrLk3M1xQ",
          "name": "Kyure",
        },
        "RgcNYB5Y6tehuiPF3fiU": {
          "id": "RgcNYB5Y6tehuiPF3fiU",
          "name": "Paul Wang",
        },
        "SA4jQtdFuI0srEDYDa3o": {
          "id": "SA4jQtdFuI0srEDYDa3o",
          "name": "Alice Middleton",
        },
        "SHfCYaw0voFJi8fQPsIG": {
          "id": "SHfCYaw0voFJi8fQPsIG",
          "name": "Alexander Anderson",
        },
        "SisCsMdoKIAjnCX19y52": {
          "id": "SisCsMdoKIAjnCX19y52",
          "name": "David",
        },
        "THZ4uAvY0NIUUZQltI31": {
          "id": "THZ4uAvY0NIUUZQltI31",
          "name": "Josh Meehan",
        },
        "TamPIMLI1DEKHPnN1iOU": {
          "id": "TamPIMLI1DEKHPnN1iOU",
          "name": "Jennifer",
        },
        "TtbZkgdgk6DpeWn31hZG": {
          "id": "TtbZkgdgk6DpeWn31hZG",
          "name": "Tahlia D",
        },
        "UFpMECuOtpr834QO0EVO": {
          "id": "UFpMECuOtpr834QO0EVO",
          "name": "Peter Dunn",
        },
        "UUR4WhXx7PUGiSUc1eou": {
          "id": "UUR4WhXx7PUGiSUc1eou",
          "name": "Hamish",
        },
        "UtOHfX9BDZhmhUAYjrM2": {
          "id": "UtOHfX9BDZhmhUAYjrM2",
          "name": "Shienne",
        },
        "VmtdU8nxHjWZduJEhlXm": {
          "id": "VmtdU8nxHjWZduJEhlXm",
          "name": "Caleb Webb",
        },
        "WDnwmZiAqV4fHbjnkMu5": {
          "id": "WDnwmZiAqV4fHbjnkMu5",
          "name": "Develyn Wong",
        },
        "WZ1GggK61NUYI2BebS36": {
          "id": "WZ1GggK61NUYI2BebS36",
          "name": "Kayla Turnbull",
        },
        "XKgyDKBNAADnGfsrVDak": {
          "id": "XKgyDKBNAADnGfsrVDak",
          "name": "Meera",
        },
        "XUFAEPT2LHUfYDYXUwuI": {
          "id": "XUFAEPT2LHUfYDYXUwuI",
          "name": "Luke Page",
        },
        "YBhYDrEqW9ys7kYXU4Dt": {
          "id": "YBhYDrEqW9ys7kYXU4Dt",
          "name": "Cecil",
        },
        "YrZB0KJL94BSnecnK6t4": {
          "id": "YrZB0KJL94BSnecnK6t4",
          "name": "Sophia Cossa",
        },
        "YsfQAA975yuE6vD6sX2I": {
          "id": "YsfQAA975yuE6vD6sX2I",
          "name": "Victoria",
        },
        "ZHZjrnwBPJlZYYJblack": {
          "id": "ZHZjrnwBPJlZYYJblack",
          "name": "Daniel Bailey (?)",
        },
        "aE7Mu556fCJIhvxJY00y": {
          "id": "aE7Mu556fCJIhvxJY00y",
          "name": "Tiarne Robinson",
        },
        "b6htdXEpqVWVkVbPfqwj": {
          "id": "b6htdXEpqVWVkVbPfqwj",
          "name": "Nick Ellis",
        },
        "bo8GaHzXfbdwcGrtNTxA": {
          "id": "bo8GaHzXfbdwcGrtNTxA",
          "name": "Ryan C",
        },
        "bprNzBn8L1OQeudiGfPg": {
          "id": "bprNzBn8L1OQeudiGfPg",
          "name": "Martin",
        },
        "bw5i43xw8SZ4JdVlLUMc": {
          "id": "bw5i43xw8SZ4JdVlLUMc",
          "name": "Peter Do",
        },
        "c6dRupke4wlwBpyCyWOv": {
          "id": "c6dRupke4wlwBpyCyWOv",
          "name": "Zac",
        },
        "cB5HQ5SQVSzvU5CchLGs": {
          "id": "cB5HQ5SQVSzvU5CchLGs",
          "name": "Luke",
        },
        "d0rALn8Toz8UvU8gCN2D": {
          "id": "d0rALn8Toz8UvU8gCN2D",
          "name": "Sarrah Horvat",
        },
        "dQdcAOzdQWYujkJqIBy2": {
          "id": "dQdcAOzdQWYujkJqIBy2",
          "name": "Belle Korn",
        },
        "dV1qaOGk3FnzZFNUw1oZ": {
          "id": "dV1qaOGk3FnzZFNUw1oZ",
          "name": "Jenna Maurel",
        },
        "dhoHQ6ekezieiJzVFcjQ": {
          "id": "dhoHQ6ekezieiJzVFcjQ",
          "name": "Jasper",
        },
        "dktf33ZVN2tkOWIWQQkz": {
          "id": "dktf33ZVN2tkOWIWQQkz",
          "name": "Tiahna Wait",
        },
        "e6rTKyHXa2YD9VDOoLq7": {
          "id": "e6rTKyHXa2YD9VDOoLq7",
          "name": "Ivan Mikhail (USC)",
        },
        "fBiG1AbHOzjd9qyfFVsu": {
          "id": "fBiG1AbHOzjd9qyfFVsu",
          "name": "Indigo Grigg",
        },
        "fnbxJCK4oF9458qiVtIx": {
          "id": "fnbxJCK4oF9458qiVtIx",
          "name": "Brynlea Gibson",
        },
        "gPPrFEwneaMazoTFyULr": {
          "id": "gPPrFEwneaMazoTFyULr",
          "name": "Cael",
        },
        "hNMZaqZFPsK0QUKeZOWO": {
          "id": "hNMZaqZFPsK0QUKeZOWO",
          "name": "Julie Plumbe",
        },
        "hna5jSZzW7kKOyWTBNrU": {
          "id": "hna5jSZzW7kKOyWTBNrU",
          "name": "Tiana Wegner",
        },
        "iKkzRo4LNx8fZS9LpdFJ": {
          "id": "iKkzRo4LNx8fZS9LpdFJ",
          "name": "Sarah Millar",
        },
        "j8uBHU5MCo6eaBUidhKA": {
          "id": "j8uBHU5MCo6eaBUidhKA",
          "name": "Carla Coetzee",
        },
        "k0SHRHTkeZwbSZ7qtq77": {
          "id": "k0SHRHTkeZwbSZ7qtq77",
          "name": "Howard Wang",
        },
        "kDv1llMqIjlgpHN8EUUT": {
          "id": "kDv1llMqIjlgpHN8EUUT",
          "name": "Petra Poloni",
        },
        "ketIhx0ruiO4RT7soEYD": {
          "id": "ketIhx0ruiO4RT7soEYD",
          "name": "Seann",
        },
        "kl4RSMlI2LqxV2KePQQI": {
          "id": "kl4RSMlI2LqxV2KePQQI",
          "name": "Lexie Glasson",
        },
        "kpG8fY9pkIk1hqcxQWdq": {
          "id": "kpG8fY9pkIk1hqcxQWdq",
          "name": "Sebastian (w/ Tom Jarrett)",
        },
        "lR9XE6VnkPG38pFaCBF3": {
          "id": "lR9XE6VnkPG38pFaCBF3",
          "name": "Jake Davies",
        },
        "lnWb8l2hKNpy7rnPBRlX": {
          "id": "lnWb8l2hKNpy7rnPBRlX",
          "name": "Yasmin Henry",
        },
        "lumcoctS4BkPCkIpmmlU": {
          "id": "lumcoctS4BkPCkIpmmlU",
          "name": "Richie Chen",
        },
        "mJkBpUrn66H8OBneqf02": {
          "id": "mJkBpUrn66H8OBneqf02",
          "name": "Jayce",
        },
        "mQCLQ8blFuVrWMD7qY92": {
          "id": "mQCLQ8blFuVrWMD7qY92",
          "name": "Xavier",
        },
        "nzQQveWZMk2Wep6axOSI": {
          "id": "nzQQveWZMk2Wep6axOSI",
          "name": "Lucas Sippel",
        },
        "oJ3Twl5YTFghxMadZOja": {
          "id": "oJ3Twl5YTFghxMadZOja",
          "name": "Connor",
        },
        "oYzmrFHisHuA5vOCOVZ7": {
          "id": "oYzmrFHisHuA5vOCOVZ7",
          "name": "Matt Khong",
        },
        "ogw01PxS66WryWE8W6fq": {
          "id": "ogw01PxS66WryWE8W6fq",
          "name": "James",
        },
        "p4DWXe5G3efllrPi7SM2": {
          "id": "p4DWXe5G3efllrPi7SM2",
          "name": "Kieran Boyle",
        },
        "p860H6Ep858dPw1lIyf1": {
          "id": "p860H6Ep858dPw1lIyf1",
          "name": "Steve Prakash",
        },
        "pGtYWHQ3Qm3ONX9KoHmW": {
          "id": "pGtYWHQ3Qm3ONX9KoHmW",
          "name": "Grace Cheu",
        },
        "pHTIyu3nx6MPhmF7AgXc": {
          "id": "pHTIyu3nx6MPhmF7AgXc",
          "name": "Natalie Iru",
        },
        "pfrpBIUlzJpvrBcFhMFj": {
          "id": "pfrpBIUlzJpvrBcFhMFj",
          "name": "Jono",
        },
        "pj0ivaS4d6JrHgtSVIke": {
          "id": "pj0ivaS4d6JrHgtSVIke",
          "name": "Israel Escano",
        },
        "pnAiilyYRuO8bh0nyr0J": {
          "id": "pnAiilyYRuO8bh0nyr0J",
          "name": "Connor Worrall",
        },
        "qOba1QSzmOB2BHL8WqFD": {
          "id": "qOba1QSzmOB2BHL8WqFD",
          "name": "Tricia Minjung Wu",
        },
        "rKuFlQhER63X3YI9UoWo": {
          "id": "rKuFlQhER63X3YI9UoWo",
          "name": "Brodie",
        },
        "rjHvqSp6wy1LUCHNJ1sM": {
          "id": "rjHvqSp6wy1LUCHNJ1sM",
          "name": "Will",
        },
        "s3H0Mrw6eRgJNsfCgEKI": {
          "id": "s3H0Mrw6eRgJNsfCgEKI",
          "name": "Rachael Faint",
        },
        "sCk0ORSlIKlI4TEMoj6L": {
          "id": "sCk0ORSlIKlI4TEMoj6L",
          "name": "Vrinda Eswaran",
        },
        "sL2bXbm2oeu3nrFkyTzj": {
          "id": "sL2bXbm2oeu3nrFkyTzj",
          "name": "Daniel Plumbe",
        },
        "sXpMdVqVlq63GDvqmKy5": {
          "id": "sXpMdVqVlq63GDvqmKy5",
          "name": "Jacko",
        },
        "siuoK9YsLPm7iEopYACR": {
          "id": "siuoK9YsLPm7iEopYACR",
          "name": "Stephen Philpot",
        },
        "uN8U2fC3JMDuhLlObuDb": {
          "id": "uN8U2fC3JMDuhLlObuDb",
          "name": "Ben Simpson",
        },
        "w2YNwc7zHybYrVur3wyf": {
          "id": "w2YNwc7zHybYrVur3wyf",
          "name": "Tom",
        },
        "wXFzr07Qu7ID9TuoMTeD": {
          "id": "wXFzr07Qu7ID9TuoMTeD",
          "name": "Cedric",
        },
        "wnap82hYqQW3ra7dzyO1": {
          "id": "wnap82hYqQW3ra7dzyO1",
          "name": "Samantha",
        },
        "yPQP77fEJfzPB7AvFkUO": {
          "id": "yPQP77fEJfzPB7AvFkUO",
          "name": "Gen Brook",
        },
        "yePa5v2iyej8M1avM9HF": {
          "id": "yePa5v2iyej8M1avM9HF",
          "name": "Callum Young",
        },
        "zbTCywlmeHOCBa8h7o6F": {
          "id": "zbTCywlmeHOCBa8h7o6F",
          "name": "Crispian Yedmass",
        },
        "zk33YD6LD0yovzkjZsBJ": {
          "id": "zk33YD6LD0yovzkjZsBJ",
          "name": "Retha Muller",
        },},
            styles: {
              "  yy0saT Aam  me": {
          "desc": "A member committed to find 2 Disciples and a Christianity Explained",
          "label": "Multiplier",
          "style": {
            "background": "#ffaaaa",
            "color": "#000000",
            "outline": "#ffaaaa",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        " Tta1 a0(:)lSTa9": {
          "desc": "Is participating in a Christianity Explained course",
          "icon": "CE",
          "label": "Christianity Explained",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        " a1i n 5mnary0T+": {
          "desc": "A Student leader on campus",
          "label": "Movement Builder",
          "style": {
            "background": "#b1dd8b",
            "color": "#000000",
            "outline": "#b1dd8b",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        " a:aSEaGudanrseE": {
          "desc": "Is a mature student",
          "icon": "M",
          "label": "Mature Student",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "(7lr10aTrtmd e (": {
          "desc": "A member who isn’t a Christian",
          "label": "Non-Christian",
          "style": {
            "background": "#ffffff",
            "color": "#000000",
            "outline": "#fcb177",
            "round": true,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "0 u5rSSaraMtTM61": {
          "desc": "Second Year Student",
          "icon": "2",
          "label": "Year 2",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "0aS0 altn5ndGS d": {
          "desc": "Fourth Year Student",
          "icon": "4",
          "label": "Year 4",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "0d yiM7aTa1aet0T": {
          "desc": "A member who became a Christian through the movement",
          "icon": null,
          "label": "New Christian through Movement",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#ff0000",
            "colorOverride": true,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "11ttn nu101dGd m": {
          "desc": "A member who is a christian",
          "label": "Christian",
          "style": {
            "background": "#ffffff",
            "color": "#000000",
            "outline": "#ffffff",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "3ohW3FU65MTUnJuQHkvB": {
          "desc": "First Year Student",
          "icon": "1",
          "label": "Year 1",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "46akFzeUaeqBWC3IBXV2": {
          "desc": "",
          "icon": null,
          "label": "*Male",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        ":0am 2101y1n )0t": {
          "desc": "Is being Discipled on Campus",
          "icon": null,
          "label": "Disciple",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#000000",
            "outlineOverride": true,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        ":7nisnT:a aA 2 G": {
          "desc": "A member coming on SALT most weeks",
          "label": "Committed Follower",
          "style": {
            "background": "#ffff00",
            "color": "#000000",
            "outline": "#ffff00",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "MM raida3utaTd 1": {
          "desc": "Sixth Year Student",
          "icon": "6",
          "label": "Year 6",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "MrAa9r 99   irA ": {
          "desc": "Fifth Year Student",
          "icon": "5",
          "label": "Year 5",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "SM(6 sM1EEn+ Aui": {
          "desc": "A member who isn’t a Christian but is seeking to learn more",
          "label": "Seeking Non-Christian",
          "style": {
            "background": "#ff9c39",
            "color": "#000000",
            "outline": "#ff9648",
            "round": true,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "SlNxPm1AFSC695RjX7a9": {
          "desc": "Is on Exec",
          "icon": null,
          "label": "Exec",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "default": {
          "desc": "A vocational member of the movement",
          "label": "Missionary",
          "style": {
            "background": "#0042a9",
            "color": "#ffffff",
            "outline": "#0042a9",
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "role",
        },
        "el1rE8E rArnt0a1": {
          "desc": "Is an international student",
          "icon": "INT",
          "label": "International Student",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "haeT+:10nlTe:y00": {
          "desc": "Is on Short Term Exchange",
          "icon": "EX",
          "label": "Exchange",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "n42a2Mrlu )thr0r": {
          "desc": "Is Graduating within 22 months",
          "icon": "G",
          "label": "Graduating",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": null,
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "outlineOverride": null,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "rTrr2d 3ed+1i3aa": {
          "desc": "Not Studying on campus",
          "icon": "NOC",
          "label": "Not on Campus",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "colorOverride": null,
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "rYMogPL8oQOx8bJdAMa2": {
          "desc": "",
          "icon": null,
          "label": "*Female",
          "style": {
            "background": "#FFFFFF",
            "backgroundOverride": false,
            "color": "#000000",
            "colorOverride": false,
            "outline": "#FFFFFF",
            "outlineOverride": false,
            "prepend": false,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
        "t tEe475  iaa00 ": {
          "desc": "Third Year Student",
          "icon": "3",
          "label": "Year 3",
          "style": {
            "background": "#FFFFFF",
            "color": "#000000",
            "outline": "#FFFFFF",
            "prepend": true,
            "round": false,
            "underline": false,
          },
          "target": 0,
          "type": "mod",
        },
            },
            trees: {
              'main-tree': {
                id: 'main-tree',
                label: 'Main Tree'
              },
              noParents: {
                id: 'noParents',
                label: 'No Parents'
              }
            }
          },
          members: [{
        id: 'yPQP77fEJfzPB7AvFkUO',
        name: 'Gen Brook',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Gen Brook',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'DLy4fRpkzW8IkP2JGn6i',
        name: 'Jessie Ellis',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Jessie Ellis',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '0F7QAUqwwjR8WwfU6roJ',
        name: 'Mitch Poloni',
        customFields: {},
        role: 'default',
        display: {
          color: '#ffffff',
          shape: 'not-round',
          underline: false,
          label: 'Mitch Poloni',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'blah blah\n',
        trees: [ 'main-tree' ]
      },
      {
        id: 'b6htdXEpqVWVkVbPfqwj',
        name: 'Nick Ellis',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Nick Ellis',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '6E6OkRDM7CyrunonAGbb',
        name: 'Nicolle Donaldson',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Nicolle Donaldson',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'UFpMECuOtpr834QO0EVO',
        name: 'Peter Dunn',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Peter Dunn',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'kDv1llMqIjlgpHN8EUUT',
        name: 'Petra Poloni',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Petra Poloni',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'aE7Mu556fCJIhvxJY00y',
        name: 'Tiarne Robinson',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Tiarne Robinson',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'lnWb8l2hKNpy7rnPBRlX',
        name: 'Yasmin Henry',
        customFields: {},
        role: 'default',
        display: {
          shape: 'not-round',
          color: '#ffffff',
          underline: false,
          label: 'Yasmin Henry',
          outline: '#0042a9',
          background: '#0042a9'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'GEFvZB4Vh5tqKOdaez1e',
        name: 'Ashley-Hope Walker',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Ashley-Hope Walker',
          outline: '#000000',
          background: '#ffff00'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2', ':0am 2101y1n )0t' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'E0lAYwkDBtjgQ9u3e4xS',
        name: 'Lauren Venz',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [4] Lauren Venz',
          outline: '#000000',
          background: '#ffff00'
        },
        mods: [ ':0am 2101y1n )0t', '0aS0 altn5ndGS d', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'zk33YD6LD0yovzkjZsBJ',
        name: 'Retha Muller',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [4] Retha Muller',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '0aS0 altn5ndGS d', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '8lLE3MQyAZcQvTKiR3rH',
        name: 'Amy Harri',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Amy Harri [INT]',
          outline: '#000000',
          background: '#ffff00'
        },
        mods: [
          'el1rE8E rArnt0a1',
          '0 u5rSSaraMtTM61',
          ':0am 2101y1n )0t',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'WZ1GggK61NUYI2BebS36',
        name: 'Kayla Turnbull',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Kayla Turnbull',
          outline: '#000000',
          background: '#ffff00'
        },
        mods: [ '0 u5rSSaraMtTM61', ':0am 2101y1n )0t', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '2e1etGimRhzJdEDLqHYm',
        name: 'Sophie James',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Sophie James',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', ':0am 2101y1n )0t', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'TtbZkgdgk6DpeWn31hZG',
        name: 'Tahlia D',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Tahlia D',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [],
        notes: 'No social media',
        trees: [ 'main-tree' ]
      },
      {
        id: 'hna5jSZzW7kKOyWTBNrU',
        name: 'Tiana Wegner',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Tiana Wegner',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [],
        notes: 'O-Week contact',
        trees: [ 'main-tree' ]
      },
      {
        id: 'OPFH9KNwqXeYRvopnoFM',
        name: 'Angelo Flores',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Angelo Flores',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'gPPrFEwneaMazoTFyULr',
        name: 'Cael',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Cael',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'pnAiilyYRuO8bh0nyr0J',
        name: 'Connor Worrall',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: 'Connor Worrall',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ '0d yiM7aTa1aet0T', ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Need to check who will disciple him\n',
        trees: [ 'main-tree' ]
      },
      {
        id: 'F8Oxq5JXKhF8DHVaVPYS',
        name: 'Ian',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Ian',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'pfrpBIUlzJpvrBcFhMFj',
        name: 'Jono',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Jono',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'FRe93Gn4ICmPF8suHxsB',
        name: 'Josh Grice',
        customFields: {},
        role: ' a1i n 5mnary0T+',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Josh Grice',
          outline: '#000000',
          background: '#b1dd8b'
        },
        mods: [
          ':0am 2101y1n )0t',
          't tEe475  iaa00 ',
          'SlNxPm1AFSC695RjX7a9',
          '46akFzeUaeqBWC3IBXV2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'Jswlc07RSvDKZLwEI4JX',
        name: 'Liam Worrall',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [5] Liam Worrall',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ ':0am 2101y1n )0t', 'MrAa9r 99   irA ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'nzQQveWZMk2Wep6axOSI',
        name: 'Lucas Sippel',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [5] Lucas Sippel [G]',
          outline: '#ffff00',
          background: '#ffff00'
        },
        mods: [ 'n42a2Mrlu )thr0r', 'MrAa9r 99   irA ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'RgcNYB5Y6tehuiPF3fiU',
        name: 'Paul Wang',
        customFields: {},
        role: ' a1i n 5mnary0T+',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [6] Paul Wang',
          outline: '#000000',
          background: '#b1dd8b'
        },
        mods: [
          ':0am 2101y1n )0t',
          'MM raida3utaTd 1',
          'SlNxPm1AFSC695RjX7a9',
          '46akFzeUaeqBWC3IBXV2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'kpG8fY9pkIk1hqcxQWdq',
        name: 'Sebastian (w/ Tom Jarrett)',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Sebastian (w/ Tom Jarrett)',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'KnvNYpkNiyqI0jOAmbnj',
        name: 'Ahmed',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Ahmed',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'rKuFlQhER63X3YI9UoWo',
        name: 'Brodie',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Brodie',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'yePa5v2iyej8M1avM9HF',
        name: 'Callum Young',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Callum Young',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'sL2bXbm2oeu3nrFkyTzj',
        name: 'Daniel Plumbe',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Daniel Plumbe',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ ':0am 2101y1n )0t', 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'H18XI319zInCTeSFYY5N',
        name: 'Dong Bao',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#ff0000',
          underline: false,
          label: ' [M] [2] Dong Bao [INT]',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [
          ':0am 2101y1n )0t',
          'el1rE8E rArnt0a1',
          ' a:aSEaGudanrseE',
          '0d yiM7aTa1aet0T',
          '0 u5rSSaraMtTM61',
          '46akFzeUaeqBWC3IBXV2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'THZ4uAvY0NIUUZQltI31',
        name: 'Josh Meehan',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Josh Meehan',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', ':0am 2101y1n )0t' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '9J2c8om4WuzAy0UQQCUX',
        name: 'Peter Gray',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [4] Peter Gray',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ ':0am 2101y1n )0t', '0aS0 altn5ndGS d', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '56ekIfJ67uKDrEwI6zoU',
        name: 'Shashim',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Shashim',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'awaiting confirmation of continued tracking\n',
        trees: [ 'main-tree' ]
      },
      {
        id: '9WxxF3KXUIHLqrM5YkV5',
        name: 'Simon',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [M] [1] Simon',
          outline: '#000000',
          background: '#ffff00'
        },
        mods: [
          ' a:aSEaGudanrseE',
          '3ohW3FU65MTUnJuQHkvB',
          '46akFzeUaeqBWC3IBXV2',
          ':0am 2101y1n )0t'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'mQCLQ8blFuVrWMD7qY92',
        name: 'Xavier',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Xavier',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'BW4ZO4Od3kwou2XDA8VY',
        name: 'Cameron Boyle',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Cameron Boyle',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'e6rTKyHXa2YD9VDOoLq7',
        name: 'Ivan Mikhail (USC)',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [3] Ivan Mikhail (USC)',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '6Inj7uIdHwJvE5XLCqAo',
        name: 'Jonathan Ho',
        customFields: {},
        role: ' a1i n 5mnary0T+',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [3] Jonathan Ho',
          outline: '#000000',
          background: '#b1dd8b'
        },
        mods: [ ':0am 2101y1n )0t', 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '53PMXNHlgOjFg9QBK5SX',
        name: 'Emma Ott',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Emma Ott',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', 't tEe475  iaa00 ', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'TamPIMLI1DEKHPnN1iOU',
        name: 'Jennifer',
        customFields: {},
        role: '(7lr10aTrtmd e (',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [2] Jennifer',
          outline: '#fcb177',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'XKgyDKBNAADnGfsrVDak',
        name: 'Meera',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#ff0000',
          underline: false,
          label: ' [M] Meera',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [
          ':0am 2101y1n )0t',
          ' a:aSEaGudanrseE',
          '0d yiM7aTa1aet0T',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'OxsxDa0Fwpo6Jm4L9G3U',
        name: 'Rachel Augustine',
        customFields: {},
        role: ' a1i n 5mnary0T+',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Rachel Augustine',
          outline: '#000000',
          background: '#b1dd8b'
        },
        mods: [ '0 u5rSSaraMtTM61', ':0am 2101y1n )0t', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'FnPh5VIW2GgaJKiZjUQ8',
        name: 'Ashlea Wong',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#ff0000',
          underline: false,
          label: ' [2] Ashlea Wong',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0d yiM7aTa1aet0T', '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'HayQhdlGsKxKbfPlo5ON',
        name: 'Chantelle',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#ff0000',
          underline: false,
          label: ' [2] Chantelle',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', '0d yiM7aTa1aet0T', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'GhD6U3mX41TODXRgV1jb',
        name: 'Claire Marshall',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [1] Claire Marshall [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [
          ' Tta1 a0(:)lSTa9',
          '3ohW3FU65MTUnJuQHkvB',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'WDnwmZiAqV4fHbjnkMu5',
        name: 'Develyn Wong',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [1] Develyn Wong [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [
          ' Tta1 a0(:)lSTa9',
          '3ohW3FU65MTUnJuQHkvB',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'fBiG1AbHOzjd9qyfFVsu',
        name: 'Indigo Grigg',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [2] Indigo Grigg',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'dV1qaOGk3FnzZFNUw1oZ',
        name: 'Jenna Maurel',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#ff0000',
          underline: false,
          label: ' [2] Jenna Maurel',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', '0d yiM7aTa1aet0T', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '6I21kvhx7VAO4PEnepwU',
        name: 'Juliana Chuey',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [4] Juliana Chuey',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ ':0am 2101y1n )0t', '0aS0 altn5ndGS d', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'kl4RSMlI2LqxV2KePQQI',
        name: 'Lexie Glasson',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [1] Lexie Glasson [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [
          '3ohW3FU65MTUnJuQHkvB',
          ' Tta1 a0(:)lSTa9',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'pHTIyu3nx6MPhmF7AgXc',
        name: 'Natalie Iru',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Natalie Iru',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '8ZSvPVPsvyc7K0vdk2ez',
        name: 'Rasika Jayawardhana',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Rasika Jayawardhana',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'iKkzRo4LNx8fZS9LpdFJ',
        name: 'Sarah Millar',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [1] Sarah Millar [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [
          ' Tta1 a0(:)lSTa9',
          '3ohW3FU65MTUnJuQHkvB',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'H52Kf6Alu5knusGxEGrB',
        name: 'Selina Wang',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Selina Wang [INT]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ 'el1rE8E rArnt0a1', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'YrZB0KJL94BSnecnK6t4',
        name: 'Sophia Cossa',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Sophia Cossa',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'qOba1QSzmOB2BHL8WqFD',
        name: 'Tricia Minjung Wu',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Tricia Minjung Wu [INT]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ 'el1rE8E rArnt0a1', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'hNMZaqZFPsK0QUKeZOWO',
        name: 'Julie Plumbe',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Julie Plumbe',
          outline: '#000000',
          background: '#ffff00'
        },
        mods: [ ':0am 2101y1n )0t', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '5jajm7QQP6bExdVhhG8k',
        name: 'Abbey',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: 'Abbey',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ '0d yiM7aTa1aet0T', ':0am 2101y1n )0t', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '1t2B7PaShPpjRZ3Duh5Y',
        name: 'Kwan',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Kwan',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'wXFzr07Qu7ID9TuoMTeD',
        name: 'Cedric',
        customFields: {},
        role: '(7lr10aTrtmd e (',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Cedric',
          outline: '#fcb177',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'oJ3Twl5YTFghxMadZOja',
        name: 'Connor',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Connor',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'SisCsMdoKIAjnCX19y52',
        name: 'David',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: 'David [INT]',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [
          '0d yiM7aTa1aet0T',
          '46akFzeUaeqBWC3IBXV2',
          ':0am 2101y1n )0t',
          'el1rE8E rArnt0a1'
        ],
        notes: 'Also connected with Jono Ho',
        trees: [ 'main-tree' ]
      },
      {
        id: '41g0Esm7MYlYVjWummPM',
        name: 'James Yelland',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'James Yelland',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '5LWB5cBbj9EIpd6bk2I3',
        name: 'Jonathan Tiss',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Jonathan Tiss',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'rjHvqSp6wy1LUCHNJ1sM',
        name: 'Will',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Will',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'YBhYDrEqW9ys7kYXU4Dt',
        name: 'Cecil',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Cecil',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'ZHZjrnwBPJlZYYJblack',
        name: 'Daniel Bailey (?)',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Daniel Bailey (?)',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'UUR4WhXx7PUGiSUc1eou',
        name: 'Hamish',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Hamish',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ 'no-mods', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'p860H6Ep858dPw1lIyf1',
        name: 'Steve Prakash',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Steve Prakash',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'c6dRupke4wlwBpyCyWOv',
        name: 'Zac',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Zac',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Need to confirm if he is being discipled',
        trees: [ 'main-tree' ]
      },
      {
        id: 'HaorE8zql5fNXzssp5Cu',
        name: 'Chris',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Chris',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'mJkBpUrn66H8OBneqf02',
        name: 'Jayce',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Jayce',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '3VcOYykTqk3aueEM1qz4',
        name: 'Josheph Krebs',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#ff0000',
          underline: false,
          label: 'Josheph Krebs',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2' ],
        notes: 'See note under Alexander Winn',
        trees: [ 'main-tree' ]
      },
      {
        id: 'cB5HQ5SQVSzvU5CchLGs',
        name: 'Luke',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Luke',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'oYzmrFHisHuA5vOCOVZ7',
        name: 'Matt Khong',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Matt Khong',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'SHfCYaw0voFJi8fQPsIG',
        name: 'Alexander Anderson',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [4] Alexander Anderson',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '0aS0 altn5ndGS d', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '3Qt16BHwZX85VMCaYhFC',
        name: 'Alexander Shorey',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#ff0000',
          shape: 'not-round',
          underline: false,
          label: 'Alexander Shorey',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0d yiM7aTa1aet0T', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'uN8U2fC3JMDuhLlObuDb',
        name: 'Ben Simpson',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [1] Ben Simpson',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '3ohW3FU65MTUnJuQHkvB', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'lR9XE6VnkPG38pFaCBF3',
        name: 'Jake Davies',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [2] Jake Davies',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '0 u5rSSaraMtTM61', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'O0WpvvNuAQ1EK4nQp6qq',
        name: 'Liam Black',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Liam Black',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'Bible study with Seann, Nathan',
        trees: [ 'main-tree' ]
      },
      {
        id: 'bprNzBn8L1OQeudiGfPg',
        name: 'Martin',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Martin',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '7rI78zAz5T98Wk92XLUQ',
        name: 'Nathan',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [2] Nathan',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '0 u5rSSaraMtTM61', '46akFzeUaeqBWC3IBXV2' ],
        notes: 'See note under Liam Black',
        trees: [ 'main-tree' ]
      },
      {
        id: '2oGzh8Nb5rCjF246qgWB',
        name: 'Nicholas Grice',
        customFields: {},
        role: ' a1i n 5mnary0T+',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Nicholas Grice',
          outline: '#000000',
          background: '#b1dd8b'
        },
        mods: [ ':0am 2101y1n )0t', '0 u5rSSaraMtTM61', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'lumcoctS4BkPCkIpmmlU',
        name: 'Richie Chen',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [4] Richie Chen',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '0aS0 altn5ndGS d', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'bo8GaHzXfbdwcGrtNTxA',
        name: 'Ryan C',
        customFields: {},
        role: '(7lr10aTrtmd e (',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Ryan C',
          outline: '#fcb177',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: "Dan's Lecturer",
        trees: [ 'main-tree' ]
      },
      {
        id: 'CrpiwLij89zxheml5PZ0',
        name: 'Sam McDougall',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: ' [1] Sam McDougall',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '3ohW3FU65MTUnJuQHkvB', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'ketIhx0ruiO4RT7soEYD',
        name: 'Seann',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Seann',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: 'See note under Liam Black',
        trees: [ 'main-tree' ]
      },
      {
        id: 'siuoK9YsLPm7iEopYACR',
        name: 'Stephen Philpot',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Stephen Philpot',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '0 u5rSSaraMtTM61', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'J4LwWjd9iDBxppVZZZWa',
        name: "Thomas O'brien",
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: " [3] [M] Thomas O'brien",
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ 't tEe475  iaa00 ', ' a:aSEaGudanrseE', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'XUFAEPT2LHUfYDYXUwuI',
        name: 'Luke Page',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Luke Page',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '7MncUuOnLX5iJLLNQAwp',
        name: 'PJ Wilken',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'PJ Wilken',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '2o3b6aKcthpAiA2tIilF',
        name: 'Ben Kirkitscha',
        customFields: {},
        role: '(7lr10aTrtmd e (',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Ben Kirkitscha',
          outline: '#fcb177',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'k0SHRHTkeZwbSZ7qtq77',
        name: 'Howard Wang',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Howard Wang',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'pj0ivaS4d6JrHgtSVIke',
        name: 'Israel Escano',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Israel Escano',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ 't tEe475  iaa00 ', '46akFzeUaeqBWC3IBXV2', ':0am 2101y1n )0t' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'p4DWXe5G3efllrPi7SM2',
        name: 'Kieran Boyle',
        customFields: {},
        role: ' a1i n 5mnary0T+',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Kieran Boyle',
          outline: '#000000',
          background: '#b1dd8b'
        },
        mods: [ ':0am 2101y1n )0t', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'bw5i43xw8SZ4JdVlLUMc',
        name: 'Peter Do',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Peter Do',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'J4dgQr1z58seefVlP03V',
        name: 'Samson Yates',
        customFields: {},
        role: '(7lr10aTrtmd e (',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Samson Yates',
          outline: '#fcb177',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'YsfQAA975yuE6vD6sX2I',
        name: 'Victoria',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Victoria',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'fnbxJCK4oF9458qiVtIx',
        name: 'Brynlea Gibson',
        customFields: {},
        role: ':7nisnT:a aA 2 G',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Brynlea Gibson',
          outline: '#000000',
          background: '#ffff00'
        },
        mods: [ '0 u5rSSaraMtTM61', ':0am 2101y1n )0t', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'PePFwnaxBILBrLk3M1xQ',
        name: 'Kyure',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [1] Kyure',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '3ohW3FU65MTUnJuQHkvB', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'N0bpRvG0h1vu7Wk7lrbN',
        name: 'Juliet',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Juliet',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'UtOHfX9BDZhmhUAYjrM2',
        name: 'Shienne',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Shienne',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'j8uBHU5MCo6eaBUidhKA',
        name: 'Carla Coetzee',
        customFields: {},
        role: '  yy0saT Aam  me',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Carla Coetzee',
          outline: '#000000',
          background: '#ffaaaa'
        },
        mods: [ ':0am 2101y1n )0t', 't tEe475  iaa00 ', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'LwAIkYOnrnrdV1eA1kFW',
        name: 'Emma Bowman',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [2] Emma Bowman [INT]',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [
          '0 u5rSSaraMtTM61',
          'el1rE8E rArnt0a1',
          ':0am 2101y1n )0t',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'SA4jQtdFuI0srEDYDa3o',
        name: 'Alice Middleton',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Alice Middleton',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'C1nQX607TTJiHSaJQdSF',
        name: 'Naziah Siddiddique',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: ' [5] Naziah Siddiddique',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ 'MrAa9r 99   irA ', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '5pcbcwguBcO2YJWWlkta',
        name: 'Suzanna Waris',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [1] Suzanna Waris',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '3ohW3FU65MTUnJuQHkvB', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'dhoHQ6ekezieiJzVFcjQ',
        name: 'Jasper',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Jasper',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'GPV2PwtSEsQ2SvDVAUm9',
        name: 'Leon',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Leon',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '6SivpPUyHgZlQowBggOj',
        name: 'Conrad',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Conrad',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'FClWLoiM7zyzV7RzwJr7',
        name: 'Hamish',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Hamish',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'sXpMdVqVlq63GDvqmKy5',
        name: 'Jacko',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Jacko',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'ogw01PxS66WryWE8W6fq',
        name: 'James',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'James',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'KyOhn6L12Nd1YlwAAtwF',
        name: 'Lachlan Cooley',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Lachlan Cooley',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'FKiquYXVsHlHFAnDyhp1',
        name: 'Ray',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          shape: 'round',
          color: '#000000',
          underline: false,
          label: 'Ray [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ ' Tta1 a0(:)lSTa9', '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'FuiywanMGBuUQgpSchxY',
        name: 'Sandy Ghermann',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: 'Sandy Ghermann',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'zbTCywlmeHOCBa8h7o6F',
        name: 'Crispian Yedmass',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Crispian Yedmass',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '6U8f3cPHbILYvrNrW3UV',
        name: 'Jack Ryan',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [1] Jack Ryan',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [
          '3ohW3FU65MTUnJuQHkvB',
          ':0am 2101y1n )0t',
          '46akFzeUaeqBWC3IBXV2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: 'wnap82hYqQW3ra7dzyO1',
        name: 'Samantha',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#ff0000',
          underline: false,
          label: ' [2] Samantha',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [
          '0d yiM7aTa1aet0T',
          '0 u5rSSaraMtTM61',
          ':0am 2101y1n )0t',
          'rYMogPL8oQOx8bJdAMa2'
        ],
        notes: '',
        trees: [ 'main-tree' ]
      },
      {
        id: '1Otp49vJ6Krcyvwcn4Mb',
        name: '--TO BE DELETED--',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: '--TO BE DELETED--',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [],
        notes: 'Please make members that you want deleted a child of this member',
        trees: [ 'noParents' ]
      },
      {
        id: '9tHXG5w7QyxK8m1IG8dJ',
        name: 'Caitlin Bowie',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Caitlin Bowie',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 'VmtdU8nxHjWZduJEhlXm',
        name: 'Caleb Webb',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: 'Caleb Webb',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '46akFzeUaeqBWC3IBXV2' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: '0jMy2Yfnc5IYmHYE4RJM',
        name: 'Krista Woolston (ACU)',
        customFields: {},
        role: ' a1i n 5mnary0T+',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [6] Krista Woolston (ACU)',
          outline: '#000000',
          background: '#b1dd8b'
        },
        mods: [ ':0am 2101y1n )0t', 'MM raida3utaTd 1' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 's3H0Mrw6eRgJNsfCgEKI',
        name: 'Rachael Faint',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [3] Rachael Faint',
          outline: '#000000',
          background: '#ffffff'
        },
        mods: [ ':0am 2101y1n )0t', 't tEe475  iaa00 ', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 'sCk0ORSlIKlI4TEMoj6L',
        name: 'Vrinda Eswaran',
        customFields: {},
        role: 'SM(6 sM1EEn+ Aui',
        display: {
          color: '#000000',
          shape: 'round',
          underline: false,
          label: 'Vrinda Eswaran [CE]',
          outline: '#ff9648',
          background: '#ff9c39'
        },
        mods: [ ' Tta1 a0(:)lSTa9', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 'dQdcAOzdQWYujkJqIBy2',
        name: 'Belle Korn',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [NOC] Belle Korn',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ 'rTrr2d 3ed+1i3aa', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 'd0rALn8Toz8UvU8gCN2D',
        name: 'Sarrah Horvat',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Sarrah Horvat',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61', 'rYMogPL8oQOx8bJdAMa2' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 'pGtYWHQ3Qm3ONX9KoHmW',
        name: 'Grace Cheu',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Grace Cheu [INT]',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ 'el1rE8E rArnt0a1', '0 u5rSSaraMtTM61' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 'GCzXCx3Ib7EOrYiqYXAu',
        name: 'Kristin Laurens',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          shape: 'not-round',
          color: '#000000',
          underline: false,
          label: ' [2] Kristin Laurens',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ '0 u5rSSaraMtTM61' ],
        notes: '',
        trees: [ 'noParents' ]
      },
      {
        id: 'dktf33ZVN2tkOWIWQQkz',
        name: 'Tiahna Wait',
        customFields: {},
        role: '11ttn nu101dGd m',
        display: {
          color: '#000000',
          shape: 'not-round',
          underline: false,
          label: ' [NOC] Tiahna Wait',
          outline: '#ffffff',
          background: '#ffffff'
        },
        mods: [ 'rTrr2d 3ed+1i3aa' ],
        notes: '',
        trees: [ 'noParents' ]
      }
    ],
          styles: [
      {
        label: 'Multiplier',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#ffaaaa',
          round: false,
          background: '#ffaaaa'
        },
        desc: 'A member committed to find 2 Disciples and a Christianity Explained'
      },
      {
        icon: 'CE',
        label: 'Christianity Explained',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'Is participating in a Christianity Explained course'
      },
      {
        label: 'Movement Builder',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#b1dd8b',
          round: false,
          background: '#b1dd8b'
        },
        desc: 'A Student leader on campus'
      },
      {
        icon: 'M',
        label: 'Mature Student',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'Is a mature student'
      },
      {
        label: 'Non-Christian',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#fcb177',
          round: true,
          background: '#ffffff'
        },
        desc: 'A member who isn’t a Christian'
      },
      {
        icon: '2',
        label: 'Year 2',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Second Year Student'
      },
      {
        icon: '4',
        label: 'Year 4',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Fourth Year Student'
      },
      {
        icon: null,
        label: 'New Christian through Movement',
        type: 'mod',
        target: 0,
        style: {
          color: '#ff0000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: true
        },
        desc: 'A member who became a Christian through the movement'
      },
      {
        label: 'Christian',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#ffffff',
          round: false,
          background: '#ffffff'
        },
        desc: 'A member who is a christian'
      },
      {
        icon: '1',
        label: 'Year 1',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'First Year Student'
      },
      {
        icon: null,
        label: '*Male',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: ''
      },
      {
        icon: null,
        label: 'Disciple',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: true,
          outline: '#000000',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Is being Discipled on Campus'
      },
      {
        label: 'Committed Follower',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#ffff00',
          round: false,
          background: '#ffff00'
        },
        desc: 'A member coming on SALT most weeks'
      },
      {
        icon: '6',
        label: 'Year 6',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Sixth Year Student'
      },
      {
        icon: '5',
        label: 'Year 5',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Fifth Year Student'
      },
      {
        label: 'Seeking Non-Christian',
        type: 'role',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          outline: '#ff9648',
          round: true,
          background: '#ff9c39'
        },
        desc: 'A member who isn’t a Christian but is seeking to learn more'
      },
      {
        icon: null,
        label: 'Exec',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: 'Is on Exec'
      },
      {
        label: 'Missionary',
        type: 'role',
        target: 0,
        style: {
          color: '#ffffff',
          underline: false,
          outline: '#0042a9',
          round: false,
          background: '#0042a9'
        },
        desc: 'A vocational member of the movement'
      },
      {
        icon: 'INT',
        label: 'International Student',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'Is an international student'
      },
      {
        icon: 'EX',
        label: 'Exchange',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'Is on Short Term Exchange'
      },
      {
        icon: 'G',
        label: 'Graduating',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: null,
          outlineOverride: null,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'Is Graduating within 22 months'
      },
      {
        icon: 'NOC',
        label: 'Not on Campus',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: null
        },
        desc: 'Not Studying on campus'
      },
      {
        icon: null,
        label: '*Female',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: false,
          backgroundOverride: false,
          outlineOverride: false,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF',
          colorOverride: false
        },
        desc: ''
      },
      {
        icon: '3',
        label: 'Year 3',
        type: 'mod',
        target: 0,
        style: {
          color: '#000000',
          underline: false,
          prepend: true,
          outline: '#FFFFFF',
          round: false,
          background: '#FFFFFF'
        },
        desc: 'Third Year Student'
      }
    ],
          trees: { 
            'main-tree': {
              doc: {
                id: "main-tree",
                label: "Main Tree"
              },
              parents: {
                "0F7QAUqwwjR8WwfU6roJ": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "1t2B7PaShPpjRZ3Duh5Y": {
          "parent": "E0lAYwkDBtjgQ9u3e4xS",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "2e1etGimRhzJdEDLqHYm": {
          "parent": "DLy4fRpkzW8IkP2JGn6i",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "2o3b6aKcthpAiA2tIilF": {
          "parent": "6Inj7uIdHwJvE5XLCqAo",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "2oGzh8Nb5rCjF246qgWB": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "3Qt16BHwZX85VMCaYhFC": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "3VcOYykTqk3aueEM1qz4": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "0d yiM7aTa1aet0T",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "3xuK59nxOssO0zFD7D9v": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "41g0Esm7MYlYVjWummPM": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "53PMXNHlgOjFg9QBK5SX": {
          "parent": "kDv1llMqIjlgpHN8EUUT",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "56ekIfJ67uKDrEwI6zoU": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "5LWB5cBbj9EIpd6bk2I3": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "5jajm7QQP6bExdVhhG8k": {
          "parent": "E0lAYwkDBtjgQ9u3e4xS",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "5pcbcwguBcO2YJWWlkta": {
          "parent": "8ZSvPVPsvyc7K0vdk2ez",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "3ohW3FU65MTUnJuQHkvB",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "6E6OkRDM7CyrunonAGbb": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "6I21kvhx7VAO4PEnepwU": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            ":0am 2101y1n )0t",
            "0aS0 altn5ndGS d",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
                "6Inj7uIdHwJvE5XLCqAo": {
          "parent": "UFpMECuOtpr834QO0EVO",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "6SivpPUyHgZlQowBggOj": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "6U8f3cPHbILYvrNrW3UV": {
          "parent": "p4DWXe5G3efllrPi7SM2",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "3ohW3FU65MTUnJuQHkvB",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "7MncUuOnLX5iJLLNQAwp": {
          "parent": "9J2c8om4WuzAy0UQQCUX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "7rI78zAz5T98Wk92XLUQ": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "8ZSvPVPsvyc7K0vdk2ez": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "8lLE3MQyAZcQvTKiR3rH": {
          "parent": "DLy4fRpkzW8IkP2JGn6i",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            "el1rE8E rArnt0a1",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "9J2c8om4WuzAy0UQQCUX": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            ":0am 2101y1n )0t",
            "0aS0 altn5ndGS d",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "9WxxF3KXUIHLqrM5YkV5": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            " a:aSEaGudanrseE",
            "3ohW3FU65MTUnJuQHkvB",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
          ],
        },
        "BW4ZO4Od3kwou2XDA8VY": {
          "parent": "UFpMECuOtpr834QO0EVO",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "C1nQX607TTJiHSaJQdSF": {
          "parent": "8ZSvPVPsvyc7K0vdk2ez",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "MrAa9r 99   irA ",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "CrpiwLij89zxheml5PZ0": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "3ohW3FU65MTUnJuQHkvB",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "DLy4fRpkzW8IkP2JGn6i": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "E0lAYwkDBtjgQ9u3e4xS": {
          "parent": "yPQP77fEJfzPB7AvFkUO",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            ":0am 2101y1n )0t",
            "0aS0 altn5ndGS d",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "F8Oxq5JXKhF8DHVaVPYS": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "FClWLoiM7zyzV7RzwJr7": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "FKiquYXVsHlHFAnDyhp1": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            " Tta1 a0(:)lSTa9",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "FRe93Gn4ICmPF8suHxsB": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "SlNxPm1AFSC695RjX7a9",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "FnPh5VIW2GgaJKiZjUQ8": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "FuiywanMGBuUQgpSchxY": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "GEFvZB4Vh5tqKOdaez1e": {
          "parent": "yPQP77fEJfzPB7AvFkUO",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            "rYMogPL8oQOx8bJdAMa2",
            ":0am 2101y1n )0t",
          ],
        },
        "GPV2PwtSEsQ2SvDVAUm9": {
          "parent": "oYzmrFHisHuA5vOCOVZ7",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "GhD6U3mX41TODXRgV1jb": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            " Tta1 a0(:)lSTa9",
            "3ohW3FU65MTUnJuQHkvB",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "H18XI319zInCTeSFYY5N": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "el1rE8E rArnt0a1",
            " a:aSEaGudanrseE",
            "0d yiM7aTa1aet0T",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "H52Kf6Alu5knusGxEGrB": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "el1rE8E rArnt0a1",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "HaorE8zql5fNXzssp5Cu": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "HayQhdlGsKxKbfPlo5ON": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "0d yiM7aTa1aet0T",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "J4LwWjd9iDBxppVZZZWa": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "t tEe475  iaa00 ",
            " a:aSEaGudanrseE",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "J4dgQr1z58seefVlP03V": {
          "parent": "6Inj7uIdHwJvE5XLCqAo",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "Jswlc07RSvDKZLwEI4JX": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            ":0am 2101y1n )0t",
            "MrAa9r 99   irA ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "KIysPYAG8YsT6dMYqhS6": {
          "parent": "kDv1llMqIjlgpHN8EUUT",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "SlNxPm1AFSC695RjX7a9",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "KnvNYpkNiyqI0jOAmbnj": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "KyOhn6L12Nd1YlwAAtwF": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "LwAIkYOnrnrdV1eA1kFW": {
          "parent": "6I21kvhx7VAO4PEnepwU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "el1rE8E rArnt0a1",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "N0bpRvG0h1vu7Wk7lrbN": {
          "parent": "OxsxDa0Fwpo6Jm4L9G3U",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "O0WpvvNuAQ1EK4nQp6qq": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "OPFH9KNwqXeYRvopnoFM": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "OxsxDa0Fwpo6Jm4L9G3U": {
          "parent": "kDv1llMqIjlgpHN8EUUT",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "PePFwnaxBILBrLk3M1xQ": {
          "parent": "53PMXNHlgOjFg9QBK5SX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "3ohW3FU65MTUnJuQHkvB",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "RgcNYB5Y6tehuiPF3fiU": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "MM raida3utaTd 1",
            "SlNxPm1AFSC695RjX7a9",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "SA4jQtdFuI0srEDYDa3o": {
          "parent": "8ZSvPVPsvyc7K0vdk2ez",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "SHfCYaw0voFJi8fQPsIG": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "0aS0 altn5ndGS d",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "SisCsMdoKIAjnCX19y52": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
            "el1rE8E rArnt0a1",
          ],
        },
        "THZ4uAvY0NIUUZQltI31": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
          ],
        },
        "TamPIMLI1DEKHPnN1iOU": {
          "parent": "kDv1llMqIjlgpHN8EUUT",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "TtbZkgdgk6DpeWn31hZG": {
          "parent": "DLy4fRpkzW8IkP2JGn6i",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "UFpMECuOtpr834QO0EVO": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "UUR4WhXx7PUGiSUc1eou": {
          "parent": "Jswlc07RSvDKZLwEI4JX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "no-mods",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "UtOHfX9BDZhmhUAYjrM2": {
          "parent": "OxsxDa0Fwpo6Jm4L9G3U",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "WDnwmZiAqV4fHbjnkMu5": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            " Tta1 a0(:)lSTa9",
            "3ohW3FU65MTUnJuQHkvB",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "WZ1GggK61NUYI2BebS36": {
          "parent": "DLy4fRpkzW8IkP2JGn6i",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "XKgyDKBNAADnGfsrVDak": {
          "parent": "kDv1llMqIjlgpHN8EUUT",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            " a:aSEaGudanrseE",
            "0d yiM7aTa1aet0T",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "XUFAEPT2LHUfYDYXUwuI": {
          "parent": "9J2c8om4WuzAy0UQQCUX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "YBhYDrEqW9ys7kYXU4Dt": {
          "parent": "Jswlc07RSvDKZLwEI4JX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "YrZB0KJL94BSnecnK6t4": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "YsfQAA975yuE6vD6sX2I": {
          "parent": "KIysPYAG8YsT6dMYqhS6",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "ZHZjrnwBPJlZYYJblack": {
          "parent": "Jswlc07RSvDKZLwEI4JX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "aE7Mu556fCJIhvxJY00y": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
          ],
        },
        "b6htdXEpqVWVkVbPfqwj": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "bo8GaHzXfbdwcGrtNTxA": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "bprNzBn8L1OQeudiGfPg": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "bw5i43xw8SZ4JdVlLUMc": {
          "parent": "6Inj7uIdHwJvE5XLCqAo",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "c6dRupke4wlwBpyCyWOv": {
          "parent": "Jswlc07RSvDKZLwEI4JX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "cB5HQ5SQVSzvU5CchLGs": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "dV1qaOGk3FnzZFNUw1oZ": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "0d yiM7aTa1aet0T",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "dhoHQ6ekezieiJzVFcjQ": {
          "parent": "oYzmrFHisHuA5vOCOVZ7",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "e6rTKyHXa2YD9VDOoLq7": {
          "parent": "UFpMECuOtpr834QO0EVO",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "fBiG1AbHOzjd9qyfFVsu": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "fnbxJCK4oF9458qiVtIx": {
          "parent": "53PMXNHlgOjFg9QBK5SX",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "gPPrFEwneaMazoTFyULr": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "hNMZaqZFPsK0QUKeZOWO": {
          "parent": "GEFvZB4Vh5tqKOdaez1e",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "hna5jSZzW7kKOyWTBNrU": {
          "parent": "DLy4fRpkzW8IkP2JGn6i",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "iKkzRo4LNx8fZS9LpdFJ": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            " Tta1 a0(:)lSTa9",
            "3ohW3FU65MTUnJuQHkvB",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "j8uBHU5MCo6eaBUidhKA": {
          "parent": "6I21kvhx7VAO4PEnepwU",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "k0SHRHTkeZwbSZ7qtq77": {
          "parent": "6Inj7uIdHwJvE5XLCqAo",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "kDv1llMqIjlgpHN8EUUT": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "ketIhx0ruiO4RT7soEYD": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "kl4RSMlI2LqxV2KePQQI": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "3ohW3FU65MTUnJuQHkvB",
            " Tta1 a0(:)lSTa9",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "kpG8fY9pkIk1hqcxQWdq": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "lR9XE6VnkPG38pFaCBF3": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "lnWb8l2hKNpy7rnPBRlX": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "lumcoctS4BkPCkIpmmlU": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "0aS0 altn5ndGS d",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "mJkBpUrn66H8OBneqf02": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "mQCLQ8blFuVrWMD7qY92": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "nzQQveWZMk2Wep6axOSI": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            ":7nisnT:a aA 2 G",
            "n42a2Mrlu )thr0r",
            "MrAa9r 99   irA ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "oJ3Twl5YTFghxMadZOja": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "oYzmrFHisHuA5vOCOVZ7": {
          "parent": "RgcNYB5Y6tehuiPF3fiU",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "ogw01PxS66WryWE8W6fq": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "p4DWXe5G3efllrPi7SM2": {
          "parent": "6Inj7uIdHwJvE5XLCqAo",
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "p860H6Ep858dPw1lIyf1": {
          "parent": "Jswlc07RSvDKZLwEI4JX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "pHTIyu3nx6MPhmF7AgXc": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "pfrpBIUlzJpvrBcFhMFj": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "pj0ivaS4d6JrHgtSVIke": {
          "parent": "6Inj7uIdHwJvE5XLCqAo",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
            ":0am 2101y1n )0t",
          ],
        },
        "pnAiilyYRuO8bh0nyr0J": {
          "parent": "0F7QAUqwwjR8WwfU6roJ",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            ":0am 2101y1n )0t",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "qOba1QSzmOB2BHL8WqFD": {
          "parent": "lnWb8l2hKNpy7rnPBRlX",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "el1rE8E rArnt0a1",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "rKuFlQhER63X3YI9UoWo": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "rjHvqSp6wy1LUCHNJ1sM": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "sL2bXbm2oeu3nrFkyTzj": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "  yy0saT Aam  me",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "sXpMdVqVlq63GDvqmKy5": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "siuoK9YsLPm7iEopYACR": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "0 u5rSSaraMtTM61",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "uN8U2fC3JMDuhLlObuDb": {
          "parent": "sL2bXbm2oeu3nrFkyTzj",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "3ohW3FU65MTUnJuQHkvB",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "w2YNwc7zHybYrVur3wyf": {
          "parent": "2oGzh8Nb5rCjF246qgWB",
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "wXFzr07Qu7ID9TuoMTeD": {
          "parent": "FRe93Gn4ICmPF8suHxsB",
          "shadow": null,
          "styles": [
            "(7lr10aTrtmd e (",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "wnap82hYqQW3ra7dzyO1": {
          "parent": "j8uBHU5MCo6eaBUidhKA",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0d yiM7aTa1aet0T",
            "0 u5rSSaraMtTM61",
            ":0am 2101y1n )0t",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "yPQP77fEJfzPB7AvFkUO": {
          "parent": "root",
          "shadow": null,
          "styles": [
            "default",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "yePa5v2iyej8M1avM9HF": {
          "parent": "b6htdXEpqVWVkVbPfqwj",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "t tEe475  iaa00 ",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "zbTCywlmeHOCBa8h7o6F": {
          "parent": "pj0ivaS4d6JrHgtSVIke",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "zk33YD6LD0yovzkjZsBJ": {
          "parent": "yPQP77fEJfzPB7AvFkUO",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "0aS0 altn5ndGS d",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        }
              },
              stats: {
                "treeTotal":{
          "desc": "Number of Members in this Tree",
          "label": "Total on Tree",
          "total": 124,
        },
        "  yy0saT Aam  me": {
          "desc": "A member committed to find 2 Disciples and a Christianity Explained",
          "id": "  yy0saT Aam  me",
          "label": "Multiplier",
          "members": {},
          "total": 8,
          "type": "base",
        },
        " Tta1 a0(:)lSTa9": {
          "desc": "Is participating in a Christianity Explained course",
          "id": " Tta1 a0(:)lSTa9",
          "label": "Christianity Explained",
          "members": {},
          "total": 5,
          "type": "override",
        },
        " a1i n 5mnary0T+": {
          "desc": "A Student leader on campus",
          "id": " a1i n 5mnary0T+",
          "label": "Movement Builder",
          "members": {},
          "total": 7,
          "type": "base",
        },
        " a:aSEaGudanrseE": {
          "desc": "Is a mature student",
          "id": " a:aSEaGudanrseE",
          "label": "Mature Student",
          "members": {},
          "total": 4,
          "type": "override",
        },
        "(7lr10aTrtmd e (": {
          "desc": "A member who isn’t a Christian",
          "id": "(7lr10aTrtmd e (",
          "label": "Non-Christian",
          "members": {},
          "total": 5,
          "type": "base",
        },
        "0 u5rSSaraMtTM61": {
          "desc": "Second Year Student",
          "id": "0 u5rSSaraMtTM61",
          "label": "Year 2",
          "members": {},
          "total": 23,
          "type": "override",
        },
        "0aS0 altn5ndGS d": {
          "desc": "Fourth Year Student",
          "id": "0aS0 altn5ndGS d",
          "label": "Year 4",
          "members": {},
          "total": 6,
          "type": "override",
        },
        "0d yiM7aTa1aet0T": {
          "desc": "A member who became a Christian through the movement",
          "id": "0d yiM7aTa1aet0T",
          "label": "New Christian through Movement",
          "members": {},
          "total": 11,
          "type": "override",
        },
        "11ttn nu101dGd m": {
          "desc": "A member who is a christian",
          "id": "11ttn nu101dGd m",
          "label": "Christian",
          "members": {},
          "total": 53,
          "type": "base",
        },
        "3ohW3FU65MTUnJuQHkvB": {
          "desc": "First Year Student",
          "id": "3ohW3FU65MTUnJuQHkvB",
          "label": "Year 1",
          "members": {},
          "total": 10,
          "type": "override",
        },
        "46akFzeUaeqBWC3IBXV2": {
          "desc": "",
          "id": "46akFzeUaeqBWC3IBXV2",
          "label": "*Male",
          "members": {},
          "total": 73,
          "type": "override",
        },
        ":0am 2101y1n )0t": {
          "desc": "Is being Discipled on Campus",
          "id": ":0am 2101y1n )0t",
          "label": "Disciple",
          "members": {},
          "total": 47,
          "type": "override",
        },
        ":7nisnT:a aA 2 G": {
          "desc": "A member coming on SALT most weeks",
          "id": ":7nisnT:a aA 2 G",
          "label": "Committed Follower",
          "members": {},
          "total": 8,
          "type": "base",
        },
        "MM raida3utaTd 1": {
          "desc": "Sixth Year Student",
          "id": "MM raida3utaTd 1",
          "label": "Year 6",
          "members": {},
          "total": 1,
          "type": "override",
        },
        "MrAa9r 99   irA ": {
          "desc": "Fifth Year Student",
          "id": "MrAa9r 99   irA ",
          "label": "Year 5",
          "members": {},
          "total": 3,
          "type": "override",
        },
        "SM(6 sM1EEn+ Aui": {
          "desc": "A member who isn’t a Christian but is seeking to learn more",
          "id": "SM(6 sM1EEn+ Aui",
          "label": "Seeking Non-Christian",
          "members": {},
          "total": 34,
          "type": "base",
        },
        "SlNxPm1AFSC695RjX7a9": {
          "desc": "Is on Exec",
          "id": "SlNxPm1AFSC695RjX7a9",
          "label": "Exec",
          "members": {},
          "total": 3,
          "type": "override",
        },
        "default": {
          "desc": "A vocational member of the movement",
          "id": "default",
          "label": "Missionary",
          "members": {},
          "total": 9,
          "type": "base",
        },
        "el1rE8E rArnt0a1": {
          "desc": "Is an international student",
          "id": "el1rE8E rArnt0a1",
          "label": "International Student",
          "members": {},
          "total": 6,
          "type": "override",
        },
        "haeT+:10nlTe:y00": {
          "desc": "Is on Short Term Exchange",
          "id": "haeT+:10nlTe:y00",
          "label": "Exchange",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "n42a2Mrlu )thr0r": {
          "desc": "Is Graduating within 22 months",
          "id": "n42a2Mrlu )thr0r",
          "label": "Graduating",
          "members": {},
          "total": 1,
          "type": "override",
        },
        "rTrr2d 3ed+1i3aa": {
          "desc": "Not Studying on campus",
          "id": "rTrr2d 3ed+1i3aa",
          "label": "Not on Campus",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "rYMogPL8oQOx8bJdAMa2": {
          "desc": "",
          "id": "rYMogPL8oQOx8bJdAMa2",
          "label": "*Female",
          "members": {},
          "total": 42,
          "type": "override",
        },
        "t tEe475  iaa00 ": {
          "desc": "Third Year Student",
          "id": "t tEe475  iaa00 ",
          "label": "Year 3",
          "members": {},
          "total": 11,
          "type": "override",
        },
      },
              tree: {
        "tree": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "id": "hNMZaqZFPsK0QUKeZOWO",
                    "key": "GEFvZB4Vh5tqKOdaez1e-hNMZaqZFPsK0QUKeZOWO",
                    "parent": "GEFvZB4Vh5tqKOdaez1e",
                    "type": "normal",
                  },
                ],
                "id": "GEFvZB4Vh5tqKOdaez1e",
                "key": "yPQP77fEJfzPB7AvFkUO-GEFvZB4Vh5tqKOdaez1e",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "5jajm7QQP6bExdVhhG8k",
                    "key": "E0lAYwkDBtjgQ9u3e4xS-5jajm7QQP6bExdVhhG8k",
                    "parent": "E0lAYwkDBtjgQ9u3e4xS",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "1t2B7PaShPpjRZ3Duh5Y",
                    "key": "E0lAYwkDBtjgQ9u3e4xS-1t2B7PaShPpjRZ3Duh5Y",
                    "parent": "E0lAYwkDBtjgQ9u3e4xS",
                    "type": "normal",
                  },
                ],
                "id": "E0lAYwkDBtjgQ9u3e4xS",
                "key": "yPQP77fEJfzPB7AvFkUO-E0lAYwkDBtjgQ9u3e4xS",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
              {
                "children": [],
                "id": "zk33YD6LD0yovzkjZsBJ",
                "key": "yPQP77fEJfzPB7AvFkUO-zk33YD6LD0yovzkjZsBJ",
                "parent": "yPQP77fEJfzPB7AvFkUO",
                "type": "normal",
              },
            ],
            "id": "yPQP77fEJfzPB7AvFkUO",
            "key": "root-yPQP77fEJfzPB7AvFkUO",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "8lLE3MQyAZcQvTKiR3rH",
                "key": "DLy4fRpkzW8IkP2JGn6i-8lLE3MQyAZcQvTKiR3rH",
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "type": "normal",
              },
              {
                "children": [],
                "id": "WZ1GggK61NUYI2BebS36",
                "key": "DLy4fRpkzW8IkP2JGn6i-WZ1GggK61NUYI2BebS36",
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "type": "normal",
              },
              {
                "children": [],
                "id": "2e1etGimRhzJdEDLqHYm",
                "key": "DLy4fRpkzW8IkP2JGn6i-2e1etGimRhzJdEDLqHYm",
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "type": "normal",
              },
              {
                "children": [],
                "id": "TtbZkgdgk6DpeWn31hZG",
                "key": "DLy4fRpkzW8IkP2JGn6i-TtbZkgdgk6DpeWn31hZG",
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "type": "normal",
              },
              {
                "children": [],
                "id": "hna5jSZzW7kKOyWTBNrU",
                "key": "DLy4fRpkzW8IkP2JGn6i-hna5jSZzW7kKOyWTBNrU",
                "parent": "DLy4fRpkzW8IkP2JGn6i",
                "type": "normal",
              },
            ],
            "id": "DLy4fRpkzW8IkP2JGn6i",
            "key": "root-DLy4fRpkzW8IkP2JGn6i",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "OPFH9KNwqXeYRvopnoFM",
                "key": "0F7QAUqwwjR8WwfU6roJ-OPFH9KNwqXeYRvopnoFM",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "gPPrFEwneaMazoTFyULr",
                "key": "0F7QAUqwwjR8WwfU6roJ-gPPrFEwneaMazoTFyULr",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "pnAiilyYRuO8bh0nyr0J",
                "key": "0F7QAUqwwjR8WwfU6roJ-pnAiilyYRuO8bh0nyr0J",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "F8Oxq5JXKhF8DHVaVPYS",
                "key": "0F7QAUqwwjR8WwfU6roJ-F8Oxq5JXKhF8DHVaVPYS",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "pfrpBIUlzJpvrBcFhMFj",
                "key": "0F7QAUqwwjR8WwfU6roJ-pfrpBIUlzJpvrBcFhMFj",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "wXFzr07Qu7ID9TuoMTeD",
                    "key": "FRe93Gn4ICmPF8suHxsB-wXFzr07Qu7ID9TuoMTeD",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "oJ3Twl5YTFghxMadZOja",
                    "key": "FRe93Gn4ICmPF8suHxsB-oJ3Twl5YTFghxMadZOja",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "SisCsMdoKIAjnCX19y52",
                    "key": "FRe93Gn4ICmPF8suHxsB-SisCsMdoKIAjnCX19y52",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "41g0Esm7MYlYVjWummPM",
                    "key": "FRe93Gn4ICmPF8suHxsB-41g0Esm7MYlYVjWummPM",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "5LWB5cBbj9EIpd6bk2I3",
                    "key": "FRe93Gn4ICmPF8suHxsB-5LWB5cBbj9EIpd6bk2I3",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "rjHvqSp6wy1LUCHNJ1sM",
                    "key": "FRe93Gn4ICmPF8suHxsB-rjHvqSp6wy1LUCHNJ1sM",
                    "parent": "FRe93Gn4ICmPF8suHxsB",
                    "type": "normal",
                  },
                ],
                "id": "FRe93Gn4ICmPF8suHxsB",
                "key": "0F7QAUqwwjR8WwfU6roJ-FRe93Gn4ICmPF8suHxsB",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "YBhYDrEqW9ys7kYXU4Dt",
                    "key": "Jswlc07RSvDKZLwEI4JX-YBhYDrEqW9ys7kYXU4Dt",
                    "parent": "Jswlc07RSvDKZLwEI4JX",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "ZHZjrnwBPJlZYYJblack",
                    "key": "Jswlc07RSvDKZLwEI4JX-ZHZjrnwBPJlZYYJblack",
                    "parent": "Jswlc07RSvDKZLwEI4JX",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "UUR4WhXx7PUGiSUc1eou",
                    "key": "Jswlc07RSvDKZLwEI4JX-UUR4WhXx7PUGiSUc1eou",
                    "parent": "Jswlc07RSvDKZLwEI4JX",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "p860H6Ep858dPw1lIyf1",
                    "key": "Jswlc07RSvDKZLwEI4JX-p860H6Ep858dPw1lIyf1",
                    "parent": "Jswlc07RSvDKZLwEI4JX",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "c6dRupke4wlwBpyCyWOv",
                    "key": "Jswlc07RSvDKZLwEI4JX-c6dRupke4wlwBpyCyWOv",
                    "parent": "Jswlc07RSvDKZLwEI4JX",
                    "type": "normal",
                  },
                ],
                "id": "Jswlc07RSvDKZLwEI4JX",
                "key": "0F7QAUqwwjR8WwfU6roJ-Jswlc07RSvDKZLwEI4JX",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "nzQQveWZMk2Wep6axOSI",
                "key": "0F7QAUqwwjR8WwfU6roJ-nzQQveWZMk2Wep6axOSI",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "HaorE8zql5fNXzssp5Cu",
                    "key": "RgcNYB5Y6tehuiPF3fiU-HaorE8zql5fNXzssp5Cu",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "mJkBpUrn66H8OBneqf02",
                    "key": "RgcNYB5Y6tehuiPF3fiU-mJkBpUrn66H8OBneqf02",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "3VcOYykTqk3aueEM1qz4",
                    "key": "RgcNYB5Y6tehuiPF3fiU-3VcOYykTqk3aueEM1qz4",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "cB5HQ5SQVSzvU5CchLGs",
                    "key": "RgcNYB5Y6tehuiPF3fiU-cB5HQ5SQVSzvU5CchLGs",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "dhoHQ6ekezieiJzVFcjQ",
                        "key": "oYzmrFHisHuA5vOCOVZ7-dhoHQ6ekezieiJzVFcjQ",
                        "parent": "oYzmrFHisHuA5vOCOVZ7",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "GPV2PwtSEsQ2SvDVAUm9",
                        "key": "oYzmrFHisHuA5vOCOVZ7-GPV2PwtSEsQ2SvDVAUm9",
                        "parent": "oYzmrFHisHuA5vOCOVZ7",
                        "type": "normal",
                      },
                    ],
                    "id": "oYzmrFHisHuA5vOCOVZ7",
                    "key": "RgcNYB5Y6tehuiPF3fiU-oYzmrFHisHuA5vOCOVZ7",
                    "parent": "RgcNYB5Y6tehuiPF3fiU",
                    "type": "normal",
                  },
                ],
                "id": "RgcNYB5Y6tehuiPF3fiU",
                "key": "0F7QAUqwwjR8WwfU6roJ-RgcNYB5Y6tehuiPF3fiU",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
              {
                "children": [],
                "id": "kpG8fY9pkIk1hqcxQWdq",
                "key": "0F7QAUqwwjR8WwfU6roJ-kpG8fY9pkIk1hqcxQWdq",
                "parent": "0F7QAUqwwjR8WwfU6roJ",
                "type": "normal",
              },
            ],
            "id": "0F7QAUqwwjR8WwfU6roJ",
            "key": "root-0F7QAUqwwjR8WwfU6roJ",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "KnvNYpkNiyqI0jOAmbnj",
                "key": "b6htdXEpqVWVkVbPfqwj-KnvNYpkNiyqI0jOAmbnj",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "rKuFlQhER63X3YI9UoWo",
                "key": "b6htdXEpqVWVkVbPfqwj-rKuFlQhER63X3YI9UoWo",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "yePa5v2iyej8M1avM9HF",
                "key": "b6htdXEpqVWVkVbPfqwj-yePa5v2iyej8M1avM9HF",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "SHfCYaw0voFJi8fQPsIG",
                    "key": "sL2bXbm2oeu3nrFkyTzj-SHfCYaw0voFJi8fQPsIG",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "3Qt16BHwZX85VMCaYhFC",
                    "key": "sL2bXbm2oeu3nrFkyTzj-3Qt16BHwZX85VMCaYhFC",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "3xuK59nxOssO0zFD7D9v",
                    "key": "sL2bXbm2oeu3nrFkyTzj-3xuK59nxOssO0zFD7D9v",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "uN8U2fC3JMDuhLlObuDb",
                    "key": "sL2bXbm2oeu3nrFkyTzj-uN8U2fC3JMDuhLlObuDb",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "lR9XE6VnkPG38pFaCBF3",
                    "key": "sL2bXbm2oeu3nrFkyTzj-lR9XE6VnkPG38pFaCBF3",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "O0WpvvNuAQ1EK4nQp6qq",
                    "key": "sL2bXbm2oeu3nrFkyTzj-O0WpvvNuAQ1EK4nQp6qq",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "bprNzBn8L1OQeudiGfPg",
                    "key": "sL2bXbm2oeu3nrFkyTzj-bprNzBn8L1OQeudiGfPg",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "7rI78zAz5T98Wk92XLUQ",
                    "key": "sL2bXbm2oeu3nrFkyTzj-7rI78zAz5T98Wk92XLUQ",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "6SivpPUyHgZlQowBggOj",
                        "key": "2oGzh8Nb5rCjF246qgWB-6SivpPUyHgZlQowBggOj",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "FClWLoiM7zyzV7RzwJr7",
                        "key": "2oGzh8Nb5rCjF246qgWB-FClWLoiM7zyzV7RzwJr7",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "sXpMdVqVlq63GDvqmKy5",
                        "key": "2oGzh8Nb5rCjF246qgWB-sXpMdVqVlq63GDvqmKy5",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "ogw01PxS66WryWE8W6fq",
                        "key": "2oGzh8Nb5rCjF246qgWB-ogw01PxS66WryWE8W6fq",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "KyOhn6L12Nd1YlwAAtwF",
                        "key": "2oGzh8Nb5rCjF246qgWB-KyOhn6L12Nd1YlwAAtwF",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "FKiquYXVsHlHFAnDyhp1",
                        "key": "2oGzh8Nb5rCjF246qgWB-FKiquYXVsHlHFAnDyhp1",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "FuiywanMGBuUQgpSchxY",
                        "key": "2oGzh8Nb5rCjF246qgWB-FuiywanMGBuUQgpSchxY",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                      {
                        "children": [],
                        "id": "w2YNwc7zHybYrVur3wyf",
                        "key": "2oGzh8Nb5rCjF246qgWB-w2YNwc7zHybYrVur3wyf",
                        "parent": "2oGzh8Nb5rCjF246qgWB",
                        "type": "normal",
                      },
                    ],
                    "id": "2oGzh8Nb5rCjF246qgWB",
                    "key": "sL2bXbm2oeu3nrFkyTzj-2oGzh8Nb5rCjF246qgWB",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "lumcoctS4BkPCkIpmmlU",
                    "key": "sL2bXbm2oeu3nrFkyTzj-lumcoctS4BkPCkIpmmlU",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "bo8GaHzXfbdwcGrtNTxA",
                    "key": "sL2bXbm2oeu3nrFkyTzj-bo8GaHzXfbdwcGrtNTxA",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "CrpiwLij89zxheml5PZ0",
                    "key": "sL2bXbm2oeu3nrFkyTzj-CrpiwLij89zxheml5PZ0",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "ketIhx0ruiO4RT7soEYD",
                    "key": "sL2bXbm2oeu3nrFkyTzj-ketIhx0ruiO4RT7soEYD",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "siuoK9YsLPm7iEopYACR",
                    "key": "sL2bXbm2oeu3nrFkyTzj-siuoK9YsLPm7iEopYACR",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "J4LwWjd9iDBxppVZZZWa",
                    "key": "sL2bXbm2oeu3nrFkyTzj-J4LwWjd9iDBxppVZZZWa",
                    "parent": "sL2bXbm2oeu3nrFkyTzj",
                    "type": "normal",
                  },
                ],
                "id": "sL2bXbm2oeu3nrFkyTzj",
                "key": "b6htdXEpqVWVkVbPfqwj-sL2bXbm2oeu3nrFkyTzj",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "H18XI319zInCTeSFYY5N",
                "key": "b6htdXEpqVWVkVbPfqwj-H18XI319zInCTeSFYY5N",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "THZ4uAvY0NIUUZQltI31",
                "key": "b6htdXEpqVWVkVbPfqwj-THZ4uAvY0NIUUZQltI31",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "XUFAEPT2LHUfYDYXUwuI",
                    "key": "9J2c8om4WuzAy0UQQCUX-XUFAEPT2LHUfYDYXUwuI",
                    "parent": "9J2c8om4WuzAy0UQQCUX",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "7MncUuOnLX5iJLLNQAwp",
                    "key": "9J2c8om4WuzAy0UQQCUX-7MncUuOnLX5iJLLNQAwp",
                    "parent": "9J2c8om4WuzAy0UQQCUX",
                    "type": "normal",
                  },
                ],
                "id": "9J2c8om4WuzAy0UQQCUX",
                "key": "b6htdXEpqVWVkVbPfqwj-9J2c8om4WuzAy0UQQCUX",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "56ekIfJ67uKDrEwI6zoU",
                "key": "b6htdXEpqVWVkVbPfqwj-56ekIfJ67uKDrEwI6zoU",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "9WxxF3KXUIHLqrM5YkV5",
                "key": "b6htdXEpqVWVkVbPfqwj-9WxxF3KXUIHLqrM5YkV5",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
              {
                "children": [],
                "id": "mQCLQ8blFuVrWMD7qY92",
                "key": "b6htdXEpqVWVkVbPfqwj-mQCLQ8blFuVrWMD7qY92",
                "parent": "b6htdXEpqVWVkVbPfqwj",
                "type": "normal",
              },
            ],
            "id": "b6htdXEpqVWVkVbPfqwj",
            "key": "root-b6htdXEpqVWVkVbPfqwj",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "6E6OkRDM7CyrunonAGbb",
            "key": "root-6E6OkRDM7CyrunonAGbb",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "BW4ZO4Od3kwou2XDA8VY",
                "key": "UFpMECuOtpr834QO0EVO-BW4ZO4Od3kwou2XDA8VY",
                "parent": "UFpMECuOtpr834QO0EVO",
                "type": "normal",
              },
              {
                "children": [],
                "id": "e6rTKyHXa2YD9VDOoLq7",
                "key": "UFpMECuOtpr834QO0EVO-e6rTKyHXa2YD9VDOoLq7",
                "parent": "UFpMECuOtpr834QO0EVO",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "2o3b6aKcthpAiA2tIilF",
                    "key": "6Inj7uIdHwJvE5XLCqAo-2o3b6aKcthpAiA2tIilF",
                    "parent": "6Inj7uIdHwJvE5XLCqAo",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "k0SHRHTkeZwbSZ7qtq77",
                    "key": "6Inj7uIdHwJvE5XLCqAo-k0SHRHTkeZwbSZ7qtq77",
                    "parent": "6Inj7uIdHwJvE5XLCqAo",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "zbTCywlmeHOCBa8h7o6F",
                        "key": "pj0ivaS4d6JrHgtSVIke-zbTCywlmeHOCBa8h7o6F",
                        "parent": "pj0ivaS4d6JrHgtSVIke",
                        "type": "normal",
                      },
                    ],
                    "id": "pj0ivaS4d6JrHgtSVIke",
                    "key": "6Inj7uIdHwJvE5XLCqAo-pj0ivaS4d6JrHgtSVIke",
                    "parent": "6Inj7uIdHwJvE5XLCqAo",
                    "type": "normal",
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "6U8f3cPHbILYvrNrW3UV",
                        "key": "p4DWXe5G3efllrPi7SM2-6U8f3cPHbILYvrNrW3UV",
                        "parent": "p4DWXe5G3efllrPi7SM2",
                        "type": "normal",
                      },
                    ],
                    "id": "p4DWXe5G3efllrPi7SM2",
                    "key": "6Inj7uIdHwJvE5XLCqAo-p4DWXe5G3efllrPi7SM2",
                    "parent": "6Inj7uIdHwJvE5XLCqAo",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "bw5i43xw8SZ4JdVlLUMc",
                    "key": "6Inj7uIdHwJvE5XLCqAo-bw5i43xw8SZ4JdVlLUMc",
                    "parent": "6Inj7uIdHwJvE5XLCqAo",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "J4dgQr1z58seefVlP03V",
                    "key": "6Inj7uIdHwJvE5XLCqAo-J4dgQr1z58seefVlP03V",
                    "parent": "6Inj7uIdHwJvE5XLCqAo",
                    "type": "normal",
                  },
                ],
                "id": "6Inj7uIdHwJvE5XLCqAo",
                "key": "UFpMECuOtpr834QO0EVO-6Inj7uIdHwJvE5XLCqAo",
                "parent": "UFpMECuOtpr834QO0EVO",
                "type": "normal",
              },
            ],
            "id": "UFpMECuOtpr834QO0EVO",
            "key": "root-UFpMECuOtpr834QO0EVO",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "id": "YsfQAA975yuE6vD6sX2I",
                    "key": "KIysPYAG8YsT6dMYqhS6-YsfQAA975yuE6vD6sX2I",
                    "parent": "KIysPYAG8YsT6dMYqhS6",
                    "type": "normal",
                  },
                ],
                "id": "KIysPYAG8YsT6dMYqhS6",
                "key": "kDv1llMqIjlgpHN8EUUT-KIysPYAG8YsT6dMYqhS6",
                "parent": "kDv1llMqIjlgpHN8EUUT",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "fnbxJCK4oF9458qiVtIx",
                    "key": "53PMXNHlgOjFg9QBK5SX-fnbxJCK4oF9458qiVtIx",
                    "parent": "53PMXNHlgOjFg9QBK5SX",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "PePFwnaxBILBrLk3M1xQ",
                    "key": "53PMXNHlgOjFg9QBK5SX-PePFwnaxBILBrLk3M1xQ",
                    "parent": "53PMXNHlgOjFg9QBK5SX",
                    "type": "normal",
                  },
                ],
                "id": "53PMXNHlgOjFg9QBK5SX",
                "key": "kDv1llMqIjlgpHN8EUUT-53PMXNHlgOjFg9QBK5SX",
                "parent": "kDv1llMqIjlgpHN8EUUT",
                "type": "normal",
              },
              {
                "children": [],
                "id": "TamPIMLI1DEKHPnN1iOU",
                "key": "kDv1llMqIjlgpHN8EUUT-TamPIMLI1DEKHPnN1iOU",
                "parent": "kDv1llMqIjlgpHN8EUUT",
                "type": "normal",
              },
              {
                "children": [],
                "id": "XKgyDKBNAADnGfsrVDak",
                "key": "kDv1llMqIjlgpHN8EUUT-XKgyDKBNAADnGfsrVDak",
                "parent": "kDv1llMqIjlgpHN8EUUT",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "N0bpRvG0h1vu7Wk7lrbN",
                    "key": "OxsxDa0Fwpo6Jm4L9G3U-N0bpRvG0h1vu7Wk7lrbN",
                    "parent": "OxsxDa0Fwpo6Jm4L9G3U",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "UtOHfX9BDZhmhUAYjrM2",
                    "key": "OxsxDa0Fwpo6Jm4L9G3U-UtOHfX9BDZhmhUAYjrM2",
                    "parent": "OxsxDa0Fwpo6Jm4L9G3U",
                    "type": "normal",
                  },
                ],
                "id": "OxsxDa0Fwpo6Jm4L9G3U",
                "key": "kDv1llMqIjlgpHN8EUUT-OxsxDa0Fwpo6Jm4L9G3U",
                "parent": "kDv1llMqIjlgpHN8EUUT",
                "type": "normal",
              },
            ],
            "id": "kDv1llMqIjlgpHN8EUUT",
            "key": "root-kDv1llMqIjlgpHN8EUUT",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "aE7Mu556fCJIhvxJY00y",
            "key": "root-aE7Mu556fCJIhvxJY00y",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "FnPh5VIW2GgaJKiZjUQ8",
                "key": "lnWb8l2hKNpy7rnPBRlX-FnPh5VIW2GgaJKiZjUQ8",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "HayQhdlGsKxKbfPlo5ON",
                "key": "lnWb8l2hKNpy7rnPBRlX-HayQhdlGsKxKbfPlo5ON",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "GhD6U3mX41TODXRgV1jb",
                "key": "lnWb8l2hKNpy7rnPBRlX-GhD6U3mX41TODXRgV1jb",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "WDnwmZiAqV4fHbjnkMu5",
                "key": "lnWb8l2hKNpy7rnPBRlX-WDnwmZiAqV4fHbjnkMu5",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "fBiG1AbHOzjd9qyfFVsu",
                "key": "lnWb8l2hKNpy7rnPBRlX-fBiG1AbHOzjd9qyfFVsu",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "dV1qaOGk3FnzZFNUw1oZ",
                "key": "lnWb8l2hKNpy7rnPBRlX-dV1qaOGk3FnzZFNUw1oZ",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "id": "wnap82hYqQW3ra7dzyO1",
                        "key": "j8uBHU5MCo6eaBUidhKA-wnap82hYqQW3ra7dzyO1",
                        "parent": "j8uBHU5MCo6eaBUidhKA",
                        "type": "normal",
                      },
                    ],
                    "id": "j8uBHU5MCo6eaBUidhKA",
                    "key": "6I21kvhx7VAO4PEnepwU-j8uBHU5MCo6eaBUidhKA",
                    "parent": "6I21kvhx7VAO4PEnepwU",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "LwAIkYOnrnrdV1eA1kFW",
                    "key": "6I21kvhx7VAO4PEnepwU-LwAIkYOnrnrdV1eA1kFW",
                    "parent": "6I21kvhx7VAO4PEnepwU",
                    "type": "normal",
                  },
                ],
                "id": "6I21kvhx7VAO4PEnepwU",
                "key": "lnWb8l2hKNpy7rnPBRlX-6I21kvhx7VAO4PEnepwU",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "kl4RSMlI2LqxV2KePQQI",
                "key": "lnWb8l2hKNpy7rnPBRlX-kl4RSMlI2LqxV2KePQQI",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "pHTIyu3nx6MPhmF7AgXc",
                "key": "lnWb8l2hKNpy7rnPBRlX-pHTIyu3nx6MPhmF7AgXc",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [
                  {
                    "children": [],
                    "id": "SA4jQtdFuI0srEDYDa3o",
                    "key": "8ZSvPVPsvyc7K0vdk2ez-SA4jQtdFuI0srEDYDa3o",
                    "parent": "8ZSvPVPsvyc7K0vdk2ez",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "C1nQX607TTJiHSaJQdSF",
                    "key": "8ZSvPVPsvyc7K0vdk2ez-C1nQX607TTJiHSaJQdSF",
                    "parent": "8ZSvPVPsvyc7K0vdk2ez",
                    "type": "normal",
                  },
                  {
                    "children": [],
                    "id": "5pcbcwguBcO2YJWWlkta",
                    "key": "8ZSvPVPsvyc7K0vdk2ez-5pcbcwguBcO2YJWWlkta",
                    "parent": "8ZSvPVPsvyc7K0vdk2ez",
                    "type": "normal",
                  },
                ],
                "id": "8ZSvPVPsvyc7K0vdk2ez",
                "key": "lnWb8l2hKNpy7rnPBRlX-8ZSvPVPsvyc7K0vdk2ez",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "iKkzRo4LNx8fZS9LpdFJ",
                "key": "lnWb8l2hKNpy7rnPBRlX-iKkzRo4LNx8fZS9LpdFJ",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "H52Kf6Alu5knusGxEGrB",
                "key": "lnWb8l2hKNpy7rnPBRlX-H52Kf6Alu5knusGxEGrB",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "YrZB0KJL94BSnecnK6t4",
                "key": "lnWb8l2hKNpy7rnPBRlX-YrZB0KJL94BSnecnK6t4",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
              {
                "children": [],
                "id": "qOba1QSzmOB2BHL8WqFD",
                "key": "lnWb8l2hKNpy7rnPBRlX-qOba1QSzmOB2BHL8WqFD",
                "parent": "lnWb8l2hKNpy7rnPBRlX",
                "type": "normal",
              },
            ],
            "id": "lnWb8l2hKNpy7rnPBRlX",
            "key": "root-lnWb8l2hKNpy7rnPBRlX",
            "parent": "root",
            "type": "normal",
          },
        ],
      }
            },
            'noParents': {
              doc: {
                id: "noParents",
                label: "No Parents"
              },
              parents: {
        "0jMy2Yfnc5IYmHYE4RJM": {
          parent: 'root',
          "shadow": null,
          "styles": [
            " a1i n 5mnary0T+",
            ":0am 2101y1n )0t",
            "MM raida3utaTd 1",
          ],
        },
        "1Otp49vJ6Krcyvwcn4Mb": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
          ],
        },
        "9tHXG5w7QyxK8m1IG8dJ": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "GCzXCx3Ib7EOrYiqYXAu": {
          "parent": "0jMy2Yfnc5IYmHYE4RJM",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
          ],
        },
        "VmtdU8nxHjWZduJEhlXm": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "46akFzeUaeqBWC3IBXV2",
          ],
        },
        "d0rALn8Toz8UvU8gCN2D": {
          "parent": "1Otp49vJ6Krcyvwcn4Mb",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "0 u5rSSaraMtTM61",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "dQdcAOzdQWYujkJqIBy2": {
          "parent": "1Otp49vJ6Krcyvwcn4Mb",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rTrr2d 3ed+1i3aa",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "dktf33ZVN2tkOWIWQQkz": {
          "parent": "0jMy2Yfnc5IYmHYE4RJM",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "rTrr2d 3ed+1i3aa",
          ],
        },
        "pGtYWHQ3Qm3ONX9KoHmW": {
          "parent": "0jMy2Yfnc5IYmHYE4RJM",
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            "el1rE8E rArnt0a1",
            "0 u5rSSaraMtTM61",
          ],
        },
        "s3H0Mrw6eRgJNsfCgEKI": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "11ttn nu101dGd m",
            ":0am 2101y1n )0t",
            "t tEe475  iaa00 ",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
        "sCk0ORSlIKlI4TEMoj6L": {
          parent: 'root',
          "shadow": null,
          "styles": [
            "SM(6 sM1EEn+ Aui",
            " Tta1 a0(:)lSTa9",
            "rYMogPL8oQOx8bJdAMa2",
          ],
        },
      },
              stats: {
                "treeTotal": {
          "desc": "Number of Members in this Tree",
          "label": "Total on Tree",
          "total": 11,
        },
        "  yy0saT Aam  me": {
          "desc": "A member committed to find 2 Disciples and a Christianity Explained",
          "id": "  yy0saT Aam  me",
          "label": "Multiplier",
          "members": {},
          "total": 0,
          "type": "base",
        },
        " Tta1 a0(:)lSTa9": {
          "desc": "Is participating in a Christianity Explained course",
          "id": " Tta1 a0(:)lSTa9",
          "label": "Christianity Explained",
          "members": {},
          "total": 0,
          "type": "override",
        },
        " a1i n 5mnary0T+": {
          "desc": "A Student leader on campus",
          "id": " a1i n 5mnary0T+",
          "label": "Movement Builder",
          "members": {},
          "total": 0,
          "type": "base",
        },
        " a:aSEaGudanrseE": {
          "desc": "Is a mature student",
          "id": " a:aSEaGudanrseE",
          "label": "Mature Student",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "(7lr10aTrtmd e (": {
          "desc": "A member who isn’t a Christian",
          "id": "(7lr10aTrtmd e (",
          "label": "Non-Christian",
          "members": {},
          "total": 0,
          "type": "base",
        },
        "0 u5rSSaraMtTM61": {
          "desc": "Second Year Student",
          "id": "0 u5rSSaraMtTM61",
          "label": "Year 2",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "0aS0 altn5ndGS d": {
          "desc": "Fourth Year Student",
          "id": "0aS0 altn5ndGS d",
          "label": "Year 4",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "0d yiM7aTa1aet0T": {
          "desc": "A member who became a Christian through the movement",
          "id": "0d yiM7aTa1aet0T",
          "label": "New Christian through Movement",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "11ttn nu101dGd m": {
          "desc": "A member who is a christian",
          "id": "11ttn nu101dGd m",
          "label": "Christian",
          "members": {},
          "total": 0,
          "type": "base",
        },
        "3ohW3FU65MTUnJuQHkvB": {
          "desc": "First Year Student",
          "id": "3ohW3FU65MTUnJuQHkvB",
          "label": "Year 1",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "46akFzeUaeqBWC3IBXV2": {
          "desc": "",
          "id": "46akFzeUaeqBWC3IBXV2",
          "label": "*Male",
          "members": {},
          "total": 0,
          "type": "override",
        },
        ":0am 2101y1n )0t": {
          "desc": "Is being Discipled on Campus",
          "id": ":0am 2101y1n )0t",
          "label": "Disciple",
          "members": {},
          "total": 0,
          "type": "override",
        },
        ":7nisnT:a aA 2 G": {
          "desc": "A member coming on SALT most weeks",
          "id": ":7nisnT:a aA 2 G",
          "label": "Committed Follower",
          "members": {},
          "total": 0,
          "type": "base",
        },
        "MM raida3utaTd 1": {
          "desc": "Sixth Year Student",
          "id": "MM raida3utaTd 1",
          "label": "Year 6",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "MrAa9r 99   irA ": {
          "desc": "Fifth Year Student",
          "id": "MrAa9r 99   irA ",
          "label": "Year 5",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "SM(6 sM1EEn+ Aui": {
          "desc": "A member who isn’t a Christian but is seeking to learn more",
          "id": "SM(6 sM1EEn+ Aui",
          "label": "Seeking Non-Christian",
          "members": {},
          "total": 0,
          "type": "base",
        },
        "SlNxPm1AFSC695RjX7a9": {
          "desc": "Is on Exec",
          "id": "SlNxPm1AFSC695RjX7a9",
          "label": "Exec",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "default": {
          "desc": "A vocational member of the movement",
          "id": "default",
          "label": "Missionary",
          "members": {},
          "total": 0,
          "type": "base",
        },
        "el1rE8E rArnt0a1": {
          "desc": "Is an international student",
          "id": "el1rE8E rArnt0a1",
          "label": "International Student",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "haeT+:10nlTe:y00": {
          "desc": "Is on Short Term Exchange",
          "id": "haeT+:10nlTe:y00",
          "label": "Exchange",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "n42a2Mrlu )thr0r": {
          "desc": "Is Graduating within 22 months",
          "id": "n42a2Mrlu )thr0r",
          "label": "Graduating",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "rTrr2d 3ed+1i3aa": {
          "desc": "Not Studying on campus",
          "id": "rTrr2d 3ed+1i3aa",
          "label": "Not on Campus",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "rYMogPL8oQOx8bJdAMa2": {
          "desc": "",
          "id": "rYMogPL8oQOx8bJdAMa2",
          "label": "*Female",
          "members": {},
          "total": 0,
          "type": "override",
        },
        "t tEe475  iaa00 ": {
          "desc": "Third Year Student",
          "id": "t tEe475  iaa00 ",
          "label": "Year 3",
          "members": {},
          "total": 0,
          "type": "override",
        },
      },
              tree: {
        "tree": [
          {
            "children": [
              {
                "children": [],
                "id": "dQdcAOzdQWYujkJqIBy2",
                "key": "1Otp49vJ6Krcyvwcn4Mb-dQdcAOzdQWYujkJqIBy2",
                "parent": "1Otp49vJ6Krcyvwcn4Mb",
                "type": "normal",
              },
              {
                "children": [],
                "id": "d0rALn8Toz8UvU8gCN2D",
                "key": "1Otp49vJ6Krcyvwcn4Mb-d0rALn8Toz8UvU8gCN2D",
                "parent": "1Otp49vJ6Krcyvwcn4Mb",
                "type": "normal",
              },
            ],
            "id": "1Otp49vJ6Krcyvwcn4Mb",
            "key": "root-1Otp49vJ6Krcyvwcn4Mb",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "9tHXG5w7QyxK8m1IG8dJ",
            "key": "root-9tHXG5w7QyxK8m1IG8dJ",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "VmtdU8nxHjWZduJEhlXm",
            "key": "root-VmtdU8nxHjWZduJEhlXm",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [
              {
                "children": [],
                "id": "pGtYWHQ3Qm3ONX9KoHmW",
                "key": "0jMy2Yfnc5IYmHYE4RJM-pGtYWHQ3Qm3ONX9KoHmW",
                "parent": "0jMy2Yfnc5IYmHYE4RJM",
                "type": "normal",
              },
              {
                "children": [],
                "id": "GCzXCx3Ib7EOrYiqYXAu",
                "key": "0jMy2Yfnc5IYmHYE4RJM-GCzXCx3Ib7EOrYiqYXAu",
                "parent": "0jMy2Yfnc5IYmHYE4RJM",
                "type": "normal",
              },
              {
                "children": [],
                "id": "dktf33ZVN2tkOWIWQQkz",
                "key": "0jMy2Yfnc5IYmHYE4RJM-dktf33ZVN2tkOWIWQQkz",
                "parent": "0jMy2Yfnc5IYmHYE4RJM",
                "type": "normal",
              },
            ],
            "id": "0jMy2Yfnc5IYmHYE4RJM",
            "key": "root-0jMy2Yfnc5IYmHYE4RJM",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "s3H0Mrw6eRgJNsfCgEKI",
            "key": "root-s3H0Mrw6eRgJNsfCgEKI",
            "parent": "root",
            "type": "normal",
          },
          {
            "children": [],
            "id": "sCk0ORSlIKlI4TEMoj6L",
            "key": "root-sCk0ORSlIKlI4TEMoj6L",
            "parent": "root",
            "type": "normal",
          },
        ],
      }
            }
          }
        }
      }

      for(let snapId in testSnaps) {
        let testSnap = testSnaps[snapId]
        let snapDoc = snapsCol.doc(snapId)
      describe(`Snapshot: ${snapId}`, () => {
        
      
      it('should update snap doc', async () => {
        let snap = await snapDoc.get()
        data = snap.data()
        expect(data).toEqual(testSnap.snap)
      })

      it.only('should update the member docs ', async () => {

        let colSnap = await snapsCol.doc(snapId).collection('members').get()
        let docs = colSnap.docs
        // expect(docs.length).toEqual(testSnap.members.length)
        // if(snapId === '9-2021') console.log(docs)
        for (let expectedMember of testSnap.members) {
          // if(snapId === '9-2021' && expectedMember.id === 'AYrrEdMNFaOw0Cdb2TRf') console.log(await snapsCol.doc(snapId).collection('members').doc(expectedMember.id).get())
          let doc = docs.find((el, ind) => { return el.id === expectedMember.id})
          // if(snapId === '9-2021') console.log(doc)
          data = doc.data()

          expect(data).toEqual(expectedMember)
        }
      })

      it('should update styles', async () => {
  
        let colSnap = await snapsCol.doc(snapId).collection('styles').get()
        let docs = colSnap.docs
        let temp = []
        for (let doc of docs) {
          temp.push(doc.data())
        }
        expect(docs.length).toEqual(testSnap.styles.length)
        
        for (let style of testSnap.styles){
          let doc = docs.find((el, ind) => { return el.get('label') === style.label})
          expect(doc).toBeDefined()
          let data = doc.data()

          expect(data).toEqual(style)
        }
      })

      describe('Trees', () => {
        for(let treeKey in testSnap.trees) {
          describe(treeKey, () => {
            it('should add tree doc', async () => {
              let treeDoc = testSnap.trees[treeKey]
              let doc = await snapsCol.doc(snapId).collection('trees').doc(treeKey).get()
                // role defintion is defined
                expect(doc).toBeDefined()
                let data = doc.data()
                expect(data).toEqual(treeDoc.doc)
            })

            it('should add tree component', async () => {
              let treeDoc = testSnap.trees[treeKey]
              let doc = await snapsCol.doc(snapId).collection('trees').doc(treeKey).collection('components').doc('tree').get()
                // role defintion is defined
                expect(doc).toBeDefined()
                let data = doc.data()
                expect(data).toEqual(treeDoc.tree)
            })

            it('should add parent component', async () => {
              let treeDoc = testSnap.trees[treeKey]
              let doc = await snapsCol.doc(snapId).collection('trees').doc(treeKey).collection('components').doc('parents').get()
                // role defintion is defined
                expect(doc).toBeDefined()
                let data = doc.data()
                expect(data).toEqual(treeDoc.parents)
            });

            it('should add stats component', async () => {
              let treeDoc = testSnap.trees[treeKey]
              let doc = await snapsCol.doc(snapId).collection('trees').doc(treeKey).collection('components').doc('stats').get()
                // role defintion is defined
                expect(doc).toBeDefined()
                let data = doc.data()
                expect(data).toEqual(treeDoc.stats)
            });
          })
        }
      });

      describe('Lists', () => {
        it.only('should add member list', async () => {
          let doc = await snapsCol.doc(snapId).collection('lists').doc('members').get()
            expect(doc).toBeDefined()
            let data = doc.data()
            expect(data).toEqual(testSnap.lists.members)
        });
        it('should add styles list', async () => {
          let doc = await snapsCol.doc(snapId).collection('lists').doc('styles').get()
            expect(doc).toBeDefined()
            let data = doc.data()
            expect(data).toEqual(testSnap.lists.styles)
        });
        it('should add trees list', async () => {
          const trees = {
            'main-tree': {
              id: 'main-tree',
              label: 'Main Tree'
            },
            noParents: {
              id: 'noParents',
              label: 'No Parents'
            }
          }
          let doc = await snapsCol.doc(snapId).collection('lists').doc('trees').get()
          expect(doc).toBeDefined()
          let data = doc.data()

          expect(data).toEqual(trees)
        });
      })
    });
    }
    
  })

  it('should delete components', async () => {
    let colSnap = await MovDoc.collection('components').get()
    let docs = colSnap.docs
    expect(docs.length).toEqual(0)
  })

  it('should delete roles', async () => {
    let colSnap = await MovDoc.collection('roles').get()
    let docs = colSnap.docs
    expect(docs.length).toEqual(0)
  })
  // it.todo('should delete ')

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
