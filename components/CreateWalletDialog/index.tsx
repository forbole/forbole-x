import { Box, Dialog, DialogTitle, IconButton, LinearProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import CreateWallet from './CreateWallet'
import ConfirmMnemonic from './ConfirmMnemonic'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SetPreference from './SetPreference'
import SecurityPassword from './SecurityPassword'
import ImportWallet from './ImportWallet'
import AccessMyWallet from './AccessMyWallet'
import WhatIsMnemonic from './WhatIsMnemonic'
import Start from './Start'
import ImportMnemonicBackup from './ImportMnemonicBackup'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import useStateHistory from '../../misc/useStateHistory'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import useIsMobile from '../../misc/useIsMobile'
import getWalletAddress from '../../misc/tx/getWalletAddress'
import { closeAllLedgerConnections } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'

export enum ImportStage {
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  MnemonicPhraseBackupStage = 'use secret recovery phrase backup',
  ConnectLedgerDeviceStage = 'connect ledger device',
}

export enum CommonStage {
  StartStage = 'start',
  AccessMyWalletStage = 'access my wallet',
  CreateWalletStage = 'create wallet',
  ConfirmMnemonicStage = 'confirm secret recovery',
  SetPreferenceStage = 'your preference',
  SetSecurityPasswordStage = 'set security password',
  ImportWalletStage = 'import wallet',
  ImportLedgerWalletStage = 'import ledger wallet',
  WhatIsMnemonicStage = 'what is secret recovery phrase',
}

type Stage = CommonStage | ImportStage

interface CreateWalletDialogProps {
  open: boolean
  onClose(event?: unknown, reason?: string): void
  initialStage?: Stage
}

interface Content {
  title: string
  content: React.ReactNode
  step: 1 | 2 | 3 | 4 | 5
}

const CreateWalletDialog: React.FC<CreateWalletDialogProps> = ({ open, onClose, initialStage }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { addWallet } = useWalletsContext()
  const isMobile = useIsMobile()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    initialStage || CommonStage.StartStage
  )
  const [mnemonic, setMnemonic] = React.useState('')
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const [ledgerCryptos, setLedgerCryptos] = React.useState([])
  const [ledgerCryptosIndex, setLedgerCryptosIndex] = React.useState(0)
  const [ledgerAddresses, setLedgerAddresses] = React.useState([])
  const [ledgerWalletName, setLedgerWalletName] = React.useState('')

  React.useEffect(() => {
    if (open) {
      setMnemonic('')
      setSecurityPassword('')
      setError('')
      setLedgerCryptosIndex(0)
      setLedgerWalletName('')
      setLedgerAddresses([])
      setLedgerCryptos([])
      setStage(initialStage || CommonStage.StartStage, true)
    }
  }, [open, initialStage])

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
        setStage(CommonStage.SetPreferenceStage)
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
        setStage(CommonStage.SetPreferenceStage)
      } catch (err) {
        setError(t(err.message))
      }
    },
    [setMnemonic, setStage, setError]
  )

  const confirmMnemonic = React.useCallback(
    (input) => {
      if (input === mnemonic) {
        setStage(CommonStage.SetPreferenceStage)
      } else {
        setError(t('invalid secret recovery phrase'))
      }
    },
    [mnemonic, setStage, setError]
  )

  const setPreference = React.useCallback(() => {
    try {
      setStage(CommonStage.SetSecurityPasswordStage)
    } catch (err) {
      setError(t(err.message))
    }
  }, [setStage, setError])

  const confirmSecurityPassword = React.useCallback(
    (pw: string) => {
      setSecurityPassword(pw)
      setStage(CommonStage.ImportWalletStage)
    },
    [setStage, setSecurityPassword]
  )

  const saveWallet = React.useCallback(
    async (name: string, cryptos: string[], type = 'mnemonic', defaultAddresses?: string[]) => {
      if (type === 'ledger' && !defaultAddresses) {
        setLedgerCryptosIndex(0)
        setLedgerWalletName(name)
        setLedgerAddresses([])
        setLedgerCryptos(cryptos)
        setStage(ImportStage.ConnectLedgerDeviceStage)
      } else if (type === 'ledger') {
        await addWallet({
          type,
          name,
          cryptos,
          mnemonic,
          securityPassword,
          addresses: defaultAddresses,
        })
        closeAllLedgerConnections()
        onClose()
      } else {
        const addresses = await Promise.all(
          cryptos.map((c) =>
            getWalletAddress(mnemonic, {
              account: 0,
              change: 0,
              index: 0,
              prefix: cryptocurrencies[c].prefix,
              ledgerAppName: cryptocurrencies[c].ledgerAppName,
              coinType: cryptocurrencies[c].coinType,
            })
          )
        )
        await addWallet({
          type,
          name,
          cryptos,
          mnemonic,
          securityPassword,
          addresses,
        })
        onClose()
      }
    },
    [addWallet, mnemonic, securityPassword, onClose]
  )

  React.useEffect(() => {
    if (
      ledgerAddresses.length === ledgerCryptos.length &&
      stage === ImportStage.ConnectLedgerDeviceStage
    ) {
      saveWallet(ledgerWalletName, ledgerCryptos, 'ledger', ledgerAddresses)
    }
  }, [ledgerAddresses, ledgerCryptos])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case ImportStage.ConnectLedgerDeviceStage:
        return {
          title: '',
          step: 2,
          content: (
            <ConnectLedgerDialogContent
              onConnect={async (signer) => {
                // haven't selected cryptos yet
                if (!ledgerCryptos.length && !ledgerAddresses.length) {
                  setStage(CommonStage.ImportLedgerWalletStage, undefined, true)
                  // select next crypto
                } else if (ledgerCryptos.length > ledgerAddresses.length) {
                  const address = await getWalletAddress(
                    '',
                    {
                      account: 0,
                      change: 0,
                      index: 0,
                      prefix: cryptocurrencies[ledgerCryptos[ledgerCryptosIndex]].prefix,
                      ledgerAppName:
                        cryptocurrencies[ledgerCryptos[ledgerCryptosIndex]].ledgerAppName,
                      coinType: cryptocurrencies[ledgerCryptos[ledgerCryptosIndex]].coinType,
                    },
                    signer,
                    true
                  )
                  setLedgerCryptosIndex((i) => i + 1)
                  setLedgerAddresses((addresses) => [...addresses, address])
                }
              }}
              ledgerAppName={
                ledgerCryptos[ledgerCryptosIndex]
                  ? cryptocurrencies[ledgerCryptos[ledgerCryptosIndex]].ledgerAppName
                  : undefined
              }
              ledgerAppIndex={ledgerCryptosIndex}
            />
          ),
        }
      case ImportStage.ImportMnemonicPhraseStage:
        return {
          title: t('secret recovery phrase'),
          step: 2,
          content: (
            <ConfirmMnemonic
              description={t('secret recovery description')}
              onConfirm={importMnemonic}
              error={error}
            />
          ),
        }
      case ImportStage.MnemonicPhraseBackupStage:
        return {
          title: t('secret recovery phrase backup title'),
          step: 2,
          content: <ImportMnemonicBackup onConfirm={importMnemonicBackup} error={error} />,
        }
      case CommonStage.CreateWalletStage:
        return {
          title: t('create new wallet title'),
          step: 2,
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
          step: 2,
          content: (
            <ConfirmMnemonic
              description={t('confirm secret recovery description')}
              onConfirm={confirmMnemonic}
              error={error}
            />
          ),
        }
      case CommonStage.SetPreferenceStage:
        return {
          title: t('your preference'),
          step: 3,
          content: <SetPreference onConfirm={setPreference} />,
        }
      case CommonStage.SetSecurityPasswordStage:
        return {
          title: t('security password title'),
          step: 4,
          content: <SecurityPassword onConfirm={confirmSecurityPassword} />,
        }
      case CommonStage.ImportWalletStage:
      case CommonStage.ImportLedgerWalletStage:
        return {
          title: t('import wallet title'),
          step: stage === CommonStage.ImportLedgerWalletStage ? 2 : 5,
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
          title: t('what is secret recovery phrase'),
          step: 1,
          content: <WhatIsMnemonic />,
        }
      case CommonStage.AccessMyWalletStage:
        return {
          title: t('access my wallet title'),
          step: 1,
          content: (
            <AccessMyWallet
              onConfirm={setStage}
              onWhatIsMnemonicClick={() => setStage(CommonStage.WhatIsMnemonicStage)}
            />
          ),
        }
      case CommonStage.StartStage:
      default:
        return {
          title: t('create wallet title'),
          step: 1,
          content: (
            <Start
              onWhatIsMnemonicClick={() => setStage(CommonStage.WhatIsMnemonicStage)}
              onCreateWalletClick={createWallet}
              onImportWalletClick={() => setStage(CommonStage.AccessMyWalletStage)}
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
      <Box m={4} mt={0} display="flex">
        <LinearProgress
          style={{ flex: 1 }}
          variant="determinate"
          value={content.step > 0 ? 100 : 0}
        />
        <Box ml={1} />
        <LinearProgress
          style={{ flex: 1 }}
          variant="determinate"
          value={content.step > 1 ? 100 : 0}
        />
        <Box ml={1} />
        <LinearProgress
          style={{ flex: 1 }}
          variant="determinate"
          value={content.step > 2 ? 100 : 0}
        />
        <Box ml={1} />
        <LinearProgress
          style={{ flex: 1 }}
          variant="determinate"
          value={content.step > 3 ? 100 : 0}
        />
        <Box ml={1} />
        <LinearProgress
          style={{ flex: 1 }}
          variant="determinate"
          value={content.step > 4 ? 100 : 0}
        />
      </Box>
    </Dialog>
  )
}

export default CreateWalletDialog
