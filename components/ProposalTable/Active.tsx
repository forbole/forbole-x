import { Box, Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useGetStyles from './styles';

interface ActiveProps {
  status: string;
  onClick: () => void;
}

const Active: React.FC<ActiveProps> = ({ status, onClick }) => {
  const { classes } = useGetStyles(status);
  const { t } = useTranslation('common');

  return (
    <Box>
      <Button
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
        size="small"
        variant="contained"
        className={classes.activeStatus}>
        {t(status)}
      </Button>
    </Box>
  );
};

export default Active;
