import { Dialog, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import cryptocurrencies from '../../misc/cryptocurrencies'
import getWalletAddress from '../../misc/tx/getWalletAddress'
import useIsMobile from '../../misc/useIsMobile'

interface ShowAddressOnLedgerDialogProps {
  account: Account
  open: boolean
  onClose(): void
}

const ShowAddressOnLedgerDialog: React.FC<ShowAddressOnLedgerDialogProps> = ({
  account,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()

  const isMobile = useIsMobile()

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <ConnectLedgerDialogContent
        account={account}
        onConnect={async (transport) => {
          const crypto = cryptocurrencies[account.crypto]
          await getWalletAddress(
            '',
            {
              coinType: crypto.coinType,
              account: account.account,
              change: account.change,
              index: account.index,
              prefix: crypto.prefix,
              ledgerAppName: crypto.ledgerAppName,
            },
            transport,
            true
          )
          onClose()
        }}
        ledgerAppName={cryptocurrencies[account.crypto].ledgerAppName}
      />
    </Dialog>
  )
}

export default ShowAddressOnLedgerDialog
