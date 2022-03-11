
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import { attachCustomCommands } from 'cypress-firebase';
import "cypress-plugin-snapshots/commands";

const fbConfig = require('./../../../../fbConfig.json')
const TestMovement = require('./../fixtures/test-movement.json')
const TestMember = require('./../fixtures/test-member.json')
const TestUser = require('./../fixtures/test-user.json')
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'dataCy',
  {
    prevSubject: 'optional',
  },
  (subject, value) => {
    return cy.get(`[data-cy=${value}]`, {
      withinSubject: subject,
    });
  },
);

Cypress.Commands.add('testRoute', (route) => {
  cy.location().should((loc) => {
    if (loc.hash.length > 0) {
      // Vue-Router in hash mode
      expect(loc.hash).to.contain(route);
    } else {
      // Vue-Router in history mode
      expect(loc.pathname).to.contain(route);
    }
  });
});

// these two commands let you persist local storage between tests
const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});



firebase.initializeApp(fbConfig);

// Emulate Firestore if Env variable is passed
const firestoreEmulatorHost = Cypress.env('FIRESTORE_EMULATOR_HOST');
console.debug(`Using firestore emulator: http://${firestoreEmulatorHost}/`);
if (firestoreEmulatorHost) {
  
  firebase.firestore().settings({
    host: firestoreEmulatorHost,
    ssl: false,
    experimentalAutoDetectLongPolling: true
  });
}

const authEmulatorHost = Cypress.env('FIREBASE_AUTH_EMULATOR_HOST');
if (authEmulatorHost) {
  firebase.auth().useEmulator(`http://${authEmulatorHost}/`);
  console.debug(`Using Auth emulator: http://${authEmulatorHost}/`);
}

firebase.functions().useEmulator('localhost', 5001);
attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add('userLogin', () => {
  cy.visit('/login')
  cy.get('[data-cy="login-card"]', {timeout:10000})
  cy.dataCy('"signin-email"').parent().type('test@email.com')
    cy.dataCy('"signin-password"').parent().type('test1234')
    cy.dataCy('"signin-submit"').click()
    cy.testRoute('/home')
    .then(() => {
      firebase.auth().signInWithEmailAndPassword('test@email.com', 'test1234')
    })
    cy.log('signin complete')

  //   cy.visit('/login')
  // cy.get('[data-cy="login-card"]', {timeout:10000})
  // cy.dataCy('"signin-email"').parent().type('test@email.com')
  //   cy.dataCy('"signin-password"').parent().type('test1234')
  //   cy.dataCy('"signin-submit"').click().wait(400)
  //   .then(() => {
  //     firebase.auth().signInWithEmailAndPassword('test@email.com', 'test1234')
  //   })
  //   cy.log('signin complete')
});

Cypress.Commands.add('clearMovs', () => {
  cy.exec('curl -X PUT localhost:4400/functions/disableBackgroundTriggers', {failOnNonZeroExit: false})
  cy.callFirestore('delete', 'movements', { recursive: true });
  // cy.exec(`curl -v -X DELETE "http://localhost:8080/emulator/v1/projects/tracking-tree/databases/(default)/documents/"`, {failOnNonZeroExit: false})
  cy.exec('curl -X PUT localhost:4400/functions/enableBackgroundTriggers', {failOnNonZeroExit: false})
})

Cypress.Commands.add('createMov', () => {
  // console.log(firebase.auth().currentUser)
  cy.root().then(()=> {
  const create = firebase.functions().httpsCallable('mt-movements-create', {failOnNonZeroExit: false})
  return create().then(res => res )
  // cy.visit('/home')
  // cy.get('[data-cy="movements-table"]')
  // cy.testRoute('/home')
  // cy.get('[data-cy="create-movement"]', {timeout: 15000}).click()
  })
  // cy.get('.q-notification__message', {timeout: 15000}).should('exist').and('contain', 'Movement Created').and('not.contain', 'Oops, Something went wrong!')
  // cy.root().find('.movement-card', {timeout: 10000}).should('have.length', 1)
  // cy.get('.movement-card').click()
  // cy.get('[data-cy="mov-banner"]', {timeout: 10000})
  // cy.testRoute('/movement/')
})

Cypress.Commands.add('navToMovPage', (page) => {
  cy.location('pathname').then(path => {
    path = path.split('/')
    path = path.slice(0,3)
    path.push(page)
    cy.visit(path.join('/'))
  })
  cy.testRoute('/'+page)
})

Cypress.Commands.add('getMovId', () => {
  cy.location('pathname').then(path => {
    path = path.split('/')
    return path[path.indexOf('movement')+1]
  })
})
Cypress.Commands.add('getUser', () => {
  return firebase.auth().currentUser
})

Cypress.Commands.add('goOffline', () => {
  cy.log('**go offline**')
  .then(() => {
    return Cypress.automation('remote:debugger:protocol',
      {
        command: 'Network.enable',
      })
  })
  .then(() => {
    return Cypress.automation('remote:debugger:protocol',
      {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      })
  })
})

Cypress.Commands.add('checkNotify', (msg) => {
  return cy.get('.q-notification__message', {timeout: 15000}).should('exist').and('contain', msg).and('not.contain', 'Oops, Something went wrong!')
})

Cypress.Commands.add('addInvite', (emails, permission) => {
  cy.location('pathname').then(oldPath => {
    if(!oldPath.includes('access')){
      cy.navToMovPage('access')
    }
    cy.get('[data-cy="invites-tab"]', {timeout: 30000}).click()
    cy.get('[data-cy="invite-form"]', {timeout: 10000}).within(() => {
      cy.dataCy('"email-field"').parent().type(emails)
      cy.dataCy('"role-field"').parent().parent().within(() => {
        cy.contains('arrow_drop_down').click();
      })
    })
    cy.get('.q-menu').find('.q-item').contains(permission).click()
    cy.dataCy('"send-btn"').click()
    // check it worked
    cy.checkNotify('Invitation Sent')
    if(!oldPath.includes('access')){
      cy.visit(oldPath)
    }
  })
})