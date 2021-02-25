import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'

interface ChangeWalletMonikerDialogProps {
  walletId: string
  open: boolean
  onClose(): void
}

const ChangeWalletMonikerDialog: React.FC<ChangeWalletMonikerDialogProps> = ({
  walletId,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [name, setName] = React.useState('')
  const { updateWallet } = useWalletsContext()

  const onButtonClick = React.useCallback(async () => {
    try {
      await updateWallet(walletId, { name })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }, [name, updateWallet, walletId])

  React.useEffect(() => {
    if (open) {
      setName('')
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('change wallet moniker')}</DialogTitle>
      <DialogContent>
        <Box mb={18}>
          <Typography gutterBottom>{t('wallet moniker')}</Typography>
          <TextField
            fullWidth
            variant="filled"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder={t('wallet moniker')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeWalletMonikerDialog
