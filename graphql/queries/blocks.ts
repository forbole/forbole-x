import { gql } from '@apollo/client'

export const getBlocksByPeriod = (crypto: string) => gql`
  query Blocks($from: timestamp!, $to: timestamp! ) @${crypto} {
    fromBlock: block(limit: 1, where: { timestamp: { _gte: $from } }, order_by: { height: asc }) {
      height
      timestamp
    }
    toBlock: block(limit: 1, where: { timestamp: { _lte: $to } }, order_by: { height: desc }) {
      height
      timestamp
    }
  }
`

export const getBlocks = (crypto: string) => gql`
  query Blocks($heights: [bigint!] ) @${crypto} {
    block(where: { height: { _in: $heights } }) {
      height
      timestamp
    }
  }
`
