import React from 'react'
import invoke from 'lodash/invoke'
import qs from 'query-string'
import { useRouter } from 'next/router'
import useIsChromeExt from '../useIsChromeExt'

const useSendTransaction = (): ((
  password: string,
  address: string,
  tx: { msgs: TransactionMsg[]; memo: string },
  granter?: string
) => Promise<void>) => {
  const router = useRouter()
  const { isChromeExt } = useIsChromeExt()

  const sendTransaction = React.useCallback(
    async (
      password: string,
      address: string,
      transactionData: { msgs: TransactionMsg[]; memo: string },
      granter?: string
    ) => {
      if (isChromeExt) {
        const { url, query: currentQuery } = qs.parseUrl(router.asPath)
        const query = {
          ...currentQuery,
          password,
          address,
          transactionData: JSON.stringify(transactionData),
          granter,
        }
        router.push(qs.stringifyUrl({ url, query }))
      } else {
        await invoke(
          window,
          'forboleX.sendTransaction',
          password,
          address,
          transactionData,
          granter
        )
      }
    },
    [isChromeExt, router]
  )
  return sendTransaction
}

export default useSendTransaction
