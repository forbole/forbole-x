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
import ConfirmDelegation from './ConfirmDelegation'
import useStateHistory from '../../misc/useStateHistory'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { formatRawTransactionData, formatTransactionMsg } from '../../misc/formatTransactionMsg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import SecurityPassword from './SecurityPassword'
import Success from './Success'

enum DelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
  ConfirmDelegationStage = 'confirm delegation',
  SecurityPasswordStage = 'security password',
  SuccessStage = 'success',
}

interface DelegationDialogProps {
  account: Account
  validators: Validator[]
  availableTokens: { coins: Array<{ amount: string; denom: string }>; tokens_prices: TokenPrice[] }
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const DelegationDialog: React.FC<DelegationDialogProps> = ({
  account,
  validators,
  open,
  onClose,
  availableTokens,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { password } = useWalletsContext()
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: Validator }>
  >([])
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DelegationStage>(
    DelegationStage.SelectAmountStage
  )

  const transactionData = React.useMemo(
    () => ({
      address: account.address,
      password,
      transactions: delegations
        .map((r) => {
          const coinsToSend = getEquivalentCoinToSend(
            { amount: r.amount, denom },
            availableTokens.coins,
            availableTokens.tokens_prices
          )
          return formatTransactionMsg(account.crypto, {
            type: 'delegate',
            delegator: account.address,
            validator: r.validator.address,
            ...coinsToSend,
          })
        })
        .filter((a) => a),
      gasFee: get(cryptocurrencies, `${account.crypto}.defaultGasFee`, {}),
      memo,
    }),
    [delegations, availableTokens, account, password, memo]
  )

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

  const confirmAmount = React.useCallback(
    (a: number, d: string) => {
      setAmount(a)
      setDenom(d)
      setStage(DelegationStage.SelectValidatorsStage)
    },
    [setAmount, setStage]
  )

  const confirmDelegations = React.useCallback(
    (d: Array<{ amount: number; validator: Validator }>, m: string) => {
      setDelegations(d)
      setMemo(m)
      setStage(DelegationStage.ConfirmDelegationStage)
    },
    [setStage]
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
        setStage(DelegationStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SelectValidatorsStage:
        return {
          title: t('delegate'),
          content: (
            <SelectValidators
              account={account}
              validators={validators}
              amount={amount}
              denom={denom}
              onConfirm={confirmDelegations}
            />
          ),
        }
      case DelegationStage.ConfirmDelegationStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: (
            <ConfirmDelegation
              account={account}
              amount={amount}
              denom={denom}
              gasFee={defaultGasFee}
              delegations={delegations}
              memo={memo}
              rawTransactionData={formatRawTransactionData(account.crypto, transactionData)}
              onConfirm={() => setStage(DelegationStage.SecurityPasswordStage)}
            />
          ),
        }
      case DelegationStage.SecurityPasswordStage:
        return {
          title: t('security password title'),
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={sendTransactionMessage} loading={loading} />,
        }
      case DelegationStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} denom={denom} />,
        }
      case DelegationStage.SelectAmountStage:
      default:
        return {
          title: t('delegate'),
          content: (
            <SelectAmount
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
      setDelegations([])
      setMemo('')
      setLoading(false)
      setStage(DelegationStage.SelectAmountStage)
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

export default DelegationDialog
