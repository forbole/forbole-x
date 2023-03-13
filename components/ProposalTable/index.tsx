import React from 'react';
import { Box, Card, Typography, Avatar, Divider, Link as MLink } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import useGetStyles from './styles';
import Active from './Active';
import InActive from './InActive';
import VoteDialog from '../VoteDialog';
import DepositDialog from '../DepositDialog';
import Markdown from '../Markdown';

interface ProposalsTableProps {
  proposals: Proposal[];
  crypto: Cryptocurrency;
}

const ProposalTable: React.FC<ProposalsTableProps> = ({ proposals, crypto }) => {
  const { classes } = useGetStyles();
  const { t } = useTranslation('common');

  const [voteDialogOpen, setVoteDialogOpen] = React.useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = React.useState(false);
  const [selectedProposal, setSelectedProposal] = React.useState<Proposal>();
  const onClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    if (proposal.tag === 'vote') {
      setVoteDialogOpen(true);
    }
    setSelectedProposal(proposal);
    if (proposal.tag === 'deposit') {
      setDepositDialogOpen(true);
    }
  };

  return (
    <>
      <Card>
        {proposals.map(x => {
          return (
            <Link key={x.id} href={`/proposals/${crypto.name}/${x.id}`}>
              <Box className={classes.box}>
                <Box p={4} display="flex" justifyContent="flex-end">
                  <Box>
                    <Typography variant="h6">{`#${x.id}`}</Typography>
                  </Box>
                  <Box pl={3} flex={1}>
                    <Box display="flex" mb={2}>
                      <Typography variant="h6">{t('proposer')}</Typography>
                      <MLink
                        href={`${crypto.blockExplorerBaseUrl}/accounts/${x.proposer.address}`}
                        target="_blank"
                        onClick={e => e.stopPropagation()}>
                        <Box display="flex">
                          <Avatar
                            className={classes.validatorAvatar}
                            alt={x.proposer.name}
                            src={x.proposer.image}
                          />
                          <Typography color="primary" variant="h6" className={classes.ellipsisText}>
                            {x.proposer.name || x.proposer.address}
                          </Typography>
                        </Box>
                      </MLink>
                    </Box>
                    <Typography variant="h6">{x.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <Markdown>{x.description || ''}</Markdown>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {x.tag === 'deposit'
                        ? t('deposit time', { from: x.submitTime, to: x.depositEndTime })
                        : null}
                      {x.tag === 'vote' || x.tag === 'passed'
                        ? t('voting time', { from: x.votingStartTime, to: x.votingEndTime })
                        : null}
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
                {proposals.length > 1 && <Divider className={classes.divider} />}
              </Box>
            </Link>
          );
        })}
      </Card>
      <VoteDialog
        proposal={selectedProposal}
        crypto={crypto}
        open={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
      />
      <DepositDialog
        proposal={selectedProposal}
        crypto={crypto}
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
      />
    </>
  );
};

export default ProposalTable;
