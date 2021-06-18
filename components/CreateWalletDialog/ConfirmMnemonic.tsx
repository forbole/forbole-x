import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import MnemonicPhraseInput from '../MnemonicPhraseInput'
import useStyles from './styles'

interface ConfirmMnemonicProps {
  description: string
  onConfirm(mnemonic: string): void
  error: string
}

const ConfirmMnemonic: React.FC<ConfirmMnemonicProps> = ({ onConfirm, error, description }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [mnemonic, setMnemonic] = React.useState('')

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(mnemonic)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{description}</DialogContentText>
        <MnemonicPhraseInput mnemonic={mnemonic} onChange={setMnemonic} />
        <Box mt={2} mb={4}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button className={classes.button} variant="contained" color="primary" type="submit">
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default ConfirmMnemonic
