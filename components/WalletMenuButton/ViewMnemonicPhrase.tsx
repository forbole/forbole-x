import {
  Box,
  Button,
  Snackbar,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Alert } from '@material-ui/lab'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import PasswordInput from '../PasswordInput'
import useStateHistory from '../../misc/useStateHistory'
import MnemonicPhraseInput from '../MnemonicPhraseInput'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import { CustomTheme } from '../../misc/theme'

enum Stage {
  SecurityPassword = 'security password',
  BackupPassword = 'backup password',
  ExportMnemonic = 'export mnemonic',
  DisplayMnemonic = 'display mnemonic',
  SocialMedia = 'social media',
}

interface ViewMnemonicPhraseProps {
  walletId: string
  onClose(): void
}

const ViewMnemonicPhrase: React.FC<ViewMnemonicPhraseProps> = ({ walletId, onClose }) => {
  const { t } = useTranslation('common')
  const theme: CustomTheme = useTheme()
  const classes = useStyles()
  const iconProps = useIconProps()
  const [error, setError] = React.useState('')
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [backupPassword, setBackupPassword] = React.useState('')
  const [encryptionPhrase, setEncryptionPhrase] = React.useState('')
  const [mnemonicPhrase, setMnemonicPhrase] = React.useState('')
  const [buttonText, setButtonText] = React.useState('next')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.SecurityPassword
  )
  const [isCopySuccess, setIsCopySuccess] = React.useState(false)

  const { viewMnemonicPhrase, viewMnemonicPhraseBackup } = useWalletsContext()
  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      if (stage === Stage.SecurityPassword) {
        await viewMnemonicPhrase(walletId, securityPassword)
        setStage(Stage.DisplayMnemonic)
        const result = await viewMnemonicPhrase(walletId, securityPassword)
        setMnemonicPhrase(result)
        setButtonText('export mnemonic')
      } else if (stage === Stage.DisplayMnemonic) {
        setStage(Stage.BackupPassword)
        setButtonText('next')
      } else if (stage === Stage.BackupPassword) {
        const result = await viewMnemonicPhraseBackup(walletId, securityPassword, backupPassword)
        setEncryptionPhrase(result)
        setStage(Stage.ExportMnemonic)
        setButtonText('share')
      } else if (stage === Stage.ExportMnemonic) {
        setStage(Stage.SocialMedia)
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
    setError('')
    setSecurityPassword('')
    setBackupPassword('')
    setStage(Stage.SecurityPassword, true)
    setEncryptionPhrase('')
    setMnemonicPhrase('')
  }, [])

  const onPrev = () => {
    if (stage === Stage.BackupPassword) {
      setButtonText('export mnemonic')
    } else if (stage === Stage.SocialMedia) {
      setButtonText('share')
      setBackupPassword('')
    } else setButtonText('next')
    setBackupPassword('')
    toPrevStage()
  }

  const copyText = React.useCallback(() => {
    navigator.clipboard.writeText(encryptionPhrase)
    setIsCopySuccess(true)
  }, [encryptionPhrase])

  return (
    <>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={() => onPrev()}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
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
            <Box mb={3}>
              <Typography color="textSecondary">{t('set security details')}</Typography>
            </Box>
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
        {stage === Stage.DisplayMnemonic ? (
          <Box mb={4}>
            <Box mb={4} textAlign="center">
              <Typography color="textSecondary">{t('display mnemomic details')}</Typography>
            </Box>
            <MnemonicPhraseInput
              disabled
              mnemonic={mnemonicPhrase || ''}
              mnemonicAmount={mnemonicPhrase.split(/\s+/).length}
            />
          </Box>
        ) : null}
        {stage === Stage.ExportMnemonic ? (
          <Box mb={4}>
            <Box mb={4}>
              <Typography color="textSecondary">{t('export mnemomic details')}</Typography>
            </Box>
            <Typography gutterBottom>{t('mnemonic phrase backup')}</Typography>
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
        {stage === Stage.SocialMedia ? (
          <Box m={4} display="flex" justifyContent="space-between">
            <Box alignItems="center" width={theme.spacing(10)} textAlign="center">
              <FacebookShareButton
                url="https://www.forbole.com/"
                quote={encryptionPhrase}
                hashtag="#forbole-X"
                className={classes.socialMediaButton}
              >
                <FacebookIcon
                  size={42}
                  round
                  iconFillColor={theme.palette.socialMediaIcon.fill}
                  bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
                />
              </FacebookShareButton>
              <Typography>{t('facebook')}</Typography>
            </Box>

            <Box alignItems="center" width={theme.spacing(10)} textAlign="center">
              <TwitterShareButton
                url="https://www.forbole.com/"
                title={encryptionPhrase}
                hashtags={['#forbole']}
                className={classes.socialMediaButton}
              >
                <TwitterIcon
                  size={42}
                  round
                  iconFillColor={theme.palette.socialMediaIcon.fill}
                  bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
                />
              </TwitterShareButton>
              <Typography>{t('twitter')}</Typography>
            </Box>

            <Box alignItems="center" width={theme.spacing(10)} textAlign="center">
              <TelegramShareButton
                url="https://www.forbole.com/"
                title={encryptionPhrase}
                className={classes.socialMediaButton}
              >
                <TelegramIcon
                  size={42}
                  round
                  iconFillColor={theme.palette.socialMediaIcon.fill}
                  bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
                />
              </TelegramShareButton>
              <Typography>{t('telegram')}</Typography>
            </Box>

            <Box alignItems="center" width={theme.spacing(10)} textAlign="center">
              <WhatsappShareButton
                url="https://www.forbole.com/"
                title={encryptionPhrase}
                separator=":: "
                className={classes.socialMediaButton}
              >
                <WhatsappIcon
                  size={42}
                  round
                  iconFillColor={theme.palette.socialMediaIcon.fill}
                  bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
                />
              </WhatsappShareButton>
              <Typography>{t('whatsapp')}</Typography>
            </Box>

            <Box alignItems="center" width={theme.spacing(10)} textAlign="center">
              <EmailShareButton
                url="https://www.forbole.com/"
                subject="backup mnemonic phrase"
                body={encryptionPhrase}
                separator=":: "
                className={classes.socialMediaButton}
              >
                <EmailIcon
                  size={42}
                  round
                  iconFillColor={theme.palette.socialMediaIcon.fill}
                  bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
                />
              </EmailShareButton>
              <Typography>{t('gmail')}</Typography>
            </Box>
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Box display="block" width="100%">
          {stage === Stage.ExportMnemonic ? (
            <Box display="flex">
              <Button
                className={classes.copyButton}
                variant="contained"
                color="secondary"
                onClick={copyText}
              >
                {t('copy')}
              </Button>
            </Box>
          ) : null}
          {stage !== Stage.SocialMedia ? (
            <Box display="flex">
              <Button
                className={classes.dialogButton}
                variant="contained"
                color="primary"
                onClick={onButtonClick}
                disabled={stage === Stage.BackupPassword && backupPassword.length < 6}
              >
                {t(buttonText)}
              </Button>
            </Box>
          ) : null}
        </Box>
      </DialogActions>
      <Snackbar
        open={isCopySuccess}
        autoHideDuration={5000}
        onClose={() => setIsCopySuccess(false)}
      >
        <Alert onClose={() => setIsCopySuccess(false)} severity="success">
          {t('copied to clipboard')}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ViewMnemonicPhrase
