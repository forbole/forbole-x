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

interface ResetProps {
  onCancel(): void
  onResetApp(): void
}

const Reset: React.FC<ResetProps> = ({ onCancel, onResetApp }) => {
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
    // <Dialog fullWidth>
    //
    <>
      <DialogContent>
        <DialogContentText>{t('reset description')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.buttonReset}
          variant="contained"
          color="secondary"
          onClick={() => onCancel()}
        >
          {t('cancel')}
        </Button>
        <Button
          className={classes.buttonReset}
          variant="contained"
          color="primary"
          onClick={() => onResetApp()}
        >
          {t('reset')}
        </Button>
      </DialogActions>
    </>
  )
}

export default Reset
