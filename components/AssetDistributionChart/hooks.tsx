import { useState } from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { latestBlockHeightParser, assetInfoParser } from '../../graphql/parsers/queries'
import { AssetInfo } from '../../models'
import { ASSET_INFO, LATEST_BLOCK_HEIGHT } from '../../graphql/queries'
import { formatData, summarizedData } from './utils'

export const useAssetDistributionChart = (accounts: Account[]) => {
  const [assetInfo, setAssetInfo] = useState<AssetInfo>(AssetInfo.fromJson({}))

  // ===============================
  // get data
  // ===============================

  const [accountsTest] = useState<Account[]>(accounts)

  const assetData = []

  accountsTest.forEach((account) => {
    if (account.address.substr(0, 6) === 'desmos') {
      const [getDelegationInfo] = useLazyQuery(
        gql`
          ${ASSET_INFO}
        `,
        {
          onCompleted: (data) => {
            const parsedData = assetInfoParser(data)
            setAssetInfo(parsedData)
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
      assetData.push(formatData(assetInfo, account.crypto))
    }
  })

  console.log('summarizedData(assetData)', summarizedData(assetData))
  return {
    // accountBalance: assetData,
    assetData: summarizedData(assetData),
  }
}
