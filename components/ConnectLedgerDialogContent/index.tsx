import { Box, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import LedgerImage from '../../assets/images/ledger.svg'
import useStyles from './styles'

interface ConnectLedgerDialogContentProps {
  onConnect(transport: any): void
}

const ConnectLedgerDialogContent: React.FC<ConnectLedgerDialogContentProps> = ({ onConnect }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const connectLedger = React.useCallback(async () => {
    const transport = await TransportWebUSB.create()
    onConnect(transport)
  }, [])

  React.useEffect(() => {
    connectLedger()
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
