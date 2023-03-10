import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import React from 'react';
import MnemonicPhraseInput from '../MnemonicPhraseInput';
import useStyles from './styles';

interface CreateWalletProps {
  mnemonic: string;
  onConfirm(): void;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ mnemonic, onConfirm }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onConfirm();
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          <Trans
            i18nKey={t('create new wallet description')}
            components={[
              <Typography color="textSecondary" />,
              <Typography
                style={{
                  display: 'block',
                }}
              />,
              <Typography
                color="textPrimary"
                style={{
                  display: 'inline-block',
                  fontWeight: 900,
                }}
              />,
            ]}
          />
        </DialogContentText>
        <MnemonicPhraseInput disabled mnemonic={mnemonic} />
        <Box mt={6} />
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button className={classes.button} color="primary" variant="contained" type="submit">
            {t('create new wallet button')}
          </Button>
          <Typography align="center">{t('create new wallet caption')}</Typography>
        </Box>
      </DialogActions>
    </form>
  );
};

export default CreateWallet;
