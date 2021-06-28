import cryptocurrencies from '../../misc/cryptocurrencies'
import { getTotalTokenAmount, transformGqlAcountBalance } from '../../misc/utils'
import { getBalance } from '../queries/accountBalances'

const fetchAccountBalance = async (address: string, crypto: string): Promise<TokenAmount> => {
  const balance = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getBalance(crypto),
      variables: { address },
    }),
  }).then((r) => r.json())

  return getTotalTokenAmount(transformGqlAcountBalance(balance.data, Date.now())).amount
}

export default fetchAccountBalance
