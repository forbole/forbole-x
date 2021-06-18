import { Box, Dialog, DialogTitle, IconButton, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { gql, useSubscription } from '@apollo/client'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import VoteIcon from '../../assets/images/icons/icon_vote.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectAnswer from './SelectAnswer'
import useStateHistory from '../../misc/useStateHistory'
import Success from '../Success'
import SecurityPassword from '../SecurityPasswordDialogContent'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getTokenAmountFromDenoms } from '../../misc/utils'
import ConfirmAnswer from './ConfirmAnswer'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'

enum VotingStage {
  SecurityPasswordStage = 'security password',
  SelectAnswerStage = 'select answer',
  ConfirmAnswerStage = 'confirm withdraw',
  SuccessStage = 'success',
}

interface VoteDialogProps {
  account: Account
  open: boolean
  onClose(): void
  proposal: Proposal
}

interface Content {
  title: string | React.ReactNode
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const VoteDialog: React.FC<VoteDialogProps> = ({ account, open, onClose, proposal }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const voteIconProps = useIconProps(8)
  const [answer, setAnswer] = React.useState<{ name: string; id: string }>({
    name: undefined,
    id: undefined,
  })
  const [voteAccount, setVoteAccount] = React.useState<Account>(account)
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const { password } = useWalletsContext()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<VotingStage>(
    VotingStage.SelectAnswerStage
  )

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
      setAnswer({
        name: undefined,
        id: undefined,
      })
      setMemo('')
      setMemo('')
      setLoading(false)
      setStage(VotingStage.SelectAnswerStage, true)
    }
  }, [open])

  const confirmWithPassword = React.useCallback(async (securityPassword: string) => {
    try {
      setLoading(true)
      // handle transaction part later
      setLoading(false)
      setStage(VotingStage.SuccessStage, true)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [])

  const confirmFinal = React.useCallback(() => {
    setStage(VotingStage.SecurityPasswordStage)
  }, [setStage])

  const chooseAnswer = React.useCallback(
    (v: Account, a: { name: string; id: string }, m?: string) => {
      setVoteAccount(v)
      setAnswer(a)
      setMemo(m)
      setStage(VotingStage.ConfirmAnswerStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case VotingStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} content="rewards was successfully withdrew" />,
        }
      case VotingStage.SecurityPasswordStage:
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
      case VotingStage.ConfirmAnswerStage:
        return {
          title: (
            <Box>
              <VoteIcon {...voteIconProps} />
              <Typography className={classes.title} variant="h1">
                {`${t('You’re going to vote')} ${answer.name}`}
              </Typography>
            </Box>
          ),
          dialogWidth: 'sm',
          content: (
            <ConfirmAnswer
              account={voteAccount}
              proposal={proposal}
              answer={answer}
              gasFee={defaultGasFee}
              memo={memo}
              onConfirm={confirmFinal}
              rawTransactionData=""
            />
          ),
        }
      case VotingStage.SelectAnswerStage:
      default:
        return {
          title: t('vote'),
          dialogWidth: 'sm',
          content: <SelectAnswer account={account} onNext={chooseAnswer} proposal={proposal} />,
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

export default VoteDialog
