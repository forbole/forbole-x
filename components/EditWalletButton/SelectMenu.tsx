import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useStyles from './styles';

interface SelectMenuProps {
  wallet: Wallet;
  changeWalletMoniker(): void;
  changeSecurityPassword(): void;
  checkMnemonicPhrase(): void;
  deleteWallet(): void;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  wallet,
  changeWalletMoniker,
  changeSecurityPassword,
  checkMnemonicPhrase,
  deleteWallet,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <>
      <DialogTitle>{wallet.name}</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Divider />
          <Box my={1} display="flex">
            <Button className={classes.itemButton} onClick={() => changeWalletMoniker()}>
              {t('change wallet moniker')}
            </Button>
          </Box>
          <Divider />
          {wallet.type === 'ledger' ? null : (
            <>
              <Box my={1} display="flex">
                <Button className={classes.itemButton} onClick={() => changeSecurityPassword()}>
                  {t('change security password')}
                </Button>
              </Box>
              <Divider />
              <Box my={1} display="flex">
                <Button className={classes.itemButton} onClick={() => checkMnemonicPhrase()}>
                  {t('view secret recovery phrase')}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={() => deleteWallet()}
        >
          {t('delete wallet')}
        </Button>
      </DialogActions>
    </>
  );
};

export default SelectMenu;
