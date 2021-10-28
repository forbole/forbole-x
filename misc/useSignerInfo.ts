import React from 'react'
import { SigningStargateClient } from '@cosmjs/stargate'
import cryptocurrencies from './cryptocurrencies'

const useSignerInfo = (account: Account) => {
  const [signerInfo, setSignerInfo] = React.useState({})

  const getSequenceAndChainId = React.useCallback(
    async (address: string, crypto: string): Promise<any> => {
      const client = await SigningStargateClient.connect(cryptocurrencies[crypto].rpcApiUrl)
      const { accountNumber, sequence } = await client.getSequence(address)
      const chainId = await client.getChainId()
      setSignerInfo({ accountNumber, sequence, chainId })
    },
    []
  )

  React.useEffect(() => {
    if (account) {
      getSequenceAndChainId(account.address, account.crypto)
    }
  }, [account])

  return signerInfo
}

export default useSignerInfo
