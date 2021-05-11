import React from 'react'
import { Box, Card, Typography, Avatar, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useGetStyles } from './styles'
import Active from './Active'
import InActive from './InActive'
import DepositTable from './DepositTable'

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
  no: string
  proposer: {
    name: string
    image: string
    address: string
  }
  title: string
  content: string
  detail: string
  votingTime: string
  duration?: string
  isActive: boolean
  tag: string
  type: string
  depositDetails?: DepositDetail[]
}

interface ProposalsTableProps {
  proposal: Proposal
}

const ProposalsTable: React.FC<ProposalsTableProps> = ({ proposal }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  const router = useRouter()
  const onClick = () => {
    // link to vote / deposit page
  }

  return (
    <>
      <Card className={classes.card}>
        <Box
          className={classes.box}
          onClick={() => {
            router.push(`/proposal/${proposal.no}`)
          }}
        >
          <Box p={4} display="flex" justifyContent="flex-end">
            <Box>
              <Typography variant="h6">{`#${proposal.no}`}</Typography>
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
                {proposal.votingTime}
                <span className={classes.duration}>{proposal.duration}</span>
              </Typography>
            </Box>
          </Box>
          <Divider className={classes.divider} />
        </Box>
        <Box p={4} pb={20} style={{ position: 'relative' }}>
          <Box display="flex">
            <Box>
              <Typography variant="h6" className={classes.no}>{`#${proposal.no}`}</Typography>
            </Box>
            <Box pl={3} flex={1}>
              <Typography variant="subtitle1">{`${t('type')}: ${t(proposal.type)}`}</Typography>
              <Typography variant="subtitle1">{`${t('description')}: `}</Typography>
              <Typography variant="subtitle1">{proposal.detail}</Typography>
            </Box>
          </Box>
          {proposal.tag === 'vote' ? (
            <Active status={proposal.tag} onClick={onClick} className={classes.vote} />
          ) : null}
        </Box>
      </Card>
      {proposal.tag === 'deposit' ? (
        <DepositTable depositDetails={proposal.depositDetails} />
      ) : null}
    </>
  )
}

export default ProposalsTable
