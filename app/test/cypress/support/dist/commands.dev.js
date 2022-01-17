"use strict";

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/auth");

require("firebase/database");

require("firebase/firestore");

var _cypressFirebase = require("cypress-firebase");

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var firebaseTest = require('@firebase/testing'); // // import serviceAccount from './../../../src/'


var fbConfig = {
  apiKey: 'AIzaSyCbNAAuPDzBoMegreNo8Ec_2zsg0DDj0as',
  authDomain: 'tracking-tree.firebaseapp.com',
  databaseURL: 'https://tracking-tree.firebaseio.com',
  projectId: 'tracking-tree',
  storageBucket: 'tracking-tree.appspot.com',
  messagingSenderId: '15714550710',
  appId: '1:15714550710:web:02a4b217e370ac0c',
  measurementId: 'G-BPGJEN2F51'
}; // // Emulate RTDB if Env variable is passed
// const rtdbEmulatorHost = Cypress.env('FIREBASE_DATABASE_EMULATOR_HOST')
// if (rtdbEmulatorHost) {
//   fbConfig.databaseURL = `http://${rtdbEmulatorHost}?ns=${fbConfig.projectId}`
// }

_app["default"].initializeApp(fbConfig); // admin.initializeApp()
// Emulate Firestore if Env variable is passed


var firestoreEmulatorHost = Cypress.env('FIRESTORE_EMULATOR_HOST');

if (firestoreEmulatorHost) {
  _app["default"].firestore().settings({
    host: firestoreEmulatorHost,
    ssl: false
  });
}

(0, _cypressFirebase.attachCustomCommands)({
  Cypress: Cypress,
  cy: cy,
  firebase: _app["default"]
}); // these two commands let you persist local storage between tests

var LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add('saveLocalStorage', function () {
  Object.keys(localStorage).forEach(function (key) {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});
Cypress.Commands.add('restoreLocalStorage', function () {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(function (key) {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
}); // CHAINABLE QUASAR INPUT FIELD TYPES
// usage:
//
// cy.get('[data-cy=target-element]').quasar('text', '');
//
// todo: make sure that this is still compliant with 1.0
//

Cypress.Commands.add('testRoute', function (route) {
  cy.location().should(function (loc) {
    expect(loc.hash).to.contain(route);
  });
});
Cypress.Commands.add('quasar', {
  prevSubject: 'element'
}, function (subject, mode, option) {
  if (mode === 'select') {
    cy.wrap(subject).invoke('show').click({
      force: true
    }).then(function () {
      cy.get('.q-popover').contains(option).click();
      return true;
    });
  } else if (mode === 'grid') {
    cy.wrap(subject).within(function () {
      cy.get('input').click({
        force: true,
        multiple: true
      });
    });
  } else if (mode === 'tag-list') {
    Object.keys(option).forEach(function (x) {
      cy.wrap(subject).within(function () {
        cy.get('input').first().type("".concat(option[x], "{enter}"));
      });
    });
  } else {
    cy.wrap(subject).invoke('show').within(function ($subject) {
      // eslint-disable-line
      switch (mode) {
        case 'date':
        case 'text':
        case 'email':
          cy.get('input:first').type(option).should('have.value', option);
          break;

        case 'radio':
        case 'checkbox':
          cy.contains(option).click();
          break;

        default:
          break;
      }
    });
  }
}); // Cypress.Commands.add('loadStore', () => {});
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
// Cypress.Commands.add('vuex', () =>
//   cy.window()
//     .its('app.$store')
// )

Cypress.Commands.add('clearFirestore', function () {
  return new Cypress.Promise(function (resolve, reject) {
    firebaseTest.clearFirestoreData({
      projectId: fbConfig.projectId
    }).then(function (data) {
      resolve();
      return true;
    })["catch"](function (err) {
      reject(err);
      return false;
    });
  });
});