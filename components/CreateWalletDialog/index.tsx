import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Cosmos } from 'ledger-app-cosmos'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import CreateWallet from './CreateWallet'
import ConfirmMnemonic from './ConfirmMnemonic'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SecurityPassword from './SecurityPassword'
import ImportWallet from './ImportWallet'
import AccessMyWallet from './AccessMyWallet'
import WhatIsMnemonic from './WhatIsMnemonic'
import ImportMnemonicBackup from './ImportMnemonicBackup'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import useStateHistory from '../../misc/useStateHistory'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import useIsMobile from '../../misc/useIsMobile'
import { connectLedger } from '../../misc/ledger'

let ledgerApp: Cosmos

export enum ImportStage {
  ImportMnemonicPhraseStage = 'import mnemonic phrase',
  MnemonicPhraseBackupStage = 'use mnemonic phrase backup',
  ConnectLedgerDeviceStage = 'connect ledger device',
}

export enum CommonStage {
  // StartStage = 'start',
  AccessMyWalletStage = 'access my wallet',
  CreateWalletStage = 'create wallet',
  ConfirmMnemonicStage = 'confirm mnemonic',
  SetSecurityPasswordStage = 'set security password',
  ImportWalletStage = 'import wallet',
  ImportLedgerWalletStage = 'import ledger wallet',
  WhatIsMnemonicStage = 'what is mnemonic',
}

type Stage = CommonStage | ImportStage

interface CreateWalletDialogProps {
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
}

const CreateWalletDialog: React.FC<CreateWalletDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { addWallet } = useWalletsContext()
  const isMobile = useIsMobile()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    CommonStage.AccessMyWalletStage
  )
  const [mnemonic, setMnemonic] = React.useState('')
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const createWallet = React.useCallback(async () => {
    const wallet = await sendMsgToChromeExt({ event: 'generateMnemonic' })
    setMnemonic(wallet.mnemonic)
    setStage(CommonStage.CreateWalletStage)
  }, [setMnemonic])

  const importMnemonic = React.useCallback(
    async (input) => {
      try {
        const wallet = await sendMsgToChromeExt({
          event: 'verifyMnemonic',
          data: { mnemonic: input },
        })
        setMnemonic(wallet.mnemonic)
        setStage(CommonStage.SetSecurityPasswordStage)
      } catch (err) {
        setError(t(err.message))
      }
    },
    [setMnemonic, setStage, setError]
  )

  const importMnemonicBackup = React.useCallback(
    async (data) => {
      try {
        const wallet = await sendMsgToChromeExt({
          event: 'verifyMnemonicBackup',
          data,
        })
        setMnemonic(wallet.mnemonic)
        setStage(CommonStage.SetSecurityPasswordStage)
      } catch (err) {
        setError(t(err.message))
      }
    },
    [setMnemonic, setStage, setError]
  )

  const confirmMnemonic = React.useCallback(
    (input) => {
      if (input === mnemonic) {
        setStage(CommonStage.SetSecurityPasswordStage)
      } else {
        setError(t('invalid mnemonic'))
      }
    },
    [mnemonic, setStage, setError]
  )

  const confirmSecurityPassword = React.useCallback(
    (pw: string) => {
      setSecurityPassword(pw)
      setStage(CommonStage.ImportWalletStage)
    },
    [setStage, setSecurityPassword]
  )

  const saveWallet = React.useCallback(
    async (name: string, cryptos: string[], type = 'mnemonic') => {
      await addWallet(
        {
          type,
          name,
          cryptos,
          mnemonic,
          securityPassword,
        },
        ledgerApp
      )
      onClose()
    },
    [addWallet, mnemonic, securityPassword, onClose]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case ImportStage.ConnectLedgerDeviceStage:
        return {
          title: '',
          content: (
            <ConnectLedgerDialogContent
              onConnect={async () => {
                ledgerApp = await connectLedger()
                setStage(CommonStage.ImportLedgerWalletStage, undefined, true)
              }}
            />
          ),
        }
      case ImportStage.ImportMnemonicPhraseStage:
        return {
          title: t('mnemonic'),
          content: (
            <ConfirmMnemonic
              description={t('mnemonic description')}
              onConfirm={importMnemonic}
              error={error}
            />
          ),
        }
      case ImportStage.MnemonicPhraseBackupStage:
        return {
          title: t('mnemonic phrase backup title'),
          content: <ImportMnemonicBackup onConfirm={importMnemonicBackup} error={error} />,
        }
      case CommonStage.CreateWalletStage:
        return {
          title: t('create new wallet title'),
          content: (
            <CreateWallet
              mnemonic={mnemonic}
              onConfirm={() => setStage(CommonStage.ConfirmMnemonicStage)}
            />
          ),
        }
      case CommonStage.ConfirmMnemonicStage:
        return {
          title: t('create new wallet title'),
          content: (
            <ConfirmMnemonic
              description={t('confirm mnemonic description')}
              onConfirm={confirmMnemonic}
              error={error}
            />
          ),
        }
      case CommonStage.SetSecurityPasswordStage:
        return {
          title: t('security password title'),
          content: <SecurityPassword onConfirm={confirmSecurityPassword} />,
        }
      case CommonStage.ImportWalletStage:
      case CommonStage.ImportLedgerWalletStage:
        return {
          title: t('import wallet title'),
          content: (
            <ImportWallet
              onConfirm={(name, cryptos) =>
                saveWallet(
                  name,
                  cryptos,
                  stage === CommonStage.ImportLedgerWalletStage ? 'ledger' : 'mnemonic'
                )
              }
            />
          ),
        }
      case CommonStage.WhatIsMnemonicStage:
        return {
          title: t('what is mnemonic phrase'),
          content: <WhatIsMnemonic />,
        }
      default:
      case CommonStage.AccessMyWalletStage:
        return {
          title: t('access my wallet title'),
          content: <AccessMyWallet onConfirm={setStage} onCreateWallet={createWallet} />,
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{content.title}</DialogTitle>
      {content.content}
    </Dialog>
  )
}

export default CreateWalletDialog
