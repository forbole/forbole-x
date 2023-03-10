import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import CloseIcon from '../../assets/images/icons/icon_cross.svg';
import useStyles from './styles';
import { useGeneralContext } from '../../contexts/GeneralContext';
import useIconProps from '../../misc/useIconProps';

interface DeleteAddressDialogProps {
  accountAddress: string;
  open: boolean;
  onClose(): void;
}

const DeleteAddressDialog: React.FC<DeleteAddressDialogProps> = ({
  accountAddress,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const { deleteFavAddresses } = useGeneralContext();

  const onButtonClick = React.useCallback(async () => {
    try {
      await deleteFavAddresses(accountAddress);
    } catch (err) {
      console.log(err);
    }
    onClose();
  }, [deleteFavAddresses, accountAddress]);

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('delete address')}</DialogTitle>
      <DialogContent>
        <Typography>{t('delete address warning')}</Typography>
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
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAddressDialog;
