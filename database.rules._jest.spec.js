const { readFileSync, createWriteStream, mkdtemp } = require('fs');
const http = require("http");

const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} = require("@firebase/rules-unit-testing")
const { setLogLevel } = require('@firebase/app')
const { set, ref, get } = require("firebase/database");

const projectId = 'tracking-tree'
let testEnv;
  let myId = 'myId', myCtx, myApp, myEmail = 'test@mt.app'
  let theirId = 'theirId', theirCtx, theirApp, theirEmail = 'theiremail@gmail.com'
  let unauthedDb
  let movId = 'movId'
  let ownerRole = {
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

  let noPermissionsRole = {
      snapshots_view: false,
      snapshots_update: false,
      events_create: false,
      members_create: false,
      members_export: false,
      members_edit: false,
      members_delete: false,
      members_view: false,
      subTrees_add: false,
      subTrees_remove: false,
      movement_edit: false,
      movement_copy: false,
      movement_carbonCopy: false,
      movement_delete: false,
      trends_view: false,
      trends_movementGraphs_create: false,
      trends_movementGraphs_delete: false,
      trends_movementGraphs_view: false,
      access_view: false,
      access_users_revoke: false,
      access_users_invite: false,
      access_userRoles_create: false,
      access_userRoles_delete: false,
      access_userRoles_edit: false,
      trees_create: false,
      trees_export: false,
      trees_delete: false,
      trees_view: false,
      settings_view: false,
      settings_calc_view: false,
      settings_calc_create: false,
      settings_calc_edit: false,
      settings_calc_delete: false,
      settings_complex_view: false,
      settings_complex_create: false,
      settings_complex_delete: false,
      settings_complex_edit: false,
      settings_mods_view: false,
      settings_mods_create: false,
      settings_mods_delete: false,
      settings_mods_edit: false,
      settings_roles_view: false,
      settings_roles_create: false,
      settings_roles_delete: false,
      settings_roles_edit: false
    }
  
beforeAll(async () => {
  setLogLevel('error');
  testEnv = await initializeTestEnvironment({
    projectId,
    database: {rules: readFileSync('database.rules.json', 'utf8')},
  });
  myId = 'myId'
  theirId = 'theirId'
  myCtx = testEnv.authenticatedContext(myId, { sub: myId, email: myEmail })
  myApp = myCtx.database()
  theirCtx = testEnv.authenticatedContext(theirId, { sub: theirId, email: theirEmail })
  theirApp = theirCtx.database()
  unauthedDb = testEnv.unauthenticatedContext().database()
  movId = 'movId'
})

afterAll(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  // await testEnv.cleanup();

  // Write the coverage report to a file
  const coverageFile = 'database-coverage.html';
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    const { host, port } = testEnv.emulators.database;
    const quotedHost = host.includes(':') ? `[${host}]` : host;
    http.get(`http://${quotedHost}:${port}/.inspect/coverage?ns=${testEnv.projectId}-default-rtdb`, (res) => {
      res.pipe(fstream, { end: true });

      res.on("end", resolve);
      res.on("error", reject);
    });
  });

  console.log(`View database rule coverage information at ${coverageFile}\n`);
});

beforeEach(async () => {
  await testEnv.clearDatabase()
})

describe('Trends', () => {
let testDoc = `/movements/${movId}/trends/styleId/treeId/snapId`
    let accessTests = [
      { type: 'read', func: () => get(ref(myApp, testDoc)) , permission: 'trends_view'},
      // { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'members_create'},
      // { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'members_edit'},
      // { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'members_delete'}
    ]
    for(let access of accessTests) {
      let tests = [
        { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await set(ref(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
        { label: `Can ${access.type} doc if user has valid role`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true }} , user: async (database) => await set(ref(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
        { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
      ]
      for(let test of tests) {
        it(test.label, async () => {
          await testEnv.withSecurityRulesDisabled(async (context) => {
            const database = context.database()
            // await set(doc(database, `/movements/${movId}`), { movId })
            if(['read', 'update', 'delete'].includes(access.type)) {
              await set(ref(database, testDoc), { name: 'abc' })
            }
            if(!!test.permissions){
              await set(ref(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
            }
            if(!!test.user){
              await test.user(database)
            }
          })
          await test.assert(access.func())
        })
      }
    }
});

// describe('Public documents', () => {
//   // it('should let anyone read any profile', async function() {
    
//   //   // Setup: Create documents in DB for testing (bypassing Security Rules).
//   //   await testEnv.withSecurityRulesDisabled(async (context) => {
//   //     await setDoc(doc(context.database(), 'app-users/foobar'), { foo: 'bar' });
//   //   });

//   //   ;

//   //   // Then test security rules by trying to read it using the client SDK.
//   //   await assertSucceeds(getDoc(doc(unauthedDb, 'app-users/foobar')));
//   // });

//   it('should let anyone read any version doc', async function() {
//     // Setup: Create documents in DB for testing (bypassing Security Rules).
//     await testEnv.withSecurityRulesDisabled(async function (context) {
//       await setDoc(doc(context.database(), 'version-info/foobar'), { foo: 'bar' });
//     });

//     const unauthedDb = testEnv.unauthenticatedContext().database();

//     // Then test security rules by trying to read it using the client SDK.
//     await assertSucceeds(getDoc(doc(unauthedDb, 'version-info/foobar')));
//   });

//   it('should let anyone read any help doc', async function() {
//     // Setup: Create documents in DB for testing (bypassing Security Rules).
//     await testEnv.withSecurityRulesDisabled(async (context) => {
//       await setDoc(doc(context.database(), 'help/foobar'), { foo: 'bar' });
//     });

//     const unauthedDb = testEnv.unauthenticatedContext().database();

//     // Then test security rules by trying to read it using the client SDK.
//     await assertSucceeds(getDoc(doc(unauthedDb, 'help/foobar')));
//   });
// })
  
  // describe('Movement Doc', () => {
  //   it('Can read doc if user is in the role subcollection', async () => {
  //     await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //       await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId })
  //     })
  //     await assertSucceeds(getDoc(doc(myApp, `/movements/${movId}`)))
  //   })

  //   it("Can't read doc if user is not in the role subcollection", async () => {

  //     await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //     })
  //     await assertFails(getDoc(doc(myApp, `/movements/${movId}`)))
  //   })

  //   it('Can create doc if user is logged in', async () => {
  //     await assertSucceeds(setDoc(doc(myApp, `/movements/${movId}`), { movementName: 'abc'}))
  //   })

  //   it("Can't create doc if user is not logged in", async () => {
  //     await assertFails(setDoc(doc(unauthedDb, `/movements/${movId}`), { uid: myId }))
  //   })

  //   it('Can update doc if user is owner', async () => {
  //     await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //       await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' })
  //     })
  //     await assertSucceeds(updateDoc(doc(myApp, `/movements/${movId}`), { movementName: 'abc'}))
  //   })

  //   it('Can update doc if user has permission', async () => {
  //     await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //       await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })
  //       await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), { rules: { movement_edit: true} })
  //     })
  //     await assertSucceeds(updateDoc(doc(myApp, `/movements/${movId}`), { movementName: 'abc'}))
  //   })

  //   it("Can't update doc if user is not a member of the movement", async () => {
  //     await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //     })
  //     await assertFails(updateDoc(doc(myApp, `/movements/${movId}`), { movementName: 'abd' }))
  //   })

  //   it('Can delete doc if user is owner', async () => {
  //     await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //       await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' })
  //     })
  //     await assertSucceeds(deleteDoc(doc(myApp, `/movements/${movId}`)))
  //   })

  //   it('Can delete doc if user has permission', async () => {
  //     await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //       await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })
  //       await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), { rules: { movement_delete: true} })
  //     })
  //     await assertSucceeds(deleteDoc(doc(myApp, `/movements/${movId}`)))
  //   })

  //   it("Can't delete doc if user is not a member of the movement", async () => {
  // await testEnv.withSecurityRulesDisabled(async (context) => {
  //       const database = context.database()
  //       await setDoc(doc(database, `/movements/${movId}`), { movId })
  //     })
  //     await assertFails(deleteDoc(doc(myApp, `/movements/${movId}`)))
  //   })
  // })

  // describe('Styles Doc', () => {
  //   let styleTypes = [
  //     {label: 'Roles', type: 'role', permissions: {view:'settings_roles_view', create: 'settings_roles_create', update: 'settings_roles_edit', delete: 'settings_roles_delete'}}, 
  //     {label: 'Modifiers', type: 'mod', permissions: {view:'settings_mods_view', create: 'settings_mods_create', update: 'settings_mods_edit', delete: 'settings_mods_delete'}}, 
  //     {label: 'Complex', type: 'complex', permissions: {view:'settings_complex_view', create: 'settings_complex_create', update: 'settings_complex_edit', delete: 'settings_complex_delete'}}, 
  //     {label: 'Calculated', type: 'calc', permissions: {view:'settings_calc_view', create: 'settings_calc_create', update: 'settings_calc_edit', delete: 'settings_calc_delete'}}]
  //   for(let type of styleTypes) {
  //     describe(`${type.label}:`, () => {
  //       let testDoc = `/movements/${movId}/styles/styleId`
  //       let accessTests = [
  //         { type: 'read', func: () => getDoc(doc(myApp, testDoc)), permission: type.permissions.view },
  //         { type: 'create', func: () => setDoc(doc(myApp, testDoc), { label: 'abc', type: type.type }), permission: type.permissions.create},
  //         { type: 'update', func: () => updateDoc(doc(myApp, testDoc), { label: 'abc', type: type.type }), permission: type.permissions.update},
  //         { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: type.permissions.delete}
  //       ]
  //       for(let access of accessTests) {
  //         let tests = [
  //           { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //           { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //           { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //         ]
  //         for(let test of tests) {
  //           it(test.label, async () => {
  //             await testEnv.withSecurityRulesDisabled(async (context) => {
  //               const database = context.database()
  //               // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //               if(['read', 'update', 'delete'].includes(access.type)) {
  //                 await setDoc(doc(database, testDoc), { label: 'abc', type: type.type })
  //               }
  //               if(!!test.permissions){
  //                 if(test.label === 'Can create doc if user has permission') {test.permissions}
  //                 await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //               }
  //               if(!!test.user){
  //                 await test.user(database)
  //               }
  //             })
  //             await test.assert(access.func())
  //           })
  //         }
  //       }
  //     })
  //   }
  // })
  
  // describe('Lists', () => {
  //   let testDoc = `/movements/${movId}/lists/listId`
  //   let accessTests = [
  //     { type: 'read', func: () => getDoc(doc(myApp, testDoc)) },
  //     // { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'members_create'},
  //     // { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'members_edit'},
  //     // { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'members_delete'}
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has valid role`, assert: assertSucceeds, permissions: { rules: {  }} , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       // { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //     ]
  //     for(let test of tests) {
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(access.func())
  //       })
  //     }
  //   }
  // })

  // describe('trees', () => {
  //   let testDoc = `/movements/${movId}/trees/treeId`
  //   let accessTests = [
  //     { type: 'read', func: () => getDoc(doc(myApp, testDoc)), permission: 'trees_view' },
  //     { type: 'create', func: () => setDoc(doc(myApp, testDoc), { label: 'xyz'}), permission: 'trees_create'},
  //     { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ label: 'xyz' }), permission: 'trees_create'},
  //     { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'trees_delete'}
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //     ]
  //     for(let test of tests) {
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { label: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(access.func())
  //       })
  //     }
  //   }
  //   describe('components', () => {
  //   let testDoc = `/movements/${movId}/trees/treeId/components/compId`
  //   let accessTests = [
  //     { type: 'read', func: () => getDoc(doc(myApp, testDoc)), permission: 'trees_view' },
  //     { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'members_edit'},
  //     { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'members_edit'},
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //     ]
  //     for(let test of tests) {
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(access.func())
  //       })
  //     }
  //   }
  // })
  // })

  // describe('Snapshots Doc', () => {
  //   let testDoc = `/movements/${movId}/snapshots/snapId`
  //   let accessTests = [
  //     { type: 'read', func: () => getDoc(doc(myApp, testDoc)), permission: 'snapshots_view' },
  //     { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'snapshots_update'},
  //     { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'snapshots_update'},
  //     // { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'members_delete'}
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, skip: ['delete'], user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, skip: ['delete'], permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails, skip: ['delete'] },
  //       { label: `Can't ${access.type} doc if user is owner`, assert: assertSucceeds, skip: ['read', 'update', 'create'], user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can't ${access.type} doc if user has permission`, assert: assertSucceeds, skip: ['read', 'update', 'create'], permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails, skip: ['read', 'update', 'create'] }
  //       ]
  //     for(let test of tests) {
  //       if(Array.isArray(test.skip) && test.skip.includes(access.type))continue
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(access.func())
  //       })
  //     }
  //   }

  //   let testDocs = [
  //     `/movements/${movId}/snapshots/snapId/styles/id`,
  //     `/movements/${movId}/snapshots/snapId/lists/id`,
  //     `/movements/${movId}/snapshots/snapId/trees/id`,
  //     `/movements/${movId}/snapshots/snapId/trees/treeId/components/compId`,
  //     `/movements/${movId}/snapshots/snapId/members/id`
  //   ]
    
  //   for(l_testDoc of testDocs) {
  //     describe(l_testDoc, () => {
  //       let accessTests = [
  //         { type: 'read', func: () => getDoc(doc(myApp, l_testDoc)), permission: 'snapshots_view' },
  //         // { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'snapshots_update'},
  //         // { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'snapshots_update'},
  //         // { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'members_delete'}
  //       ]
  //       for(let access of accessTests) {
  //         let tests = [
  //           { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //           { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //           { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //         ]
  //         for(let test of tests) {
  //           it(test.label, async () => {
  //             await testEnv.withSecurityRulesDisabled(async (context) => {
  //               const database = context.database()
  //               // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //               if(['read', 'update', 'delete'].includes(access.type)) {
  //                 await setDoc(doc(database, l_testDoc), { name: 'abc' })
  //               }
  //               if(!!test.permissions){
  //                 await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //               }
  //               if(!!test.user){
  //                 await test.user(database)
  //               }
  //             })
  //             await test.assert(access.func())
  //           })
  //         }
  //       }
  //     })
  //   }
  // })

  // describe('Members Doc',  () => {
  //   let testDoc = `/movements/${movId}/members/memberId`
  //   let accessTests = [
  //     { type: 'read', func: () => getDoc(doc(myApp, testDoc)), permission: 'members_view' },
  //     { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'members_create'},
  //     { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'members_edit'},
  //     { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'members_delete'}
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //     ]
  //     for(let test of tests) {
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(access.func())
  //       })
  //     }
  //   }
  // })

  // describe('Users Doc', () => {
  //   let testDoc = `/movements/${movId}/users/${theirId}`
  //   let accessTests = {
  //     read: { type: 'read', func: (app = myApp) => getDoc(doc(app, testDoc)), permission: 'access_view' },
  //     create: { type: 'create', func: (app = myApp) => setDoc(doc(app, testDoc), { name: 'xyz' }), permission: 'access_users_invite'},
  //     update: { type: 'update', func: (app = myApp, testData = { name: 'xyz' }) => updateDoc(doc(app, testDoc),testData), permission: 'access_users_invite'},
  //     delete: { type: 'delete', func: (app = myApp) => deleteDoc(doc(app, testDoc)), permission: 'access_users_revoke'}
  //   }
  //   // for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can read doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }), type: 'read', func: accessTests.read.func},
  //       { label: `Can read doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [accessTests.read.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' }), type: 'read', func: accessTests.read.func},
  //       { label: `Can read if doc is the user accessing it`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${theirId}`), { uid: theirId, role: 'otherRole' }), type: 'read', func: () => accessTests.read.func(theirApp) },
  //       { label: `Can't read if user is not a member of the movement`, assert: assertFails, type: 'read', func: accessTests.read.func},
  //       { label: `Can create doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }), type: 'create', func: accessTests.create.func},
  //       { label: `Can create doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [accessTests.create.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' }), type: 'create', func: accessTests.create.func},
  //       { label: `Can update doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }), type: 'update', func: accessTests.update.func},
  //       { label: `Can't update doc if owner is changing themself`, assert: assertFails, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${theirId}`), { uid: theirId, role: 'owner' }), type: 'update', func: () => accessTests.update.func(theirApp)},
  //       { label: `Can update doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [accessTests.update.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' }), type: 'update', func: accessTests.update.func},
  //       { label: `Can't update doc if non-owner is changing an owner`, assert: assertFails, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' }), type: 'update', func: accessTests.update.func, testUserRole: 'owner'},
  //       { label: `Can't update doc if user is changing their own role`, assert: assertFails, type: 'update', func: () => accessTests.update.func(myApp, {name: 'xyz', role: 'anotherRole'})},
  //       { label: `Can't update doc if user is changing their own email`, assert: assertFails, type: 'update', func: () => accessTests.update.func(myApp, {name: 'xyz', email: 'anotherEmail'})},
  //       { label: `Can delete doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }), type: 'delete', func: accessTests.delete.func},
  //       { label: `Can't delete doc if owner is deleteing themself`, assert: assertFails, type: 'delete', func: () => accessTests.delete.func(theirApp), testUserRole: 'owner'},
  //       { label: `Can delete doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [accessTests.delete.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' }), type: 'delete', func: accessTests.delete.func},
  //       { label: `Can't update doc if non-owner is changing an owner`, assert: assertFails, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' }), type: 'update', func: accessTests.update.func, testUserRole: 'owner'},
  //     ]
  //     for(let test of tests) {
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           // // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(test.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc', role: test.testUserRole ? test.testUserRole : 'otherRole' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(test.func())
  //       })
  //     }
  //   // }

  //   describe('Graphs Doc',  () => {
  //     let testDoc = `/movements/${movId}/users/${myId}/graphs/graphId`
  //     let accessTests = [
  //       { type: 'read', func: (app = myApp) => getDoc(doc(app, testDoc)), permission: 'trends_movementGraphs_view' },
  //       { type: 'create', func: (app = myApp) => setDoc(doc(app, testDoc), { name: 'xyz' }), permission: 'trends_movementGraphs_create'},
  //       { type: 'update', func: (app = myApp) => updateDoc(doc(app, testDoc),{ name: 'xyz' }), permission: 'trends_movementGraphs_create'},
  //       { type: 'delete', func: (app = myApp) => deleteDoc(doc(app, testDoc)), permission: 'trends_movementGraphs_delete'}
  //     ]
  //     for(let access of accessTests) {
  //       let tests = [
  //         { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //         { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //         // { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails },
  //         { label: `Can't ${access.type} if user doesn't own the graph`, assert: assertFails, func: () => access.func(theirApp), user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) }
  //       ]
  //       for(let test of tests) {
  //         it(test.label, async () => {
  //           await testEnv.withSecurityRulesDisabled(async (context) => {
  //             const database = context.database()
  //             // // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //             if(['read', 'update', 'delete'].includes(access.type)) {
  //               await setDoc(doc(database, testDoc), { name: 'abc' })
  //             }
  //             if(!!test.permissions){
  //               await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //             }
  //             if(!!test.user){
  //               await test.user(database)
  //             }
  //           })
  //           await test.assert(test.func ? test.func() : access.func())
  //         })
  //       }
  //     }
  //   })
  // })

  // describe('User Role Definitions', () => {
  //   describe('Non owner role', () => {
  //     let testDoc = `/movements/${movId}/user-role-definitions/roleId`
  //     let accessTests = [
  //       { type: 'read', func: () => getDoc(doc(myApp, testDoc)), permission: 'access_view' },
  //       { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'access_create'},
  //       { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'access_edit'},
  //       { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'access_delete'}
  //     ]
  //     for(let access of accessTests) {
  //       let tests = [
  //         { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //         { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //         { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //       ]
  //       for(let test of tests) {
  //         it(test.label, async () => {
  //           await testEnv.withSecurityRulesDisabled(async (context) => {
  //             const database = context.database()
  //             // // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //             if(['read', 'update', 'delete'].includes(access.type)) {
  //               await setDoc(doc(database, testDoc), { name: 'abc' })
  //             }
  //             if(!!test.permissions){
  //               if(test.label === 'Can create doc if user has permission') {test.permissions}
  //               await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //               // await setDoc(doc(database, `/movements/${movId}/user-role-definitions/anotherRole`), test.permissions)
  //             }
  //             if(!!test.user){
  //               await test.user(database)
  //             }
  //           })
  //           await test.assert(access.func())
  //         })
  //       }
  //     }
  //   })
  //   describe('Owner doc', () => {
  //     let testDoc = `/movements/${movId}/user-role-definitions/owner`
  //     let accessTests = [
  //       { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'access_create'},
  //       { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'access_edit'},
  //       { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'access_delete'}
  //     ]
  //     for(let access of accessTests) {
  //       let tests = [
  //         { label: `Can't ${access.type} doc if user is owner and role is owner`, assert: assertFails, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //         { label: `Can't ${access.type} doc if user has permission and role is owner`, assert: assertFails, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //         { label: `Can't ${access.type} if user is not a member of the movement and role is owner`, assert: assertFails }
  //       ]
  //       for(let test of tests) {
  //         it(test.label, async () => {
  //           await testEnv.withSecurityRulesDisabled(async (context) => {
  //             const database = context.database()
  //             // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //             if(['read', 'update', 'delete'].includes(access.type)) {
  //               await setDoc(doc(database, testDoc), { name: 'abc' })
  //             }
  //             if(!!test.permissions){
  //               if(test.label === 'Can create doc if user has permission') {test.permissions}
  //               await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //             }
  //             if(!!test.user){
  //               await test.user(database)
  //             }
  //           })
  //           await test.assert(access.func())
  //         })
  //       }
  //     }
  //   })
  // })

  // describe('Graphs Doc', () => {
  //   let testDoc = `/movements/${movId}/graphs/graphId`
  //   let accessTests = [
  //     { type: 'read', func: () => getDoc(doc(myApp, testDoc)), permission: 'trends_movementGraphs_view' },
  //     { type: 'create', func: () => setDoc(doc(myApp, testDoc), { name: 'xyz' }), permission: 'trends_movementGraphs_create'},
  //     { type: 'update', func: () => updateDoc(doc(myApp, testDoc),{ name: 'xyz' }), permission: 'trends_movementGraphs_update'},
  //     { type: 'delete', func: () => deleteDoc(doc(myApp, testDoc)), permission: 'trends_movementGraphs_delete'}
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails }
  //     ]
  //     for(let test of tests) {
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(access.func())
  //       })
  //     }
  //   }
  // })

  // describe('Invites Doc', () => {
  //   let testDoc = `/movements/${movId}/invites/${theirEmail}`
  //   let accessTests = [
  //     { type: 'read', func: (app = myApp) => getDoc(doc(app, testDoc)), permission: 'access_view' },
  //     { type: 'create', func: (app = myApp) => setDoc(doc(app, testDoc), { name: 'xyz', email: theirEmail }), permission: 'access_users_invite'},
  //     { type: 'update', func: (app = myApp) => updateDoc(doc(app, testDoc),{ name: 'xyz', email: theirEmail }), permission: 'access_users_invite'},
  //     { type: 'delete', func: (app = myApp) => deleteDoc(doc(app, testDoc)), permission: 'access_users_invite'}
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can ${access.type} doc if user is the one being invited`, assert: assertSucceeds, func: () => access.func(theirApp), skip: ['create', 'update']},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails },
  //       { label: `Can't ${access.type} if user doesn't own the invite`, assert: assertFails, func: () => access.func(myApp) }
  //     ]
  //     for(let test of tests) {
  //       if(Array.isArray(test.skip) && test.skip.includes(access.type))continue
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           // // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(test.func ? test.func() : access.func())
  //       })
  //     }
  //   }
  // })

  // describe('Requests Doc', () => {
  //   let testDoc = `/movements/${movId}/requests/${theirEmail}`
  //   let accessTests = [
  //     { type: 'read', func: (app = myApp) => getDoc(doc(app, testDoc)), permission: 'access_view' },
  //     { type: 'create', func: (app = myApp) => setDoc(doc(app, testDoc), { name: 'xyz', email: theirEmail }), permission: 'access_users_invite'},
  //     { type: 'update', func: (app = myApp) => updateDoc(doc(app, testDoc),{ name: 'xyz', email: theirEmail }), permission: 'access_users_invite'},
  //     { type: 'delete', func: (app = myApp) => deleteDoc(doc(app, testDoc)), permission: 'access_users_invite'}
  //   ]
  //   for(let access of accessTests) {
  //     let tests = [
  //       { label: `Can ${access.type} doc if user is owner`, assert: assertSucceeds, skip: ['create'], user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'owner' }) },
  //       { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, skip: ['create'], permissions: { rules: { [access.permission]: true} } , user: async (database) => await setDoc(doc(database, `/movements/${movId}/users/${myId}`), { uid: myId, role: 'otherRole' })},
  //       { label: `Can ${access.type} doc if user is the one requesting`, assert: assertSucceeds, skip: ['update'], func: () => access.func(theirApp)},
  //       { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails, skip: ['create'] },
  //       { label: `Can't ${access.type} if user doesn't own the request`, assert: assertFails, skip: ['update'] },
  //       { label: `Can't ${access.type} if owns the request`, assert: assertFails, skip: ['read', 'create', 'delete'], func: () => access.func(theirApp) }
  //     ]
  //     for(let test of tests) {
  //       if(Array.isArray(test.skip) && test.skip.includes(access.type))continue
  //       it(test.label, async () => {
  //         await testEnv.withSecurityRulesDisabled(async (context) => {
  //           const database = context.database()
  //           await setDoc(doc(database, `/movements/${movId}`), { movId })
  //           if(['read', 'update', 'delete'].includes(access.type)) {
  //             await setDoc(doc(database, testDoc), { name: 'abc' })
  //           }
  //           if(!!test.permissions){
  //             await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //           }
  //           if(!!test.user){
  //             await test.user(database)
  //           }
  //         })
  //         await test.assert(test.func ? test.func() : access.func())
  //       })
  //     }
  //   }
  // })

  // describe('App Users Doc', () => {
  // let testDoc = `/app-users/${theirId}`
  //     let accessTests = [
  //       { type: 'read', func: (app = myApp) => getDoc(doc(app, testDoc)), permission: 'trends_movementGraphs_view' },
  //       { type: 'create', func: (app = myApp) => setDoc(doc(app, testDoc), { name: 'xyz' }), permission: 'trends_movementGraphs_create'},
  //       { type: 'update', func: (app = myApp) => updateDoc(doc(app, testDoc),{ name: 'xyz' }), permission: 'trends_movementGraphs_create'},
  //       { type: 'delete', func: (app = myApp) => deleteDoc(doc(app, testDoc)), permission: 'trends_movementGraphs_delete'}
  //     ]
  //     for(let access of accessTests) {
  //       let tests = [
  //         { label: `Can ${access.type} doc if user is the doc owner`, assert: assertSucceeds, func: () => access.func(theirApp)},
  //         // { label: `Can ${access.type} doc if user has permission`, assert: assertSucceeds, },
  //         // { label: `Can't ${access.type} if user is not a member of the movement`, assert: assertFails },
  //         { label: `Can't ${access.type} if user doesn't own the doc`, assert: assertFails, func: () => access.func(myApp) }
  //       ]
  //       for(let test of tests) {
  //         it(test.label, async () => {
  //           await testEnv.withSecurityRulesDisabled(async (context) => {
  //             const database = context.database()
  //             // // await setDoc(doc(database, `/movements/${movId}`), { movId })
  //             if(['read', 'update', 'delete'].includes(access.type)) {
  //               await setDoc(doc(database, testDoc), { name: 'abc' })
  //             }
  //             // if(!!test.permissions){
  //             //   await setDoc(doc(database, `/movements/${movId}/user-role-definitions/otherRole`), test.permissions)
  //             // }
  //             // if(!!test.user){
  //             //   await test.user(database)
  //             // }
  //           })
  //           await test.assert(test.func ? test.func() : access.func())
  //         })
  //       }
  //     }
  // })