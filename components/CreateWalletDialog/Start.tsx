import {
  ButtonBase,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface StartProps {
  onImportWalletClick(): void
  onCreateWalletClick(): void
}

const Start: React.FC<StartProps> = ({ onImportWalletClick, onCreateWalletClick }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('create wallet description')}</DialogContentText>
        <Grid container spacing={5}>
          <Grid item md={6}>
            <ButtonBase className={classes.selectionBox} onClick={onImportWalletClick}>
              <Typography variant="body2" align="center" color="textSecondary">
                {t('i have mnemonic phrase')}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item md={6}>
            <ButtonBase className={classes.selectionBox} onClick={onCreateWalletClick}>
              <Typography variant="body2" align="center" color="textSecondary">
                {t('i dont have mnemonic phrase')}
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className={classes.button} color="secondary">
          {t('what is mnemonic phrase')}
        </Button>
      </DialogActions>
    </>
  )
}

export default Start
