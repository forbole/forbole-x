import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface SelectAmountProps {
  onConfirm(amount: number): void
  account: Account
}

const SelectAmount: React.FC<SelectAmountProps> = ({ account, onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [amount, setAmount] = React.useState('')
  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box mb={32}>
          <Typography className={classes.marginBottom}>
            {t('available amount')} <b className={classes.marginLeft}>1.1107 {account.crypto}</b>
          </Typography>
          <Typography>{t('total delegated amount')}</Typography>
          <TextField
            fullWidth
            variant="filled"
            InputProps={{
              disableUnderline: true,
              endAdornment: <InputAdornment position="end">{account.crypto}</InputAdornment>,
            }}
            placeholder="0"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          flex={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          mx={2}
        >
          <Box>
            <Typography variant="h5">0.00 {account.crypto}</Typography>
            <Typography>$0.00 USD</Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!Number(amount)}
            onClick={() => onConfirm(Number(amount))}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default SelectAmount
