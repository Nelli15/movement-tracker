
/// <reference path="./../../support/index.d.ts" />
// import * as ctx from '../../../../quasar.conf.js'

describe('login page tests', () => {
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:9099/emulator/v1/projects/tracking-tree/accounts')
    cy.visit('/login')
  })

  it('should be on the login page', () => {
    cy.testRoute('/login')
  })
  
  it('should have a title', () => {
    cy.title().should('include', 'Movement Tracker');
  });

  // it('has pretty background', () => {
  //   cy.dataCy('landing-wrapper')
  //     .should('have.css', 'background')
  //   // .and('match', /(".+(\/img\/background).+\.png)/);
  // })

  it('greets with signin', () => {
    // cy.dataCy('login-welcome')
    cy.dataCy('"login-welcome"').contains('Welcome to Movement Tracker')
  })

  it('has login with email method', () => {
    // cy.dataCy('"signin-with-email"').within(() => {
    //   cy.get('.q-btn__content').contains('Email')
    // }).click()

    cy.dataCy('"signin-email"').parent().within(() => {
cy.get('.q-field__label').contains("Email")
    }).type('test@email.com')
    cy.dataCy('"signin-password"').parent().within(() => {
cy.get('.q-field__label').contains('Password')
    }).type("test1234")
    cy.dataCy('"signin-submit"').click()
     cy.testRoute('/home')
    cy.log('signin complete')
    
  })

    it('has login with Google method', () => {
    cy.dataCy('"signin-with-google"').within(() => {
      cy.get('.q-btn__content').contains('Google')
    })
  })

    it('has login with Github method', () => {
    cy.dataCy('"signin-with-github"').within(() => {
      cy.get('.q-btn__content').contains('Github')
    })
  })

  // it('has login with google method', () => {
  //   cy.dataCy('signin-with-google').should('include', 'Google')
  // })

//   it('has login with Facebook method', () => {
//     cy.dataCy('.firebaseui-idp-facebook > .firebaseui-idp-text-short', 'Facebook', { timeout: 5000 })
//   })

  // it('has login with GitHub method', () => {
  //   cy.dataCy('signin-with-github > .firebaseui-idp-text-short', 'GitHub', { timeout: 5000 })
  // })

//   it.skip('goes somewhere on successful login', () => {

//   })

  // it('has pretty logo', () => {
  //   cy.get('.landing-wrapper img')
  //     .should('have.class', 'logo-main')
  //     .and('have.attr', 'src')
  //     .and('match', /^(data:image\/svg\+xml).+/);
  // });
  // it('has very important information', () => {
  //   cy.get('.instruction-wrapper')
  //     .should('include', 'SETUP INSTRUCTIONS')
  //     .and('include', 'Configure Authentication')
  //     .and('include', 'Database Configuration and CRUD operations')
  //     .and('include', 'Continuous Integration & Continuous Deployment CI/CD');
  // });
})
