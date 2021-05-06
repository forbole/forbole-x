/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectValidators from './SelectValidators'
import ConfirmUndelegation from './ConfirmUndelegation'
import useStateHistory from '../../misc/useStateHistory'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { formatRawTransactionData, formatTransactionMsg } from '../../misc/formatTransactionMsg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import SecurityPassword from '../SecurityPasswordDialogContent'
import Success from './Success'

enum UndelegationStage {
  SelectValidatorsStage = 'select validators',
  ConfirmUndelegationStage = 'confirm undelegation',
  SecurityPasswordStage = 'security password',
  SuccessStage = 'success',
}

interface UndelegationDialogProps {
  account: Account
  validator: Validator
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

const UndelegationDialog: React.FC<UndelegationDialogProps> = ({
  account,
  validator,
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
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<UndelegationStage>(
    UndelegationStage.SelectValidatorsStage
  )

  const transactionData = React.useMemo(() => {
    const coinsToSend = getEquivalentCoinToSend({ amount, denom }, delegatedTokens, tokensPrices)
    return coinsToSend
      ? {
          address: account.address,
          password,
          transactions: [
            formatTransactionMsg(account.crypto, {
              type: 'undelegate',
              delegator: account.address,
              validator: validator.address,
              ...coinsToSend,
            }),
          ],
          gasFee: get(cryptocurrencies, `${account.crypto}.defaultGasFee`, {}),
          memo,
        }
      : null
  }, [tokensPrices, delegatedTokens, account, password, memo, amount, denom])

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

  const confirmUndelegation = React.useCallback(
    (a: number, d: string, m: string) => {
      setAmount(a)
      setDenom(d)
      setMemo(m)
      setStage(UndelegationStage.ConfirmUndelegationStage)
    },
    [setStage]
  )

  const sendTransactionMessage = React.useCallback(
    async (securityPassword: string) => {
      try {
        setLoading(true)
        await sendMsgToChromeExt({
          event: 'signAndBroadcastTransactions',
          data: {
            securityPassword,
            ...transactionData,
          },
        })
        setLoading(false)
        setStage(UndelegationStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case UndelegationStage.ConfirmUndelegationStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: (
            <ConfirmUndelegation
              account={account}
              amount={amount}
              denom={denom}
              gasFee={defaultGasFee}
              validator={validator}
              memo={memo}
              rawTransactionData={formatRawTransactionData(account.crypto, transactionData)}
              onConfirm={() => setStage(UndelegationStage.SecurityPasswordStage)}
            />
          ),
        }
      case UndelegationStage.SecurityPasswordStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={sendTransactionMessage} loading={loading} />,
        }
      case UndelegationStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} denom={denom} />,
        }
      case UndelegationStage.SelectValidatorsStage:
      default:
        return {
          title: t('undelegate'),
          content: (
            <SelectValidators
              account={account}
              validator={validator}
              availableAmount={availableAmount}
              onConfirm={confirmUndelegation}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (open) {
      setAmount(0)
      setDenom('')
      setMemo('')
      setLoading(false)
      setStage(UndelegationStage.SelectValidatorsStage)
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

export default UndelegationDialog
