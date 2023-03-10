const getTransactions = (crypto: string): string => `
query Transactions($address: _text) @api(name: ${crypto}bdjuno) {
  messages_by_address(args: {addresses: $address, types: "{}"}) {
    type
    value
    transaction_hash
    transaction {
      block {
        timestamp
      }
      success
    }
  }
}
`;

export default getTransactions;
