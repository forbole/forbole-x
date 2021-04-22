import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface ForgotPasswordProps {
  onReset(): void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({onReset}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [password, setPassword] = React.useState('')
  const { unlockWallets, wallets } = useWalletsContext()
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
        <DialogContentText>{t('forgot password description')}</DialogContentText>
        {/* <PasswordInput
          placeholder={t('password')}
          value={password}
          error={!!error}
          helperText={error}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        {/* <Button className={classes.button}>{t('forgot password')}</Button> */}
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button
          className={classes.buttonReset}
          variant="contained"
          color="primary"
          onClick={() => onReset()}
        >
          {t('reset')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ForgotPassword
