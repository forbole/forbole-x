import { Box, Card, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useSubscription, gql } from '@apollo/client'
import axios from 'axios'
import get from 'lodash/get'
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
import CheckAirdrop from './CheckAirdrop'
import connectableChains from '../../misc/connectableChains'

interface Content {
  title?: string
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

  const [selectedAddress, setSelectedAddress] = React.useState('')
  const [externalAddress, setExternalAddress] = React.useState('')

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
  const { data: chainConnectionsData, loading: chainConnectionsLoading } = useSubscription(
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
  const [totalDsmAllocatedLoading, setTotalDsmAllocatedLoading] = useState(false)
  const [airdropResponse, setAirdropResponse] = useState('')

  const [claimSuccess, setClaimSuccess] = useState(false)
  const [airdropConfig, setAirdropConfig] = useState({ airdrop_enabled: false })

  const claimAirdrop = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/airdrop/claims`,
        {
          desmos_address: selectedAddress,
        }
      )
      setClaimSuccess(true)
      setAirdropResponse(res.data)
    } catch (err) {
      setClaimSuccess(false)
      setAirdropResponse(err.response.data)
    }
  }

  useEffect(() => {
    if (chainConnections.length > 0) {
      setTotalDsmAllocatedLoading(true)
      const axiosRequests = chainConnections.map((connection) =>
        axios.get(
          `${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/users/${connection.externalAddress}`
        )
      )
      axios
        .all(axiosRequests)
        .then(
          axios.spread((...responses) => {
            responses.forEach((res, i) => {
              const chainClaimableAmount = [
                ...(res.data.staking_infos ?? []),
                ...(res.data.lp_infos ?? []),
              ]
                .filter(
                  (chain) =>
                    !chain.claimed &&
                    chainConnections[i].externalAddress === chain.address &&
                    // HACK: likecoin has same address as cosmos
                    (chainConnections[i].chainName === 'likecoin'
                      ? chain.chain_name === 'Likecoin'
                      : true)
                )
                .reduce((a, b) => a + b.dsm_allotted, 0)
              return setTotalDsmAllocated((total) => total + chainClaimableAmount)
            })
            setTotalDsmAllocatedLoading(false)
          })
        )
        .catch((error) => {
          console.log(error)
          // setTotalDsmAllocatedLoading(false)
        })
    }
  }, [chainConnections])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/config`)
      .then((r) => r.json())
      .then(setAirdropConfig)
  }, [])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.AirdropResultStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: (
            <AirdropResult
              success={claimSuccess}
              airdropResponse={airdropResponse}
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
              onConfirm={async () => {
                await claimAirdrop()
                setStage(CommonStage.AirdropResultStage)
              }}
              amount={totalDsmAllocated}
              chainConnections={chainConnections}
              loading={totalDsmAllocatedLoading}
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
                if (!profile.dtag) {
                  setStage(CommonStage.CreateProfileStage)
                } else if (chainConnections.length === 0) {
                  setStage(CommonStage.ConnectChainsStage)
                } else {
                  setStage(CommonStage.ClaimableAmountStage)
                }
              }}
              profile={profile}
              account={account}
              externalAddress={externalAddress}
              chainConnections={chainConnections}
              profileLoading={loading}
              chainConnectionsLoading={chainConnectionsLoading}
            />
          ),
        }
      case CommonStage.StartStage:
      default:
        return {
          content: (
            <CheckAirdrop
              onConfirm={() => setStage(CommonStage.CheckClaimableStage)}
              setSelectedAddress={setSelectedAddress}
              claimEnabled={airdropConfig.airdrop_enabled}
              externalAddress={externalAddress}
              setExternalAddress={setExternalAddress}
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
