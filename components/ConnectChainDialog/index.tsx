import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import CreateWallet from './CreateWallet'
import { useWalletsContext } from '../../contexts/WalletsContext'
import Start from './Start'
import useStateHistory from '../../misc/useStateHistory'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import useIsMobile from '../../misc/useIsMobile'
import { closeAllLedgerConnections } from '../../misc/utils'
import SelectWalletType from './SelectWalletType'

let ledgerTransport

enum Stage {
  StartStage = 'start',
  SelectWalletTypeStage = 'select wallet type',
  SelectChainStage = 'select chain',
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  SelectLedgerAppStage = 'select ledger app',
  SelectAddressStage = 'select address',
  ConnectLedgerStage = 'connect ledger',
}

interface ConnectChainDialogProps {
  open: boolean
  onClose(event?: unknown, reason?: string): void
  connections: ChainConnection[]
}

interface Content {
  title: string
  content: React.ReactNode
}

const ConnectChainDialog: React.FC<ConnectChainDialogProps> = ({ open, onClose, connections }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.StartStage
  )

  const [mnemonic, setMnemonic] = React.useState('')
  const [error, setError] = React.useState('')
  const [chain, setChain] = React.useState('')
  const [ledgerApp, setLedgerApp] = React.useState('')

  React.useEffect(() => {
    if (open) {
      setMnemonic('')
      setError('')
      setChain('')
      setLedgerApp('')
      setStage(Stage.StartStage, true)
    }
  }, [open])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case Stage.SelectWalletTypeStage:
        return {
          title: t('connect chain'),
          content: <SelectWalletType onConfirm={() => null} />,
        }
      case Stage.ConnectLedgerStage:
        return {
          title: '',
          content: (
            <ConnectLedgerDialogContent
              onConnect={(transport) => {
                ledgerTransport = transport
              }}
              ledgerAppName={ledgerApp}
            />
          ),
        }
      case Stage.StartStage:
      default:
        return {
          title: t('connect chain title'),
          content: (
            <Start
              connections={connections}
              onConnectClick={() => setStage(Stage.SelectWalletTypeStage)}
            />
          ),
        }
    }
  }, [stage, t])

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose(event, reason)
        }
      }}
      fullScreen={isMobile}
    >
      {isPrevStageAvailable ? (
        <IconButton
          className={classes.backButton}
          onClick={() => {
            toPrevStage()
            closeAllLedgerConnections()
          }}
        >
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      {content.content}
    </Dialog>
  )
}

export default ConnectChainDialog
