import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { gql, useSubscription } from '@apollo/client'
import get from 'lodash/get'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import InputAmount from './InputAmount'
import { getEquivalentCoinToSend } from '../../misc/utils'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useSendTransaction from '../../misc/useSendTransaction'

interface DepositDialogProps {
  crypto: Cryptocurrency
  open: boolean
  onClose(): void
  proposal: Proposal
}

const DepositDialog: React.FC<DepositDialogProps> = ({ crypto, open, onClose, proposal }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { password, accounts: allAccounts } = useWalletsContext()
  const accounts = allAccounts.filter((a) => a.crypto === crypto.name)
  const sendTransaction = useSendTransaction()

  const [loading, setLoading] = React.useState(false)
  const [address, setAddress] = React.useState('')

  const { data: balanceData } = useSubscription(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address } }
  )

  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  const confirmAmount = React.useCallback(
    async (depositor: string, amount: number, denom: string, memo: string) => {
      try {
        setLoading(true)
        const coinsToSend = getEquivalentCoinToSend(
          { amount, denom },
          availableTokens.coins,
          availableTokens.tokens_prices
        )
        const msg: TransactionMsgDeposit = {
          typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
          value: {
            depositor,
            proposalId: proposal.id,
            amount: [{ amount: coinsToSend.amount.toString(), denom: coinsToSend.denom }],
          },
        }
        await sendTransaction(password, depositor, {
          msgs: [msg],
          memo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [availableTokens, sendTransaction]
  )

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('deposit')}</DialogTitle>
      <InputAmount
        open={open}
        onNext={confirmAmount}
        proposal={proposal}
        crypto={crypto}
        accounts={accounts}
        address={address}
        setAddress={setAddress}
        availableTokens={availableTokens}
        loading={loading}
      />
    </Dialog>
  )
}

export default DepositDialog
