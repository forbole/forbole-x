import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import ClossIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'

interface OnboardingDialogProps {
  open: boolean
  onClose(): void
  onSubmit(password: string): void
}

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [isConfirmingPassword, setIsConfirmingPassword] = React.useState(false)
  const [error, setError] = React.useState('')

  const onButtonClick = React.useCallback(() => {
    setError('')
    if (!isConfirmingPassword) {
      if (password.length < 6) {
        setError(t('invalid password'))
      } else {
        setIsConfirmingPassword(true)
      }
    } else if (password !== confirmPassword) {
      setError(t('invalid confirm password'))
    } else {
      onSubmit(password)
    }
  }, [isConfirmingPassword, password, confirmPassword])

  React.useEffect(() => {
    if (open) {
      setPassword('')
      setConfirmPassword('')
      setIsConfirmingPassword(false)
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <ClossIcon {...iconProps} />
      </IconButton>
      <DialogTitle>
        {isConfirmingPassword ? t('confirm password title') : t('set password title')}
      </DialogTitle>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          onButtonClick()
        }}
      >
        <DialogContent>
          <DialogContentText>
            {isConfirmingPassword
              ? t('confirm password description')
              : t('set password description')}
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
            type="submit"
            disabled={
              (!isConfirmingPassword && password.length < 6) ||
              (isConfirmingPassword && confirmPassword.length < 6)
            }
          >
            {isConfirmingPassword ? t('confirm') : t('next')}
          </Button>
        </DialogActions>
      </form>
      <Box m={4} mt={0} display="flex">
        <LinearProgress style={{ flex: 1 }} variant="determinate" value={100} />
        <Box ml={1} />
        <LinearProgress style={{ flex: 1 }} variant="determinate" value={0} />
        <Box ml={1} />
        <LinearProgress style={{ flex: 1 }} variant="determinate" value={0} />
        <Box ml={1} />
        <LinearProgress style={{ flex: 1 }} variant="determinate" value={0} />
      </Box>
    </Dialog>
  )
}

export default OnboardingDialog
