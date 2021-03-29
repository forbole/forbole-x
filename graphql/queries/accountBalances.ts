import { gql } from '@apollo/client'

export const getAccountBalances = (crypto: string) => gql`
  query AccountBalance($addresses: [String!], $minHeight: bigint, $maxHeight: bigint ) @${crypto} {
    account(where: { address: { _in: $addresses } }) {
      address
      available: account_balances(where: { height: { _gte: $minHeight, _lte: $maxHeight } }) {
        coins
        height
      }
    }
  }
`
