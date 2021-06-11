import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  TextField,
  Avatar,
  ButtonBase,
  Grid,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStyles from './styles'

interface ImportWalletProps {
  onConfirm(name: string, cryptos: string[]): void
}

const ImportWallet: React.FC<ImportWalletProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const [name, setName] = React.useState('')
  const [selectedCryptos, setSelectedCryptos] = React.useState<string[]>([])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(name, selectedCryptos)
      }}
    >
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
        <Box mt={3} mb={28}>
          <Typography>{t('select currencies')}</Typography>
          <br />
          <Grid container spacing={2}>
            {Object.values(cryptocurrencies).map((c) => {
              const isSelected = selectedCryptos.includes(c.name)
              return (
                <Grid key={c.name} item md={4}>
                  <ButtonBase
                    className={classes.cryptoButton}
                    style={isSelected ? { border: `1px solid ${theme.palette.text.primary}` } : {}}
                    onClick={() =>
                      setSelectedCryptos((cryptos) =>
                        isSelected
                          ? cryptos.filter((crypto) => crypto !== c.name)
                          : [...cryptos, c.name]
                      )
                    }
                  >
                    <Box mr={2}>
                      <Avatar src={c.image} />
                    </Box>
                    <Typography color={isSelected ? 'textPrimary' : 'textSecondary'}>
                      {c.name}
                    </Typography>
                  </ButtonBase>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!name || selectedCryptos.length === 0}
            type="submit"
          >
            {t('import')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default ImportWallet
