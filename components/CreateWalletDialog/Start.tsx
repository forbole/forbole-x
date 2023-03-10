import {
  ButtonBase,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import WithMnemonicIconLight from '../../assets/images/login_light.svg';
import WithMnemonicIconDark from '../../assets/images/login_dark.svg';
import WithoutMnemonicIconLight from '../../assets/images/create_wallet_light.svg';
import WithoutMnemonicIconDark from '../../assets/images/create_wallet_dark.svg';
import useStyles from './styles';
import { useGeneralContext } from '../../contexts/GeneralContext';

interface StartProps {
  onImportWalletClick(): void;
  onCreateWalletClick(): void;
  onWhatIsMnemonicClick(): void;
}

const Start: React.FC<StartProps> = ({
  onImportWalletClick,
  onCreateWalletClick,
  onWhatIsMnemonicClick,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const { theme } = useGeneralContext();

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('create wallet description')}</DialogContentText>
        <Box m={4}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <ButtonBase className={classes.selectionBox} onClick={onImportWalletClick}>
                <Box mb={5}>
                  {theme === 'light' ? <WithMnemonicIconLight /> : <WithMnemonicIconDark />}
                </Box>
                <Typography align="center" color="textSecondary">
                  {t('import wallet')}
                </Typography>
              </ButtonBase>
            </Grid>
            <Grid item xs={6}>
              <ButtonBase className={classes.selectionBox} onClick={onCreateWalletClick}>
                <Box mb={5}>
                  {theme === 'light' ? <WithoutMnemonicIconLight /> : <WithoutMnemonicIconDark />}
                </Box>
                <Typography align="center" color="textSecondary">
                  {t('create wallet')}
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        {/* <Button className={classes.button} color="primary" onClick={onWhatIsMnemonicClick}>
          {t('what is secret recovery phrase')}
        </Button> */}
      </DialogActions>
    </>
  );
};

export default Start;
