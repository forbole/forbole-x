/* eslint-disable no-param-reassign */

describe('Create wallet on first visit', () => {
  const testWallet = {
    id: '123',
    name: 'test wallet name',
    cryptos: ['DARIC'],
  }
  const testAccount = {
    walletId: '123',
    address: 'address',
    crypto: 'DARIC',
    index: 0,
  }
  it('successfully loads and click Get Started', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win: any) {
        win.chrome = win.chrome || {}
        win.chrome.runtime = {
          sendMessage(_id, msg, callback) {
            if (msg.event === 'ping') {
              callback({ isFirstTimeUser: true })
            } else if (msg.event === 'addWallet') {
              callback({ wallet: testWallet, accounts: [testAccount] })
            } else if (msg.event === 'generateMnemonic') {
              callback({
                mnemonic:
                  'olive praise state suggest leader scan weekend exhibit glance gravity rebel kingdom',
              })
            }
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
    cy.get('input').type('123123').should('have.value', '123123')
    cy.contains('Next').click()
    cy.contains('Confirm Password').should('be.visible')
  })
  it('confirms the unlock password', () => {
    cy.get('input').type('123123').should('have.value', '123123')
    cy.get('button').contains('Confirm').click()
  })
  it('create and confirm secret recovery phrase', () => {
    cy.contains('have any').click()
    cy.get('.mnemonic').should('be.visible')
    cy.get('.mnemonic').then((e) => {
      const mnemonic = []
      for (let i = 0; i < e.length; i += 1) {
        mnemonic.push(e[i].innerText)
      }
      cy.contains('I have written it down').click()
      cy.get('#mnemonic-0').type(mnemonic.join(' '))
      cy.contains('Next').click()
    })
  })
  it('sets a secure security password', () => {
    cy.get('input').type('123qweASD!@#').should('have.value', '123qweASD!@#')
    cy.contains('Strong').should('be.visible')
    cy.get('button').contains('Next').click()
  })
  it('sets wallet name and select cryptos', () => {
    cy.get('input').type('test wallet name').should('have.value', testWallet.name)
    cy.get('button').contains(testWallet.cryptos[0]).click()
    cy.get('button').contains('Import').click()
    cy.contains(testWallet.name).should('be.visible')
  })
})
