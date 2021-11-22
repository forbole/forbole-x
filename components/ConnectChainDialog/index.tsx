import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { useWalletsContext } from '../../contexts/WalletsContext'
import Start from './Start'
import useStateHistory from '../../misc/useStateHistory'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import useIsMobile from '../../misc/useIsMobile'
import { closeAllLedgerConnections } from '../../misc/utils'
import SelectWalletType from './SelectWalletType'
import SelectChain from './SelectChain'
import ImportMnemonic from './ImportMnemonic'
import SelectAddress from './SelectAddress'
import connectableChains from '../../misc/connectableChains'
import generateProof from '../../misc/tx/generateProof'

let ledgerTransport

enum Stage {
  StartStage = 'start',
  SelectChainStage = 'select chain',
  SelectWalletTypeStage = 'select wallet type',
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  SelectLedgerAppStage = 'select ledger app',
  SelectAddressStage = 'select address',
  ConnectLedgerStage = 'connect ledger',
}

interface ConnectChainDialogProps {
  open: boolean
  onClose(event?: unknown, reason?: string): void
  connections: ChainConnection[]
  account: Account
}

interface Content {
  title: string
  content: React.ReactNode
}

const ConnectChainDialog: React.FC<ConnectChainDialogProps> = ({
  open,
  onClose,
  connections,
  account,
}) => {
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
      case Stage.SelectChainStage:
        return {
          title: t('select chain'),
          content: (
            <SelectChain
              onConfirm={(c) => {
                setChain(c)
                setStage(Stage.SelectWalletTypeStage)
              }}
            />
          ),
        }
      case Stage.SelectWalletTypeStage:
        return {
          title: t('connect chain'),
          content: (
            <SelectWalletType
              onConfirm={(type) => {
                setStage(
                  type === 'mnemonic' ? Stage.ImportMnemonicPhraseStage : Stage.ConnectLedgerStage
                )
              }}
            />
          ),
        }
      case Stage.ImportMnemonicPhraseStage:
        return {
          title: t('import recovery phrase'),
          content: (
            <ImportMnemonic
              onConfirm={(m) => {
                setMnemonic(m)
                setStage(Stage.SelectAddressStage)
              }}
            />
          ),
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
      case Stage.SelectAddressStage:
        return {
          title: t('select address'),
          content: (
            <SelectAddress
              coinType={connectableChains[chain].coinType}
              prefix={connectableChains[chain].prefix}
              mnemonic={mnemonic}
              ledgerAppName="cosmos"
              ledgerTransport={ledgerTransport}
              onConfirm={async (result) => {
                const proof = await generateProof(
                  account.address,
                  mnemonic,
                  {
                    prefix: connectableChains[chain].prefix,
                    coinType: connectableChains[chain].coinType,
                    ledgerAppName: 'cosmos',
                    account: result.account,
                    change: result.change,
                    index: result.index,
                  },
                  ledgerTransport
                )
                console.log(proof)
              }}
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
              onConnectClick={() => setStage(Stage.SelectChainStage)}
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
