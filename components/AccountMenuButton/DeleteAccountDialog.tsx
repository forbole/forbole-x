import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'

interface DeleteAccountDialogProps {
  accountAddress: string
  open: boolean
  onClose(): void
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  accountAddress,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { deleteAccount } = useWalletsContext()

  const onButtonClick = React.useCallback(async () => {
    try {
      await deleteAccount(accountAddress)
    } catch (err) {
      console.log(err)
    }
  }, [deleteAccount, accountAddress])

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('delete account')}</DialogTitle>
      <DialogContent>
        <Typography>{t('delete account warning')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          {t('cancel')}
        </Button>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAccountDialog
