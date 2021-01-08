import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import ClossIcon from '../../assets/images/icons/icon_cross.svg'
import React from 'react'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'
import useIconProps from '../../misc/useIconProps'

interface OnboardingDialogProps {
  open: boolean
  onClose(): void
}

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [isConfirmingPassword, setIsConfirmingPassword] = React.useState(false)
  const [error, setError] = React.useState('')

  const onButtonClick = React.useCallback(() => {
    setError('')
    if (!isConfirmingPassword) {
      if (password.length < 6) {
        return setError(t('invalid password'))
      } else {
        setIsConfirmingPassword(true)
      }
    } else {
      if (password !== confirmPassword) {
        return setError(t('invalid confirm password'))
      } else {
        // TODO
        onClose()
      }
    }
  }, [isConfirmingPassword, password, confirmPassword])
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <ClossIcon {...iconProps} />
      </IconButton>
      <DialogTitle>
        {isConfirmingPassword ? t('confirm password title') : t('set password title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isConfirmingPassword ? t('confirm password description') : t('set password description')}
        </DialogContentText>
        <PasswordInput
          placeholder={t('password')}
          value={isConfirmingPassword ? confirmPassword : password}
          error={!!error}
          helperText={error}
          onChange={(e) =>
            (isConfirmingPassword ? setConfirmPassword : setPassword)(e.target.value)
          }
        />
        <Typography className={classes.passwordRequirement} variant="body2">
          {isConfirmingPassword ? t('confirm password caption') : t('password caption')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {isConfirmingPassword ? t('confirm') : t('next')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OnboardingDialog
