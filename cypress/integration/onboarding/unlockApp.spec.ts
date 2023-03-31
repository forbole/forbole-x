/* eslint-disable no-param-reassign */

describe('Unlock app with unlock password', () => {
  const testWallet = {
    id: '123',
    name: 'test wallet name',
    cryptos: ['DSM'],
  };
  const testAccount = {
    walletId: '123',
    address: 'address',
    crypto: 'DSM',
    index: 0,
  };
  it('successfully loads and unlock app with password', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win: any) {
        win.chrome = win.chrome || {};
        win.chrome.runtime = {
          sendMessage(_id, msg, callback) {
            if (msg.event === 'ping') {
              callback({ isFirstTimeUser: false });
            } else if (msg.event === 'getWallets') {
              callback({ wallets: [testWallet] });
            } else if (msg.event === 'getAccounts') {
              callback({ accounts: [testAccount] });
            }
          },
        };
      },
    });
    cy.get('input').should('be.visible');
    cy.get('input').type('123123').should('have.value', '123123');
    cy.wait(1000);
    cy.contains('Next').click();
    cy.contains(testWallet.name).should('be.visible');
  });
});
