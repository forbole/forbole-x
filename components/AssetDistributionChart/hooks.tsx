import { useState } from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { latestBlockHeightParser, delegationInfoParser } from '../../graphql/parsers/queries'
import { DelegationInfo } from '../../models'
import { DELEGATION_INFO, LATEST_BLOCK_HEIGHT } from '../../graphql/queries'
import { formatData, summarizedData } from './utils'

export const useAssetDistributionChart = (accounts: Account[]) => {
  const [delegationInfo, setDelegationInfo] = useState<DelegationInfo>(DelegationInfo.fromJson({}))

  // ===============================
  // get data
  // ===============================

  const validatorData = []

  // fake accounts for testing, becuz desmos does not have the latest data now
  // const fakeAccounts: Account[] = [
  //   {
  //     walletId: 'f149b58827224d515a0025f991b240749b4e7927f47c55c7aee0da2d953e9312',
  //     address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
  //     createdAt: 1614826912972,
  //     crypto: 'DSM',
  //     fav: false,
  //     index: 0,
  //     name: 'DSM',
  //     displayName: '',
  //     rpDisplayName: '',
  //     id: '',
  //   },
  //   {
  //     walletId: 'f149b58827224d515a0025f991b240749b4e7927f47c55c7aee0da2d953e9312',
  //     address: 'cosmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
  //     createdAt: 1614826912972,
  //     crypto: 'ATOM',
  //     fav: false,
  //     index: 0,
  //     name: 'ATOM',
  //     displayName: '',
  //     rpDisplayName: '',
  //     id: '',
  //   },
  // ]

  accounts?.forEach((account) => {
    if (account.address.substr(0, 6) === 'desmos') {
      const [getDelegationInfo] = useLazyQuery(
        gql`
          ${DELEGATION_INFO}
        `,
        {
          onCompleted: (data) => {
            const parsedData = delegationInfoParser(data)
            setDelegationInfo(parsedData)
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
  console.log('delegationInfo', summarizedData(validatorData))
  return {
    delegationInfo: summarizedData(validatorData),
    coinInfo: summarizedData(validatorData),
  }
}
