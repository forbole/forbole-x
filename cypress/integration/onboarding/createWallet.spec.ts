/* eslint-disable no-param-reassign */
describe('Create wallet on first visit', () => {
  it('successfully loads and click Get Started', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win: any) {
        win.chrome = win.chrome || {}
        win.chrome.runtime = {
          sendMessage(_id, msg, callback) {
            callback({ isFirstTimeUser: true })
          },
        }
      },
    })
    cy.contains('Get Started').should('be.visible')
    cy.wait(1000)
    cy.contains('Get Started').click()
    cy.get('input').should('be.visible')
  })
  it('sets a unlock password', () => {
    cy.wait(1000)
    cy.get('input').type('123123').should('have.value', '123123')
    cy.wait(1000)
    cy.contains('Next').click()
    cy.contains('Confirm Password').should('be.visible')
  })
  it('confirms the unlock password', () => {
    cy.wait(1000)
    cy.get('input').type('123123').should('have.value', '123123')
    cy.wait(1000)
    cy.get('button').contains('Confirm').click()
  })
  it('create and confirm mnemonic phrase', () => {
    cy.wait(1000)
    cy.contains('have any mnemonic phrase').click()
    cy.get('.HookGlobalStyles-input-25').should('be.visible')
    cy.get('.HookGlobalStyles-input-25').then((e) => {
      const mnemonic = []
      for (let i = 0; i < e.length; i += 1) {
        mnemonic.push(e[i].innerText)
      }
      cy.wait(1000)
      cy.contains('I have written it down').click()
      cy.wait(1000)
      cy.get('#mnemonic-0').type(mnemonic.join(' '))
      cy.wait(1000)
      cy.contains('Next').click()
    })
  })
  it('sets a secure security password', () => {
    cy.wait(1000)
    cy.get('input').type('123qweASD!@#').should('have.value', '123qweASD!@#')
    cy.contains('Strong').should('be.visible')
    cy.wait(1000)
    cy.get('button').contains('Next').click()
  })
  it('sets wallet name', () => {
    cy.wait(1000)
    cy.get('input').type('test wallet name').should('have.value', 'test wallet name')
    cy.wait(1000)
    cy.get('button').contains('Import').click()
    cy.contains('test wallet name').should('be.visible')
  })
})
