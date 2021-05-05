export const getTransactions = (crypto: string): string => `
subscription Transactions($address: _text) @${crypto} {
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
`
