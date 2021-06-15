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
import { useWalletsContext } from '../../contexts/WalletsContext'

interface SecurityPasswordProps {
  onForgot: () => void
  onUnlock: (password: string) => void
  password: string
  setPassword: any
  loading: boolean
  walletId: string
}

const SecurityPassword: React.FC<SecurityPasswordProps> = ({
  onForgot,
  onUnlock,
  password,
  setPassword,
  loading,
  walletId,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [error, setError] = React.useState('')
  const theme = useTheme()
  const { viewMnemonicPhrase } = useWalletsContext()

  const confirm = React.useCallback(async () => {
    try {
      await viewMnemonicPhrase(walletId, password)
      onUnlock(password)
    } catch (err) {
      setError(t(err.message))
    }
  }, [walletId, onUnlock, password])

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        confirm()
      }}
    >
      <DialogContent>
        <DialogContentText>{t('enter security password')}</DialogContentText>
        <PasswordInput
          autoFocus
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
          type="submit"
        >
          {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
        </Button>
        <Button className={classes.forgotButton} onClick={onForgot}>
          {t('forgot password?')}
        </Button>
      </DialogActions>
    </form>
  )
}

export default SecurityPassword
