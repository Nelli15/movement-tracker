// import Fixtures
const TestMovement = require('./../../fixtures/test-movement.json')
// const TestMember = require('./../../fixtures/test-member.json')
// const TestUser = require('./../../fixtures/test-user.json')
const MemberRole = require('./../../fixtures/member-role.json')
const MemberMod = require('./../../fixtures/member-mod.json')

import firebase from 'firebase/app'
require('firebase/firestore')

// TestMovement.last_modified = firebase.firestore.Timestamp.now()

describe('member component tests', () => {
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

  it('should have an icon and name', () => {
    cy.get('[data-cy="member-example-member"]', {timeout: 90000}).should('exist')
      // .first()
      .should('contain', 'Example Member').within(()=>{
        cy.get('i').should('contain', 'person')
      })
  })

  it('should have a view menu', () => {
    cy.get('[data-cy="member-example-member"]', {timeout: 90000}).click()
    cy.get('.q-menu').within(() => {
      cy.contains('Name').parent().should('contain', 'Example Member')
      cy.contains('Role').parent().should('contain', 'Example Role')
      cy.contains('Modifiers').parent().should('contain', 'Example Modifier')
      cy.contains('Notes').parent().should('contain', 'This is a Member of the Movement who is a first level Member of the Movement')
    })
  });

  describe('has menu', () => {

    it('should have a select btn', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Select').click()
      })
      cy.dataCy('"member-example-member"').parent().parent().within(()=>{
        cy.get('.q-checkbox__truthy').should('exist')
      })
    });

    it('should create a new member', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('New').click()
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
      cy.contains('New Member').click().parent().parent().parent().parent().parent().should('have.class', 'q-tree__children').parent().parent().contains('Example Member')
      cy.get('.q-menu').within(() => {
        cy.contains('Name').parent().should('contain', 'New Member')
        cy.contains('Role').parent().should('contain', 'Example Role')
        cy.contains('Modifiers').parent().should('contain', 'Example Modifier')
        cy.contains('Notes').parent().should('contain', 'This is a note')
      })
    });

    it('should add existing member', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Existing').click()
      })
      cy.root().get('[data-cy="add-existing-member-comp"]', {timeout: 10000}).within(()=>{
        cy.contains('Member').click()
      })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('Example No Parent Member').click()
        })
        cy.dataCy('"add-existing-member-comp"').within(()=>{
        cy.contains('Shadow Member?').parent().parent().get('.q-checkbox')

        cy.contains('Add to Tree').click()
      })
      // cy.checkNotify('Member Created')
      cy.contains('Example No Parent Member', {timeout: 10000}).click().parent().parent().parent().parent().parent().should('have.class', 'q-tree__children').parent().parent().contains('Example Member')
      cy.get('.q-menu').within(() => {
        cy.contains('Name').parent().should('contain', 'Example No Parent Member')
        cy.contains('Role').parent().should('contain', 'Example Role')
        cy.contains('Modifiers')
        cy.contains('Notes').parent().should('contain', "This is a Member of the Movement who is not a first level Member of the Movement but also doesn't have a parent who is in the Movement.")
      })
    });

    it('should add sub-tree', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Add sub-tree').click()
      })

      cy.root().get('[data-cy="add-sub-tree-comp"]', {timeout: 10000}).within(()=>{
        cy.contains('Tree').click()
      })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('No Parents').click()
        })
        cy.contains('Add to Tree').click()

      cy.contains('Example No Parent Member').click().parent().parent().parent().parent().parent().should('have.class', 'q-tree__children').parent().parent().contains('Example Member')
      cy.get('.q-menu').within(() => {
        cy.contains('Name').parent().should('contain', 'Example No Parent Member')
        cy.contains('Role').parent().should('contain', 'Example Role')
        cy.contains('Modifiers')
        cy.contains('Notes').parent().should('contain', "This is a Member of the Movement who is not a first level Member of the Movement but also doesn't have a parent who is in the Movement.")
      })
      
    });

    it('should view member', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('View').click()
      })
      cy.get('.q-menu').last().within(() => {
        cy.contains('Name').parent().should('contain', 'Example Member')
        cy.contains('Role').parent().should('contain', 'Example Role')
        cy.contains('Modifiers').parent().should('contain', 'Example Modifier')
        cy.contains('Notes').parent().should('contain', 'This is a Member of the Movement who is a first level Member of the Movement')
      })
    });
    
    it('should edit member', () => {
      cy.getMovId().then(movId => {
        cy.callFirestore('set', `/movements/${movId}/styles/a-different-role`, MemberRole)
        cy.callFirestore('set', `/movements/${movId}/styles/a-different-mod`, MemberMod)
        
      })
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Edit').click()
        cy.wait(2000)
      })
      cy.dataCy('"edit-member-comp"').within(()=>{
        // name
        cy.contains('Name').clear().type('Renamed Member')
        // role
        cy.contains('Role').click()
      })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('A Different Role', {timeout: 10000}).click()
        })
        cy.dataCy('"edit-member-comp"').within(()=>{
        // modifier
        cy.contains('Modifiers').click()
        })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('A Different Modifier', {timeout: 10000}).click()
          
        })
        cy.root().parent().dataCy('"edit-member-comp"').click({force: true})
          cy.dataCy('"edit-member-comp"').within(()=>{
        // shadow
        cy.contains('Shadow Member?')
        // submit
        cy.contains('Save').click()
      })
      cy.checkNotify('Member Updated')
      cy.contains('Renamed Member').click()
      cy.get('.q-menu').within(() => {
        cy.contains('Name').parent().should('contain', 'Renamed Member')
        cy.contains('Role').parent().should('contain', 'A Different Role')
        cy.contains('Modifiers').parent().should('contain', 'A Different Modifier')
      })
    });

    it('should move member in tree', () => {
      cy.get('[data-cy="member-example-parent-member"]', {timeout: 90000}).should('not.have.attr', 'data-cy-parent', 'root').should('have.attr', 'data-cy-parent', 'example-member').rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Move').click()
      })
      cy.dataCy('"move-member-comp"').within(()=>{
        // role
        cy.contains('Parent').click()
       })
        cy.root().find('.q-menu').last().within(()=>{
          cy.contains('--First Member in Tree--', {timeout: 10000}).click()
        })
      // cy.get('[data-cy="member-example-parent-member"]', {timeout: 90000}).should("not.be.visible")
      cy.get('[data-cy="member-example-parent-member"]', {timeout: 90000}).should('not.have.attr', 'data-cy-parent', 'example-member').should('have.attr', 'data-cy-parent', 'root')
        // el.parent().parent().parent().parent()
        // .should('not.have.class', 'q-tree__children').should('have.class', 'q-tree')
    });

    it('should copy member', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Copy').click()
      })
      cy.contains('Copy of Example Member').parent().parent().parent().parent().parent().should('not.have.class', 'q-tree__children').should('have.class', 'q-tree')
    });

    it('should edit note', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Notes').click()
      })
      cy.dataCy('"edit-member-notes-comp"').within(()=>{
        // notes
        cy.contains('Notes').clear().type('This is a note')
        // submit
        cy.contains('Save').click()
        
      })
      cy.root().click()
      cy.checkNotify('Member Updated')
      cy.root().contains('Example Member')
      .click()
      cy.get('.q-menu').last().within(() => {
        cy.contains('Notes').parent().should('contain', 'This is a note')
      })
    });

    it('should remove member from tree', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Remove from Tree').click()
      })
      cy.contains('Example Member').should('not.exist')
    });

    it('should delete the member', () => {
      cy.get('[data-cy="member-example-member"]', {timeout: 90000}).rightclick()
      cy.get('.q-menu').within(() => {
        cy.contains('Delete').click()
      })
      cy.root().get('.q-card').within(() => {
        cy.contains('Delete').click()
      })
      cy.contains('Example Member').should('not.exist')
      // check it was also deleted from the DB
      cy.getMovId().then(movId => {
        cy.callFirestore('get', `/movements/${movId}/members/example-member`).then(r => {
          cy.log(r)
          cy.wrap(r).should('not.exist')
        })
      })
    });
  });
})
