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
import WithMnemonicIconLight from '../../assets/images/login_light.svg'
import WithMnemonicIconDark from '../../assets/images/login_dark.svg'
import WithoutMnemonicIconLight from '../../assets/images/create_wallet_light.svg'
import WithoutMnemonicIconDark from '../../assets/images/create_wallet_dark.svg'
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
                {theme === 'light' ? <WithMnemonicIconLight /> : <WithMnemonicIconDark />}
              </Box>
              <Typography align="center" color="textSecondary">
                {t('use recovery phrase')}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={6}>
            <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('ledger')}>
              <Box mb={5}>
                {theme === 'light' ? <WithoutMnemonicIconLight /> : <WithoutMnemonicIconDark />}
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
