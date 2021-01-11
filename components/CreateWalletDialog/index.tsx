import {
  ButtonBase,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import ClossIcon from '../../assets/images/icons/icon_cross.svg'
import React from 'react'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'

interface CreateWalletDialogProps {
  open: boolean
  onClose(): void
}

const CreateWalletDialog: React.FC<CreateWalletDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <ClossIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('create wallet title')}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('create wallet description')}</DialogContentText>
        <Grid container spacing={5}>
          <Grid item md={6}>
            <ButtonBase className={classes.selectionBox}>
              <Typography variant="body2" align="center" color="textSecondary">
                {t('i have mnemonic phrase')}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item md={6}>
            <ButtonBase className={classes.selectionBox}>
              <Typography variant="body2" align="center" color="textSecondary">
                {t('i dont have mnemonic phrase')}
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className={classes.button} color="secondary" onClick={() => null}>
          {t('what is mnemonic phrase')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateWalletDialog
