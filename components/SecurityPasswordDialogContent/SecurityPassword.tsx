import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'

interface SecurityPasswordProps {
  onForgot: () => void
  onUnlock: (password) => void
  password: string
  setPassword: any
  loading: boolean
}

const SecurityPassword: React.FC<SecurityPasswordProps> = ({
  onForgot,
  onUnlock,
  password,
  setPassword,
  loading,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [error, setError] = React.useState('')
  const theme = useTheme()

  return (
    <>
      <DialogContent>
        <DialogContentText>{t('security password description')}</DialogContentText>
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
          disabled={!password.length || loading}
          onClick={() => onUnlock(password)}
        >
          {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
        </Button>
        <Button className={classes.forgotButton} onClick={() => onForgot()}>
          {t('forgot password?')}
        </Button>
      </DialogActions>
    </>
  )
}

export default SecurityPassword
