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
import SelectLedgerApp from './SelectLedgerApp'
import useSendTransaction from '../../misc/tx/useSendTransaction'

let ledgerTransport

enum Stage {
  StartStage = 'start',
  SelectChainStage = 'select chain',
  SelectWalletTypeStage = 'select wallet type',
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  SelectLedgerAppStage = 'select ledger app',
  SelectAddressStage = 'select address',
  ConnectLedgerStage = 'connect ledger',
  SignInLedgerStage = 'sign in ledger',
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
  const sendTransaction = useSendTransaction()
  const { password } = useWalletsContext()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.StartStage
  )

  const [mnemonic, setMnemonic] = React.useState('')
  const [chain, setChain] = React.useState('')
  const [ledgerApp, setLedgerApp] = React.useState('')
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
                  type === 'mnemonic' ? Stage.ImportMnemonicPhraseStage : Stage.SelectLedgerAppStage
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
      case Stage.SignInLedgerStage:
      case Stage.ConnectLedgerStage:
        return {
          title: '',
          content: (
            <ConnectLedgerDialogContent
              onConnect={async (transport) => {
                if (stage === Stage.ConnectLedgerStage) {
                  ledgerTransport = transport
                  setStage(Stage.SelectAddressStage)
                } else {
                  const proof = await generateProof(
                    account.address,
                    mnemonic,
                    {
                      prefix: connectableChains[chain].prefix,
                      coinType: connectableChains[chain].coinType,
                      ledgerAppName: ledgerApp,
                      account: connectChainInfo.account,
                      change: connectChainInfo.change,
                      index: connectChainInfo.index,
                    },
                    transport
                  )
                  await sendTransaction(password, account.address, {
                    msgs: [
                      {
                        typeUrl: '/desmos.profiles.v1beta1.MsgLinkChainAccount',
                        value: {
                          chainAddress: {
                            typeUrl: '/desmos.profiles.v1beta1.Bech32Address',
                            value: {
                              prefix: connectableChains[chain].prefix,
                              value: connectChainInfo.address,
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
      case Stage.SelectAddressStage:
        return {
          title: t('select address'),
          content: (
            <SelectAddress
              coinType={connectableChains[chain].coinType}
              prefix={connectableChains[chain].prefix}
              mnemonic={mnemonic}
              ledgerAppName={ledgerApp}
              ledgerTransport={ledgerTransport}
              onConfirm={async (result) => {
                if (ledgerApp) {
                  setStage(Stage.SignInLedgerStage)
                  setConnectChainInfo(result)
                } else {
                  const proof = await generateProof(
                    account.address,
                    mnemonic,
                    {
                      prefix: connectableChains[chain].prefix,
                      coinType: connectableChains[chain].coinType,
                      ledgerAppName: ledgerApp,
                      account: result.account,
                      change: result.change,
                      index: result.index,
                    },
                    ledgerTransport
                  )
                  await sendTransaction(password, account.address, {
                    msgs: [
                      {
                        typeUrl: '/desmos.profiles.v1beta1.MsgLinkChainAccount',
                        value: {
                          chainAddress: {
                            typeUrl: '/desmos.profiles.v1beta1.Bech32Address',
                            value: {
                              prefix: connectableChains[chain].prefix,
                              value: result.address,
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
                }
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
              account={account}
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
      maxWidth={connections.length && stage === Stage.StartStage ? 'md' : 'sm'}
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
