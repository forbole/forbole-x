import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { userInfoParser, latestBlockHeightParser } from '../../graphql/parsers/queries'
import { UserInfo } from '../../models';
import { USER_INFO, LATEST_BLOCK_HEIGHT } from '../../graphql/queries'
import { formatData } from './utils';

export const useAccountCardHook = (address: string) => {
  const [accountInfo, setAccountInfo] = useState<UserInfo>(UserInfo.fromJson({}))
  const router = useRouter()

  // ===============================
  // get data
  // ===============================

  if (address.substr(0, 6) === 'desmos') {
    const [getUserInfo] = useLazyQuery(
      gql`
        ${USER_INFO}
      `,
      {
        onError: (error) => {
          console.log(error.message)
        },
        onCompleted: (data) => {
          // console.log('data', data)
          const parsedData = userInfoParser(data)
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
        onError: (error) => {
          // console.log('error', error.message)
        },
        onCompleted: (data) => {
          // console.log('complete')
          const height = latestBlockHeightParser(data)
          // console.log('height', height)
          if (height) {
            getUserInfo({
              variables: {
                address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
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
}
