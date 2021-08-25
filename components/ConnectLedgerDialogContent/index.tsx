import { Box, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { LaunchpadLedger } from '@cosmjs/ledger-amino'
import LedgerImage from '../../assets/images/ledger.svg'
import useStyles from './styles'
import { closeAllLedgerConnections } from '../../misc/utils'

interface ConnectLedgerDialogContentProps {
  onConnect(transport: any): void
}

let retryTimeout

const ConnectLedgerDialogContent: React.FC<ConnectLedgerDialogContentProps> = ({ onConnect }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const connectLedger = React.useCallback(async () => {
    try {
      const transport = await TransportWebHID.create()
      const ledger = new LaunchpadLedger(transport)
      // Check is ledger app open
      await ledger.getCosmosAppVersion()
      clearTimeout(retryTimeout)
      onConnect(transport)
    } catch (err) {
      // Ledger is connected previously. Close the previous connections
      if (err.message === 'The device is already open.') {
        closeAllLedgerConnections()
      }
      retryTimeout = setTimeout(connectLedger, 1000)
    }
  }, [])

  React.useEffect(() => {
    connectLedger()
    return () => clearTimeout(retryTimeout)
  }, [])

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogTitle>{t('connect ledger')}</DialogTitle>
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
