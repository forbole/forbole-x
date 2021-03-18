import { useState, useMemo } from 'react'
import groupBy from 'lodash/groupBy'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { latestBlockHeightParser, assetInfoParser } from '../graphql/parsers/queries'
import { AssetInfo } from '../models'
import { ASSET_INFO, LATEST_BLOCK_HEIGHT } from '../graphql/queries'
import { formatData, summarizedData, formatEmptyData } from './utils'
import { useWalletsContext } from '../contexts/WalletsContext'

export const useAccountInfo = () => {
  const { wallets, accounts } = useWalletsContext()
  const [assetInfo, setAssetInfo] = useState<AssetInfo>(AssetInfo.fromJson({}))

  const accountsMap = useMemo(() => groupBy(accounts, 'walletId'), [accounts])
  // ===============================
  // get data
  // ===============================


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
  //     walletId: '4414aa6596c89670e415f300da10210cffa002919d99ee63aa052f9f843d6bba',
  //     address: 'sol1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg9d',
  //     createdAt: 1614826912972,
  //     crypto: 'SOL',
  //     fav: false,
  //     index: 0,
  //     name: 'SOL',
  //     displayName: '',
  //     rpDisplayName: '',
  //     id: '',
  //   },
  //   {
  //     walletId: '4414aa6596c89670e415f300da10210cffa002919d99ee63aa052f9f843d6bba',
  //     address: 'cosmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
  //     createdAt: 1614826912973,
  //     crypto: 'ATOM',
  //     fav: false,
  //     index: 0,
  //     name: 'ATOM',
  //     displayName: '',
  //     rpDisplayName: '',
  //     id: '',
  //   },
  // ]

  const assetData = []
  accounts.forEach((account) => {
    console.log('single_account', account)
    if (account.address.substr(0, 6) === 'desmos') {
      const [getDelegationInfo] = useLazyQuery(
        gql`
          ${ASSET_INFO}
        `,
        {
          onCompleted: (data) => {
            const parsedData = assetInfoParser(data, account)
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
      assetData.push(assetInfo ? formatData(assetInfo, account) : formatEmptyData(account))
    } else {
      assetData.push(formatEmptyData(account))
    }
  })
  return {
    accountBalance: assetData,
    assetData: summarizedData(assetData),
  }
}
