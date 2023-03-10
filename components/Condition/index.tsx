import React from 'react';
import { Box, Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useStyles } from './styles';

const Condition: React.FC<{
  className?: string;
  onClick?: () => void;
}> = ({ className, onClick }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  return onClick ? (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onClick={onClick}>
      <Box className={`${className} ${classes.root}`}> </Box>
      <Button size="small" color="primary" variant="contained">
        {t('delegate')}
      </Button>
    </Box>
  ) : (
    <div className={`${className} ${classes.root}`} />
  );
};

export default Condition;
