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
import SelectAmount from './SelectAmount'
import SelectValidators from './SelectValidators'
import ConfirmRedelegation from './ConfirmRedelegation'
import useStateHistory from '../../misc/useStateHistory'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import {
  formatRawTransactionData,
  formatTransactionMsg,
  formatTypeUrlTransactionMsg,
} from '../../misc/formatTransactionMsg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import SecurityPassword from '../SecurityPasswordDialogContent'
import Success from './Success'
import useIsMobile from '../../misc/useIsMobile'
import useSignerInfo from '../../misc/useSignerInfo'
import sendTransaction from '../../misc/sendTransaction'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'

enum RedelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
  ConfirmRedelegationStage = 'confirm redelegation',
  SecurityPasswordStage = 'security password',
  ConnectLedgerStage = 'connect ledger',
  SuccessStage = 'success',
}

interface RedelegationDialogProps {
  account: Account
  fromValidator: Validator
  validators: Validator[]
  delegatedTokens: Array<{ amount: string; denom: string }>
  tokensPrices: TokenPrice[]
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const RedelegationDialog: React.FC<RedelegationDialogProps> = ({
  account,
  fromValidator,
  validators,
  open,
  onClose,
  delegatedTokens,
  tokensPrices,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { password } = useWalletsContext()
  const isMobile = useIsMobile()
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [toValidator, setToValidator] = React.useState<Validator>()
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const signerInfo = useSignerInfo(account)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<RedelegationStage>(
    RedelegationStage.SelectAmountStage
  )

  const transactionData = React.useMemo(() => {
    const coinsToSend = getEquivalentCoinToSend({ amount, denom }, delegatedTokens, tokensPrices)
    return {
      address: account.address,
      password,
      transactions: toValidator
        ? [
            formatTransactionMsg(account.crypto, {
              type: 'redelegate',
              delegator: account.address,
              fromValidator: fromValidator.address,
              toValidator: toValidator.address,
              ...coinsToSend,
            }),
          ]
        : [],
      gasFee: get(crypto, 'defaultGasFee', {}),
      memo,
      ...signerInfo,
    }
  }, [toValidator, delegatedTokens, signerInfo, tokensPrices, account, crypto, password, memo])

  const { availableAmount, defaultGasFee } = React.useMemo(
    () => ({
      availableAmount: getTokenAmountFromDenoms(delegatedTokens, tokensPrices),
      defaultGasFee: getTokenAmountFromDenoms(
        get(crypto, 'defaultGasFee.amount', []),
        tokensPrices
      ),
    }),
    [delegatedTokens, tokensPrices, crypto]
  )

  const confirmAmount = React.useCallback(
    (a: number, d: string) => {
      setAmount(a)
      setDenom(d)
      setStage(RedelegationStage.SelectValidatorsStage)
    },
    [setAmount, setDenom, setStage]
  )

  const confirmRedelegations = React.useCallback(
    (v: Validator, m: string) => {
      setToValidator(v)
      setMemo(m)
      setStage(RedelegationStage.ConfirmRedelegationStage)
    },
    [setStage, setMemo, setToValidator]
  )

  const sendTransactionMessage = React.useCallback(
    async (securityPassword: string, ledgerApp?: Cosmos) => {
      try {
        setLoading(true)
        const data = {
          securityPassword,
          ...transactionData,
        }
        await sendTransaction(data, ledgerApp, account.index)
        setLoading(false)
        setStage(RedelegationStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData, account]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case RedelegationStage.SelectValidatorsStage:
        return {
          title: t('redelegate'),
          content: (
            <SelectValidators
              amount={amount}
              crypto={crypto}
              validators={validators}
              denom={denom}
              onConfirm={confirmRedelegations}
            />
          ),
        }
      case RedelegationStage.ConfirmRedelegationStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: (
            <ConfirmRedelegation
              account={account}
              crypto={crypto}
              amount={amount}
              denom={denom}
              gasFee={defaultGasFee}
              fromValidator={fromValidator}
              toValidator={toValidator}
              memo={memo}
              rawTransactionData={formatRawTransactionData(account.crypto, transactionData)}
              onConfirm={() => setStage(RedelegationStage.SecurityPasswordStage)}
            />
          ),
        }
      case RedelegationStage.SecurityPasswordStage:
        return {
          title: t('security password title'),
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={sendTransactionMessage} loading={loading} />,
        }
      case RedelegationStage.ConnectLedgerStage:
        return {
          title: t('connect ledger'),
          dialogWidth: 'sm',
          content: (
            <ConnectLedgerDialogContent
              onConnect={(ledgerApp) => sendTransactionMessage('', ledgerApp)}
            />
          ),
        }
      case RedelegationStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} denom={denom} />,
        }
      case RedelegationStage.SelectAmountStage:
      default:
        return {
          title: t('redelegate'),
          content: (
            <SelectAmount
              fromValidator={fromValidator}
              account={account}
              crypto={crypto}
              availableAmount={availableAmount}
              onConfirm={confirmAmount}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (open) {
      setAmount(0)
      setDenom('')
      setToValidator(undefined)
      setMemo('')
      setLoading(false)
      setStage(RedelegationStage.SelectAmountStage)
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

export default RedelegationDialog
