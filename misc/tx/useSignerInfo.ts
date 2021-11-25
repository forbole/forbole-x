import React from 'react'
import { SigningStargateClient } from '@cosmjs/stargate'
import cryptocurrencies from '../cryptocurrencies'

const useSignerInfo = (
  account: Account
): { accountNumber: number; sequence: number; chainId: string } => {
  const [signerInfo, setSignerInfo] = React.useState({ accountNumber: 0, sequence: 0, chainId: '' })

  const getSequenceAndChainId = React.useCallback(
    async (address: string, crypto: string): Promise<any> => {
      try {
        const client = await SigningStargateClient.connect(cryptocurrencies[crypto].rpcApiUrl)
        const { accountNumber, sequence } = await client.getSequence(address)
        const chainId = await client.getChainId()
        setSignerInfo({ accountNumber, sequence, chainId })
      } catch (err) {
        console.log(err)
      }
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
