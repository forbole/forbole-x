import { Box, Typography, Button } from '@material-ui/core';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useGetStyles } from './styles';

interface InActiveProps {
  status: string;
  alignRight: boolean;
  onClick: () => void;
}

const InActive: React.FC<InActiveProps> = ({ status, alignRight, onClick }) => {
  const { classes } = useGetStyles(status, alignRight);
  const { t } = useTranslation('common');

  return (
    <Box className={classes.inActiveStatus}>
      <Typography className={classes.typograph}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Typography>
      <Button size="small" color="primary" variant="contained" onClick={onClick}>
        {t('delegate')}
      </Button>
    </Box>
  );
};

export default InActive;
