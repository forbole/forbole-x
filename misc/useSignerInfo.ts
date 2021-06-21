import React from 'react'
import { SigningStargateClient } from '@cosmjs/stargate'
import sendMsgToChromeExt from './sendMsgToChromeExt'
import cryptocurrencies from './cryptocurrencies'

const getSequenceAndChainId = async (address: string, crypto: string): Promise<any> => {
  const client = await SigningStargateClient.connect(cryptocurrencies[crypto].rpcEndpoint)
  const { accountNumber, sequence } = await client.getSequence(address)
  const chainId = await client.getChainId()
  return { accountNumber, sequence, chainId }
}

const useSignerInfo = (account: Account) => {
  const [signerInfo, setSignerInfo] = React.useState({})

  React.useEffect(() => {
    if (account) {
      getSequenceAndChainId(account.address, account.crypto).then((result) => setSignerInfo(result))
    }
  }, [account])

  return signerInfo
}

export default useSignerInfo
