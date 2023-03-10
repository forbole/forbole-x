import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useStyles from './styles';
import { useWalletsContext } from '../../contexts/WalletsContext';
import PasswordInput from '../PasswordInput';

interface ChangeSecurityPasswordProps {
  walletId: string;
  onClose(): void;
}

const ChangeSecurityPassword: React.FC<ChangeSecurityPasswordProps> = ({ walletId, onClose }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const [isSettingNewPassword, setIsSettingNewPassword] = React.useState(false);
  const [securityPassword, setSecurityPassword] = React.useState('');
  const [newSecurityPassword, setNewSecurityPassword] = React.useState('');
  const { updateWallet, viewMnemonicPhrase } = useWalletsContext();

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('');
      if (isSettingNewPassword) {
        await updateWallet(walletId, { newSecurityPassword, securityPassword });
        onClose();
      } else {
        await viewMnemonicPhrase(walletId, securityPassword);
        setIsSettingNewPassword(true);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [
    isSettingNewPassword,
    setIsSettingNewPassword,
    securityPassword,
    newSecurityPassword,
    walletId,
    setError,
  ]);

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onButtonClick();
      }}
    >
      <DialogTitle>{t('change security password')}</DialogTitle>
      <DialogContent>
        <Box mb={18}>
          <Typography gutterBottom>
            {t(isSettingNewPassword ? 'new password' : 'current password')}
          </Typography>
          <PasswordInput
            value={isSettingNewPassword ? newSecurityPassword : securityPassword}
            onChange={e =>
              (isSettingNewPassword ? setNewSecurityPassword : setSecurityPassword)(e.target.value)
            }
            placeholder={t('password')}
            error={!!error}
            helperText={error}
            withSecurityLevel={isSettingNewPassword}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button className={classes.dialogButton} variant="contained" color="primary" type="submit">
          {t(isSettingNewPassword ? 'save' : 'next')}
        </Button>
      </DialogActions>
    </form>
  );
};

export default ChangeSecurityPassword;
