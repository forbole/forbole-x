import { gql } from '@apollo/client'

export const ACCOUNTS_BALANCES = gql`
  subscription AccountBalance($addresses: [String!]) {
    account(where: { address: { _in: $addresses } }) {
      address
      available: account_balances {
        coins
      }
    }
  }
`
