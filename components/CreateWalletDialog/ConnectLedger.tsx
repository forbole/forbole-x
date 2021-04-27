import { Box, DialogContent, DialogContentText, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import LedgerImage from '../../assets/images/ledger.svg'
import useStyles from './styles'

interface ConnectLedgerProps {
  onConnect(address: string): void
}

const ConnectLedger: React.FC<ConnectLedgerProps> = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogContentText>{t('connect ledger description')}</DialogContentText>
      <Box display="flex" flexDirection="column" alignItems="center" mb={6}>
        <LedgerImage />
        <Box mt={4}>
          <Typography>{t('connect ledger instruction')}</Typography>
        </Box>
      </Box>
    </DialogContent>
  )
}

export default ConnectLedger
