/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
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
import { formatRawTransactionData, formatTransactionMsg } from '../../misc/formatTransactionMsg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import SecurityPassword from '../SecurityPasswordDialogContent'
import Success from './Success'

enum RedelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
  ConfirmRedelegationStage = 'confirm redelegation',
  SecurityPasswordStage = 'security password',
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
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [toValidator, setToValidator] = React.useState<Validator>()
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

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
      gasFee: get(cryptocurrencies, `${account.crypto}.defaultGasFee`, {}),
      memo,
    }
  }, [toValidator, delegatedTokens, tokensPrices, account, password, memo])

  const { availableAmount, defaultGasFee } = React.useMemo(
    () => ({
      availableAmount: getTokenAmountFromDenoms(delegatedTokens, tokensPrices),
      defaultGasFee: getTokenAmountFromDenoms(
        get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
        tokensPrices
      ),
    }),
    [delegatedTokens, tokensPrices]
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
    async (securityPassword: string) => {
      try {
        setLoading(true)
        const result = await sendMsgToChromeExt({
          event: 'signAndBroadcastTransactions',
          data: {
            securityPassword,
            ...transactionData,
          },
        })
        console.log(result)
        setLoading(false)
        setStage(RedelegationStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case RedelegationStage.SelectValidatorsStage:
        return {
          title: t('redelegate'),
          content: (
            <SelectValidators
              amount={amount}
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
          title: '',
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={sendTransactionMessage} loading={loading} />,
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
    <Dialog fullWidth maxWidth={content.dialogWidth || 'md'} open={open} onClose={onClose}>
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
