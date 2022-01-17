describe('settings page tests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  before(()=> {
    cy.userLogin()
  })

  beforeEach(() => {
    cy.clearMovs()
    cy.createMov().then((res) => {
      cy.wait(1000)
      cy.visit(`/movement/${res.data.movId}/settings`)
      cy.testRoute('/movement').testRoute('/settings')
    })
  })

  it('should be on the settings page', () => {
    cy.testRoute('/movement/').testRoute('/settings')
  })

  describe('roles', () => {
    it('should have a tab to open it', () => {
      cy.dataCy('"role-tab"').should('exist').and('contain', 'Roles').click().then(() => {
        cy.dataCy('"role-tab-panel"').should('exist')
      })
    });

    it('should have a create role in the toolbox', () => {
      cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"create-role"').click()
      })
      cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a create role in the context menu', () => {
      cy.dataCy('"role-tab"').click()
      cy.dataCy('"settings-page"').rightclick()
     cy.get('.q-menu').last().within(() => {
        cy.dataCy('"create-role"').click()
      })
      cy.get('[data-cy="role-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a movement title', () => {
      cy.dataCy('"role-tab"').click()
      cy.dataCy('"movement-banner"').should('contain', 'Untitled Movement')
    });

    it('should display a role', () => {
      cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:40000}).within(()=>{
        cy.dataCy('"label"').should('contain', 'Example Role')
        
        cy.dataCy('"desc"').should('contain', 'This is a Role.')
        
        cy.dataCy('"target"').should('contain', '')

        cy.dataCy('"background"').should('have.css', 'background-color', 'rgb(255, 255, 255)')

        cy.dataCy('"color"').should('have.css', 'background-color', 'rgb(0, 0, 0)')

        cy.dataCy('"outline"').should('have.css', 'background-color', 'rgb(255, 255, 255)')

        cy.dataCy('"underline"').should('have.css', 'text-decoration', 'none solid rgb(0, 0, 0)')

        cy.dataCy('"shape"').within(() => {
          cy.dataCy('"selected-shape"').should('have.class', 'not-round')
        })
      })
    });

    it('should change title, desc, and target', () => {
      cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"label"').should('contain', 'Example Role')
        
        cy.dataCy('"desc"').should('contain', 'This is a Role.')
        
        cy.dataCy('"target"').should('contain', '')
        cy.dataCy('"label"')
      }).rightclick()
      cy.root().get('.q-menu').within(()=> {
        cy.contains('Edit').click()
      })
      cy.root().get('.q-menu').last().within(()=> {
        cy.contains('Label').click().within(() => {
          cy.get('input').clear().type('New Name')
        })
        cy.contains('Description').click().within(() => {
          cy.get('textarea').clear().type('A new description')
        })
        cy.contains('Target').click().within(() => {
          cy.get('input').clear().type('10')
        })
        cy.get('button').click()
      })
      cy.get('[data-cy="role-item"]').within(()=>{
        cy.dataCy('"label"').should('contain', 'New Name')
        cy.dataCy('"desc"').should('contain', 'A new description')
        cy.dataCy('"target"').should('contain', '10')
      })
    });

    it('should change the background', () => {
      cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"background"').should('have.css', 'background-color', 'rgb(255, 255, 255)').click()
      })
      cy.root().get('.q-menu').within(()=> {
          cy.get('.q-color-picker__header-banner').within(() => {
            cy.get('input').clear().type('#FF0000').type('{enter}{esc}')
          })
        })
      cy.get('[data-cy="role-item"]').within(()=>{
        cy.get('[data-cy="background"]', {timeout:20000}).should('have.css', 'background-color', 'rgb(255, 0, 0)')
      })
    });

    it('should change the text color', () => {
       cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"color"').should('have.css', 'background-color', 'rgb(0, 0, 0)').click()
      })
      cy.root().get('.q-menu').within(()=> {
          cy.get('.q-color-picker__header-banner').within(() => {
            cy.get('input').clear().type('#FF0000{enter}{esc}')
          })
        })
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"color"').should('have.css', 'background-color', 'rgb(255, 0, 0)')
      })
    });

    it('should change the outline color', () => {
       cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"outline"').should('have.css', 'background-color', 'rgb(255, 255, 255)').click()
      })
      cy.root().get('.q-menu').within(()=> {
          cy.get('.q-color-picker__header-banner').within(() => {
            cy.get('input').clear().type('#FF0000{enter}{esc}')
          })
        })
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"outline"').should('have.css', 'background-color', 'rgb(255, 0, 0)')
      })
    });

    it('should underline', () => {
       cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"underline"').should('have.css', 'text-decoration', 'none solid rgb(0, 0, 0)').click()
      })
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"underline"').should('have.css', 'text-decoration', 'underline solid rgb(0, 0, 0)')
      })
    });

    it('should change the shape', () => {
       cy.dataCy('"role-tab"').click()
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"selected-shape"').should('have.class', 'not-round').click()
      })
      cy.root().get('.q-menu').within(()=> {
          cy.get('.round').click()
        })
      cy.get('[data-cy="role-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"selected-shape"').should('have.class', 'round')
      })
    });
  });

  describe('modifiers', () => {
    it('should have a tab to open it', () => {
      cy.dataCy('"mod-tab"').should('exist').and('contain', 'Modifiers').click().then(() => {
        cy.dataCy('"mod-tab-panel"').should('exist')
      })
    });

    it('should have a create mod in the toolbox', () => {
       cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"create-mod"').click()
      })
      cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a create mod in the context menu', () => {
     cy.dataCy('"mod-tab"').click()
      cy.dataCy('"settings-page"').rightclick()
     cy.get('.q-menu').last().within(() => {
        cy.dataCy('"create-mod"').click()
      })
      cy.get('[data-cy="mod-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a movement title', () => {
      cy.dataCy('"mod-tab"').click()
      cy.dataCy('"movement-banner"').should('contain', 'Untitled Movement')
    });

    it('should display a modifier', () => {
      cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:40000}).within(()=>{
        cy.dataCy('"label"').should('contain', 'Example Modifier')
        
        cy.dataCy('"desc"').should('contain', "This is a Modifier (Optional). Each Member of the Movement can have multiple Modifiers applied to it. Create/Edit/Delete Modifiers in the Modifiers tab on the Settings page. The Modifiers override the default styling of a Member's Role. They provide an easy way to tag Members with simple information. Be careful when setting up your modifiers, a Member with multiple conflicting Modifiers will use the first Modifier that overrides a particular element of a Member's style. Having conflicting styles may cause a Member's style to be inconsistant and unpredictable.")
        
        cy.dataCy('"target"').should('contain', '')

        cy.dataCy('"background"').within(()=>{
          cy.get('.q-checkbox__inner--falsy').should('exist')
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(255, 255, 255)')
        })

        cy.dataCy('"color"').within(()=>{
          cy.get('.q-checkbox__inner--falsy').should('exist')
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(0, 0, 0)')})

        cy.dataCy('"outline"').within(()=>{
          cy.get('.q-checkbox__inner--falsy').should('exist')
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(255, 255, 255)')
        })

        cy.dataCy('"underline"').within(() => {
          cy.get('.q-checkbox__inner--falsy').should('exist')
          cy.dataCy('"underline-display"').should('have.css', 'text-decoration', 'none solid rgb(0, 0, 0)')
      })

        cy.dataCy('"shape"').within(() => {
          cy.get('.q-checkbox__inner--falsy').should('exist')
          cy.dataCy('"selected-shape"').should('have.class', 'not-round')
        })

        cy.dataCy('"icon"').should('contain', '')
        cy.dataCy('"icon-location"').should('contain', 'last_page')
      })
    });

    it('should change title, desc, and target', () => {
      cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"label"').should('contain', 'Example Modifier')
        
        cy.dataCy('"desc"').should('contain', `This is a Modifier (Optional). Each Member of the Movement can have multiple Modifiers applied to it. Create/Edit/Delete Modifiers in the Modifiers tab on the Settings page. The Modifiers override the default styling of a Member's Role. They provide an easy way to tag Members with simple information. Be careful when setting up your modifiers, a Member with multiple conflicting Modifiers will use the first Modifier that overrides a particular element of a Member's style. Having conflicting styles may cause a Member's style to be inconsistant and unpredictable.`)
        
        cy.dataCy('"target"').should('contain', '')
        cy.dataCy('"label"')
      }).rightclick()
      cy.root().get('.q-menu').within(()=> {
        cy.contains('Edit').click()
      })
      cy.root().get('.q-menu').last().within(()=> {
        cy.contains('Label').click().within(() => {
          cy.get('input').clear().type('New Name')
        })
        cy.contains('Description').click().within(() => {
          cy.get('textarea').clear().type('A new description')
        })
        cy.contains('Target').click().within(() => {
          cy.get('input').clear().type('10')
        })
        cy.get('button').click()
      })
      cy.get('[data-cy="mod-item"]').within(()=>{
        cy.dataCy('"label"').should('contain', 'New Name')
        cy.dataCy('"desc"').should('contain', 'A new description')
        cy.dataCy('"target"').should('contain', '10')
      })
    });

    it('should change the background', () => {
      cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"background"').within(()=>{
          cy.get('.q-checkbox__inner--falsy').should('exist').click()
          cy.get('.q-checkbox__inner--truthy').should('exist')
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(255, 255, 255)').and('be.enabled').click()
        })
      })
      cy.root().get('.q-menu').within(()=> {
        cy.get('.q-color-picker__header-banner').within(() => {
          cy.get('input').clear().type('#FF0000{enter}{esc}')
        })
      })
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"background"').within(()=>{
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(255, 0, 0)')
        })
      })
    });

    it('should change the text color', () => {
       cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"color"').within(()=>{
          cy.get('.q-checkbox__inner--falsy').should('exist').click()
          cy.get('.q-checkbox__inner--truthy').should('exist')
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(0, 0, 0)').and('be.enabled').click()
        })
      })
      cy.root().get('.q-menu').within(()=> {
        cy.get('.q-color-picker__header-banner').within(() => {
          cy.get('input').clear().type('#FF0000{enter}{esc}')
        })
      })
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"color"').within(()=>{
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(255, 0, 0)')
        })
      })
    });

    it('should change the outline color', () => {
       cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"outline"').within(()=>{
          cy.get('.q-checkbox__inner--falsy').should('exist').click()
          cy.get('.q-checkbox__inner--truthy').should('exist')
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(255, 255, 255)').and('be.enabled').click()
        })
      })
      cy.root().get('.q-menu').within(()=> {
        cy.get('.q-color-picker__header-banner').within(() => {
          cy.get('input').clear().type('#FF0000{enter}{esc}')
        })
      })
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"outline"').within(()=>{
          cy.dataCy('"color-display"').should('have.css', 'background-color', 'rgb(255, 0, 0)')
        })
      })
    });

    it('should underline', () => {
      cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        
        cy.dataCy('"underline"').within(()=>{
          cy.get('.q-checkbox__inner--falsy').should('exist').click()
          cy.get('.q-checkbox__inner--truthy').should('exist')
          cy.dataCy('"underline-display"').should('have.css', 'text-decoration', 'none solid rgb(0, 0, 0)').click()
          cy.dataCy('"underline-display"').should('have.css', 'text-decoration', 'underline solid rgb(0, 0, 0)')
        })
      })
    });

    it('should change the shape', () => {
       cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"shape"').within(()=>{
        cy.get('.q-checkbox__inner--falsy').should('exist').click()
          cy.get('.q-checkbox__inner--truthy').should('exist')
        cy.dataCy('"selected-shape"').should('have.class', 'not-round').click()
        })
      })
      cy.root().get('.q-menu').within(()=> {
          cy.get('.round').click()
        })
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"selected-shape"').should('have.class', 'round')
      })
    });

    it('should change the icon', () => {
      cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"icon"').click()
      })
      cy.get('.q-menu').within(() => {
        cy.get('input').clear().type('test').type('{enter}{esc}')
      })
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"icon"').should('contain', 'test')
      })
    });

    it('should change the icon location', () => {
      cy.dataCy('"mod-tab"').click()
      cy.get('[data-cy="mod-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"icon-location"').should('contain', 'last_page').click()
        cy.dataCy('"icon-location"').should('contain', 'first_page')
      })
    });
  });

  describe('complex', () => {
    it('should have a tab to open it', () => {
      cy.dataCy('"complex-tab"').should('exist').and('contain', 'Complex').click().then(() => {
        cy.dataCy('"complex-tab-panel"').should('exist')
      })
    });

    it('should have a create complex in the toolbox', () => {
       cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"create-complex"').click()
      })
      cy.dataCy('"complex-tab"').click()
      cy.get('[data-cy="complex-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a create complex in the context menu', () => {
     cy.dataCy('"complex-tab"').click()
      cy.dataCy('"settings-page"').rightclick()
     cy.get('.q-menu').last().within(() => {
        cy.dataCy('"create-complex"').click()
      })
      cy.get('[data-cy="complex-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a movement title', () => {
      cy.dataCy('"complex-tab"').click()
      cy.dataCy('"movement-banner"').should('contain', 'Untitled Movement')
    });

    it('should display a complex stat', () => {
      cy.dataCy('"complex-tab"').click()
        cy.get('[data-cy="complex-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"label"').should('contain', 'Example Complex Stat')
        
        cy.dataCy('"desc"').should('contain', 'This is a Complex Statistic. Each Role and Modifier automatically counts the number of Members with the Role or Modifier. The Compex Statistic allows you to define a theoretical Member of the Movement and then find and count the number of times that the theoretical Member exists in the Movement. Create/Edit/Delete Complex Statistics in the Complex tab on the Settings page.')
        
        cy.dataCy('"target"').should('contain', '')

        cy.dataCy('"condition"').should('contain', 'Example Role').and('contain', 'Example Modifier')
      })
    });

    it('should change title, desc, and target', () => {
      cy.dataCy('"complex-tab"').click()
      cy.get('[data-cy="complex-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"label"').should('contain', 'Example Complex Statistic').rightclick()
        
        cy.dataCy('"desc"').should('contain', `This is a Complex Statistic. Each Role and Modifier automatically counts the number of Members with the Role or Modifier. The Compex Statistic allows you to define a theoretical Member of the Movement and then find and count the number of times that the theoretical Member exists in the Movement. Create/Edit/Delete Complex Statistics in the Complex tab on the Settings page.`)
        
        cy.dataCy('"target"').should('contain', '')
      })
      cy.root().get('.q-menu').within(()=> {
        cy.contains('Edit').click()
      })
      cy.root().get('.q-menu').last().within(()=> {
        cy.contains('Label').click().within(() => {
          cy.get('input').clear().type('New Name')
        })
        cy.contains('Description').click().within(() => {
          cy.get('textarea').clear().type('A new description')
        })
        cy.contains('Target').click().within(() => {
          cy.get('input').clear().type('10')
        })
        cy.get('button').click()
      })

      cy.get('[data-cy="complex-item"]').within(()=>{
        cy.dataCy('"label"').should('contain', 'New Name')
        cy.dataCy('"desc"').should('contain', 'A new description')
        cy.dataCy('"target"').should('contain', '10')
      })
    });

    it.skip('should change conditions', () => {
      
    });
  });

  describe('calculated', () => {
    it('should have a tab to open it', () => {
      cy.dataCy('"calc-tab"').should('exist').and('contain', 'Calculated').click().then(() => {
        cy.dataCy('"calc-tab-panel"').should('exist')
      })
    });

    it('should have a create calculated in the toolbox', () => {
       cy.dataCy('"toolbox"').within(() => {
        cy.dataCy('"create-calc"').click()
      })
      cy.dataCy('"calc-tab"').click()
      cy.get('[data-cy="calc-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a create calculated in the context menu', () => {
     cy.dataCy('"calc-tab"').click()
      cy.dataCy('"settings-page"').rightclick()
     cy.get('.q-menu').last().within(() => {
        cy.dataCy('"create-calc"').click()
      })
      cy.get('[data-cy="calc-item"]', {timeout:40000}).should('have.length', 2)
    });

    it('should have a movement title', () => {
      cy.dataCy('"calc-tab"').click()
      cy.dataCy('"movement-banner"').should('contain', 'Untitled Movement')
    });

    it('should display a calculated', () => {
      cy.dataCy('"calc-tab"', {timeout: 4000}).click()
      cy.dataCy('"create-calc"').click()
      cy.dataCy('"label"').should('contain', 'Example Calculated Statistic')
      
      cy.dataCy('"desc"').should('contain', 'This is a Calculated Statistic.')
      
      cy.dataCy('"target"').should('contain', '')

      cy.dataCy('"condition"').should('contain', 'Example Complex Statistic')

      cy.dataCy('"unit"').should('contain', '')
    });

    it('should change title, desc, and target', () => {
      cy.dataCy('"calc-tab"').click()
      cy.get('[data-cy="calc-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"label"').should('contain', 'Example Calculated Statistic')
        cy.dataCy('"desc"').should('contain', `This is a Calculated Statistic. The Calculted Statistic allows you to matematically calculate statistics based on real time Role|Modifier|Complex values. Create/Edit/Delete Calculated Statistics in the Calculated tab on the Settings page.`)
        cy.dataCy('"target"').should('contain', '')
      }).rightclick('topRight')
      cy.root().get('.q-menu').within(()=> {
        cy.contains('Edit').click()
      })
      cy.root().get('.q-menu').last().within(()=> {
        cy.contains('Label').click().within(() => {
          cy.get('input').clear().type('New Name')
        })
        cy.contains('Description').click().within(() => {
          cy.get('textarea').clear().type('A new description')
        })
        cy.contains('Target').click().within(() => {
          cy.get('input').clear().type('10')
        })
        cy.get('button').click()
      })
      cy.get('[data-cy="calc-item"]').within(()=>{
        cy.dataCy('"label"').should('contain', 'New Name')
        cy.dataCy('"desc"').should('contain', 'A new description')
        cy.dataCy('"target"').should('contain', '10')
      })
    });

    it.skip('should change the conditions', () => {
      
    });

    it('should change the unit', () => {
      cy.dataCy('"calc-tab"').click()
      cy.get('[data-cy="calc-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"unit"').click()
      })
      cy.get('.q-menu').within(() => {
        cy.get('input').clear().type('%').type('{enter}{esc}')
      })
      cy.get('[data-cy="calc-item"]', {timeout:20000}).within(()=>{
        cy.dataCy('"unit"').should('contain', '%')
      })
    });
  });
})