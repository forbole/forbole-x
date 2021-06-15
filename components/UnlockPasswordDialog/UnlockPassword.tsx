import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface UnlockPasswordProps {
  onForgot: () => void
}

const UnlockPassword: React.FC<UnlockPasswordProps> = ({ onForgot }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [password, setPassword] = React.useState('')
  const { unlockWallets } = useWalletsContext()
  const [error, setError] = React.useState('')

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      await unlockWallets(password)
    } catch (err) {
      setError(t(err.message))
      setPassword('')
    }
  }, [password, setError, setPassword])

  return (
    <>
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
      <DialogActions className={classes.action}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
          disabled={password.length < 6}
        >
          {t('next')}
        </Button>
        <Button className={classes.forgotButton} onClick={() => onForgot()}>
          {t('forgot password?')}
        </Button>
      </DialogActions>
    </>
  )
}

export default UnlockPassword
