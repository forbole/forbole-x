import {
  ButtonBase,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
  Box,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import MnemonicPhraseInput from '../MnemonicPhraseInput'
import useStyles from './styles'

interface CreateWalletProps {}

const CreateWallet: React.FC<CreateWalletProps> = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [mnemonic, setMnemonic] = React.useState('')

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('create new wallet description')}</DialogContentText>
        <MnemonicPhraseInput disabled mnemonic={mnemonic} onChange={setMnemonic} />
        <Box mt={6} />
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => null}
          >
            {t('create new wallet button')}
          </Button>
          <Typography align="center">{t('create new wallet caption')}</Typography>
        </Box>
      </DialogActions>
    </>
  )
}

export default CreateWallet
