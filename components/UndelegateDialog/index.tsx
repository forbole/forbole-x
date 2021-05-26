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
import SelectValidators from './SelectValidators'
import ConfirmUndelegation from './ConfirmUndelegation'
import useStateHistory from '../../misc/useStateHistory'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { formatRawTransactionData, formatTransactionMsg } from '../../misc/formatTransactionMsg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SecurityPassword from '../SecurityPasswordDialogContent'
import Success from './Success'
import useIsMobile from '../../misc/useIsMobile'
import useSignerInfo from '../../misc/useSignerInfo'
import sendTransaction from '../../misc/sendTransaction'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'

enum UndelegationStage {
  SelectValidatorsStage = 'select validators',
  ConfirmUndelegationStage = 'confirm undelegation',
  SecurityPasswordStage = 'security password',
  ConnectLedgerStage = 'connect ledger',
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
  const isMobile = useIsMobile()
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const signerInfo = useSignerInfo(account)

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
          gasFee: get(crypto, 'defaultGasFee', {}),
          memo,
          ...signerInfo,
        }
      : null
  }, [tokensPrices, delegatedTokens, signerInfo, account, crypto, password, memo, amount, denom])

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
    async (securityPassword: string, ledgerApp?: Cosmos) => {
      try {
        setLoading(true)
        const data = {
          securityPassword,
          ...transactionData,
        }
        await sendTransaction(data, ledgerApp, account.index)
        setLoading(false)
        setStage(UndelegationStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData, account]
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
              crypto={crypto}
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
          title: t('security password title'),
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={sendTransactionMessage} loading={loading} />,
        }
      case UndelegationStage.ConnectLedgerStage:
        return {
          title: t('connect ledger'),
          dialogWidth: 'sm',
          content: (
            <ConnectLedgerDialogContent
              onConnect={(ledgerApp) => sendTransactionMessage('', ledgerApp)}
            />
          ),
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
              crypto={crypto}
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

export default UndelegationDialog
