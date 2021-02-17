import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import PasswordInput from '../PasswordInput'

interface ChangeSecurityPasswordDialogProps {
  walletId: string
  open: boolean
  onClose(): void
}

const ChangeSecurityPasswordDialog: React.FC<ChangeSecurityPasswordDialogProps> = ({
  walletId,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [error, setError] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [mnemonic, setMnemonic] = React.useState('')
  const { updateWallet, viewMnemonicPhrase } = useWalletsContext()

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      if (mnemonic) {
        await updateWallet(walletId, { mnemonic, securityPassword: password })
        onClose()
      } else {
        const result = await viewMnemonicPhrase(walletId, password)
        setMnemonic(result)
        setPassword('')
      }
    } catch (err) {
      setError(err.message)
    }
  }, [mnemonic, setMnemonic, password, walletId, setError])

  React.useEffect(() => {
    setError('')
    setMnemonic('')
    setPassword('')
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('change security password')}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{t(mnemonic ? 'new password' : 'current password')}</Typography>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password')}
          error={!!error}
          helperText={error}
          withSecurityLevel={!!mnemonic}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {t(mnemonic ? 'save' : 'next')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeSecurityPasswordDialog
