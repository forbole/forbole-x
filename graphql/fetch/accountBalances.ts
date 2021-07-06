import get from 'lodash/get'
import cryptocurrencies from '../../misc/cryptocurrencies'
import {
  getTokenAmountFromDenoms,
  getTotalTokenAmount,
  sumTokenAmounts,
  transformGqlAcountBalance,
} from '../../misc/utils'
import { getBalance, getDelegatedBalance } from '../queries/accountBalances'

export const fetchAccountBalance = async (
  address: string,
  crypto: string,
  availableBalanceOnly?: boolean
): Promise<{
  accountBalance: {
    available: TokenAmount
    delegated: TokenAmount
    rewards: TokenAmount
    commissions: TokenAmount
    unbonding: TokenAmount
  }
  total: TokenAmount
}> => {
  const balance = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getBalance(crypto, availableBalanceOnly),
      variables: { address },
    }),
  }).then((r) => r.json())
  const accountBalance = transformGqlAcountBalance(balance.data, Date.now())
  return {
    accountBalance: accountBalance.balance,
    total: getTotalTokenAmount(accountBalance).amount,
  }
}

export const fetchBalancesByValidators = async (
  address: string,
  crypto: string
): Promise<{
  [moniker: string]: {
    amount: TokenAmount
    moniker: string
    avatar: string
  }
}> => {
  const balance = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getDelegatedBalance(crypto),
      variables: { address },
    }),
  }).then((r) => r.json())
  const result = {}
  get(balance, 'data.account[0].delegated', []).forEach((d) => {
    const moniker = get(d, 'validator.validator_descriptions[0].moniker', '')
    const avatar = get(d, 'validator.validator_descriptions[0].avatar_url', '')
    const amount = getTokenAmountFromDenoms(
      [d.amount],
      get(balance, 'data.account[0].available[0].tokens_prices', [])
    )
    result[moniker] = {
      moniker,
      avatar,
      amount: sumTokenAmounts([get(result, `${moniker}.amount`, {}), amount]),
    }
  })
  return result
}
