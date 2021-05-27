import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import PasswordInput from '../PasswordInput'
import useStateHistory from '../../misc/useStateHistory'
import useIsMobile from '../../misc/useIsMobile'

enum Stage {
  SecurityPassword = 'security password',
  BackupPassword = 'backup password',
  ExportMnemonic = 'export mnemonic',
}

interface ViewMnemonicPhraseDialogProps {
  walletId: string
  open: boolean
  onClose(): void
}

const ViewMnemonicPhraseDialog: React.FC<ViewMnemonicPhraseDialogProps> = ({
  walletId,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const [error, setError] = React.useState('')
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [backupPassword, setBackupPassword] = React.useState('')
  const [encryptionPhrase, setEncryptionPhrase] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.SecurityPassword
  )
  const { viewMnemonicPhrase, viewMnemonicPhraseBackup } = useWalletsContext()

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      if (stage === Stage.SecurityPassword) {
        await viewMnemonicPhrase(walletId, securityPassword)
        setStage(Stage.BackupPassword)
      } else if (stage === Stage.BackupPassword) {
        const result = await viewMnemonicPhraseBackup(walletId, securityPassword, backupPassword)
        setEncryptionPhrase(result)
        setStage(Stage.ExportMnemonic)
      } else {
        onClose()
      }
    } catch (err) {
      setError(err.message)
    }
  }, [
    securityPassword,
    walletId,
    backupPassword,
    stage,
    setError,
    setStage,
    viewMnemonicPhraseBackup,
    viewMnemonicPhrase,
  ])

  React.useEffect(() => {
    if (open) {
      setError('')
      setSecurityPassword('')
      setBackupPassword('')
      setStage(Stage.SecurityPassword, true)
      setEncryptionPhrase('')
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
      <DialogTitle>{t(`${stage} title`)}</DialogTitle>
      <DialogContent>
        {stage === Stage.SecurityPassword ? (
          <>
            <Typography className={classes.stageDescription} gutterBottom>
              {t(`${stage} description`)}
            </Typography>
            <Box mb={18}>
              <Typography gutterBottom>{t('enter security password')}</Typography>
              <PasswordInput
                value={securityPassword}
                onChange={(e) => setSecurityPassword(e.target.value)}
                placeholder={t('password')}
                error={!!error}
                helperText={error}
              />
            </Box>
          </>
        ) : null}
        {stage === Stage.BackupPassword ? (
          <Box mb={6}>
            <Typography gutterBottom>{t('encryption password')}</Typography>
            <PasswordInput
              value={backupPassword}
              onChange={(e) => setBackupPassword(e.target.value)}
              placeholder={t('password')}
              error={!!error}
              helperText={error}
            />
          </Box>
        ) : null}
        {stage === Stage.ExportMnemonic ? (
          <Box mb={4}>
            <TextField
              variant="filled"
              InputProps={{ disableUnderline: true }}
              fullWidth
              value={encryptionPhrase}
              multiline
              rows={5}
              onFocus={(e: any) => {
                e.target.select()
                navigator.clipboard.writeText(encryptionPhrase)
              }}
            />
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
          disabled={stage === Stage.BackupPassword && backupPassword.length < 6}
        >
          {t(stage === Stage.ExportMnemonic ? 'confirm' : 'next')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewMnemonicPhraseDialog
