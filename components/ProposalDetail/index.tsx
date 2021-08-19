import React from 'react'
import { Box, Card, Typography, Avatar, Divider, Link } from '@material-ui/core'
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

interface ProposalDetailProps {
  proposal: Proposal
  crypto: Cryptocurrency
  voteSummary?: VoteSummary
  colors?: [string, string, string, string]
  voteDetails?: VoteDetail[]
  network: Chain
}

const TimeContent: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
  if (proposal.tag === 'vote') {
    return <VoteTime proposal={proposal} />
  }
  if (proposal.tag === 'deposit') {
    return <DepositTime proposal={proposal} />
  }
  return <InactiveTime proposal={proposal} />
}

const ProposalDetail: React.FC<ProposalDetailProps> = ({
  proposal,
  crypto,
  voteSummary,
  voteDetails,
  network,
}) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const [voteDialogOpen, setVoteDialogOpen] = React.useState(false)

  return (
    <>
      <Card className={classes.card}>
        <Box>
          <Box p={4} display="flex" justifyContent="flex-end">
            <Box>
              <Typography variant="h6">{`#${proposal.id}`}</Typography>
            </Box>
            <Box pl={3} flex={1}>
              <Box display="flex" mb={2}>
                <Typography variant="h6">{t('proposer')}</Typography>
                <Link
                  href={`${crypto.blockExplorerBaseUrl}/accounts/${proposal.proposer.address}`}
                  target="_blank"
                >
                  <Box display="flex">
                    <Avatar
                      className={classes.validatorAvatar}
                      alt={proposal.proposer.name}
                      src={proposal.proposer.image}
                    />

                    <Typography variant="h6" className={classes.ellipsisText}>
                      {proposal.proposer.name || proposal.proposer.address}
                    </Typography>
                  </Box>
                </Link>
              </Box>
              <Typography variant="h6">{proposal.title}</Typography>
              <TimeContent proposal={proposal} />
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
              <Typography variant="subtitle1">
                {`${t('type')}: ${t(`${proposal.type}Proposal`)}`}
              </Typography>
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
        <DepositTable network={network} proposal={proposal} crypto={crypto} tag={proposal.tag} />
      ) : null}
      <VoteDialog
        proposal={proposal}
        network={network}
        open={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
      />
    </>
  )
}

export default ProposalDetail
