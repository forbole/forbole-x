import { Box, Button, CircularProgress, Typography, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import axios from 'axios'
import useStyles from './styles'
import { formatCrypto, formatCurrency, getTokenAmountBalance } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'
import AirdropEligibilityDetails from './AirdropEligibilityDetails'

interface ClaimableAmountProps {
  onConfirm(): void
  amount: number
  chainConnections: ChainConnection[]
  loading: boolean
  setIsConnectChainDialogOpen(open: boolean): void
  externalAddress: string
}

const ClaimableAmount: React.FC<ClaimableAmountProps> = ({
  onConfirm,
  amount,
  chainConnections,
  loading,
  setIsConnectChainDialogOpen,
  externalAddress,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const theme = useTheme()

  const [onClaimLoading, setOnClaimLoading] = React.useState(false)

  const [dataStakingInfo, setDataStakingInfo] = React.useState()
  const [lpInfos, setLpInfos] = React.useState()

  const verify = React.useCallback(async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/users/${externalAddress}`
      ).then((r) => r.json())
      // eslint-disable-next-line camelcase
      const { staking_infos, dsm_allotted, lp_infos } = data
      setDataStakingInfo(staking_infos)
      setLpInfos(lp_infos)
    } catch (err) {
      console.log(err)
    }
  }, [externalAddress])

  React.useEffect(() => {
    verify()
  }, [])

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        setOnClaimLoading(true)
        await onConfirm()
      }}
    >
      <Box display="flex" justifyContent="center">
        <Box className={classes.stageContent}>
          <Typography align="center">{t('amount claimable title')}</Typography>
          <Typography align="center" variant="h1" className={classes.claimableAmount}>
            {loading ? <CircularProgress /> : formatCrypto(amount, 'DSM', lang)}
          </Typography>
          <Box mb={8}>
            <AirdropEligibilityDetails lpInfos={lpInfos} dataStakingInfo={dataStakingInfo} />
          </Box>
          <Button
            fullWidth
            color="primary"
            className={classes.button}
            variant="contained"
            type="submit"
          >
            {onClaimLoading ? (
              <CircularProgress color="inherit" size={theme.spacing(3)} />
            ) : (
              t('claim now')
            )}
          </Button>
          <Button
            onClick={() => setIsConnectChainDialogOpen(true)}
            fullWidth
            className={classes.secondaryButton}
            variant="outlined"
          >
            {t('connect more accounts')}
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default ClaimableAmount
