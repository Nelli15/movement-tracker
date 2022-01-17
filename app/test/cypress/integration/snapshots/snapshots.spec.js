let snapTitle = ''
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const date = new Date()
snapTitle = `${months[date.getMonth()]} ${date.getFullYear()}`
const snapId = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`
describe('snapshots page tests', () => {
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
      cy.get('[data-cy="snap-link"]', {timestamp: 60000}).should('exist')
    })

  })

  it('should be on the snapshots page', () => {
    cy.testRoute('/snapshots')
  })
  
  describe('toolbox', () => {
    it.skip('should have snapshot comparison tool ', () => {
      
    });

    it.skip('should also test the tool itself', () => {
      
    });
  });

  it('should list snapshots', () => {
    cy.get('[data-cy="snap-link"]', { timestamp: 60000 }).should('have.length', 1)
    
  });

  it.skip('should search snapshots', () => {
    
  });

  describe('context menu', () => {
    before(()=> {
      cy.userLogin()
      cy.clearMovs()
      cy.createMov().then((res) => {
        cy.wait(1000)
        cy.visit(`/movement/${res.data.movId}/members`)
        cy.testRoute('/movement').testRoute('/members')
        cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
        cy.visit(`/movement/${res.data.movId}/snapshots`)
        cy.testRoute('/movement').testRoute('/snapshots')
        cy.get('[data-cy="snapshots-table"]', {timestamp: 10000})
      })
    })
      it('should update snapshot in menu', () => {
        cy.root().rightclick()
        cy.get('.q-menu').within(() => {
          cy.contains('Update Snapshot').click()
        })
        cy.get('.q-dialog').last().within(() => {
          cy.dataCy('"submit"').click()
        })
        cy.checkNotify('Snapshot Updated')
        cy.get('[data-cy="snap-link"]', { timestamp: 60000 }).should('to.exist')
    })
  })
})