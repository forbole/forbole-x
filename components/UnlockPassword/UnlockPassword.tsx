import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'

interface UnlockPasswordProps {
  onForgot: () => void
  onUnlock: (password) => void
  password: string
  setPassword: any
}

const UnlockPassword: React.FC<UnlockPasswordProps> = ({
  onForgot,
  onUnlock,
  password,
  setPassword,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [error, setError] = React.useState('')

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
          onClick={() => onUnlock(password)}
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
