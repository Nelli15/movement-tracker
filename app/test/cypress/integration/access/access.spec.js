
const TestUser = require('./../../fixtures/test-user.json')
const TestUser2 = require('./../../fixtures/test-user-2.json')
const TestMovement = require('./../../fixtures/test-movement.json')

describe('access page tests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  before(()=> {
    cy.userLogin()
  })

  beforeEach(() => {
    cy.clearMovs()
    cy.createMov().then((res) => {
      cy.wait(1000)
      cy.visit(`/movement/${res.data.movId}/access`)
      cy.testRoute('/movement').testRoute('/access')
    })
  })

  it('should be on the access page', () => {
    cy.testRoute('/movement').testRoute('/access')
  })

  describe('invite people', () => {
    it('should send a single email', () => {
      cy.addInvite('test-email@movementtracker.app', 'Viewer')
    });

    it('should send multiple emails', () => {
      cy.addInvite('test-email@movementtracker.app, test-2@movementtracker.app', 'Viewer')
    });

    it('should send multiple emails with names', () => {
      cy.addInvite('test name <test-email@movementtracker.app>, test name <test-2@movementtracker.app>', 'Viewer')
    });
  })

  describe('list invites', () => {
    it('should have valid fields and delete', () => {
      cy.addInvite('test name 1 <test-email@movementtracker.app>', 'Viewer')
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()
      cy.get('[data-cy="invite-test-email@movementtracker.app"]', {timeout: 10000}).within(()=>{
        // cy.get('[data-cy="name"]', {timeout: 10000}).should('contain', 'test name 1')
        // cy.get('[data-cy="avatar"]', {timeout: 10000}).should('have.attr', 'src')
        cy.get('[data-cy="email"]', {timeout: 10000}).should('contain', 'test-email@movementtracker.app')
        cy.get('[data-cy="permission"]', {timeout: 10000}).should('contain', 'Viewer')
        cy.get('[data-cy="actions"]', {timeout: 10000}).within(()=>{
        cy.get('[data-cy="delete"]', {timeout: 10000}).should('contain', 'delete').click()
        })
        cy.root().get('[data-cy="invite-test-email@movementtracker.app"]', {timeout: 10000}).should('not.exist')

      }).then(() => {
        cy.checkNotify('Invitation Deleted')
      })
    });

    it('should search name', () => {
      // create users
      cy.addInvite('test name 1 <test-email@movementtracker.app>, test name 2 <test-2@movementtracker.app>', 'Viewer')
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()
      // find the search bar & search for something
      cy.get('[data-cy="invites-table"]', {timeout: 10000}).within(() => {
        cy.dataCy('search').should('not.be.disabled').parent().parent().should('not.be.disabled').type('test name 2')
        // check the valid people show
        cy.root().get('[data-cy="invite-test-2@movementtracker.app"]', {timeout: 10000}).should('exist')
        // check the invalid people don't show
        cy.root().get('[data-cy="invite-test-email@movementtracker.app"]', {timeout: 10000}).should('not.exist')
      })
    });
    it('should search email', () => {
      // create users
      cy.addInvite('test name 1 <test-email@movementtracker.app>, test name 2 <test-2@movementtracker.app>', 'Viewer')
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()
      // find the search bar & search for something
      cy.get('[data-cy="invites-table"]', {timeout: 10000}).within(() => {
        cy.dataCy('search').should('not.be.disabled').parent().parent().should('not.be.disabled').type('test-2@movementtracker.app')
        // check the valid people show
        cy.root().get('[data-cy="invite-test-2@movementtracker.app"]', {timeout: 10000}).should('exist')
        // check the invalid people don't show
        cy.root().get('[data-cy="invite-test-email@movementtracker.app"]', {timeout: 10000}).should('not.exist')
      })
    });
  });

  describe('list requests', () => {
    it('should have valid fields and delete', () => {
      // nav to the invites tab
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()

      // get the movement id
      cy.getMovId().then((movId)=>{

        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/requests/test-user`, TestUser) 
        // cy.pause()
        // check the fields are correct
        cy.get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).within(()=>{
          cy.get('[data-cy="name"]', {timeout: 10000}).should('contain', 'Test User')
          // cy.get('[data-cy="avatar"]', {timeout: 10000}).should('have.attr', 'src')
          cy.get('[data-cy="email"]', {timeout: 10000}).should('contain', 'test@user.com.au')
          cy.get('[data-cy="actions"]', {timeout: 10000}).within(()=>{
          cy.get('[data-cy="delete"]', {timeout: 10000}).should('contain', 'delete').click()
          })
          cy.root().get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).should('not.exist')
        }).then(() => {
          cy.checkNotify('Request Rejected')
        })
      })
    });

    it('should accept', () => {
      // nav to the invites tab
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()

      // get the movement id
      cy.getMovId().then((movId)=>{

        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/requests/test-user`, TestUser) 
        // cy.pause()
        // check the fields are correct
        cy.get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).within(()=>{
          cy.get('[data-cy="name"]', {timeout: 10000}).should('contain', 'Test User')
          // cy.get('[data-cy="avatar"]', {timeout: 10000}).should('have.attr', 'src')
          cy.get('[data-cy="email"]', {timeout: 10000}).should('contain', 'test@user.com.au')
          cy.get('[data-cy="actions"]', {timeout: 10000}).within(()=>{
          })
          cy.get('[data-cy="accept"]', {timeout: 10000}).should('contain', 'done').click()
            
        }).then(() => {
          // grant permission 
          cy.root().dataCy('"accept-request-dialog"').within(() => {
            cy.dataCy('"select-role"').parent().parent().click()
          })
          cy.root().get(".q-menu").within(()=>{
            cy.get('.q-item').should('to.have.length', 4)
            cy.contains('Owner').should('exist')
            cy.contains('Editor').should('exist')
            cy.contains('Super Editor').should('exist')
            cy.contains('Viewer').should('exist').click()
          })
          cy.root().dataCy('"accept-request-dialog"').within(() => {
            cy.dataCy('"accept"').should('contain', 'Grant Access').click()
          })
          cy.get('.q-spinner').should('not.exist').then(() => {
          cy.root().get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).should('not.exist')
          cy.checkNotify('Request Accept')
          cy.get('[data-cy="users-tab"]', {timeout: 10000}).click()
          cy.root().get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).should('exist')
        })
        })
      })
    });

    it('should cancel when accepting request', () => {
      // nav to the invites tab
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()

      // get the movement id
      cy.getMovId().then((movId)=>{

        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/requests/test-user`, TestUser) 
        // cy.pause()
        // check the fields are correct
        cy.get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).within(()=>{
          cy.get('[data-cy="name"]', {timeout: 10000}).should('contain', 'Test User')
          // cy.get('[data-cy="avatar"]', {timeout: 10000}).should('have.attr', 'src')
          cy.get('[data-cy="email"]', {timeout: 10000}).should('contain', 'test@user.com.au')
          cy.get('[data-cy="actions"]', {timeout: 10000}).within(()=>{
          })
          cy.get('[data-cy="accept"]', {timeout: 10000}).should('contain', 'done').click()
            
        }).then(() => {
          cy.root().dataCy('"accept-request-dialog"').within(() => {
            cy.dataCy('"cancel"').should('contain', 'Cancel').click()
          })
          cy.root().get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).should('exist')
        })
      })
    });

    it('should search name', () => {
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()
      
      // get the movement id
      cy.getMovId().then((movId)=>{
        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/requests/test-user`, TestUser)
        cy.callFirestore('set', `/movements/${movId}/requests/test-user-2`, TestUser2)
      })

      // check the request exist
      cy.root().get('[data-cy="request-test2@user.com.au"]', {timeout: 10000}).should('exist')
      cy.root().get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).should('exist')
      
      // find the search bar & search for something
      cy.get('[data-cy="requests-table"]', {timeout: 10000}).within(() => {
        cy.dataCy('search').should('not.be.disabled').parent().parent().should('not.be.disabled').type('test name 2')
        // check the invalid people don't show
        cy.root().get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).should('not.exist')
        // check the valid people show
        cy.root().get('[data-cy="request-test2@user.com.au"]', {timeout: 10000}).should('exist')
        
      })
    });

    it('should search email', () => {
      cy.get('[data-cy="invites-tab"]', {timeout: 10000}).click()
      
      // get the movement id
      cy.getMovId().then((movId)=>{
        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/requests/test-user`, TestUser)
        cy.callFirestore('set', `/movements/${movId}/requests/test-user-2`, TestUser2)
      })

      // check the request exist
      cy.root().get('[data-cy="request-test2@user.com.au"]', {timeout: 10000}).should('exist')
      cy.root().get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).should('exist')
      
      // find the search bar & search for something
      cy.get('[data-cy="requests-table"]', {timeout: 10000}).within(() => {
        cy.dataCy('search').should('not.be.disabled').parent().parent().should('not.be.disabled').type('test2@user.com.au')
        // check the invalid people don't show
        cy.root().get('[data-cy="request-test@user.com.au"]', {timeout: 10000}).should('not.exist')
        // check the valid people show
        cy.root().get('[data-cy="request-test2@user.com.au"]', {timeout: 10000}).should('exist')
        
      })
    });
  });

  describe('list users', () => {
    it('should have valid fields for the current user', () => {
      // nav to the users tab
      cy.get('[data-cy="users-tab"]', {timeout: 10000}).click()

      // get the movement id
      // cy.getMovId().then((movId)=>{

      // add users to the movement 

      // check the fields are correct
      cy.get('[data-cy="user-test@email.com"]', {timeout: 10000}).within(()=>{
        cy.get('[data-cy="name"]', {timeout: 10000}).should('contain', 'Anonymous')
        // cy.get('[data-cy="avatar"]', {timeout: 10000}).should('have.attr', 'src')
        cy.get('[data-cy="email"]', {timeout: 10000}).should('contain', 'test@email.com')
        cy.get('[data-cy="permission"]', {timeout: 10000}).should('contain', 'Owner')
        cy.get('[data-cy="actions"]', {timeout: 10000}).within(()=>{
        // cy.get('[data-cy="delete"]', {timeout: 10000}).should('contain', 'delete')
        })
      })
      // })
    });

    it('should have valid fields for others and delete', () => {
      // nav to the users tab
      cy.get('[data-cy="users-tab"]', {timeout: 10000}).click()

      // get the movement id
      cy.getMovId().then((movId)=>{

        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/users/test-user`, TestUser) 
        // cy.pause()
        // check the fields are correct
        cy.get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).within(()=>{
          cy.get('[data-cy="name"]', {timeout: 10000}).should('contain', 'Test User')
          // cy.get('[data-cy="avatar"]', {timeout: 10000}).should('have.attr', 'src')
          cy.get('[data-cy="email"]', {timeout: 10000}).should('contain', 'test@user.com.au')
          cy.get('[data-cy="permission"]', {timeout: 10000}).should('contain', 'Viewer')
          cy.get('[data-cy="actions"]', {timeout: 10000}).within(()=>{
          cy.get('[data-cy="delete"]', {timeout: 10000}).should('contain', 'delete').click()
          })
          cy.root().get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).should('not.exist')
        }).then(() => {
          cy.checkNotify('Access Revoked')
        })
      })
    });

    it('should change role', () => {
      // get the movement id
      cy.getMovId().then((movId)=>{
        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/users/test-user`, TestUser)
      })
      
      cy.get('[data-cy="users-tab"]', {timeout: 10000}).click()      
      
      // find the search bar & search for something
      cy.get('[data-cy="users-table"]', {timeout: 10000}).within(() => {
        // check the invalid people don't show
        cy.get('[data-cy="user-test@user.com.au"]', {timeout: 15000}).within(() => {
          cy.dataCy('permission').click()
        })
      })
        cy.get('.q-menu').within(()=> {
          cy.contains('Permission').click()
        })

        cy.get('.q-menu').last().within(()=> {
          cy.contains('Editor').click()
        })

        cy.root().get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).within(() => {
          cy.dataCy('permission').should('contain', 'Editor')
        })
    });

    it('should search name', () => {
      cy.get('[data-cy="users-tab"]', {timeout: 10000}).click()
      
      // get the movement id
      cy.getMovId().then((movId)=>{
        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/users/test-user`, TestUser)
        cy.callFirestore('set', `/movements/${movId}/users/test-user-2`, TestUser2)
      })

      // check the request exist
      cy.root().get('[data-cy="user-test2@user.com.au"]', {timeout: 10000}).should('exist')
      cy.root().get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).should('exist')
      
      // find the search bar & search for something
      cy.get('[data-cy="users-table"]', {timeout: 10000}).within(() => {
        cy.dataCy('search').should('not.be.disabled').parent().parent().should('not.be.disabled').type('test name 2')
        // check the invalid people don't show
        cy.root().get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).should('not.exist')
        // check the valid people show
        cy.root().get('[data-cy="user-test2@user.com.au"]', {timeout: 10000}).should('exist')
        
      })
    });

    it('should search email', () => {
      cy.get('[data-cy="users-tab"]', {timeout: 10000}).click()
      
      // get the movement id
      cy.getMovId().then((movId)=>{
        // add users to the movement
        cy.callFirestore('set', `/movements/${movId}/users/test-user`, TestUser)
        cy.callFirestore('set', `/movements/${movId}/users/test-user-2`, TestUser2)
      })

      // check the request exist
      cy.root().get('[data-cy="user-test2@user.com.au"]', {timeout: 10000}).should('exist')
      cy.root().get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).should('exist')
      
      // find the search bar & search for something
      cy.get('[data-cy="users-table"]', {timeout: 10000}).within(() => {
        cy.dataCy('search').should('not.be.disabled').parent().parent().should('not.be.disabled').type('test2@user.com.au')
        // check the invalid people don't show
        cy.root().get('[data-cy="user-test@user.com.au"]', {timeout: 10000}).should('not.exist')
        // check the valid people show
        cy.root().get('[data-cy="user-test2@user.com.au"]', {timeout: 10000}).should('exist')
        
      })
    });
  });

  describe('edit user role definitions', () => {
    beforeEach(()=> {
      cy.get('[data-cy="manage-roles-tab"]', {timeout: 15000}).click()
    })
    it('should list user roles', () => {
      cy.dataCy('"selected-role"').parent().parent().click()
      cy.get(".q-menu").should('be.visible').within(()=>{
        cy.get('.q-item').should('to.have.length', 4)
        cy.contains('Owner').should('exist')
        cy.contains('Editor').should('exist')
        cy.contains('Super Editor').should('exist')
        cy.contains('Viewer').should('exist').click()
      })
      
    });  

    it.skip('should create role definition', () => {
      
    });

    it.skip('should rename role definition', () => {
      
    });

    it.skip('should delete role definition', () => {
      
    });

    it.skip('should should not change owner role', () => {
      
    });

    it('should manage access', () => {
      cy.get('[data-cy="selected-role"]', {timeout: 15000}).parent().parent().click()
      cy.get(".q-menu").within(()=>{
        cy.contains('Viewer').should('exist').click()
      })
      // .find('.q-item').first().should('contain', 'Viewer').next().should('contain', 'Editor').next().should('contain', 'Super Editor').next().should('contain', 'Owner').next().should('not.exist')
      cy.dataCy('access-titles').within(()=>{
        cy.contains('View').should('exist')
        cy.contains('Invite Users').should('exist')
        cy.contains('Remove Users').should('exist')
        cy.contains('Create User Roles').should('exist')
        cy.contains('Edit User Roles').should('exist')
        cy.contains('Delete User Roles').should('exist')
      })
      cy.dataCy('access-checkboxes').within(() => {
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
        cy.dataCy('invite').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('remove').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('invite').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('remove').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
      })
    });

    it('should manage members', () => {
      cy.get('[data-cy="selected-role"]', {timeout: 15000}).parent().parent().click()
      cy.get(".q-menu").within(()=>{
        cy.contains('Viewer').should('exist').click()
      })
      // .find('.q-item').first().should('contain', 'Viewer').next().should('contain', 'Editor').next().should('contain', 'Super Editor').next().should('contain', 'Owner').next().should('not.exist')
      cy.dataCy('member-titles').within(()=>{
        cy.contains('View').should('exist')
        cy.contains('Create').should('exist')
        cy.contains('Edit').should('exist')
        cy.contains('Delete').should('exist')
        cy.contains('Export').should('exist')
      })
      cy.dataCy('member-checkboxes').within(() => {
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
        cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('export').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('export').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
      })
    });
    
    it('should manage movement', () => {
      cy.get('[data-cy="selected-role"]', {timeout: 15000}).parent().parent().click()
      cy.get(".q-menu").within(()=>{
        
        cy.contains('Viewer').should('exist').click()
      })
      // .find('.q-item').first().should('contain', 'Viewer').next().should('contain', 'Editor').next().should('contain', 'Super Editor').next().should('contain', 'Owner').next().should('not.exist')
      cy.dataCy('movement-titles').within(()=>{
        cy.contains('Edit').should('exist')
        cy.contains('Copy').should('exist')
        cy.contains('Carbon Copy').should('exist')
        cy.contains('Delete').should('exist')
      })
      cy.dataCy('movement-checkboxes').within(() => {
        cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('copy').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('carbon-copy').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('copy').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('carbon-copy').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
      })
    });
    
    it('should manage settings', () => {
      cy.get('[data-cy="selected-role"]', {timeout: 15000}).parent().parent().click()
      cy.get(".q-menu").within(()=>{
        
        cy.contains('Viewer').should('exist').click()
      })
      // .find('.q-item').first().should('contain', 'Viewer').next().should('contain', 'Editor').next().should('contain', 'Super Editor').next().should('contain', 'Owner').next().should('not.exist')
      cy.dataCy('settings-titles').within(()=>{
        cy.contains('View').should('exist')
        cy.contains('Create').should('exist')
        cy.contains('Edit').should('exist')
        cy.contains('Delete').should('exist')
      })
        cy.dataCy('roles').within(() => {
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        })
        cy.dataCy('mods').within(() => {
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        })
        cy.dataCy('complex').within(() => {
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        })
        cy.dataCy('calc').within(() => {
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
          cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('edit').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
          cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        })
    });
    
    it('should manage snapshots', () => {
      cy.get('[data-cy="selected-role"]', {timeout: 15000}).parent().parent().click()
      cy.get(".q-menu").within(()=>{
        
        cy.contains('Viewer').should('exist').click()
      })
      // .find('.q-item').first().should('contain', 'Viewer').next().should('contain', 'Editor').next().should('contain', 'Super Editor').next().should('contain', 'Owner').next().should('not.exist')
      cy.dataCy('snapshots-titles').within(()=>{
        cy.contains('View').should('exist')
        cy.contains('Update').should('exist')
      })
      cy.dataCy('snapshots-checkboxes').within(() => {
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
        cy.dataCy('update').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('update').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
      })
    });
    
    it('should manage trees', () => {
      cy.get('[data-cy="selected-role"]', {timeout: 15000}).parent().parent().click()
      cy.get(".q-menu").within(()=>{
        
        cy.contains('Viewer').should('exist').click()
      })
      // .find('.q-item').first().should('contain', 'Viewer').next().should('contain', 'Editor').next().should('contain', 'Super Editor').next().should('contain', 'Owner').next().should('not.exist')
      cy.dataCy('tree-titles').within(()=>{
        cy.contains('View').should('exist')
        cy.contains('Create').should('exist')
        cy.contains('Export').should('exist')
        cy.contains('Delete').should('exist')
        cy.contains('Import Trees').should('exist')
        cy.contains('Remove Imported Trees').should('exist')
      })
      cy.dataCy('tree-checkboxes').within(() => {
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
        cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('export').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('import').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('remove-import').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('create').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('export').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('delete').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('import').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('remove-import').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
      })
    });
    
    it('should manage trends', () => {
      cy.get('[data-cy="selected-role"]', {timeout: 15000}).parent().parent().click()
      cy.get(".q-menu").within(()=>{
        
        cy.contains('Viewer').should('exist').click()
      })
      // .find('.q-item').first().should('contain', 'Viewer').next().should('contain', 'Editor').next().should('contain', 'Super Editor').next().should('contain', 'Owner').next().should('not.exist')
      cy.dataCy('trends-titles').within(()=>{
        cy.contains('View').should('exist')
        cy.contains('View Movement Graphs').should('exist')
        cy.contains('Upload Movement Graphs').should('exist')
        cy.contains('Delete Movement Graphs').should('exist')
      })
      cy.dataCy('trends-checkboxes').within(() => {
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')})
        cy.dataCy('view-mg').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('create-mg').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('delete-mg').within(()=>{cy.get('.q-checkbox__inner--falsy').should('exist')}).click()
        cy.dataCy('view').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('view-mg').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('create-mg').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
        cy.dataCy('delete-mg').within(()=>{cy.get('.q-checkbox__inner--truthy').should('exist')})
      })
    });
  });
})