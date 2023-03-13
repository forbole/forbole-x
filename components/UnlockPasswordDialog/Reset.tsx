import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useStyles from './styles';

interface ResetProps {
  onCancel(): void;
  onResetApp(): void;
}

const Reset: React.FC<ResetProps> = ({ onCancel, onResetApp }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <>
      <DialogContent>
        <DialogContentText>{t('reset description')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.resetButton}
          variant="contained"
          color="secondary"
          onClick={() => onCancel()}>
          {t('cancel')}
        </Button>
        <Button
          className={classes.resetButton}
          variant="contained"
          color="primary"
          onClick={() => onResetApp()}>
          {t('reset')}
        </Button>
      </DialogActions>
    </>
  );
};

export default Reset;
