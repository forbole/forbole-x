/* eslint-disable import/no-extraneous-dependencies */
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
import { closeAllLedgerConnections, getPrefix } from '../../misc/utils'
import SelectWalletType from './SelectWalletType'
import SelectChain from './SelectChain'
import ImportMnemonic from './ImportMnemonic'
import SelectAddress from './SelectAddress'
import connectableChains from '../../misc/connectableChains'
import generateProof from '../../misc/tx/generateProof'
import SelectLedgerApp from './SelectLedgerApp'
import useSendTransaction from '../../misc/tx/useSendTransaction'
import TextInputDialogContent from './TextInputDialogContent'
import RequestPhrase from './RequestPhrase'

let ledgerTransport

enum Stage {
  StartStage = 'start',
  SelectChainStage = 'select chain',
  SelectWalletTypeStage = 'select wallet type',
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  SelectLedgerAppStage = 'select ledger app',
  SelectAddressStage = 'select address',
  ConnectLedgerStage = 'connect ledger',
  RequestPhraseStage = 'recovery phrase request',
  EnterPrivateKeyStage = 'enter private key',
  EnterChainLinkProofStage = 'enter chain link proof',
  SignInLedgerStage = 'sign in ledger',
}

interface ConnectChainDialogProps {
  open: boolean
  onClose(event?: unknown, reason?: string): void
  connections: ChainConnection[]
  account: Account
  shouldConnect?: boolean
}

interface Content {
  title: string
  dialogSize: 'sm' | 'md' | 'lg'
  content: React.ReactNode
}

