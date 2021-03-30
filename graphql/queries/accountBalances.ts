import { gql } from '@apollo/client'

export const getAccountBalances = (crypto: string) => gql`
  query AccountBalance($addresses: [String!], $minHeight: bigint, $maxHeight: bigint ) @${crypto} {
    account(where: { address: { _in: $addresses } }) {
      address
      balances: account_balances(where: { height: { _gte: $minHeight, _lte: $maxHeight } }) {
        coins
        height
        block { timestamp }
        token_price {
          denom
          price
          timestamp
        }
      }
    }
  }
`
