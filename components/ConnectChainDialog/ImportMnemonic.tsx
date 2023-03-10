import { Button, DialogActions, DialogContent, DialogContentText, Box } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { isValidMnemonic } from '../../misc/utils';
import MnemonicPhraseInput from '../MnemonicPhraseInput';
import useStyles from './styles';

interface ImportMnemonicProps {
  onConfirm(mnemonic: string): void;
}

const ImportMnemonic: React.FC<ImportMnemonicProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const [mnemonic, setMnemonic] = React.useState('');

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onConfirm(mnemonic);
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('import recovery phrase description')}</DialogContentText>
        <MnemonicPhraseInput mnemonic={mnemonic} onChange={setMnemonic} />
        <Box mt={6} />
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            disabled={!isValidMnemonic(mnemonic)}
            type="submit"
          >
            {t('confirm')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  );
};

export default ImportMnemonic;
