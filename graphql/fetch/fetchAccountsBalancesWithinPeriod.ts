import get from 'lodash/get'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getTokenAmountFromDenoms } from '../../misc/utils'
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
  const denoms = get(availableBalance, 'data.account[0].available[0].tokens_price', [])
  const balance = {
    available: getTokenAmountFromDenoms(
      get(availableBalance, 'data.account[0].available[0].coins', []),
      denoms
    ),
    delegated: getTokenAmountFromDenoms(
      [get(unavailableBalances, 'data.account[0].delegated[0].amount', {})],
      denoms
    ),
    unbonding: getTokenAmountFromDenoms(
      [get(unavailableBalances, 'data.account[0].unbonding[0].amount', {})],
      denoms
    ),
    rewards: getTokenAmountFromDenoms(
      [get(unavailableBalances, 'data.account[0].rewards[0].amount', {})],
      denoms
    ),
    commissions: getTokenAmountFromDenoms(
      [get(unavailableBalances, 'data.account[0].delegated[0].commissions', {})],
      denoms
    ),
  }
  return {
    timestamp: timestamp.getTime(),
    balance,
  }
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

export default fetchAccountsBalancesWithinPeriod
