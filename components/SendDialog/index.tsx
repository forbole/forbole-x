/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { Cosmos } from 'ledger-app-cosmos'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectRecipients from './SelectRecipients'
import ConfirmSend from './ConfirmSend'
import useStateHistory from '../../misc/useStateHistory'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import { formatTransactionMsg, formatRawTransactionData } from '../../misc/formatTransactionMsg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SecurityPassword from '../SecurityPasswordDialogContent'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import Success from './Success'
import useIsMobile from '../../misc/useIsMobile'
import sendTransaction from '../../misc/sendTransaction'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import useSignerInfo from '../../misc/useSignerInfo'

enum SendStage {
  SelectRecipientsStage = 'select recipients',
  ConnectLedgerStage = 'connect ledger',
  ConfirmSendStage = 'confirm send',
  SecurityPasswordStage = 'security password',
  SuccessStage = 'success',
}

interface SendDialogProps {
  account: Account
  availableTokens: { coins: Array<{ amount: string; denom: string }>; tokens_prices: TokenPrice[] }
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const SendDialog: React.FC<SendDialogProps> = ({ account, availableTokens, open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { password } = useWalletsContext()
  const isMobile = useIsMobile()
  const { wallets } = useWalletsContext()
  const wallet = wallets.find((w) => w.id === account.walletId)
  const [recipients, setRecipients] = React.useState<
    Array<{ amount: { amount: number; denom: string }; address: string }>
  >([])
  const [memo, setMemo] = React.useState('')
  const [totalAmount, setTotalAmount] = React.useState<TokenAmount>()
  const [loading, setLoading] = React.useState(false)
  const signerInfo = useSignerInfo(account)

  const { availableAmount, defaultGasFee } = React.useMemo(
    () => ({
      availableAmount: getTokenAmountFromDenoms(
        availableTokens.coins,
        availableTokens.tokens_prices
      ),
      defaultGasFee: getTokenAmountFromDenoms(
        get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
        availableTokens.tokens_prices
      ),
    }),
    [availableTokens]
  )

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<SendStage>(
    SendStage.SelectRecipientsStage
  )

  const transactionData = React.useMemo(
    () => ({
      address: account.address,
      password,
      transactions: recipients
        .map((r) => {
          const coinsToSend = getEquivalentCoinToSend(
            r.amount,
            availableTokens.coins,
            availableTokens.tokens_prices
          )
          return formatTransactionMsg(account.crypto, {
            type: 'send',
            from: account.address,
            to: r.address,
            ...coinsToSend,
          })
        })
        .filter((a) => a),
      gasFee: get(cryptocurrencies, `${account.crypto}.defaultGasFee`, {}),
      memo,
      ...signerInfo,
    }),
    [recipients, availableTokens, account, password, memo, signerInfo]
  )

  const confirmRecipients = React.useCallback(
    (
      r: Array<{ amount: { amount: number; denom: string }; address: string }>,
      m: string,
      ta: TokenAmount
    ) => {
      setRecipients(r)
      setMemo(m)
      setTotalAmount(ta)
      setStage(SendStage.ConfirmSendStage)
    },
    [setStage]
  )

  const confirm = React.useCallback(
    async (securityPassword: string, ledgerApp?: Cosmos) => {
      try {
        setLoading(true)
        const data = {
          securityPassword,
          ...transactionData,
        }
        await sendTransaction(data, ledgerApp, account.index)
        setLoading(false)
        setStage(SendStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData, account]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case SendStage.ConfirmSendStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: (
            <ConfirmSend
              account={account}
              recipients={recipients}
              totalAmount={totalAmount}
              memo={memo}
              gasFee={defaultGasFee}
              rawTransactionData={formatRawTransactionData(account.crypto, transactionData)}
              onConfirm={() =>
                setStage(
                  wallet.type === 'ledger'
                    ? SendStage.ConnectLedgerStage
                    : SendStage.SecurityPasswordStage
                )
              }
            />
          ),
        }
      case SendStage.SecurityPasswordStage:
        return {
          title: t('security password title'),
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={confirm} loading={loading} />,
        }
      case SendStage.ConnectLedgerStage:
        return {
          title: t('connect ledger'),
          dialogWidth: 'sm',
          content: <ConnectLedgerDialogContent onConnect={(ledgerApp) => confirm('', ledgerApp)} />,
        }
      case SendStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} account={account} totalAmount={totalAmount} />,
        }
      case SendStage.SelectRecipientsStage:
      default:
        return {
          title: t('send'),
          content: (
            <SelectRecipients
              account={account}
              availableAmount={availableAmount}
              onConfirm={confirmRecipients}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (open) {
      setRecipients([])
      setMemo('')
      setTotalAmount(undefined)
      setLoading(false)
      setStage(SendStage.SelectRecipientsStage, true)
    }
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth={content.dialogWidth || 'md'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
    >
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
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

export default SendDialog
