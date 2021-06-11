import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import MnemonicPhraseInput from '../MnemonicPhraseInput'
import useStyles from './styles'

interface CreateWalletProps {
  mnemonic: string
  onConfirm(): void
}

const CreateWallet: React.FC<CreateWalletProps> = ({ mnemonic, onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm()
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('create new wallet description')}</DialogContentText>
        <MnemonicPhraseInput disabled mnemonic={mnemonic} />
        <Box mt={6} />
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button className={classes.button} variant="contained" color="primary" type="submit">
            {t('create new wallet button')}
          </Button>
          <Typography align="center">{t('create new wallet caption')}</Typography>
        </Box>
      </DialogActions>
    </form>
  )
}

export default CreateWallet
