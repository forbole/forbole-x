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
import { getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'

enum DelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
  ConfirmDelegationStage = 'confirm delegation',
}

interface DelegationDialogProps {
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

const DelegationDialog: React.FC<DelegationDialogProps> = ({
  account,
  open,
  onClose,
  availableTokens,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: { name: string; image: string } }>
  >([])
  const [memo, setMemo] = React.useState('')

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DelegationStage>(
    DelegationStage.SelectAmountStage
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
    (d: Array<{ amount: number; validator: { name: string; image: string } }>, m: string) => {
      setDelegations(d)
      setMemo(m)
      // TODO: sign transactions
      console.log(delegations, memo)
      setStage(DelegationStage.ConfirmDelegationStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SelectValidatorsStage:
        return {
          title: t('delegate'),
          content: (
            <SelectValidators
              account={account}
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
              delegations={delegations}
              memo={memo}
              onConfirm={onClose}
            />
          ),
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
