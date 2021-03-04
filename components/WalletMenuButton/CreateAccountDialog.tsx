import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemAvatar,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStateHistory from '../../misc/useStateHistory'
import PasswordInput from '../PasswordInput'

enum Stage {
  CreateAccount = 'create account',
  SecurityPassword = 'security password',
}

interface CreateAccountDialogProps {
  walletId: string
  open: boolean
  onClose(): void
}

const CreateAccountDialog: React.FC<CreateAccountDialogProps> = ({ walletId, open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [crypto, setCrypto] = React.useState('')
  const [name, setName] = React.useState('')
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.CreateAccount
  )
  const { addAccount } = useWalletsContext()

  const onSubmit = React.useCallback(async () => {
    try {
      await addAccount({ name, crypto, walletId }, securityPassword)
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }, [name, addAccount, walletId, crypto, securityPassword, onClose, setError])

  React.useEffect(() => {
    if (open) {
      setName('')
      setCrypto('')
      setSecurityPassword('')
      setError('')
      setStage(Stage.CreateAccount, true)
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>
        {t(stage === Stage.CreateAccount ? 'create account' : 'security password title')}
      </DialogTitle>
      <DialogContent>
        {stage === Stage.CreateAccount ? (
          <>
            <Box mb={2}>
              <Typography gutterBottom>{t('network')}</Typography>
              <TextField
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                value={crypto}
                onChange={(e) => setCrypto(e.target.value)}
                select
              >
                {Object.values(cryptocurrencies).map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    <ListItemAvatar className={classes.cryptoMenuItemAvatar}>
                      <Avatar alt={c.name} src={c.image} className={classes.smallAvatar} />
                    </ListItemAvatar>
                    <Typography>{c.name}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mb={8}>
              <Typography gutterBottom>{t('moniker')}</Typography>
              <TextField
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder={t('account moniker')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </>
        ) : (
          <Box mb={18}>
            <Typography gutterBottom>{t('password')}</Typography>
            <PasswordInput
              value={securityPassword}
              onChange={(e) => setSecurityPassword(e.target.value)}
              placeholder={t('password')}
              error={!!error}
              helperText={error}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={
            stage === Stage.CreateAccount ? () => setStage(Stage.SecurityPassword) : onSubmit
          }
        >
          {t(stage === Stage.CreateAccount ? 'next' : 'confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateAccountDialog
