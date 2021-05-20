import React from 'react'
import { Box, Card, Typography, Avatar, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useGetStyles } from './styles'
import Active from './Active'
import DepositTable from './DepositTable'
import InActiveCard from './InActiveCard'

export interface VoteSummary {
  amount: number
  percentage: number
  description: string
  colors: string[]
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
  amount: number
  time: string
}

interface Proposal {
  id: string
  proposer: {
    name: string
    image: string
    address: string
  }
  title: string
  description: string
  votingStartTime: string
  votingEndTime: string
  duration?: string
  isActive: boolean
  tag: string
  type: string
  depositDetails?: DepositDetail[]
  voteDetails?: VoteDetail[]
}

interface ProposalsTableProps {
  proposal: Proposal
  crypto: Cryptocurrency
  voteSummary?: VoteSummary
}

const ProposalsTable: React.FC<ProposalsTableProps> = ({ proposal, crypto, voteSummary }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  const router = useRouter()
  const onClick = () => {
    // link to vote / deposit page
  }

  // console.log('proposal', proposal)

  return (
    <>
      <Card className={classes.card}>
        <Box
          className={classes.box}
          onClick={() => {
            router.push(`/proposal/${proposal.id}`)
          }}
        >
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
              <Typography variant="subtitle1" color="textSecondary">
                {proposal.votingEndTime}
                <span className={classes.duration}>{proposal.duration}</span>
              </Typography>
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
            <Active status={proposal.tag} onClick={onClick} className={classes.vote} />
          ) : null}
        </Box>
      </Card>
      {!proposal.isActive ? (
        // <InActiveCard
        //   voteSummary={voteSummary}
        //   voteDetails={proposal.voteDetails}
        //   crypto={crypto}
        // />
        <Typography>111</Typography>
      ) : null}
      {proposal.tag === 'deposit' ? (
        <DepositTable depositDetails={proposal.depositDetails} />
      ) : null}
    </>
  )
}

export default ProposalsTable
