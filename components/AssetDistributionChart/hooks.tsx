import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { latestBlockHeightParser, delegationInfoParser } from '../../graphql/parsers/queries'
import { DelegationInfo } from '../../models';
import { DELEGATION_INFO, LATEST_BLOCK_HEIGHT } from '../../graphql/queries'
import { formatData } from './utils'

export const useAssetDistributionChart = (address: string) => {
  const [delegationInfo, setDelegationInfo] = useState<DelegationInfo>(DelegationInfo.fromJson({}))
  const router = useRouter()

  // ===============================
  // get data
  // ===============================

  if (address.substr(0, 6) === 'desmos') {
    const [getDelegationInfo] = useLazyQuery(
      gql`
        ${DELEGATION_INFO}
      `,
      {
        onError: (error) => {
          console.log(error.message)
        },
        onCompleted: (data) => {
          console.log('data', data)
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
        onError: (error) => {
          console.log('error', error.message)
        },
        onCompleted: (data) => {
          const height = latestBlockHeightParser(data)
          console.log('height', height)
          if (height) {
            getDelegationInfo({
              variables: {
                address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
                height,
              },
            })
          }
        },
      }
    )
    // console.log('delegationInfo', delegationInfo)
    return {
      delegationInfo: formatData(delegationInfo),
    }
  }
}
