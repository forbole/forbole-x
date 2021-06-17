/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
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
import useSignerInfo from '../../misc/useSignerInfo'

enum DelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
}

interface DelegationDialogProps {
  account: Account
  validators: Validator[]
  defaultValidator?: Validator
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
  defaultValidator,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { password } = useWalletsContext()
  const isMobile = useIsMobile()
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: Validator }>
  >([])
  const [loading, setLoading] = React.useState(false)
  const signerInfo = useSignerInfo(account)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DelegationStage>(
    DelegationStage.SelectAmountStage
  )

  const availableAmount = React.useMemo(
    () => getTokenAmountFromDenoms(availableTokens.coins, availableTokens.tokens_prices),
    [availableTokens]
  )

  const confirmAmount = React.useCallback(
    (a: number, d: string) => {
      setAmount(a)
      setDenom(d)
      setDelegations([{ amount: a, validator: (defaultValidator || {}) as Validator }])
      setStage(DelegationStage.SelectValidatorsStage)
    },
    [setAmount, setStage, defaultValidator]
  )

  const confirmDelegations = React.useCallback(
    async (d: Array<{ amount: number; validator: Validator }>, memo: string) => {
      try {
        setLoading(true)
        await invoke(window, 'forboleX.sendTransaction', password, account.address, {
          msgs: d
            .map((r) => {
              const coinsToSend = getEquivalentCoinToSend(
                { amount: r.amount, denom },
                availableTokens.coins,
                availableTokens.tokens_prices
              )
              return {
                type: 'cosmos-sdk/MsgDelegate',
                value: {
                  delegator_address: account.address,
                  validator_address: r.validator.address,
                  amount: { amount: coinsToSend.amount.toString(), denom: coinsToSend.denom },
                },
              }
            })
            .filter((a) => a),
          fee: get(cryptocurrencies, `${account.crypto}.defaultGasFee`, {}),
          memo,
          ...signerInfo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    },
    [setStage, password, availableTokens, account, signerInfo]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SelectValidatorsStage:
        return {
          title: t('delegate'),
          content: (
            <SelectValidators
              crypto={crypto}
              delegations={delegations}
              validators={validators}
              amount={amount}
              denom={denom}
              onConfirm={confirmDelegations}
              loading={loading}
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

  React.useEffect(() => {
    if (open) {
      setAmount(0)
      setDenom('')
      setDelegations([])
      setLoading(false)
      setStage(DelegationStage.SelectAmountStage, true)
    }
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth={content.dialogWidth || 'md'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        className: classes.dialog,
      }}
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

export default DelegationDialog
