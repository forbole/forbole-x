import { Box, Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useStyles from './styles';

interface ForgotPasswordProps {
  onReset(): void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onReset }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <>
      <DialogContent>
        <DialogContentText>{t('forgot password description')}</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => onReset()}>
          {t('reset')}
        </Button>
        <Box my={3.5} />
      </DialogActions>
    </>
  );
};

export default ForgotPassword;
