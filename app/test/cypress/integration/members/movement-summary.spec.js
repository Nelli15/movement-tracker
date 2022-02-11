// import Fixtures
const TestMovement = require('./../../fixtures/test-movement.json')
// const TestMember = require('./../../fixtures/test-member.json')
// const TestUser = require('./../../fixtures/test-user.json')
const MemberRole = require('./../../fixtures/member-role.json')
const MemberMod = require('./../../fixtures/member-mod.json')

import firebase from 'firebase/app'
require('firebase/firestore')

// TestMovement.last_modified = firebase.firestore.Timestamp.now()

describe('movement summary drawer', () => {
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

  it.skip('should have a tree total', () => {
    
  });

  it.skip('should have roles', () => {
    
  });

  it.skip('should have mods', () => {
    
  });

  it.skip('should have calc', () => {
    
  });

  it.skip('should have complex', () => {
    
  });

  it.skip('should have summary graphs', () => {
    
  });

  it.skip('should have change totals', () => {
    
  });
})