const ConnectChainDialog: React.FC<ConnectChainDialogProps> = ({
  open,
  onClose,
  connections,
  account,
  shouldConnect,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const sendTransaction = useSendTransaction()
  const { password } = useWalletsContext()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    shouldConnect ? Stage.SelectChainStage : Stage.StartStage
  )

  const [consent, setConsent] = React.useState(false)
  const [mnemonic, setMnemonic] = React.useState('')
  const [chain, setChain] = React.useState('')
  const [ledgerApp, setLedgerApp] = React.useState('')
  const [error, setError] = React.useState('')
  // for Ledger
  const [connectChainInfo, setConnectChainInfo] = React.useState({
    account: 0,
    change: 0,
    index: 0,
    address: '',
  })

  React.useEffect(() => {
    if (open) {
      setMnemonic('')
      setChain('')
      setLedgerApp('')
      setError('')
      setStage(shouldConnect ? Stage.SelectChainStage : Stage.StartStage, true)
    }
  }, [open, shouldConnect])

  React.useEffect(() => {
    setError('')
  }, [stage])

  const genProofAndSendTx = React.useCallback(
    async (
      info?: { account: number; change: number; index: number; address: string },
      isKeplr?: boolean,
      isTerraStation?: boolean,
      privateKey?: string,
      proofText?: string
    ) => {
      try {
        setError('')

        const { proof, address } = await generateProof(
          account.address,
          privateKey || mnemonic,
          {
            prefix: connectableChains[chain].prefix,
            coinType: connectableChains[ledgerApp || chain].coinType,
            ledgerAppName: ledgerApp,
            account: info ? info.account : 0,
            change: info ? info.change : 0,
            index: info ? info.index : 0,
            chainId: connectableChains[chain].chainId,
            feeDenom: connectableChains[chain].feeDenom,
            isPrivateKey: !!privateKey,
            keplrChainInfo: connectableChains[chain].keplrChainInfo,
          },
          ledgerTransport,
          isKeplr,
          isTerraStation,
          proofText
        )

        await sendTransaction(password, account.address, {
          msgs: [
            {
              typeUrl: '/desmos.profiles.v3.MsgLinkChainAccount',
              value: {
                chainAddress: {
                  typeUrl: '/desmos.profiles.v3.Bech32Address',
                  value: {
                    prefix: getPrefix(address),
                    value: address,
                  },
                },
                chainConfig: {
                  name: chain,
                },
                proof,
                signer: account.address,
              },
            } as TransactionMsgLinkChainAccount,
          ],
          memo: '',
        })
        onClose()
      } catch (err) {
        setError(err.message)
        console.log(err)
      }
    },
    [account, mnemonic, chain, onClose, ledgerApp]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case Stage.SelectChainStage:
        return {
          title: t('select chain'),
          dialogSize: 'sm',
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
          dialogSize: 'sm',
          content: (
            <SelectWalletType
              chain={chain}
              error={error}
              onConfirm={(type) => {
                if (type === 'keplr') {
                  genProofAndSendTx(undefined, true)
                } else if (type === 'terra station') {
                  genProofAndSendTx(undefined, false, true)
                } else if (type === 'private key') {
                  setStage(Stage.EnterPrivateKeyStage)
                } else if (type === 'upload proof') {
                  setStage(Stage.EnterChainLinkProofStage)
                } else if (type === 'mnemonic') {
                  setStage(Stage.RequestPhraseStage)
                } else {
                  setStage(Stage.SelectLedgerAppStage)
                }
              }}
            />
          ),
        }
      case Stage.ImportMnemonicPhraseStage:
        return {
          title: t('import recovery phrase'),
          dialogSize: 'sm',
          content: (
            <ImportMnemonic
              onConfirm={(m) => {
                ledgerTransport = undefined
                setLedgerApp(undefined)
                setMnemonic(m)
                setStage(Stage.SelectAddressStage)
              }}
            />
          ),
        }
      case Stage.SignInLedgerStage:
      case Stage.ConnectLedgerStage:
        return {
          title: '',
          dialogSize: 'sm',
          content: (
            <ConnectLedgerDialogContent
              onConnect={(transport) => {
                ledgerTransport = transport
                if (stage === Stage.ConnectLedgerStage) {
                  setStage(Stage.SelectAddressStage)
                } else {
                  genProofAndSendTx(connectChainInfo)
                }
              }}
              ledgerAppName={ledgerApp}
              signTransaction
            />
          ),
        }
      case Stage.SelectLedgerAppStage:
        return {
          title: t('select ledger app'),
          dialogSize: 'sm',
          content: (
            <SelectLedgerApp
              ledgerAppNames={connectableChains[chain].ledgerAppNames}
              onConfirm={(app) => {
                setLedgerApp(app)
                setStage(Stage.ConnectLedgerStage)
              }}
            />
          ),
        }
      case Stage.RequestPhraseStage:
        return {
          title: t('recovery phrase request'),
          dialogSize: 'sm',
          content: (
            <RequestPhrase
              consent={consent}
              setConsent={setConsent}
              title={t('request description')}
              onConfirm={() => {
                setStage(Stage.ImportMnemonicPhraseStage)
              }}
            />
          ),
        }
      case Stage.EnterChainLinkProofStage:
      case Stage.EnterPrivateKeyStage:
        return {
          title: t(
            stage === Stage.EnterChainLinkProofStage ? 'chain link proof' : 'import private key'
          ),
          dialogSize: 'sm',
          content: (
            <TextInputDialogContent
              title={t(stage === Stage.EnterChainLinkProofStage ? 'proof' : 'private key')}
              placeholder={t(
                stage === Stage.EnterChainLinkProofStage ? 'proof description' : 'private key'
              )}
              error={error}
              onConfirm={(text) => {
                if (stage === Stage.EnterChainLinkProofStage) {
                  genProofAndSendTx(undefined, undefined, undefined, undefined, text)
                } else {
                  genProofAndSendTx(undefined, undefined, undefined, text)
                }
              }}
            />
          ),
        }
      case Stage.SelectAddressStage:
        return {
          title: t('select address'),
          dialogSize: 'sm',
          content: (
            <SelectAddress
              coinType={connectableChains[ledgerApp || chain].coinType}
              prefix={connectableChains[chain].prefix}
              mnemonic={mnemonic}
              ledgerAppName={ledgerApp}
              ledgerTransport={ledgerTransport}
              onConfirm={(result) => {
                if (ledgerApp) {
                  setStage(Stage.SignInLedgerStage)
                  setConnectChainInfo(result)
                } else {
                  genProofAndSendTx(result)
                }
              }}
            />
          ),
        }
      case Stage.StartStage:
      default:
        return {
          title: t('connect chain title'),
          dialogSize: connections.length ? 'md' : 'sm',
          content: (
            <Start
              onClose={onClose}
              account={account}
              connections={connections}
              onConnectClick={() => setStage(Stage.SelectChainStage)}
            />
          ),
        }
    }
  }, [stage, t, connections])

  return (
    <Dialog
      fullWidth
      maxWidth={content.dialogSize}
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
