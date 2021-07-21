import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import cloneDeep from 'lodash/cloneDeep'
import invoke from 'lodash/invoke'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectValidators from './SelectValidators'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useIsMobile from '../../misc/useIsMobile'

export interface ValidatorTag extends Validator {
  isSelected: boolean
}

interface WithdrawRewardsDialogProps {
  wallet: Wallet
  account: Account
  tokensPrices: TokenPrice[]
  open: boolean
  onClose(): void
  validators: Validator[]
  preselectedValidatorAddresses?: string[]
  openDelegationDialog: () => void
}

const WithdrawRewardsDialog: React.FC<WithdrawRewardsDialogProps> = ({
  wallet,
  account,
  open,
  onClose,
  validators,
  preselectedValidatorAddresses,
  openDelegationDialog,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const [loading, setLoading] = React.useState(false)
  const { password } = useWalletsContext()

  const confirm = React.useCallback(
    async (delegations: Array<ValidatorTag>, memo: string) => {
      try {
        setLoading(true)
        const msgs = delegations
          .map((r) => ({
            type: 'cosmos-sdk/MsgWithdrawDelegationReward',
            value: {
              delegator_address: account.address,
              validator_address: r.address,
            },
          }))
          .filter((a) => a)
        await invoke(window, 'forboleX.sendTransaction', password, account.address, {
          msgs,
          memo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [password, account]
  )

  const totalAmount = React.useMemo(() => {
    const total: TokenAmount = {}

    validators.forEach((x) => {
      Object.keys(x.rewards).forEach((denom) => {
        if (total[denom]) {
          total[denom].amount += x.rewards[denom].amount
        } else {
          total[denom] = cloneDeep(x.rewards[denom])
        }
      })
    })
    return total
  }, [validators])

  React.useEffect(() => {
    if (open) {
      setLoading(false)
    }
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth={Object.keys(totalAmount).length > 0 ? 'md' : 'sm'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
    >
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('withdraw reward')}</DialogTitle>
      <SelectValidators
        wallet={wallet}
        account={account}
        crypto={crypto}
        totalAmount={totalAmount}
        onConfirm={confirm}
        validators={validators}
        preselectedValidatorAddresses={preselectedValidatorAddresses}
        loading={loading}
        openDelegationDialog={openDelegationDialog}
        onClose={onClose}
      />
    </Dialog>
  )
}

export default WithdrawRewardsDialog
