import React from 'react'
import get from 'lodash/get'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { transformGqlAcountBalance } from '../../misc/utils'
import { getAvailableBalance, getUnavailableBalancesByHeight } from '../queries/accountBalances'

const fetchBalance = async (address: string, crypto: string, timestamp: Date) => {
  const availableBalance = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getAvailableBalance(crypto),
      variables: { address, timestamp },
    }),
  }).then((r) => r.json())
  const unavailableBalances = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getUnavailableBalancesByHeight(crypto),
      variables: {
        address,
        height: get(availableBalance, 'data.account[0].available[0].height', 0),
      },
    }),
  }).then((r) => r.json())
  return transformGqlAcountBalance(
    // Merge availableBalance and unavailableBalances
    {
      account: [
        {
          ...get(availableBalance, 'data.account[0]', []),
          ...get(unavailableBalances, 'data.account[0]', []),
        },
      ],
    },
    timestamp.getTime()
  )
}

const fetchAccountsBalancesWithinPeriod = async (
  accounts: Account[],
  timestamps: Date[]
): Promise<AccountWithBalance[]> => {
  const results = await Promise.all(
    accounts.map((a) => Promise.all(timestamps.map((t) => fetchBalance(a.address, a.crypto, t))))
  )
  return accounts.map((a, i) => ({
    ...a,
    balances: results[i],
  }))
}

const useAccountsBalancesWithinPeriod = (
  accounts: Account[],
  timestamps: Date[]
): { data: AccountWithBalance[]; loading: boolean } => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<AccountWithBalance[]>([])

  const getWalletsWithBalance = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await fetchAccountsBalancesWithinPeriod(accounts, timestamps)
      setData(result)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [accounts.length, timestamps])

  React.useEffect(() => {
    getWalletsWithBalance()
  }, [getWalletsWithBalance])

  return { data, loading }
}

export default useAccountsBalancesWithinPeriod
