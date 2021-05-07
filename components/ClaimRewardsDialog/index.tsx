import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectValidators from './SelectValidators'
import ConfirmWithdraw from './ConfirmWithdraw'
import useStateHistory from '../../misc/useStateHistory'
import Success from '../Success'
import SecurityPassword from '../SecurityPasswordDialogContent'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { formatTransactionMsg } from '../../misc/formatTransactionMsg'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import { getTokenAmountFromDenoms } from '../../misc/utils'

enum DelegationStage {
  SecurityPasswordStage = 'security password',
  SelectValidatorsStage = 'select validators',
  ConfirmWithdrawStage = 'confirm withdraw',
  SuccessStage = 'success',
}

export interface ValidatorTag extends Partial<Validator> {
  isSelected: boolean
}

interface ClaimRewardsDialogProps {
  account: Account
  tokensPrices: TokenPrice[]
  open: boolean
  onClose(): void
  validators: Validator[]
  preselectedValidatorAddresses?: string[]
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const ClaimRewardsDialog: React.FC<ClaimRewardsDialogProps> = ({
  account,
  tokensPrices,
  open,
  onClose,
  validators,
  preselectedValidatorAddresses,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [amount, setAmount] = React.useState<TokenAmount>({})
  const [delegations, setDelegations] = React.useState<Array<ValidatorTag>>([])
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const { password } = useWalletsContext()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DelegationStage>(
    DelegationStage.SelectValidatorsStage
  )

  const defaultGasFee = getTokenAmountFromDenoms(
    get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
    tokensPrices
  )

  const transactionData = React.useMemo(
    () => ({
      address: account.address,
      password,
      transactions: delegations
        .map((r) => {
          return formatTransactionMsg(account.crypto, {
            type: 'withdraw reward',
            delegator: account.address,
            validator: r.address,
          })
        })
        .filter((a) => a),
      gasFee: get(cryptocurrencies, `${account.crypto}.defaultGasFee`, {}),
      memo,
    }),
    [delegations, account, password, memo]
  )

  const confirmWithPassword = React.useCallback(
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

  const confirmLast = React.useCallback(() => {
    setStage(DelegationStage.SecurityPasswordStage)
  }, [setStage])

  const confirmAmount = React.useCallback(
    (a: TokenAmount, d: Array<ValidatorTag>, m: string) => {
      setDelegations(d)
      setAmount(a)
      setMemo(m)
      setStage(DelegationStage.ConfirmWithdrawStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} content="rewards was successfully withdrew" />,
        }
      case DelegationStage.SecurityPasswordStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={confirmWithPassword} loading={loading} />,
        }
      case DelegationStage.ConfirmWithdrawStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <ConfirmWithdraw
              account={account}
              amount={amount}
              gasFee={defaultGasFee}
              delegations={delegations}
              memo={memo}
              onConfirm={confirmLast}
              rawTransactionData={transactionData}
            />
          ),
        }
      case DelegationStage.SelectValidatorsStage:
      default:
        return {
          title: t('withdraw reward'),
          content: (
            <SelectValidators
              account={account}
              onConfirm={confirmAmount}
              validators={validators}
              preselectedValidatorAddresses={preselectedValidatorAddresses}
            />
          ),
        }
    }
  }, [stage, t])

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

export default ClaimRewardsDialog
