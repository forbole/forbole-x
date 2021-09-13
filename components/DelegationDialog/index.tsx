/* eslint-disable camelcase */
import { Typography, Box, Dialog, DialogTitle, IconButton, DialogContent } from '@material-ui/core'
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
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIsMobile from '../../misc/useIsMobile'
import cryptocurrencies from '../../misc/cryptocurrencies'
import ImageDefaultDark from '../../assets/images/image_default_dark.svg'
import ImageDefaultLight from '../../assets/images/image_default_light.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'

enum DelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
}

interface DelegationDialogProps {
  account?: Account
  validators: Validator[]
  defaultValidator?: Validator
  availableTokens: AvailableTokens
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
  const { currency, theme } = useGeneralContext()
  const isMobile = useIsMobile()
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: Validator }>
  >([])
  const [confirmLoading, setLoading] = React.useState(false)
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]

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
        const msgs = d
          .map((r) => {
            const coinsToSend = getEquivalentCoinToSend(
              { amount: r.amount, denom },
              availableTokens.coins,
              availableTokens.tokens_prices
            )
            return {
              typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
              value: {
                delegatorAddress: account.address,
                validatorAddress: r.validator.address,
                amount: {
                  amount: Math.round(coinsToSend.amount).toString(),
                  denom: coinsToSend.denom,
                },
              },
            }
          })
          .filter((a) => a)
        await invoke(window, 'forboleX.sendTransaction', password, account.address, {
          msgs,
          memo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        setLoading(false)
      }
    },
    [setStage, password, availableTokens, account, denom]
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
              confirmLoading={confirmLoading}
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
      maxWidth={content.dialogWidth || (availableAmount[crypto.name]?.amount > 0 ? 'md' : 'sm')}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
    >
      {availableAmount[crypto.name]?.amount > 0 ? (
        <>
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
        </>
      ) : (
        <>
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon {...iconProps} />
          </IconButton>
          <DialogTitle>{t('delegate')}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Box justifyContent="center" display="flex" mt={6}>
              {theme === 'light' ? <ImageDefaultLight /> : <ImageDefaultDark />}
            </Box>
            <Box textAlign="center" mt={4} mb={8}>
              <Typography>{t('no available token yet')}</Typography>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default DelegationDialog
