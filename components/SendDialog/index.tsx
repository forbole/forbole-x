/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import invoke from 'lodash/invoke'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectRecipients from './SelectRecipients'
import { useWalletsContext } from '../../contexts/WalletsContext'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useIsMobile from '../../misc/useIsMobile'
import useSignerInfo from '../../misc/useSignerInfo'

interface SendDialogProps {
  account: Account
  availableTokens: { coins: Array<{ amount: string; denom: string }>; tokens_prices: TokenPrice[] }
  open: boolean
  onClose(): void
}

const SendDialog: React.FC<SendDialogProps> = ({ account, availableTokens, open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { password } = useWalletsContext()
  const isMobile = useIsMobile()
  const signerInfo = useSignerInfo(account)
  const [loading, setLoading] = React.useState(false)

  const availableAmount = React.useMemo(
    () => getTokenAmountFromDenoms(availableTokens.coins, availableTokens.tokens_prices),
    [availableTokens]
  )

  const confirm = React.useCallback(
    async (
      recipients: Array<{ amount: { amount: number; denom: string }; address: string }>,
      memo: string
    ) => {
      setLoading(true)
      const msgs = recipients
        .map((r) => {
          const coinsToSend = getEquivalentCoinToSend(
            r.amount,
            availableTokens.coins,
            availableTokens.tokens_prices
          )
          return {
            type: 'cosmos-sdk/MsgSend',
            value: {
              from_address: account.address,
              to_address: r.address,
              amount: [{ amount: coinsToSend.amount.toString(), denom: coinsToSend.denom }],
            },
          }
        })
        .filter((a) => a)
      await invoke(window, 'forboleX.sendTransaction', password, account.address, {
        msgs,
        fee: {
          amount: get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
          gas: String(
            msgs.length *
              Number(get(cryptocurrencies, `${account.crypto}.defaultGasFee.gas.send`, 0))
          ),
        },
        memo,
        ...signerInfo,
      })
      setLoading(false)
      onClose()
    },
    [signerInfo, availableTokens]
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
      <DialogTitle>{t('send')}</DialogTitle>
      <SelectRecipients
        loading={loading}
        account={account}
        availableAmount={availableAmount}
        onConfirm={confirm}
      />
    </Dialog>
  )
}

export default SendDialog
