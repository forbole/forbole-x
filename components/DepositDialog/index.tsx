import { Box, Dialog, DialogTitle, IconButton, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { gql, useSubscription } from '@apollo/client'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import DepositIcon from '../../assets/images/icons/icon_delegate_tx.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import InputAmount from './InputAmount'
import useStateHistory from '../../misc/useStateHistory'
import Success from '../Success'
import SecurityPassword from '../SecurityPasswordDialogContent'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getTokenAmountFromDenoms, formatCrypto } from '../../misc/utils'
import ConfirmAnswer from './ConfirmAmount'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'

enum DepositStage {
  SecurityPasswordStage = 'security password',
  InputAmountStage = 'input amount',
  ConfirmAnswerStage = 'confirm withdraw',
  SuccessStage = 'success',
}

interface DepositDialogProps {
  network: { id: number; crypto: string; name: string; img: string }
  open: boolean
  onClose(): void
  proposal: Proposal
  // crypto: Cryptocurrency
}

interface Content {
  title: string | React.ReactNode
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const DepositDialog: React.FC<DepositDialogProps> = ({
  network,
  open,
  onClose,
  proposal,
  // crypto,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const voteIconProps = useIconProps(8)
  const [amount, setAmount] = React.useState(0)

  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const { password, accounts: allAccounts } = useWalletsContext()
  const accounts = allAccounts.filter((a) => a.crypto === network?.crypto)
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DepositStage>(
    DepositStage.InputAmountStage
  )
  const [voteAccount, setVoteAccount] = React.useState<Account>(accounts[0])
  const crypto = voteAccount
    ? cryptocurrencies[voteAccount.crypto]
    : Object.values(cryptocurrencies)[0]

  const { data: balanceData } = useSubscription(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address: voteAccount ? voteAccount.address : '' } }
  )

  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  const defaultGasFee = voteAccount
    ? getTokenAmountFromDenoms(
        get(cryptocurrencies, `${voteAccount.crypto}.defaultGasFee.amount`, []),
        availableTokens.tokens_prices
      )
    : null

  React.useEffect(() => {
    if (open) {
      setAmount(undefined)
      setMemo('')
      setMemo('')
      setLoading(false)
      setStage(DepositStage.InputAmountStage, true)
    }
  }, [open])

  const confirmWithPassword = React.useCallback(async (securityPassword: string) => {
    try {
      setLoading(true)
      // TODO: handle transaction part later
      setLoading(false)
      setStage(DepositStage.SuccessStage, true)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [])

  const confirmAmount = React.useCallback(
    (v: Account, a: number, m?: string) => {
      setVoteAccount(v)
      setAmount(a)
      setMemo(m)
      setStage(DepositStage.ConfirmAnswerStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DepositStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: (
            <Success
              onClose={onClose}
              content={`${t('proposal')} #${proposal.id} ${t('was successfully deposited')}`}
            />
          ),
        }
      case DepositStage.SecurityPasswordStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <SecurityPassword
              walletId={voteAccount.walletId}
              onConfirm={confirmWithPassword}
              loading={loading}
            />
          ),
        }
      case DepositStage.ConfirmAnswerStage:
        return {
          title: (
            <Box>
              <DepositIcon {...voteIconProps} />
              <Typography className={classes.title} variant="h1">
                {`${t('deposit')} ${formatCrypto(amount, voteAccount.crypto, lang)}`}
              </Typography>
            </Box>
          ),
          dialogWidth: 'sm',
          content: (
            <ConfirmAnswer
              account={voteAccount}
              proposal={proposal}
              amount={amount}
              gasFee={defaultGasFee}
              memo={memo}
              onConfirm={() => setStage(DepositStage.SecurityPasswordStage)}
              rawTransactionData=""
            />
          ),
        }
      case DepositStage.InputAmountStage:
      default:
        return {
          title: t('deposit'),
          dialogWidth: 'sm',
          content: (
            <InputAmount
              account={voteAccount}
              onNext={confirmAmount}
              proposal={proposal}
              crypto={crypto}
              availableTokens={availableTokens}
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

export default DepositDialog
