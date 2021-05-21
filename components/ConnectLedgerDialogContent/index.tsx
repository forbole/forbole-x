import { Box, DialogContent, DialogContentText, Typography } from '@material-ui/core'
import { Cosmos } from 'ledger-app-cosmos'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import LedgerImage from '../../assets/images/ledger.svg'
import { connectLedger } from '../../misc/ledger'
import useStyles from './styles'

interface ConnectLedgerDialogContentProps {
  onConnect(ledgerApp: Cosmos): void
}

const ConnectLedgerDialogContent: React.FC<ConnectLedgerDialogContentProps> = ({ onConnect }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const connect = React.useCallback(async () => {
    const ledgerApp = await connectLedger()
    onConnect(ledgerApp)
  }, [])

  React.useEffect(() => {
    connect()
  }, [])

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

export default ConnectLedgerDialogContent
