import cryptocurrencies from '../../misc/cryptocurrencies'
import { getTotalTokenAmount, transformGqlAcountBalance } from '../../misc/utils'
import { getBalance } from '../queries/accountBalances'

const fetchAccountBalance = async (
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

export default fetchAccountBalance
