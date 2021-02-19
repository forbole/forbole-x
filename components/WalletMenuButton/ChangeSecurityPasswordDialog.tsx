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
import PasswordInput from '../PasswordInput'

interface ChangeSecurityPasswordDialogProps {
  walletId: string
  open: boolean
  onClose(): void
}

const ChangeSecurityPasswordDialog: React.FC<ChangeSecurityPasswordDialogProps> = ({
  walletId,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [error, setError] = React.useState('')
  const [isSettingNewPassword, setIsSettingNewPassword] = React.useState(false)
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [newSecurityPassword, setNewSecurityPassword] = React.useState('')
  const { updateWallet, verifySecurityPassword } = useWalletsContext()

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      if (isSettingNewPassword) {
        await updateWallet(walletId, { newSecurityPassword, securityPassword })
        onClose()
      } else {
        const result = await verifySecurityPassword(walletId, securityPassword)
        console.log(result)
        setIsSettingNewPassword(true)
      }
    } catch (err) {
      setError(err.message)
    }
  }, [
    isSettingNewPassword,
    setIsSettingNewPassword,
    securityPassword,
    newSecurityPassword,
    walletId,
    setError,
  ])

  React.useEffect(() => {
    setError('')
    setSecurityPassword('')
    setNewSecurityPassword('')
    setIsSettingNewPassword(false)
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('change security password')}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          {t(isSettingNewPassword ? 'new password' : 'current password')}
        </Typography>
        <PasswordInput
          value={isSettingNewPassword ? newSecurityPassword : securityPassword}
          onChange={(e) =>
            (isSettingNewPassword ? setNewSecurityPassword : setSecurityPassword)(e.target.value)
          }
          placeholder={t('password')}
          error={!!error}
          helperText={error}
          withSecurityLevel={isSettingNewPassword}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {t(isSettingNewPassword ? 'save' : 'next')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeSecurityPasswordDialog
