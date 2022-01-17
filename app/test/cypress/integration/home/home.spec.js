describe('home page tests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  before(()=> {
    // cy.login('test@email.com')
    cy.userLogin()
  })

  beforeEach(() => {
    cy.visit('/home')
  })
  afterEach(()=> {
    cy.callFirestore("delete", "movements", { recursive: true });
  })

  after(() => {
    cy.logout()
  })

  it('should be on the home page', () => {
    cy.testRoute('/home')
  })

  it('should have a user sign out', () => {
    cy.dataCy('"user-signout"').click()
    cy.dataCy('"user-signout-menu"').within(()=>{
      cy.get('button').parent().contains('Logout', { matchCase: false })
    })

    cy.log('should have a connection status')
    cy.dataCy('"connection-status"').contains('wifi')
  });
  
  it('should have a home button', () => {
    cy.dataCy('"home-btn"').should('contain', 'home').click()
    cy.testRoute('/home')
  })

  it('should have a connection status', () => {
    cy.dataCy('"connection-status"').contains('wifi')
  })

  it.skip('should show disconnected status when no internet', () => {
   cy.goOffline().then(() => {
   cy.dataCy('"connection-status"').contains('wifi_off')
   })
  });

  it('should have a create movement button', () => {
    cy.root().then((root) => {
    const numMovs = root.find('.movement-card').length
    cy.dataCy('"create-movement"').click()
    cy.wait(1000)
    cy.root().find('.movement-card').should('have.length', numMovs+1)
    })
  });

  it('should have a help button', () => {
    cy.dataCy('"help-fab"').should('exist')
  });
})