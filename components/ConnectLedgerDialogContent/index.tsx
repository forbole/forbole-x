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
  ledgerAppName?: string
}

let retryTimeout

const ConnectLedgerDialogContent: React.FC<ConnectLedgerDialogContentProps> = ({
  onConnect,
  ledgerAppName,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const connectLedger = React.useCallback(async () => {
    const transport = await TransportWebHID.create()
    try {
      const ledger = new LaunchpadLedger(transport, { ledgerAppName })
      // Check is ledger app open
      await ledger.getCosmosAppVersion()
      clearTimeout(retryTimeout)
      return onConnect(transport)
    } catch (err) {
      // No specific ledger app required
      if (!ledgerAppName && err.message !== 'Ledger’s screensaver mode is on') {
        clearTimeout(retryTimeout)
        return onConnect(transport)
      }
      // Ledger is connected previously. Close the previous connections
      if (err.message === 'The device is already open.') {
        closeAllLedgerConnections()
      }
      retryTimeout = setTimeout(connectLedger, 1000)
      return null
    }
  }, [ledgerAppName])

  React.useEffect(() => {
    connectLedger()
    return () => clearTimeout(retryTimeout)
  }, [connectLedger])

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogTitle>{t('connect ledger')}</DialogTitle>
      <DialogContentText>{t('connect ledger description')}</DialogContentText>
      <Box display="flex" flexDirection="column" alignItems="center" mb={6}>
        <LedgerImage />
        <Box mt={4}>
          <Typography>
            {ledgerAppName
              ? t('open ledger app instruction', { ledgerAppName })
              : t('connect ledger instruction')}
          </Typography>
        </Box>
      </Box>
    </DialogContent>
  )
}

export default ConnectLedgerDialogContent
