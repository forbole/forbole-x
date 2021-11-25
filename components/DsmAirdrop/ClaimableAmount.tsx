import { Box, Button, CircularProgress, Typography, useTheme } from '@material-ui/core'
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
}

const ClaimableAmount: React.FC<ClaimableAmountProps> = ({
  onConfirm,
  amount,
  chainConnections,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const theme = useTheme()

  const [loading, setLoading] = React.useState(false)

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        setLoading(true)
        await onConfirm()
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
            disabled={loading || amount <= 0}
          >
            {loading ? <CircularProgress size={theme.spacing(3)} /> : t('claim now')}
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
