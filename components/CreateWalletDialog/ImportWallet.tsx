import { Button, DialogActions, DialogContent, Typography, Box, TextField } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface ImportWalletProps {
  onConfirm(password: string): void
}

const ImportWallet: React.FC<ImportWalletProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [name, setName] = React.useState('')

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Typography>{t('moniker')}</Typography>
        <TextField
          fullWidth
          variant="filled"
          placeholder={t('wallet name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Box mb={30} />
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!name}
            onClick={() => onConfirm(name)}
          >
            {t('import')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default ImportWallet
