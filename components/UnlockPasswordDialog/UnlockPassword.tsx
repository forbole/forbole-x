import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import PasswordInput from '../PasswordInput'
import { useWalletsContext } from '../../contexts/WalletsContext'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface UnlockPasswordProps {
  onForgot: () => void
}

const UnlockPassword: React.FC<UnlockPasswordProps> = ({ onForgot }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [password, setPassword] = React.useState('')
  const { unlockWallets } = useWalletsContext()
  const { alwaysRequirePassword } = useGeneralContext()
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
    <form
      noValidate
      className={classes.action}
      onSubmit={(e) => {
        e.preventDefault()
        onButtonClick()
      }}
    >
      <DialogContent>
        <DialogContentText>{t('unlock password description')}</DialogContentText>
        <PasswordInput
          placeholder={t('password')}
          value={password}
          error={!!error}
          helperText={error}
          onChange={(e) => setPassword(e.target.value)}
        />
        {alwaysRequirePassword ? null : (
          <Box mt={1}>
            <Typography variant="body2">{t('unlock pasword helper text')}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button
          disabled={password.length < 6}
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          {t('next')}
        </Button>
        <Button className={classes.forgotButton} onClick={() => onForgot()}>
          {t('forgot password?')}
        </Button>
      </DialogActions>
    </form>
  )
}

export default UnlockPassword
