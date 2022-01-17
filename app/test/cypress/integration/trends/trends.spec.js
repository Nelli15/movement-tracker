describe('trends page tests', () => {
  before(()=> {
    cy.userLogin()
  })

  beforeEach(() => {
    cy.clearMovs()
    cy.createMov().then((res) => {
      cy.wait(1000)
      cy.visit(`/movement/${res.data.movId}/trends`)
      cy.testRoute('/movement').testRoute('/trends')
    })
  })

  it('should be on the trends page', () => {
    cy.testRoute('/trends')
  })

  it('should have a movement title', () => {
    cy.dataCy('"movement-banner"').should('contain', 'Untitled Movement')
  });

  describe('toolbox', () => {

    it('should have graph options', () => {
      cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"graph-options"').should('contain', 'graph-options').click()
      })
      cy.dataCy('"graph-options-comp"').should('exist').and('be.visible')
    });

    it('should save graph', () => {
      cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"save-graph"').should('contain', 'save-graph').click()
      })
      cy.dataCy('"save-graph-comp"').should('exist').and('be.visible')
    });

    it('should recall saved graphs', () => {
      cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"saved-graphs"').should('contain', 'saved-graph').click()
      })
      cy.dataCy('"saved-graphs-comp"').should('exist').and('be.visible')
    });

  });

  it.skip('should have a graph', () => {
    
  });

  describe('graph options drawer', () => {
    
  });

  describe('save graph menu', () => {
    
  });
  
  describe('saved graphs drawer', () => {
    
  });

})