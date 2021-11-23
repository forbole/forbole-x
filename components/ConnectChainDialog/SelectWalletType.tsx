import {
  ButtonBase,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Grid,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import ConnectLedgerIcon from '../../assets/images/connect_ledger.svg'
import UsePhraseIcon from '../../assets/images/use_phrase.svg'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface SelectWalletTypeProps {
  onConfirm(type: 'mnemonic' | 'ledger'): void
}

const SelectWalletType: React.FC<SelectWalletTypeProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { theme } = useGeneralContext()

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogContentText>{t('select connect chain method')}</DialogContentText>
      <Box m={4} mb={8}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('mnemonic')}>
              <Box mb={5}>
                <UsePhraseIcon />
              </Box>
              <Typography align="center" color="textSecondary">
                {t('use recovery phrase')}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={6}>
            <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('ledger')}>
              <Box mb={5}>
                <ConnectLedgerIcon />
              </Box>
              <Typography align="center" color="textSecondary">
                {t('connect with ledger')}
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
  )
}

export default SelectWalletType
