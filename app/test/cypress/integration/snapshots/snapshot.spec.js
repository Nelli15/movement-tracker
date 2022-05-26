let snapTitle = ''
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const date = new Date()
snapTitle = `${months[date.getMonth()]} ${date.getFullYear()}`
describe('snapshot page tests', () => {
  before(()=> {
    cy.userLogin()
  })

  beforeEach(() => {
    cy.clearMovs()
    cy.createMov().then((res) => {
      cy.wait(1000)
      cy.visit(`/movement/${res.data.movId}/members`)
      cy.testRoute('/movement').testRoute('/members')
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
      cy.dataCy('"update-snap-movement"').click()
      cy.dataCy('"submit"').click()
      cy.checkNotify('Snapshot Updated')
      cy.visit(`/movement/${res.data.movId}/snapshots`)
      cy.testRoute('/movement').testRoute('/snapshots')
      cy.get('[data-cy="snapshots-table"]', {timestamp: 10000})
      cy.get('[data-cy="snap-link"]', {timestamp: 60000}).should('exist').click()
    })
  })
 
  it('should be on the snapshot page', () => {
    cy.testRoute('/snapshot')
  })

  it('should have titles', () => {
    cy.dataCy('"mov-banner"').should('contain', 'Untitled Movement')
    cy.dataCy('"snap-title"').should('contain', snapTitle)
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
      cy.testRoute('/print')
    });

  });
  describe('should filter', () => {
    beforeEach(() => {
      cy.dataCy('"member-example-member"').should('exist')
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
  });

  describe('should sort members', () => {
    beforeEach(() => {
      cy.navToMovPage('members')
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
      for(let name of ['member a', 'member b', 'member c']) {
        cy.dataCy('create-member').click()
        cy.dataCy('"add-member-comp"').within(()=>{
          // name
          cy.contains('Name').type(name)
          // submit
          cy.contains('Create').click()
        })
        cy.checkNotify('Member Created')
        
      }
      cy.get('.q-tree__node', {timeout: 90000}).should('have.length', 5)
      cy.dataCy('"update-snap-movement"').click()
      // .contains('add-a-photo')
      cy.dataCy('"submit"').click()
      cy.checkNotify('Snapshot Updated')
      cy.navToMovPage('snapshots')
      cy.get('[data-cy="snapshots-table"]', {timestamp: 10000})
      cy.get('[data-cy="snap-link"]', {timestamp: 60000}).should('exist').click()
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
      cy.dataCy('filter-members').click()
      cy.dataCy('"filter-comp"').should('exist').and('be.visible')
    })

    it('should sort trees by Name', () => {
      cy.dataCy('"filter-comp"').within(() => {
        cy.contains('Sort Members').click()
      })
    
      cy.get('.q-menu').last().contains('Name').click()
      cy.get('.q-tree').within(() => {
        let testList = ['Example Member', 'Example Member with Parent', 'member a', 'member b', 'member c']
        cy.get('.q-btn__content').each((el, ind, list) => {
          cy.wrap(el).should('include.text', testList[ind])
        })
        cy.get('.q-btn__content').should('have.length', testList.length)
      });
      

    });
    it.skip('should sort trees by Role', () => {
      cy.dataCy('"filter-comp"').within(() => {
        cy.contains('Sort Members').click()
      })
    
      cy.get('.q-menu').last().contains('Role').click()
      cy.get('.q-tree').within(() => {
        let testList = ['Example Member', 'Example Member with Parent', 'member a', 'member b', 'member c']
        cy.get('.q-btn__content').each((el, ind, list) => {
          cy.wrap(el).should('include.text', testList[ind])
        })
      });
      cy.get('.q-tree').should('have.length', testList.length)

    });
  })

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
      it('should open filter', () => {
        cy.get('[data-cy="background"]', {timeout: 90000}).wait(1000).rightclick()
        cy.get('.q-menu').within(() => {
          cy.contains('Filter').click()
        })
      cy.dataCy('"filter-comp"').should('exist').and('be.visible')
      });
    });
  })

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
  });
})