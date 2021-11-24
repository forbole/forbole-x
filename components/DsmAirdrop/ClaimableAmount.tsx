import { Box, Button, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import axios from 'axios'
import useStyles from './styles'
import { formatCurrency, getTokenAmountBalance } from '../../misc/utils'
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
            {amount} DSM
          </Typography>
          <Button
            fullWidth
            color="primary"
            className={classes.button}
            variant="contained"
            type="submit"
          >
            Claim Now
          </Button>
          <Link href="/">
            <Button fullWidth className={classes.secondaryButton} variant="outlined">
              Claim Later
            </Button>
          </Link>
        </Box>
      </Box>
    </form>
  )
}

export default ClaimableAmount
