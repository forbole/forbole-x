import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface UnlockPasswordDialogProps {}

const UnlockPasswordDialog: React.FC<UnlockPasswordDialogProps> = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [password, setPassword] = React.useState('')
  const { setPassword: setUnlockPassword, password: unlockPassword, wallets } = useWalletsContext()
  const [error, setError] = React.useState('')

  const onButtonClick = React.useCallback(() => {
    setError('')
    setUnlockPassword(password)
  }, [password, setError, setUnlockPassword])

  React.useEffect(() => {
    if (unlockPassword && !wallets.length) {
      setError(t('invalid password'))
      setPassword('')
      setUnlockPassword('')
    }
  }, [unlockPassword, wallets, setError, setPassword, setUnlockPassword])

  return (
    <Dialog fullWidth open={!wallets.length}>
      <DialogTitle>{t('unlock password title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('unlock password description')}</DialogContentText>
        <PasswordInput
          placeholder={t('password')}
          value={password}
          error={!!error}
          helperText={error}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
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

export default UnlockPasswordDialog
