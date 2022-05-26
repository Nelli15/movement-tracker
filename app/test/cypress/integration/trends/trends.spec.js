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
    cy.dataCy('"mov-banner"').should('contain', 'Untitled Movement')
  });

  describe('toolbox', () => {

    it('should have graph options', () => {
      cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"graph-options"').should('contain', 'graph-options').click()
      })
      cy.dataCy('"graph-options-comp"').should('exist').and('be.visible')
    });

    it.skip('should save graph', () => {
      cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"save-graph"').should('contain', 'save-graph').click()
      })
      cy.dataCy('"save-graph-comp"').should('exist').and('be.visible')
    });

    it.skip('should recall saved graphs', () => {
      cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"saved-graphs"').should('contain', 'saved-graph').click()
      })
      cy.dataCy('"saved-graphs-comp"').should('exist').and('be.visible')
    });

  });

  it.skip('should have a graph', () => {
    //https://www.valentinog.com/blog/canvas/
  });

  describe('graph options drawer', () => {
    it.skip('should change tab', () => {
      
    });
    describe('Data Tab', () => {
      it.skip('should change chart type', () => {
        
      });

      it.skip('should change the start date', () => {
        
      });

      it.skip('should change the end date', () => {
        
      });

      it.skip('should select trees', () => {
        
      });

      it.skip('should select statistics', () => {
        
      });
    });
    describe('Style Tab', () => {
      it.skip('should change the chart title', () => {
      
      });
      it.skip('should change the line tension', () => {
        
      });
      it.skip('should change the line color', () => {
        
      });
      it.skip('should change the horizontal axis label', () => {
        
      });
      it.skip('should change the vertical axis title', () => {
        
      });
    });
    
  });

  describe('save graph menu', () => {
    
  });
  
  describe('saved graphs drawer', () => {
    
  });

})