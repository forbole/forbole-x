import { useState } from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { accountBalanceParser, latestBlockHeightParser } from '../../graphql/parsers/queries'
import { AccountBalance } from '../../models'
import { ACCOUNT_BALANCE, LATEST_BLOCK_HEIGHT } from '../../graphql/queries'
import { formatData } from './utils'

export const useAccountCardHook = (address: string) => {
  const [accountInfo, setAccountInfo] = useState<AccountBalance>(AccountBalance.fromJson({}))

  // ===============================
  // get Desmos data
  // ===============================

  if (address?.substr(0, 6) === 'desmos') {
    const [getAccountBalance] = useLazyQuery(
      gql`
        ${ACCOUNT_BALANCE}
      `,
      {
        onCompleted: (data) => {
          const parsedData = accountBalanceParser(data)
          if (!parsedData) {
            setAccountInfo(AccountBalance.fromJson({}))
          } else {
            setAccountInfo(parsedData)
          }
        },
      }
    )
    useQuery(
      gql`
        ${LATEST_BLOCK_HEIGHT}
      `,
      {
        onCompleted: (data) => {
          const height = latestBlockHeightParser(data)
          if (height) {
            getAccountBalance({
              variables: {
                address,
                height,
              },
            })
          }
        },
      }
    )
    return {
      accountInfo: formatData(accountInfo),
    }
  }
  // TODO: fetch data other then Desmos
  return {}
}
