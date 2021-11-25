import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
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
  loading: boolean
}

const ClaimableAmount: React.FC<ClaimableAmountProps> = ({
  onConfirm,
  amount,
  chainConnections,
  loading,
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
            {loading ? <CircularProgress /> : formatCrypto(amount, 'DSM', lang)}
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
          <Link href="/">
            <Button fullWidth className={classes.secondaryButton} variant="outlined">
              {t('claim later')}
            </Button>
          </Link>
        </Box>
      </Box>
    </form>
  )
}

export default ClaimableAmount
