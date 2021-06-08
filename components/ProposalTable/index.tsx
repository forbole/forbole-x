import React from 'react'
import { Box, Card, Typography, Avatar, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useGetStyles } from './styles'
import Active from './Active'
import InActive from './InActive'
import VoteDialog from '../VoteDialog'
import DepositDialog from '../DepositDialog'

interface ProposalsTableProps {
  proposals: Proposal[]
  account: Account
}

const ProposalTable: React.FC<ProposalsTableProps> = ({ proposals, account }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  const router = useRouter()

  const [voteDialogOpen, setVoteDialogOpen] = React.useState(false)
  const [depositDialogOpen, setDepositDialogOpen] = React.useState(false)
  const [selectedProposal, setSelectedProposal] = React.useState<Proposal>()
  const onClick = (proposal: Proposal) => {
    setSelectedProposal(proposal)
    if (proposal.tag === 'vote') {
      setVoteDialogOpen(true)
    }
    setSelectedProposal(proposal)
    if (proposal.tag === 'deposit') {
      setDepositDialogOpen(true)
    }
  }

  return (
    <>
      <Card>
        {proposals.map((x) => {
          return (
            <Box key={x.id} className={classes.box}>
              <Box p={4} display="flex" justifyContent="flex-end">
                <Box
                  onClick={() => {
                    router.push(`/proposals/${account.address}/${x.id}`)
                  }}
                >
                  <Typography variant="h6">{`#${x.id}`}</Typography>
                </Box>
                <Box
                  pl={3}
                  flex={1}
                  onClick={() => {
                    router.push(`/proposals/${account.address}/${x.id}`)
                  }}
                >
                  <Box display="flex" mb={2}>
                    <Typography variant="h6">{t('proposer')}</Typography>
                    <Avatar
                      className={classes.validatorAvatar}
                      alt={x.proposer.name}
                      src={x.proposer.image}
                    />
                    <Typography variant="h6" className={classes.ellipsisText}>
                      {x.proposer.name}
                    </Typography>
                  </Box>
                  <Typography variant="h6">{x.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {x.description}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`${t('voting time')}: ${x.votingStartTime} to ${x.votingEndTime}`}
                    {x.isActive ? (
                      <span className={classes.duration}>
                        {`(${t('in')} ${x.duration} ${x.duration > 1 ? t('days') : t('day')})`}
                      </span>
                    ) : null}
                  </Typography>
                </Box>
                <Box display="flex-end">
                  {x.tag === 'vote' || x.tag === 'deposit' ? (
                    <Active status={x.tag} onClick={() => onClick(x)} />
                  ) : (
                    <InActive status={x.tag} />
                  )}
                </Box>
              </Box>
              <Divider className={classes.divider} />
            </Box>
          )
        })}
      </Card>
      <VoteDialog
        proposal={selectedProposal}
        account={account}
        open={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
      />
      <DepositDialog
        proposal={selectedProposal}
        account={account}
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
      />
    </>
  )
}

export default ProposalTable
