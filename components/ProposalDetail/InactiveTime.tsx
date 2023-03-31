import { Box, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface ActiveProps {
  proposal: Proposal;
}

const InactiveTime: React.FC<ActiveProps> = ({ proposal }) => {
  const { t } = useTranslation('common');

  return (
    <Box display="flex">
      <Box>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('submitted time')}: ${proposal.submitTime}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('voting start time')}: ${proposal.votingStartTime}`}
        </Typography>
      </Box>
      <Box pl={4}>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('deposited end time')}: ${proposal.depositEndTime}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('voting end time')}: ${proposal.votingEndTime}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default InactiveTime;
