import { Box, Card, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useSubscription, gql } from '@apollo/client'
import useStateHistory from '../../misc/useStateHistory'
import { useStyles } from './styles'
import CheckClaimable from './CheckClaimable'
import CreateProfile from './CreateProfile'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getProfile } from '../../graphql/queries/profile'
import { transformProfile } from '../../misc/utils'
import CheckAirdrop from './CheckAirdrop'

interface Content {
  title?: string
  content: React.ReactNode
}

export enum CommonStage {
  StartStage = 'start',
  CheckClaimableStage = 'dsm airdrop is claimable',
  CreateProfileStage = 'create profile',
}

type Stage = CommonStage

const DsmAirdrop: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { accounts, wallets } = useWalletsContext()

  const [selectedAddress, setSelectedAddress] = React.useState('')

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
  const profile = React.useMemo(() => transformProfile(profileData), [profileData])

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    CommonStage.StartStage
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.CreateProfileStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: (
            <CreateProfile
              onConfirm={() => {
                setStage(CommonStage.CheckClaimableStage)
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
                  setStage(CommonStage.CheckClaimableStage)
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
          content: (
            <CheckAirdrop
              onConfirm={() => setStage(CommonStage.CheckClaimableStage)}
              setSelectedAddress={setSelectedAddress}
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
