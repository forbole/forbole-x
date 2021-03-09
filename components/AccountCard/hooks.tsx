import { useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { accountBalanceParser, latestBlockHeightParser } from '../../graphql/parsers/queries'
import { AccountBalance } from '../../models'
import { ACCOUNT_BALANCE, LATEST_BLOCK_HEIGHT } from '../../graphql/queries'
import { formatData } from './utils'

export const useAccountCardHook = (address: string) => {
  const [accountInfo, setAccountInfo] = useState<AccountBalance>(AccountBalance.fromJson({}))
  const router = useRouter()

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
            router.push('/404')
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
                // for testing
                // address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
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
