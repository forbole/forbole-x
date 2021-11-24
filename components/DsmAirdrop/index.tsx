import { Box, Card, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useSubscription, gql } from '@apollo/client'
import axios from 'axios'
import useStateHistory from '../../misc/useStateHistory'
import { useStyles } from './styles'
import CheckClaimable from './CheckClaimable'
import CreateProfile from './CreateProfile'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getProfile } from '../../graphql/queries/profile'
import { transformChainConnections, transformProfile } from '../../misc/utils'
import { getChainConnections } from '../../graphql/queries/chainConnections'
import ConnectChains from './ConnectChain'
import ClaimableAmount from './ClaimableAmount'
import AirdropResult from './AirdropResult'

interface Content {
  title: string
  content: React.ReactNode
}

export enum CommonStage {
  StartStage = 'start',
  CheckClaimableStage = 'dsm airdrop is claimable',
  CreateProfileStage = 'create profile',
  ConnectChainsStage = 'connect chains',
  ClaimableAmountStage = 'claimable amount',
  AirdropResultStage = 'airdrop result',
}

type Stage = CommonStage

const DsmAirdrop: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { accounts, wallets } = useWalletsContext()

  const [selectedAddress, setSelectedAddress] = React.useState(
    'desmos1tw6cs3rv6s54x6szncpupgd6p7hdtlfemhm545'
  )

  const account = React.useMemo(
    () => accounts.find((acc) => acc.address === selectedAddress),
    [selectedAddress]
  )
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]

  const { data: profileData, loading } = useSubscription(
    gql`
      ${getProfile(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' } }
  )
  const { data: chainConnectionsData } = useSubscription(
    gql`
      ${getChainConnections(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' } }
  )

  const profile = React.useMemo(() => transformProfile(profileData), [profileData])
  const chainConnections = React.useMemo(
    () => transformChainConnections(chainConnectionsData),
    [chainConnectionsData]
  )

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    CommonStage.StartStage
  )

  const [totalDsmAllocated, setTotalDsmAllocated] = useState(0)

  useEffect(() => {
    if (chainConnections.length > 0) {
      const axiosRequests = chainConnections.map((connection) =>
        axios.get(`https://api.airdrop.desmos.network/users/${connection.externalAddress}`)
      )
      axios
        .all(axiosRequests)
        .then(
          axios.spread((...responses) => {
            responses.forEach((res) =>
              setTotalDsmAllocated(totalDsmAllocated + res.data.dsm_allotted)
            )
          })
        )
        .catch((error) => {
          console.log(error)
        })
    }
  }, [chainConnections])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.AirdropResultStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: (
            <AirdropResult
              success={!false}
              amount={totalDsmAllocated}
              onCompleted={() => {
                setStage(CommonStage.StartStage)
              }}
            />
          ),
        }
      case CommonStage.ClaimableAmountStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: (
            <ClaimableAmount
              onConfirm={() => {
                setStage(CommonStage.AirdropResultStage)
              }}
              amount={totalDsmAllocated}
              chainConnections={chainConnections}
            />
          ),
        }
      case CommonStage.ConnectChainsStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: (
            <ConnectChains
              onConfirm={() => {
                setStage(CommonStage.ClaimableAmountStage)
              }}
              account={account}
              profile={profile}
              chainConnections={chainConnections}
            />
          ),
        }
      case CommonStage.CreateProfileStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: (
            <CreateProfile
              onConfirm={() => {
                setStage(CommonStage.ConnectChainsStage)
              }}
              account={account}
              profile={profile}
            />
          ),
        }
      case CommonStage.CheckClaimableStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: (
            <CheckClaimable
              onConfirm={() => {
                if (profile.dtag) {
                  setStage(CommonStage.ConnectChainsStage)
                } else {
                  setStage(CommonStage.CreateProfileStage)
                }
              }}
              profile={profile}
              profileLoading={loading}
            />
          ),
        }
      case CommonStage.StartStage:
      default:
        return {
          title: t('create wallet title'),
          content: (
            <CheckClaimable
              onConfirm={() => setStage(CommonStage.CheckClaimableStage)}
              profileLoading={loading}
              profile={profile}
            />
          ),
        }
    }
  }, [stage, t])

  return (
    <Card>
      <Box className={classes.mainCard}>
        {content.title ? (
          <Typography variant="h4" align="center" className={classes.title}>
            {content.title}
          </Typography>
        ) : null}
        {content.content}
      </Box>
    </Card>
  )
}

export default DsmAirdrop
