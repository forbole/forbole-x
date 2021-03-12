import { Button, DialogActions, DialogContent, Typography, Box, TextField } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import PasswordInput from '../PasswordInput'
import useStyles from './styles'

interface ImportMnemonicBackupProps {
  onConfirm(params: { password: string; backupPhrase: string }): void
  error: string
}

const ImportMnemonicBackup: React.FC<ImportMnemonicBackupProps> = ({ onConfirm, error }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [password, setPassword] = React.useState('')
  const [backupPhrase, setBackupPhrase] = React.useState('')

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Typography>{t('mnemonic phrase backup')}</Typography>
        <TextField
          placeholder={t('mnemonic phrase backup')}
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          multiline
          rows={8}
          fullWidth
          value={backupPhrase}
          onChange={(e) => setBackupPhrase(e.target.value)}
        />
        <Box my={3}>
          <Typography>{t('encryption password')}</Typography>
          <PasswordInput
            placeholder={t('encryption password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!password || !backupPhrase}
            onClick={() => onConfirm({ password, backupPhrase })}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default ImportMnemonicBackup