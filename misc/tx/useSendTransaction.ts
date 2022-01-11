import React from 'react'
import invoke from 'lodash/invoke'
import qs from 'query-string'
import { useRouter } from 'next/router'
import lzutf8 from 'lzutf8'
import useIsChromeExt from '../useIsChromeExt'

const useSendTransaction = (): ((
  password: string,
  address: string,
  tx: { msgs: TransactionMsg[]; memo: string }
) => Promise<void>) => {
  const router = useRouter()
  const { isChromeExt } = useIsChromeExt()

  const sendTransaction = React.useCallback(
    async (
      password: string,
      address: string,
      transactionData: { msgs: TransactionMsg[]; memo: string }
    ) => {
      const compressedTxData = lzutf8.compress(JSON.stringify(transactionData), {
        outputEncoding: 'Base64',
      })
      if (isChromeExt) {
        const { url, query: currentQuery } = qs.parseUrl(router.asPath)
        const query = {
          ...currentQuery,
          password,
          address,
          transactionData: compressedTxData,
        }
        router.push(qs.stringifyUrl({ url, query }))
      } else {
        await invoke(window, 'forboleX.sendTransaction', password, address, compressedTxData)
      }
    },
    [isChromeExt, router]
  )
  return sendTransaction
}

export default useSendTransaction
