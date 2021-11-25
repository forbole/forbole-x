import { Box, Button, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import axios from 'axios'
import useStyles from './styles'
import { formatCrypto, formatCurrency, getTokenAmountBalance } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface ClaimableAmountProps {
  onConfirm(): void
  amount: number
  chainConnections: ChainConnection[]
  onConnectChains: () => void
}

const ClaimableAmount: React.FC<ClaimableAmountProps> = ({
  onConfirm,
  amount,
  chainConnections,
  onConnectChains,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onConfirm()
      }}
    >
      <Box display="flex" justifyContent="center">
        <Box className={classes.stageContent}>
          <Typography align="center">{t('amount claimable title')}</Typography>
          <Typography align="center" variant="h1" className={classes.claimableAmount}>
            {formatCrypto(amount, 'DSM', lang)}
          </Typography>
          <Button
            fullWidth
            color="primary"
            className={classes.button}
            variant="contained"
            type="submit"
            // disabled={amount <= 0}
          >
            {t('claim now')}
          </Button>
          <Button
            fullWidth
            className={classes.secondaryButton}
            variant="outlined"
            onClick={onConnectChains}
          >
            Connect To More Chains
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default ClaimableAmount
