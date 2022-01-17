 const path = require("path");
 
 describe('members page tests', () => {
    before(()=> {
    cy.userLogin()
  })

  beforeEach(() => {
    cy.clearMovs()
    cy.createMov().then((res) => {
      cy.wait(1000)
      cy.visit(`/movement/${res.data.movId}/members`)
      cy.testRoute('/movement').testRoute('/members')
    })
  })

  it('should be on the members page', () => {
    cy.testRoute('/members')
  })

  it('should have a movement title', () => {
    cy.get('[data-cy="mov-banner"]', {timeout: 10000}).should('contain', 'Untitled Movement')
  });

  it('should have a timestamp', () => {
      cy.dataCy('"timestamp"').should('contain', `Last Updated: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`)
  });

  it('should have member views', () => {
    cy.get('.q-tabs').within(() => {
      cy.contains('Trees')
      cy.contains('List')
    })
  });

  describe('toolbox', () => {
    it('should create member', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
      cy.dataCy('create-member').click()
      cy.dataCy('"add-member-comp"').within(()=>{
        // name
        cy.contains('Name').type('New Member')
        // role
        cy.contains('Role').click()
      })
     
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('Example Role').click()
        })
        cy.dataCy('"add-member-comp"').within(()=>{
          // modifier
          cy.contains('Modifiers').click()
        })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('Example Modifier').click()
          
        })
        cy.dataCy('"add-member-comp"').click({force: true}).within(()=>{
        // parent
        cy.contains('Parent').click()
          })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('Example Member').click()
          
        })
        cy.dataCy('"add-member-comp"').within(()=>{
          
        // shadow
        cy.contains('Shadow Member?')
        // notes
        cy.contains('Notes').type('This is a note')
        // submit
        cy.contains('Create').click()
      })
      cy.checkNotify('Member Created')
      cy.contains('New Member').click()
      cy.get('.q-menu').within(() => {
        cy.contains('Name').parent().should('contain', 'New Member')
        cy.contains('Role').parent().should('contain', 'Example Role')
        cy.contains('Modifiers').parent().should('contain', 'Example Modifier')
        cy.contains('Notes').parent().should('contain', 'This is a note')
      })
    });

    it('should have update snapshot', () => {
      cy.dataCy('"update-snap-movement"').click()
      // .contains('add-a-photo')
      cy.dataCy('"submit"').click()
      cy.checkNotify('Snapshot Updated')
      cy.navToMovPage('snapshots')
      cy.get('[data-cy="snapshots-table"]', {timestamp: 10000})
      cy.get('[data-cy="snap-link"]', {timestamp: 60000}).should('exist')
    });

    it('should zoom', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).within(()=> {cy.get('.q-btn').should('have.css', 'font-size', '14px')})
      cy.dataCy('zoom-out').click()
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).within(()=> {cy.get('.q-btn').should('have.css', 'font-size', '12.6px')})
      cy.dataCy('zoom-out').click()
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).within(()=> {cy.get('.q-btn').should('have.css', 'font-size', '11.2px')})
      cy.dataCy('zoom-in').click()
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).within(()=> {cy.get('.q-btn').should('have.css', 'font-size', '12.6px')})
      cy.dataCy('zoom-in').click()
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).within(()=> {cy.get('.q-btn').should('have.css', 'font-size', '14px')})
    });

    it('should have filter', () => {
      cy.dataCy('filter-members').click()
      cy.dataCy('"filter-comp"').should('exist').and('be.visible')
    });

    it('should have movement summary', () => {
      cy.dataCy('movement-summary').click()
      cy.dataCy('"movement-summary-comp"').should('exist').and('be.visible')
    });

    it('should have a legend of symbols', () => {
      cy.dataCy('movement-legend').click()
      cy.dataCy('"movement-legend-comp"').should('exist').and('be.visible')
    });

    it.skip('should print', () => {
      cy.dataCy('print').click()
      cy.testRoute('printable')
    });

    it('should export members', () => {
      cy.dataCy('export-members').click()
      const downloadsFolder = Cypress.config("downloadsFolder");
      cy.readFile(path.join(downloadsFolder, "Untitled Movement.csv")).should("exist");
    });
  });

  

  describe('should filter', () => {
    beforeEach(() => {
      cy.dataCy('filter-members').click()
      cy.dataCy('"filter-comp"').should('exist').and('be.visible')
    })

    it('should filter members', () => {
      cy.dataCy('"filter-comp"').within(() => {
        cy.contains('Filter Members').parent().parent().type('modifier')
      })
      cy.dataCy('"member-example-member"').should('exist')
      cy.dataCy('"member-example-parent-member"').should('not.exist')
    });

    it.skip('should sort trees', () => {
      cy.dataCy('"filter-comp"').within(() => {
        cy.contains('Sort Members').click()
      })
    
      cy.get('.q-menu').last().contains('Role').click()
      //TODO: check it sorted
    });
  });

  describe('trees', () => {
    it('should select tree', () => {
      cy.dataCy('"member-tabs"').within(() => {
        cy.contains('Trees').parent().within(() => {
          cy.get('.q-select').click()
        })
      })
      cy.get('.q-menu').within(() => {
        cy.contains('No Parents').click()
      })
      cy.contains('Example No Parent Member')
    });

    describe('menu', () => {
      beforeEach(()=> {
        cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
      })
      it('should open filter', () => {
        cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
        cy.get('.q-menu').within(() => {
          cy.contains('Filter').click()
        })
      cy.dataCy('"filter-comp"').should('exist').and('be.visible')
      });

      it('should create tree', () => {
        cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
        cy.get('.q-menu').within(() => {
          cy.contains('New Tree').click()
        })
        cy.get('.q-menu').last().within(() => {
          cy.get('input').type('Test').type('{enter}{esc}')
          
        })
        cy.checkNotify('Tree Created')
        cy.wait(1000)
        cy.dataCy('"member-tabs"').within(() => {
          cy.contains('Trees', {timeout: 10000}).parent().within(() => {
            cy.get('.q-select').click()
          })
        })
        cy.get('.q-menu').within(() => {
          cy.contains('Test')
        })
      });

      it('should rename tree', () => {
      cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
        cy.get('.q-menu').within(() => {
          cy.contains('Rename Tree').click()
        })
        cy.get('.q-menu').last().within(() => {
          cy.get('input').clear().type('Test').type('{enter}{esc}')
          cy.wait(1000)
        })
        cy.checkNotify('Tree Updated')
        cy.dataCy('"member-tabs"').within(() => {
          cy.contains('Trees', {timeout: 10000}).parent().within(() => {
            cy.get('.q-select').should('contain', 'Test').click()
          })
        })
        cy.get('.q-menu').within(() => {
          cy.contains('Test').should('exist').contains('Main Tree').should('not.exist')
        })
      });
      
      it('should add sub-tree', () => {
        cy.get('[data-cy="member-example-member"]', {timeout: 90000})
      cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Add sub-tree').click()
      })

      cy.root().get('[data-cy="add-sub-tree-comp"]', {timeout: 10000}).within(()=>{
        cy.contains('Tree').click()
      })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('No Parents').click()
        })
        cy.root().get('[data-cy="add-sub-tree-comp"]', {timeout: 10000}).within(()=>{
        cy.contains('Add to Tree').click()
      })

      cy.contains('Example No Parent Member').click()
      cy.get('.q-menu').within(() => {
        cy.contains('Name').parent().should('contain', 'Example No Parent Member')
        cy.contains('Role').parent().should('contain', 'Example Role')
        cy.contains('Modifiers')
        cy.contains('Notes').parent().should('contain', "This is a Member of the Movement who is not a first level Member of the Movement but also doesn't have a parent who is in the Movement.")
      })
      
    });

      it('should create a new member', () => {
        cy.get('[data-cy="member-example-member"]', {timeout: 90000})
        cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
        cy.get('.q-menu').within(() => {
          cy.contains('New Member').click()
        })
        cy.dataCy('"add-member-comp"').within(()=>{
          // name
          cy.contains('Name').type('New Member')
          // role
          cy.contains('Role').click()
        })
          cy.root().find('.q-menu').last().within(()=>{
            cy.contains('Example Role').click()
          })
          cy.dataCy('"add-member-comp"').within(()=>{

          // modifier
          cy.contains('Modifiers').click()
          })
          cy.root().find('.q-menu').last().within(()=>{
            cy.contains('Example Modifier').click()
            
          })
          cy.dataCy('"add-member-comp"').click({force: true}).within(()=>{
            
          // parent
          cy.contains('Parent')
          // .click()
          // cy.root().parent().parent().find('.q-menu').last().within(()=>{
          //   cy.contains('Example Member').click()
            
          // })
            
          // shadow
          cy.contains('Shadow Member?')
          // notes
          cy.contains('Notes').type('This is a note')
          // submit
          cy.contains('Create').click()
        })
        cy.checkNotify('Member Created')
        cy.contains('New Member').click().parent().parent().parent().parent().parent().should('not.have.class', 'q-tree__children').should('have.class', 'q-tree')
        cy.get('.q-menu').within(() => {
          cy.contains('Name').parent().should('contain', 'New Member')
          cy.contains('Role').parent().should('contain', 'Example Role')
          cy.contains('Modifiers').parent().should('contain', 'Example Modifier')
          cy.contains('Notes').parent().should('contain', 'This is a note')
        })
      });

      it('should add existing member', () => {
        cy.get('[data-cy="member-example-member"]', {timeout: 90000})
      cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Existing').click()
      })
      cy.root().get('[data-cy="add-existing-member-comp"]', {timeout: 10000}).within(()=>{
        cy.contains('Member').click()
      })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('Example No Parent Member').click()
        })
      cy.root().get('[data-cy="add-existing-member-comp"]', {timeout: 10000}).within(()=>{
        cy.contains('Shadow Member?').parent().parent().get('.q-checkbox')

        cy.contains('Add to Tree').click()
      })
      // cy.checkNotify('Member Created')
      cy.contains('Example No Parent Member').click().parent().parent().parent().parent().parent().should('not.have.class', 'q-tree__children').should('have.class', 'q-tree')
      cy.get('.q-menu').within(() => {
        cy.contains('Name').parent().should('contain', 'Example No Parent Member')
        cy.contains('Role').parent().should('contain', 'Example Role')
        cy.contains('Modifiers')
        cy.contains('Notes').parent().should('contain', "This is a Member of the Movement who is not a first level Member of the Movement but also doesn't have a parent who is in the Movement.")
      })
    });

      it('should delete tree', () => {
      cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
        cy.get('.q-menu').within(() => {
          cy.contains('Delete Tree').click()
        })
        cy.checkNotify('Tree Deleted')
        cy.dataCy('"member-tabs"').within(() => {
          cy.contains('Trees', {timeout: 10000}).parent().within(() => {
            cy.get('.q-select').click()
          })
        })
        cy.get('.q-menu').within(() => {
          cy.contains('Main Tree').should('not.exist')
        })
      });
    });
  });

  describe('list members', () => {
    beforeEach(() => {
      cy.dataCy('"member-tabs"').within(() => {
        cy.contains('List').click()
      })
    })
    it('should list members', () => {
      cy.dataCy('"member"').should('have.length', 3)
    });

    it('should show member info', () => {
      cy.dataCy('"member"').first().within(() => {
        cy.dataCy('"name"').contains('Example No Parent Member').should('exist')
        cy.dataCy('"role"').contains('Example Role').should('exist')
        cy.dataCy('"mods"').within(()=> {cy.get('div').should('be.empty')})
      })
      cy.dataCy('"member"').last().within(() => {
        cy.dataCy('"name"').contains('Example Member').should('exist')
        cy.dataCy('"role"').contains('Example Role').should('exist')
        cy.dataCy('"mods"').contains('Example Modifier').should('exist')
      })
    });

    it.skip('should paginate members', () => {
      
    });
  });

})