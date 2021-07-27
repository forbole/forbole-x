/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import invoke from 'lodash/invoke'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectAmount from './SelectAmount'
import SelectValidators from './SelectValidators'
import useStateHistory from '../../misc/useStateHistory'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIsMobile from '../../misc/useIsMobile'

enum RedelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
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
  const [loading, setLoading] = React.useState(false)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<RedelegationStage>(
    RedelegationStage.SelectAmountStage
  )

  const availableAmount = React.useMemo(
    () => getTokenAmountFromDenoms(delegatedTokens, tokensPrices),
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
    async (toValidator: Validator, memo: string) => {
      try {
        setLoading(true)
        const coinsToSend = getEquivalentCoinToSend(
          { amount, denom },
          delegatedTokens,
          tokensPrices
        )
        await invoke(window, 'forboleX.sendTransaction', password, account.address, {
          msgs: [
            {
              type: 'cosmos-sdk/MsgBeginRedelegate',
              value: {
                delegator_address: account.address,
                validator_src_address: fromValidator.address,
                validator_dst_address: toValidator.address,
                amount: { amount: coinsToSend.amount.toString(), denom: coinsToSend.denom },
              },
            },
          ],
          memo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        setLoading(false)
      }
    },
    [amount, denom, delegatedTokens, tokensPrices, password, account, fromValidator]
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
              loading={loading}
            />
          ),
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
