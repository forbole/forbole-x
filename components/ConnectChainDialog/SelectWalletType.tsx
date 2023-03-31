import {
  ButtonBase,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  useTheme,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import ConnectLedgerIconLight from '../../assets/images/connect_ledger_light.svg';
import ConnectLedgerIconDark from '../../assets/images/connect_ledger_dark.svg';
import UsePhraseIconLight from '../../assets/images/enter_passphase_light.svg';
import UsePhraseIconDark from '../../assets/images/enter_passphase_dark.svg';
import PrivateKeyIconLight from '../../assets/images/private_key_light.svg';
import PrivateKeyIconDark from '../../assets/images/private_key_dark.svg';
import UploadProofIconLight from '../../assets/images/upload_proof_light.svg';
import UploadProofIconDark from '../../assets/images/upload_proof_dark.svg';
import KeplrIcon from '../../assets/images/keplr.svg';
import TerraStationIcon from '../../assets/images/terra-station.svg';
import useStyles from './styles';
import { useGeneralContext } from '../../contexts/GeneralContext';

interface SelectWalletTypeProps {
  chain: string;
  onConfirm(
    type: 'mnemonic' | 'ledger' | 'private key' | 'upload proof' | 'keplr' | 'terra station',
  ): void;
  error: string;
}

const SelectWalletType: React.FC<SelectWalletTypeProps> = ({ onConfirm, error, chain }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const themeStyle = useTheme();
  const { theme } = useGeneralContext();

  const isTerra = chain === 'terra';

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogContentText>{t('select connect chain method')}</DialogContentText>
      <Box m={4} mb={8}>
        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('mnemonic')}>
          <Box mr={3}>{theme === 'light' ? <UsePhraseIconLight /> : <UsePhraseIconDark />}</Box>
          <Typography>{t('use recovery phrase')}</Typography>
        </ButtonBase>
        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('private key')}>
          <Box mr={3}>{theme === 'light' ? <PrivateKeyIconLight /> : <PrivateKeyIconDark />}</Box>
          <Typography>{t('use private key')}</Typography>
        </ButtonBase>
        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('ledger')}>
          <Box mr={3}>
            {theme === 'light' ? <ConnectLedgerIconLight /> : <ConnectLedgerIconDark />}
          </Box>
          <Typography>{t('connect with ledger')}</Typography>
        </ButtonBase>
        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('upload proof')}>
          <Box mr={3}>{theme === 'light' ? <UploadProofIconLight /> : <UploadProofIconDark />}</Box>
          <Typography>{t('upload chain link proof')}</Typography>
        </ButtonBase>
        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('keplr')}>
          <Box mr={3}>
            <KeplrIcon width={themeStyle.spacing(6)} height={themeStyle.spacing(6)} />
          </Box>
          <Typography>{t('connect with keplr')}</Typography>
        </ButtonBase>

        {isTerra ? (
          <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('terra station')}>
            <Box mr={3}>
              <TerraStationIcon width={themeStyle.spacing(6)} height={themeStyle.spacing(6)} />
            </Box>
            <Typography>{t('connect with terra station')}</Typography>
          </ButtonBase>
        ) : null}
        {error ? <Typography color="error">{error}</Typography> : null}
      </Box>
    </DialogContent>
  );
};

export default SelectWalletType;
