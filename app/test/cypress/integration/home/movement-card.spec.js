describe('movement-card tests', () => {
  before(()=> {
    cy.userLogin()
  })

  beforeEach(() => {
    cy.clearMovs()
    cy.createMov()
    cy.wait(1000)
    cy.visit('/home')
  })

  it('should be on the home page', () => {
    cy.visit('/home')
    cy.testRoute('/home')
  })

  it('should have a movement card', () => {
    cy.root().find('.movement-card').should('have.length', 1)
    cy.get('.movement-card').contains('Untitled Movement')
    cy.get('.movement-card').click()
    cy.testRoute('/movement/').testRoute('/members')
  });

  it('should have a role', () => {
    cy.testRoute('/home')
    cy.get('.movement-card').within(()=> {
      cy.dataCy('"user-role"').contains('owner')
    })
  });

  it('should have page links', () => {
    cy.get('.pageLink').should('have.length', 4)
      // .next().should('contain', 'Snapshots')
      // .next().should('contain', 'Trends')
      // .next().should('contain', 'Settings')
      // .next().should('contain', 'Sharing')
  });

  describe('movement menu', () => {
    beforeEach(()=> {
      cy.get('.movement-card', {timeout: 10000}).rightclick()
    })
    it('should have a menu', () => {
      cy.dataCy('"movement-menu"').should('exist')
    });

    it('should open', () => {
      cy.dataCy('"movement-menu"').within(() => {
        cy.dataCy('"open-movement"').contains('Open').click()
        cy.testRoute('/movement/').testRoute('/members')
      })
    });

    it('should create a new Movement', () => {
      cy.root().then((root) => {
    const numMovs = root.find('.movement-card').length
    cy.dataCy('"movement-menu"').within(() => {
        cy.dataCy('"create-movement"').contains('New').click()    
    })
    cy.wait(1000)
    cy.root().find('.movement-card').should('have.length', numMovs+1)
  })
    });

    it('should rename the movement', () => {
      cy.dataCy('"movement-menu"').should('exist').and('be.visible').within(() => {
        cy.wait(1000)
        cy.dataCy('"rename-movement"').contains('Rename').click()
      })
        cy.get('[data-cy="rename-movement-comp"]', { timeout: 4000}).within(()=>{
          cy.get('input').type('Renamed Movement')
          cy.get('button').click()
      })
      cy.checkNotify('Movement Updated')
      cy.get('.movement-card').should('contain', 'Renamed Movement')
      
    });

    it('should change the movements color', () => {
      cy.dataCy('"movement-menu"').should('exist').and('be.visible').within(() => {
        cy.wait(1000)
        cy.get('[data-cy="change-movement-color"]', { timeout: 4000}).contains('Change Color').click()
      })
        cy.get('[data-cy="change-movement-color-comp"]', { timeout: 4000}).within(()=>{
          cy.get('input').clear().type('#000')
          // cy.get('button').click()
      })
      // cy.wait(1000)
      // cy.pause()
      cy.checkNotify('Movement Updated')
      cy.get('.movement-card > .text-h6').should('have.css', 'background-color').and('eq', 'rgb(0, 0, 0)')
    });

    it('should update the snapshot', () => {
      cy.root().find('.movement-card').click()
        cy.testRoute('/movement').testRoute('/members')
        cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
        cy.visit(`/home`)
        cy.testRoute('/home')
        cy.get('.movement-card').rightclick()
       cy.dataCy('"movement-menu"').within(() => {
        cy.dataCy('"update-snap-movement"').contains('Update Snapshot').click()
      })
      cy.dataCy('"submit"').click()
      cy.checkNotify('Snapshot Updated')
      cy.root().find('.movement-card').click()
      cy.testRoute('/movement')
      cy.navToMovPage('snapshots')
      cy.get('[data-cy="snapshots-table"]', {timeout: 90000})
      cy.get('[data-cy="snap-link"]', {timeout: 90000}).should('exist')
    });

    it('should copy the movement', () => {
      cy.root().then((root) => {
        const numMovs = root.find('.movement-card').length
        cy.root().find('.movement-card').click()
        cy.testRoute('/movement').testRoute('/members')
        cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
        cy.visit(`/home`)
        cy.testRoute('/home')
        cy.get('.movement-card').rightclick()
        cy.dataCy('"movement-menu"').within(() => {
          cy.dataCy('"copy-movement"').contains('Copy').click()
        })
        cy.checkNotify('Movement Copied')
        cy.root().get('.movement-card', {timeout: 90000}).should('have.length', numMovs+1).and('contain', 'Copy of Untitled Movement')
      })
    });

    it.skip('should carbon copy a movement', () => {
      cy.root().then((root) => {
        const numMovs = root.find('.movement-card').length
        cy.root().find('.movement-card').click()
        cy.testRoute('/movement').testRoute('/members')
        cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
        cy.visit(`/home`)
        cy.testRoute('/home')
        cy.get('.movement-card').rightclick()
        cy.dataCy('"movement-menu"').within(() => {
          cy.dataCy('"carbon-copy-movement"').contains('Carbon Copy').click()
        })
        cy.checkNotify('Movement Copied')
        cy.root().get('.movement-card').should('have.length', numMovs+1)
        
        cy.root().find('.movement-card').should('contain', 'Copy of Untitled Movement')
      })
    });

    it('should hide a movement', () => {
      cy.root().then((root) => {
    const numMovs = root.find('.movement-card').length
       cy.dataCy('"movement-menu"').within(() => {
        cy.dataCy('"hide-movement"').contains('Hide').click()
      })

      cy.root().find('.movement-card').should('have.length', numMovs-1)
      cy.dataCy('"toggle-hidden-movements"').click()
      cy.root().find('.movement-card').should('have.length', numMovs)
    })
    });

    it('should have settings shortcut', () => {
       cy.dataCy('"movement-menu"').within(() => {
        cy.dataCy('"settings-link"').contains('Settings').click()
        cy.testRoute('/movement/').testRoute('/settings')
      })
    });

    it('should have access shortcut', () => {
      cy.dataCy('"movement-menu"').within(() => {
        cy.dataCy('"access-link"').contains('Access').click()
        cy.testRoute('/movement/').testRoute('/access')
      })
    });

    it('should delete', () => {
      cy.root().then((root) => {
        const numMovs = root.find('.movement-card').length
        cy.dataCy('"movement-menu"').within(() => {
          cy.dataCy('"delete-movement"').contains('Delete').click()
        })
        cy.dataCy('"delete-dialog"').within(()=>{
          cy.get('input').type('DELETE', { force: true })
          cy.dataCy('delete-submit-btn').click()
        })
        cy.root().find('.movement-card').should('have.length', numMovs-1)
        cy.checkNotify('Movement Deleted')
      })
    });

    it('should leave movement', () => {
      cy.get('[data-cy="movement-card"]').invoke('attr', 'data-movid').then(movId => {
        cy.getUser().then(user => {
          cy.log(movId)
          cy.log(user.uid)
          cy.callFirestore('update', `/movements/${movId}/users/${user.uid}`, {role: 'viewer'})
        })
      })
      cy.reload()
      cy.get('.movement-card', {timeout: 10000}).rightclick()
      cy.root().then((root) => {

      const numMovs = root.find('.movement-card').length
        cy.dataCy('"movement-menu"').within(() => {
          cy.dataCy('"leave-movement"').contains('Leave').click()
          
        })
        cy.root().find('.movement-card').should('have.length', numMovs-1)
        cy.checkNotify('test@email.com has left the building')
      })
    });
  });


})