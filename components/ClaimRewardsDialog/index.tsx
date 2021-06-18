import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import invoke from 'lodash/invoke'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectValidators from './SelectValidators'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useIsMobile from '../../misc/useIsMobile'
import useSignerInfo from '../../misc/useSignerInfo'

export interface ValidatorTag extends Validator {
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

const ClaimRewardsDialog: React.FC<ClaimRewardsDialogProps> = ({
  account,
  open,
  onClose,
  validators,
  preselectedValidatorAddresses,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const [loading, setLoading] = React.useState(false)
  const signerInfo = useSignerInfo(account)
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
          fee: {
            amount: get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
            gas: String(
              msgs.length *
                Number(get(cryptocurrencies, `${account.crypto}.defaultGasFee.gas.claimRewards`, 0))
            ),
          },
          memo,
          ...signerInfo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [password, account, signerInfo]
  )

  React.useEffect(() => {
    if (open) {
      setLoading(false)
    }
  }, [open])

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('withdraw reward')}</DialogTitle>
      <SelectValidators
        account={account}
        crypto={crypto}
        onConfirm={confirm}
        validators={validators}
        preselectedValidatorAddresses={preselectedValidatorAddresses}
        loading={loading}
      />
    </Dialog>
  )
}

export default ClaimRewardsDialog
