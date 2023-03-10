import { Box, Typography } from '@material-ui/core';
import { differenceInDays } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useGetStyles } from './styles';

interface ActiveProps {
  proposal: Proposal;
}

const DepositTime: React.FC<ActiveProps> = ({ proposal }) => {
  const { classes } = useGetStyles();
  const { t } = useTranslation('common');

  const dateDiff = differenceInDays(new Date(proposal.depositEndTime), new Date());

  return (
    <Box display="flex">
      <Box>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('submitted time')}: ${proposal.submitTime}`}
        </Typography>
      </Box>
      <Box ml={4}>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('deposited end time')}: ${proposal.depositEndTime}`}
          <span className={classes.duration}>
            {`(${t('in')} ${dateDiff} ${dateDiff > 1 ? t('days') : t('day')})`}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default DepositTime;
