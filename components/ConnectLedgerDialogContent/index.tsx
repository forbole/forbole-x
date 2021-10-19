import { Box, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { LaunchpadLedger } from '@cosmjs/ledger-amino'
import LedgerImage from '../../assets/images/ledger.svg'
import LedgerSignImage from '../../assets/images/sign_ledger.svg'
import LedgerSignPinImage from '../../assets/images/sign_ledger_with_PIN.svg'
import LedgerOpenAppImage from '../../assets/images/ledger_open_app.svg'
import LedgerViewTxImage from '../../assets/images/ledger_view_tx.svg'
import LedgerSignTxImage from '../../assets/images/ledger_sign_tx.svg'
import useStyles from './styles'
import { closeAllLedgerConnections } from '../../misc/utils'

interface ConnectLedgerDialogContentProps {
  onConnect(transport: any): void
  ledgerAppName?: string
  signTransaction?: boolean
  isTxSigned?: boolean
}

const signInstructions = [
  {
    image: [LedgerSignImage, LedgerSignPinImage],
    description: 'sign ledger instruction 1',
  },
  {
    image: LedgerOpenAppImage,
    description: 'open ledger app instruction',
  },
  {
    image: [LedgerViewTxImage, LedgerSignTxImage],
    description: 'sign ledger instruction 2',
  },
  {
    image: LedgerSignTxImage,
    description: 'sign ledger instruction 3',
  },
]

let retryTimeout

const ConnectLedgerDialogContent: React.FC<ConnectLedgerDialogContentProps> = ({
  onConnect,
  ledgerAppName,
  signTransaction,
  isTxSigned,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [instruction, setInstruction] = React.useState(signInstructions[0])

  const connectLedger = React.useCallback(async () => {
    let transport
    try {
      transport = await TransportWebHID.create()
      const ledger = new LaunchpadLedger(transport, { ledgerAppName })
      // Check if ledger app is open
      await ledger.getCosmosAppVersion()
      setInstruction(signInstructions[1])
      clearTimeout(retryTimeout)
      onConnect(transport)
      setInstruction(signInstructions[2])
    } catch (err) {
      if (err.name === 'TransportOpenUserCancelled') {
        // Ledger app is opened already
        setInstruction(signInstructions[0])
        retryTimeout = setTimeout(connectLedger, 1000)
      } else if (
        err.message === 'Please close OLOS and open the Desmos Ledger app on your Ledger device.'
      ) {
        setInstruction(signInstructions[1])
        retryTimeout = setTimeout(connectLedger, 1000)
      } else if (err.message === 'The device is already open.') {
        // Ledger is connected previously. Close the previous connections
        closeAllLedgerConnections()
        setInstruction(signInstructions[1])
        retryTimeout = setTimeout(connectLedger, 1000)
        // No specific ledger app required
      } else if (!ledgerAppName && err.message !== 'Ledger’s screensaver mode is on') {
        setInstruction(signInstructions[0])
        clearTimeout(retryTimeout)
        onConnect(transport)
      } else {
        retryTimeout = setTimeout(connectLedger, 1000)
      }
    }
  }, [ledgerAppName])

  React.useEffect(() => {
    connectLedger()
    return () => clearTimeout(retryTimeout)
  }, [connectLedger])

  React.useEffect(() => {
    if (isTxSigned) {
      setInstruction(signInstructions[3])
    }
  }, [isTxSigned])

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogTitle>{t('connect ledger')}</DialogTitle>
      <DialogContentText>{t('connect ledger description')}</DialogContentText>
      <Box display="flex" flexDirection="column" alignItems="center" mb={6}>
        {signTransaction ? (
          <>
            {instruction.image instanceof Array ? (
              <Carousel indicators={false} interval={3000}>
                {instruction.image.map((item, i) => {
                  const Svg = item
                  return <Svg key={i} item={item} />
                })}
              </Carousel>
            ) : (
              <instruction.image />
            )}
            <Box mt={4}>
              <Typography align="center">
                {ledgerAppName
                  ? t(instruction.description, { ledgerAppName })
                  : t('connect ledger instruction')}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <LedgerImage />
            <Box mt={4}>
              <Typography>
                {ledgerAppName
                  ? t('open ledger app instruction', { ledgerAppName })
                  : t('connect ledger instruction')}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </DialogContent>
  )
}

export default ConnectLedgerDialogContent
