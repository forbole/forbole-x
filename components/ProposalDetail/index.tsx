import React from 'react'
import { Box, Card, Typography, Avatar, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useGetStyles } from './styles'
import ActiveStatus from './ActiveStatus'
import DepositTable from './DepositTable'
import VoteTime from './VoteTime'
import DepositTime from './DepositTime'
import InactiveTime from './InactiveTime'
import InActiveStatus from './InActiveStatus'
import VoteDialog from '../VoteDialog'
import VoteResult from './VoteResult'
import VoteTable from './VoteTable'

export interface VoteSummary {
  amount: number
  description: string
  data: {
    title: string
    percentage: number
    value: number
  }[]
}

export interface VoteDetail {
  voter: {
    name: string
    image: string
  }
  votingPower: number
  votingPowerPercentage: number
  votingPowerOverride: number
  answer: string
}

export interface DepositDetail {
  depositor: {
    name: string
    image: string
    address: string
  }
  amount: TokenAmount
  time: string
}

export interface Proposal {
  id: number
  proposer: {
    name: string
    image: string
    address: string
  }
  title: string
  description: string
  submitTime: string
  depositEndTime: string
  votingStartTime: string
  votingEndTime: string
  duration?: number
  isActive: boolean
  tag: string
  type: string
  depositDetails?: DepositDetail[]
}

interface ProposalDetailProps {
  proposal: Proposal
  crypto: Cryptocurrency
  voteSummary?: VoteSummary
  colors?: [string, string, string, string]
  voteDetails?: VoteDetail[]
  accounts: Account[]
}

const ProposalDetail: React.FC<ProposalDetailProps> = ({
  accounts,
  proposal,
  crypto,
  voteSummary,
  voteDetails,
}) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const [voteDialogOpen, setVoteDialogOpen] = React.useState(false)

  const timeContent = (p: Proposal) => {
    if (p.tag === 'vote') {
      return <VoteTime proposal={p} />
    }
    if (p.tag === 'deposit') {
      return <DepositTime proposal={p} />
    }
    return <InactiveTime proposal={p} />
  }

  return (
    <>
      <Card className={classes.card}>
        <Box className={classes.box}>
          <Box p={4} display="flex" justifyContent="flex-end">
            <Box>
              <Typography variant="h6">{`#${proposal.id}`}</Typography>
            </Box>
            <Box pl={3} flex={1}>
              <Box display="flex" mb={2}>
                <Typography variant="h6">{t('proposer')}</Typography>
                <Avatar
                  className={classes.validatorAvatar}
                  alt={proposal.proposer.name}
                  src={proposal.proposer.image}
                />
                <Typography variant="h6" className={classes.ellipsisText}>
                  {proposal.proposer.name}
                </Typography>
              </Box>
              <Typography variant="h6">{proposal.title}</Typography>
              {timeContent(proposal)}
            </Box>
            <Box display="flex-end">
              {proposal.isActive ? null : <InActiveStatus status={proposal.tag} />}
            </Box>
          </Box>
          <Divider className={classes.divider} />
        </Box>
        <Box p={4} pb={20} style={{ position: 'relative' }}>
          <Box display="flex">
            <Box>
              <Typography variant="h6" className={classes.number}>{`#${proposal.id}`}</Typography>
            </Box>
            <Box pl={3} flex={1}>
              <Typography variant="subtitle1">{`${t('type')}: ${t(proposal.type)}`}</Typography>
              <Typography variant="subtitle1">{`${t('description')}: `}</Typography>
              <Typography variant="subtitle1">{proposal.description}</Typography>
            </Box>
          </Box>
          {proposal.tag === 'vote' ? (
            <ActiveStatus
              status={proposal.tag}
              onClick={() => setVoteDialogOpen(true)}
              className={classes.vote}
            />
          ) : null}
        </Box>
      </Card>
      {!proposal.isActive ? (
        <Card className={classes.card}>
          <Box m={4}>
            <VoteResult voteSummary={voteSummary} crypto={crypto} />
            <VoteTable voteDetails={voteDetails} crypto={crypto} />
          </Box>
        </Card>
      ) : null}
      {proposal.tag !== 'vote' ? (
        <DepositTable accounts={accounts} proposal={proposal} crypto={crypto} tag={proposal.tag} />
      ) : null}
      <VoteDialog
        proposal={proposal}
        accounts={accounts}
        open={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
      />
    </>
  )
}

export default ProposalDetail
