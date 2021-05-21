import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemAvatar,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Cosmos } from 'ledger-app-cosmos'
import LedgerImage from '../../assets/images/ledger.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStateHistory from '../../misc/useStateHistory'
import PasswordInput from '../PasswordInput'
import useIsMobile from '../../misc/useIsMobile'
import SecurityPasswordDialogContent from '../SecurityPasswordDialogContent'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'

enum Stage {
  CreateAccount = 'create account',
  SecurityPassword = 'security password',
}

interface CreateAccountDialogProps {
  walletId: string
  walletType: 'mnemonic' | 'ledger'
  open: boolean
  onClose(): void
}

const CreateAccountDialog: React.FC<CreateAccountDialogProps> = ({
  walletId,
  walletType,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const [crypto, setCrypto] = React.useState('')
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.CreateAccount
  )
  const { addAccount } = useWalletsContext()

  const onSubmitMnemonic = React.useCallback(
    async (securityPassword: string) => {
      try {
        await addAccount({ name, crypto, walletId }, securityPassword)
        onClose()
      } catch (err) {
        setError(err.message)
      }
    },
    [name, addAccount, walletId, crypto, onClose, setError]
  )

  const onSubmitLedger = React.useCallback(
    async (ledgerApp: Cosmos) => {
      try {
        await addAccount({ name, crypto, walletId }, undefined, ledgerApp)
        onClose()
      } catch (err) {
        setError(err.message)
      }
    },
    [name, addAccount, walletId, crypto, onClose, setError]
  )

  React.useEffect(() => {
    if (open) {
      setName('')
      setCrypto('')
      setError('')
      setStage(Stage.CreateAccount, true)
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
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
      {stage === Stage.CreateAccount ? (
        <>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.dialogButton}
              variant="contained"
              color="primary"
              onClick={() => setStage(Stage.SecurityPassword)}
            >
              {t(stage === Stage.CreateAccount ? 'next' : 'confirm')}
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          {walletType === 'mnemonic' ? (
            <SecurityPasswordDialogContent onConfirm={onSubmitMnemonic} loading={false} />
          ) : (
            <ConnectLedgerDialogContent onConnect={onSubmitLedger} />
          )}
        </>
      )}
    </Dialog>
  )
}

export default CreateAccountDialog
