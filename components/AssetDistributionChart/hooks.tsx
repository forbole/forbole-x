import { useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { latestBlockHeightParser, delegationInfoParser } from '../../graphql/parsers/queries'
import { DelegationInfo } from '../../models'
import { DELEGATION_INFO, LATEST_BLOCK_HEIGHT } from '../../graphql/queries'
import { formatData, summarizedData } from './utils'

export const useAssetDistributionChart = (accounts: Account[]) => {
  const [delegationInfo, setDelegationInfo] = useState<DelegationInfo>(DelegationInfo.fromJson({}))
  const router = useRouter()

  // ===============================
  // get data
  // ===============================

  const validatorData = []

  // fake accounts for testing, becuz desmos does not have the latest data now
  // const fakeAccounts = [
  //   {
  //     address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
  //     createdAt: 0,
  //     crypto: 'DSM',
  //     fav: false,
  //     index: 0,
  //     name: 'DSM',
  //     walletId: '',
  //   },
  //   {
  //     address: 'cosmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
  //     createdAt: 0,
  //     crypto: 'ATOM',
  //     fav: false,
  //     index: 0,
  //     name: 'ATOM',
  //     walletId: '',
  //   },
  // ]

  accounts.forEach((account) => {
    // todo: integrate ATOM data
    if (account.address.substr(0, 6) === 'desmos') {
      const [getDelegationInfo] = useLazyQuery(
        gql`
          ${DELEGATION_INFO}
        `,
        {
          onCompleted: (data) => {
            const parsedData = delegationInfoParser(data)
            if (!parsedData) {
              router.push('/404')
            } else {
              setDelegationInfo(parsedData)
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
              getDelegationInfo({
                variables: {
                  address: account.address,
                  height,
                },
              })
            }
          },
        }
      )
      validatorData.push(formatData(delegationInfo))
    }
  })

  return {
    assetInfo: summarizedData(validatorData),
  }
}
