import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import keyBy from 'lodash/keyBy'
import { getAccountBalances } from '../queries/accountBalances'
import { getBlocks, getBlocksByPeriod } from '../queries/blocks'

const useAccountBalancesWithinPeriod = (from: Date, to: Date) => {
  const { data: blockPeriod } = useQuery(getBlocksByPeriod('DSM'), {
    variables: {
      from,
      to,
    },
  })
  const { data: balances } = useQuery(getAccountBalances('DSM'), {
    variables: {
      addresses: ['desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6'],
      minHeight: get(blockPeriod, 'fromBlock[0].height', 0),
      maxHeight: get(blockPeriod, 'toBlock[0].height', 0),
    },
  })
  const blockHeights = uniq(
    flatten(get(balances, 'account', []).map((b) => b.available.map((a) => a.height)))
  )
  const { data: blocks } = useQuery(getBlocks('DSM'), {
    variables: {
      heights: blockHeights,
    },
  })
  const blockMap = keyBy(get(blocks, 'block', []), 'height')
  const result = get(balances, 'account', []).map((a) => ({
    ...a,
    available: a.available.map((av) => ({
      ...av,
      timestamp: get(blockMap, `[${av.height}].timestamp`),
    })),
  }))
  return result
}

export default useAccountBalancesWithinPeriod
