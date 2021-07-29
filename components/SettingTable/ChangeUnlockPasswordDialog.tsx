import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Dialog,
  IconButton,
  DialogContentText,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import PasswordInput from '../PasswordInput'
import useStateHistory from '../../misc/useStateHistory'
import useIconProps from '../../misc/useIconProps'

interface ChangeUnlockPasswordDialogProps {
  onClose(): void
  open: boolean
}

enum ChangeUnlockPasswordStage {
  EnterOldPassword = 'enter old password',
  EnterNewPassword = 'enter new password',
  Success = 'success',
}

const ChangeUnlockPasswordDialog: React.FC<ChangeUnlockPasswordDialogProps> = ({
  onClose,
  open,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [error, setError] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(
    ChangeUnlockPasswordStage.EnterOldPassword
  )
  const [newPassword, setNewPassword] = React.useState('')
  const { unlockWallets, updatePassword } = useWalletsContext()
  const [password, setPassword] = React.useState('')

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      if (stage === ChangeUnlockPasswordStage.EnterNewPassword) {
        updatePassword(newPassword)
        setStage(ChangeUnlockPasswordStage.Success, true)
      } else {
        await unlockWallets(password)
        setStage(ChangeUnlockPasswordStage.EnterNewPassword)
      }
    } catch (err) {
      setError(err.message)
    }
  }, [password, stage, setStage, newPassword, setError, unlockWallets, updatePassword])

  React.useEffect(() => {
    if (open) {
      setError('')
      setStage(ChangeUnlockPasswordStage.EnterOldPassword, true)
      setNewPassword('')
      setPassword('')
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>

      {stage === ChangeUnlockPasswordStage.Success ? (
        <>
          <DialogTitle>{t('success')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('password successfully changed')}</DialogContentText>
          </DialogContent>
        </>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            onButtonClick()
          }}
        >
          <DialogTitle>{t('change unlock password')}</DialogTitle>
          <DialogContent>
            <Box mb={18}>
              <Typography gutterBottom>
                {t(
                  stage === ChangeUnlockPasswordStage.EnterNewPassword
                    ? 'new password'
                    : 'enter current unlock password'
                )}
              </Typography>
              <PasswordInput
                value={
                  stage === ChangeUnlockPasswordStage.EnterNewPassword ? newPassword : password
                }
                onChange={(e) =>
                  stage === ChangeUnlockPasswordStage.EnterNewPassword
                    ? setNewPassword(e.target.value)
                    : setPassword(e.target.value)
                }
                placeholder={t('password')}
                error={!!error}
                helperText={error}
                withSecurityLevel={stage === ChangeUnlockPasswordStage.EnterNewPassword}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.dialogButton}
              variant="contained"
              color="primary"
              type="submit"
            >
              {t(stage === ChangeUnlockPasswordStage.EnterNewPassword ? 'save' : 'next')}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  )
}

export default ChangeUnlockPasswordDialog
