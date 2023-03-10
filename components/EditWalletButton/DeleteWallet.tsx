import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useStyles from './styles';
import { useWalletsContext } from '../../contexts/WalletsContext';

interface DeleteWalletProps {
  walletId: string;
  onClose(): void;
}

const DeleteWallet: React.FC<DeleteWalletProps> = ({ walletId, onClose }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const { deleteWallet } = useWalletsContext();

  const onButtonClick = React.useCallback(async () => {
    try {
      await deleteWallet(walletId);
      onClose();
    } catch (err) {
      console.log(err);
    }
  }, [deleteWallet, walletId]);

  return (
    <>
      <DialogTitle>{t('delete wallet')}</DialogTitle>
      <DialogContent>
        <Typography align="center">{t('delete wallet warning')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          {t('cancel')}
        </Button>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {t('yes')}
        </Button>
      </DialogActions>
    </>
  );
};

export default DeleteWallet;
