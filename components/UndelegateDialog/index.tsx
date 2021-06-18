/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import invoke from 'lodash/invoke'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectValidators from './SelectValidators'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIsMobile from '../../misc/useIsMobile'
import useSignerInfo from '../../misc/useSignerInfo'

interface UndelegationDialogProps {
  account: Account
  validator: Validator
  delegatedTokens: Array<{ amount: string; denom: string }>
  tokensPrices: TokenPrice[]
  open: boolean
  onClose(): void
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
  const [loading, setLoading] = React.useState(false)
  const signerInfo = useSignerInfo(account)

  const availableAmount = React.useMemo(
    () => getTokenAmountFromDenoms(delegatedTokens, tokensPrices),
    [delegatedTokens, tokensPrices, crypto]
  )

  const confirm = React.useCallback(
    async (amount: number, denom: string, memo: string) => {
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
              type: 'cosmos-sdk/MsgUndelegate',
              value: {
                delegator_address: account.address,
                validator_address: validator.address,
                amount: { amount: coinsToSend.amount.toString(), denom: coinsToSend.denom },
              },
            },
          ],
          fee: {
            amount: get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
            gas: get(cryptocurrencies, `${account.crypto}.defaultGasFee.gas.undelegate`, 0),
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
    [delegatedTokens, tokensPrices, account, password, account, signerInfo]
  )

  React.useEffect(() => {
    if (open) {
      setLoading(false)
    }
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
    >
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('undelegate')}</DialogTitle>
      <SelectValidators
        account={account}
        crypto={crypto}
        validator={validator}
        availableAmount={availableAmount}
        onConfirm={confirm}
        loading={loading}
      />
    </Dialog>
  )
}

export default UndelegationDialog
