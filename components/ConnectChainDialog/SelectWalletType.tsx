import {
  ButtonBase,
  DialogActions,
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
import useStyles from './styles'

interface SelectWalletTypeProps {
  onConfirm(type: 'mnemonic' | 'ledger'): void
}

const SelectWalletType: React.FC<SelectWalletTypeProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()

  return (
    <DialogContent className={classes.dialogContent}>
      <DialogContentText>{t('select connect chain method')}</DialogContentText>
      <Box m={4} mb={8}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('mnemonic')}>
              <Box mb={5}>
                <UsePhraseIcon />
              </Box>
              <Typography align="center" color="textSecondary">
                {t('use recovery phrase')}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={4}>
            <ButtonBase className={classes.selectionBox} onClick={() => onConfirm('ledger')}>
              <Box mb={5}>
                <ConnectLedgerIcon />
              </Box>
              <Typography align="center" color="textSecondary">
                {t('connect with ledger')}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={4}>
            <ButtonBase
              className={classes.selectionBox}
              onClick={async () => {
                if (!window.keplr) {
                  return console.log('no keplr')
                }
                await window.keplr.enable('cosmoshub-4')
                const signer = window.keplr.getOfflineSigner('cosmoshub-4')
                const [keplrAccount] = await signer.getAccounts()
                const result = await signer.signAmino(keplrAccount.address, {
                  account_number: '0',
                  chain_id: 'cosmoshub-4',
                  fee: { amount: [], gas: '0' },
                  memo: 'desmos14t2hvslx84klhdljkltlmeyz9fj6xfs3z40ne2',
                  msgs: [],
                  sequence: '0',
                })
                console.log(result)
              }}
            >
              <Box mb={5}>
                <KeplrIcon width={theme.spacing(8)} height={theme.spacing(8)} />
              </Box>
              <Typography align="center" color="textSecondary">
                {t('connect with keplr')}
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
  )
}

export default SelectWalletType
