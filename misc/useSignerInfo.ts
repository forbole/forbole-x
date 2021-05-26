import React from 'react'
import sendMsgToChromeExt from './sendMsgToChromeExt'

const useSignerInfo = (account: Account) => {
  const [signerInfo, setSignerInfo] = React.useState({})

  React.useEffect(() => {
    sendMsgToChromeExt({
      event: 'getSequenceAndChainId',
      data: {
        address: account.address,
        crypto: account.crypto,
      },
    }).then((result) => setSignerInfo(result))
  }, [account])

  return signerInfo
}

export default useSignerInfo
