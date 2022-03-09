import React from 'react'
import {
  Box,
  Card,
  Typography,
  Avatar,
  Divider,
  Link,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import Linkify from 'react-linkify'
import useTranslation from 'next-translate/useTranslation'
import get from 'lodash/get'
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
import Markdown from '../Markdown'
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../misc/utils'

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
    address: string
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
  voteDetails?: VoteDetail[]
  denoms: TokenPrice[]
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
  denoms,
}) => {
  const { classes } = useGetStyles()
  const { t, lang } = useTranslation('common')
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
        <Box p={4} style={{ position: 'relative' }}>
          <Box display="flex">
            <Box>
              <Typography variant="h6" className={classes.number}>{`#${proposal.id}`}</Typography>
            </Box>
            <Box pl={3} flex={1}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography variant="h6" color="textSecondary" display="inline">
                    {t('type')}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="subtitle1" display="inline">
                    {`${t(`${proposal.type}Proposal`)}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" color="textSecondary">
                    {t('description')}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="subtitle1" display="inline">
                    <Markdown>{proposal.description || ''}</Markdown>
                  </Typography>
                </Grid>
                {/* Software Upgrade Proposal */}
                {get(proposal, 'content.plan') ? (
                  <>
                    <Grid item xs={2}>
                      <Typography variant="h6" color="textSecondary">
                        {t('plan')}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Table className={classes.detailTable}>
                        <TableBody>
                          <TableRow className={classes.tableRow}>
                            <TableCell>{t('name')}</TableCell>
                            <TableCell>{get(proposal, 'content.plan.name', '')}</TableCell>
                          </TableRow>
                          <TableRow className={classes.tableRow}>
                            <TableCell>{t('height')}</TableCell>
                            <TableCell>{get(proposal, 'content.plan.height', '')}</TableCell>
                          </TableRow>
                          <TableRow className={classes.tableRow}>
                            <TableCell>{t('info')}</TableCell>
                            <TableCell>
                              <Linkify
                                componentDecorator={(href, text) => (
                                  <Link target="_blank" href={href}>
                                    {text}
                                  </Link>
                                )}
                              >
                                {get(proposal, 'content.plan.info', '')}
                              </Linkify>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                  </>
                ) : null}
                {/* Params Change Proposal */}
                {get(proposal, 'content.changes') ? (
                  <>
                    <Grid item xs={2}>
                      <Typography variant="h6" color="textSecondary">
                        {t('changes')}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Table className={classes.detailTable}>
                        <TableHead>
                          <TableRow>
                            <TableCell>{t('subspace')}</TableCell>
                            <TableCell>{t('key')}</TableCell>
                            <TableCell>{t('value')}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {get(proposal, 'content.changes', []).map((c, i) => (
                            <TableRow key={String(i)} className={classes.tableRow}>
                              <TableCell>{get(c, 'subspace', '')}</TableCell>
                              <TableCell>{get(c, 'key', '')}</TableCell>
                              <TableCell>{get(c, 'value', '')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </>
                ) : null}
                {/* Community Spend Proposal */}
                {get(proposal, 'content.recipient') ? (
                  <>
                    <Grid item xs={2}>
                      <Typography variant="h6" color="textSecondary">
                        {t('recipient')}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Link
                        variant="subtitle1"
                        target="_blank"
                        href={`${crypto.blockExplorerBaseUrl}/accounts/${get(
                          proposal,
                          'content.recipient',
                          ''
                        )}`}
                      >
                        {get(proposal, 'content.recipient', '')}
                      </Link>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="h6" color="textSecondary">
                        {t('amount')}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="subtitle1" display="inline">
                        {formatTokenAmount(
                          getTokenAmountFromDenoms(get(proposal, 'content.amount', []), denoms),
                          { defaultUnit: crypto.name, lang }
                        )}
                      </Typography>
                    </Grid>
                  </>
                ) : null}
              </Grid>
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
      <Card className={classes.card}>
        <Box m={4}>
          <VoteResult voteSummary={voteSummary} crypto={crypto} proposal={proposal} />
          <VoteTable voteDetails={voteDetails} crypto={crypto} />
        </Box>
      </Card>
      <DepositTable proposal={proposal} crypto={crypto} tag={proposal.tag} />
      <VoteDialog
        proposal={proposal}
        crypto={crypto}
        open={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
      />
    </>
  )
}

export default ProposalDetail
