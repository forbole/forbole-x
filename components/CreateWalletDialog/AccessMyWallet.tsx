import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  TextField,
  DialogContentText,
  ButtonBase,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

export enum ImportMode {
  ImportMnemonicPhrase = 'import mnemonic phrase',
  MnemonicPhraseBackup = 'use mnemonic phrase backup',
  ConnectLedgerDevice = 'connect ledger device',
}

interface AccessMyWalletProps {
  onConfirm(mode: ImportMode): void
}

const AccessMyWallet: React.FC<AccessMyWalletProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('access my wallet description')}</DialogContentText>
        <Box my={-2}>
          {Object.values(ImportMode).map((mode) => (
            <ButtonBase
              key={mode}
              className={classes.borderedButton}
              onClick={() => onConfirm(mode)}
            >
              <Typography variant="h6" gutterBottom>
                {t(mode)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t(`${mode} description`)}
              </Typography>
            </ButtonBase>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button className={classes.button} color="secondary">
          {t('create a wallet')}
        </Button>
      </DialogActions>
    </>
  )
}

export default AccessMyWallet
