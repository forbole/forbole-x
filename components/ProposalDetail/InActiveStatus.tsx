import { Box, Typography } from '@material-ui/core';
import React from 'react';
import useGetStyles from './styles';

interface InActiveStatusProps {
  status: string;
}

const InActiveStatus: React.FC<InActiveStatusProps> = ({ status }) => {
  const { classes } = useGetStyles('', status);

  return (
    <Box className={classes.inActiveStatus}>
      <Typography className={classes.typograph}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Typography>
    </Box>
  );
};

export default InActiveStatus;
