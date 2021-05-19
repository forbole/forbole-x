import { Box, Dialog, DialogTitle, IconButton, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import VoteIcon from '../../assets/images/icons/icon_vote.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectAnswer from './SelectAnswer'
import ConfirmWithdraw from './ConfirmAnswer'
import useStateHistory from '../../misc/useStateHistory'
import Success from '../Success'
import SecurityPassword from '../SecurityPasswordDialogContent'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { formatTransactionMsg } from '../../misc/formatTransactionMsg'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import { getTokenAmountFromDenoms } from '../../misc/utils'
import { size } from 'lodash'
import ConfirmAnswer from './ConfirmAnswer'

enum VotingStage {
  SecurityPasswordStage = 'security password',
  SelectAnswerStage = 'select answer',
  ConfirmAnswerStage = 'confirm withdraw',
  SuccessStage = 'success',
}

export interface Proposal {
  no: string
  proposer: {
    name: string
    image: string
    address: string
  }
  title: string
  content: string
  votingTime: string
  duration?: string
  isActive: boolean
  tag: string
}

interface VoteDialogProps {
  accounts: Account[]
  tokensPrices: TokenPrice[]
  open: boolean
  onClose(): void
  proposal: Proposal
}

interface Content {
  title: string | React.ReactNode
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const VoteDialog: React.FC<VoteDialogProps> = ({
  accounts,
  tokensPrices,
  open,
  onClose,
  proposal,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const voteIconProps = useIconProps(8)
  const [answer, setAnswer] = React.useState<{ name: string; id: string }>()
  const [voteAccount, setVoteAccount] = React.useState<Account>(accounts[0])
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const { password } = useWalletsContext()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<VotingStage>(
    VotingStage.SelectAnswerStage
  )

  console.log('accounts[0]', accounts[0])

  // const defaultGasFee = getTokenAmountFromDenoms(
  //   get(cryptocurrencies, `${voteAccount.crypto}.defaultGasFee.amount`, []),
  //   tokensPrices
  // )
  const defaultGasFee: TokenAmount = {
    DSM: {
      amount: 0,
      price: 0,
    },
  }

  // const transactionData = React.useMemo(
  //   () => ({
  //     address: voteAccount.address,
  //     password,
  //     transactions: delegations
  //       .map((r) => {
  //         return formatTransactionMsg(voteAccount.crypto, {
  //           type: 'withdraw reward',
  //           delegator: voteAccount.address,
  //           validator: r.address,
  //         })
  //       })
  //       .filter((a) => a),
  //     gasFee: get(cryptocurrencies, `${voteAccount.crypto}.defaultGasFee`, {}),
  //     memo,
  //   }),
  //   [delegations, voteAccount, password, memo]
  // )

  const confirmWithPassword = React.useCallback(
    async (securityPassword: string) => {
      try {
        setLoading(true)
        // const result = await sendMsgToChromeExt({
        //   event: 'signAndBroadcastTransactions',
        //   data: {
        //     securityPassword,
        //     ...transactionData,
        //   },
        // })
        // console.log(result)
        setLoading(false)
        setStage(VotingStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    // [transactionData]
    []
  )

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
          content: <SecurityPassword onConfirm={confirmWithPassword} loading={loading} />,
        }
      case VotingStage.ConfirmAnswerStage:
        return {
          title: (
            <Box>
              <VoteIcon {...voteIconProps} className={classes.voteButton} />
              <Typography className={classes.title} variant="h1">{`${t('You’re going to vote')} ${answer.name}`}</Typography>
            </Box>
          ),
          dialogWidth: 'sm',
          content: (
            <ConfirmWithdraw
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
          content: <SelectAnswer accounts={accounts} onNext={chooseAnswer} proposal={proposal} />,
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
