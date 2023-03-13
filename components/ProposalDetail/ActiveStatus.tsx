import { Box, Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useGetStyles from './styles';

interface ActiveStatusProps {
  status: string;
  onClick: () => void;
  className?: string;
}

const ActiveStatus: React.FC<ActiveStatusProps> = ({ status, onClick, className }) => {
  const { classes } = useGetStyles('', status);
  const { t } = useTranslation('common');

  return (
    <Box onClick={onClick} className={className}>
      <Button size="small" variant="contained" className={classes.activeStatus}>
        {t(status)}
      </Button>
    </Box>
  );
};

export default ActiveStatus;
