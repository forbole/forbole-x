import { gql } from '@apollo/client'

export const getBlocksByPeriod = (crypto: string) => gql`
  query Blocks($from: timestamp!, $to: timestamp! ) @${crypto} {
    fromBlock: block(limit: 1, order_by: { height: asc }, where: { timestamp: { _gte: $from } }) {
      height
      timestamp
    }
    toBlock: block(limit: 1, order_by: { height: desc }, where: { timestamp: { _lte: $to } }) {
      height
      timestamp
    }
  }
`
