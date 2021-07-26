import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Dialog,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import PasswordInput from '../PasswordInput'

interface ChangeUnlockPasswordDialogProps {
  // walletId: string
  onClose(): void
  open: boolean
}

const ChangeUnlockPasswordDialog: React.FC<ChangeUnlockPasswordDialogProps> = ({
  // walletId,
  onClose,
  open,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [error, setError] = React.useState('')
  const [isSettingNewPassword, setIsSettingNewPassword] = React.useState(false)
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const { unlockWallets, updatePassword} = useWalletsContext()
  const [password, setPassword] = React.useState('')

  // const onButtonClick = React.useCallback(async () => {
  //   try {
  //     setError('')
  //     await unlockWallets(password)
  //   } catch (err) {
  //     setError(t(err.message))
  //     setPassword('')
  //   }
  // }, [password, setError, setPassword])
  // console.log('isSettingNewPassword', isSettingNewPassword)

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      if (isSettingNewPassword) {
        updatePassword(password)
        // await updateWallet(walletId, { newSecurityPassword, securityPassword })
        onClose()
      } else {
        await unlockWallets(password)
        setIsSettingNewPassword(true)
      }
    } catch (err) {
      setError(err.message)
    }
  }, [password, isSettingNewPassword, setIsSettingNewPassword, newPassword, setError])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
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
              {t(isSettingNewPassword ? 'new password' : 'enter current unlock password')}
            </Typography>
            <PasswordInput
              value={isSettingNewPassword ? newPassword : password}
              onChange={(e) =>
                isSettingNewPassword ? setNewPassword(e.target.value) : setPassword(e.target.value)
              }
              placeholder={t('password')}
              error={!!error}
              helperText={error}
              withSecurityLevel={isSettingNewPassword}
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
            {t(isSettingNewPassword ? 'save' : 'next')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChangeUnlockPasswordDialog
