import {
  ButtonBase,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Grid,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import ConnectLedgerIcon from '../../assets/images/connect_ledger.svg'
import UsePhraseIcon from '../../assets/images/use_phrase.svg'
import KeplrIcon from '../../assets/images/keplr.svg'
import TerraStationIcon from '../../assets/images/terra-station.svg'
import useStyles from './styles'

interface SelectWalletTypeProps {
  chain: string
  onConfirm(type: 'mnemonic' | 'ledger' | 'keplr' | 'terra station'): void
  error: string
}

const SelectWalletType: React.FC<SelectWalletTypeProps> = ({ onConfirm, error, chain }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()

  const isTerra = chain === 'terra'

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogContentText>{t('select connect chain method')}</DialogContentText>
      <Box m={4} mb={8}>
        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('mnemonic')}>
          <Box mr={3}>
            <UsePhraseIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          </Box>
          <Typography variant="h6">{t('use recovery phrase')}</Typography>
        </ButtonBase>

        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('ledger')}>
          <Box mr={3}>
            <ConnectLedgerIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          </Box>
          <Typography variant="h6">{t('connect with ledger')}</Typography>
        </ButtonBase>

        <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('keplr')}>
          <Box mr={3}>
            <KeplrIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          </Box>
          <Typography variant="h6">{t('connect with keplr')}</Typography>
        </ButtonBase>

        {isTerra ? (
          <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('terra station')}>
            <Box mr={3}>
              <TerraStationIcon width={theme.spacing(6)} height={theme.spacing(6)} />
            </Box>
            <Typography variant="h6">{t('connect with terra station')}</Typography>
          </ButtonBase>
        ) : null}
        {error ? <Typography color="error">{error}</Typography> : null}
      </Box>
    </DialogContent>
  )
}

export default SelectWalletType
