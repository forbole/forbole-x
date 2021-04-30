import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Grid,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { formatCrypto, formatCurrency, formatTokenAmount } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface SelectValidatorsProps {
  onConfirm(amount: number, denom: string, memo: string): void
  account: Account
  validator: Validator
  availableAmount: TokenAmount
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({
  validator,
  availableAmount,
  onConfirm,
}) => {
  const { amount: totalAmount, price } = Object.values(availableAmount)[0]
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency } = useGeneralContext()
  const [amount, setAmount] = React.useState(totalAmount.toString())
  const [percentage, setPercentage] = React.useState('100')
  const [denom, setDenom] = React.useState(Object.keys(availableAmount)[0])
  const [memo, setMemo] = React.useState('')

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box ml={4} minHeight={360} maxHeight={600}>
          <Typography className={classes.marginBottom}>
            {t('total delegated amount')}{' '}
            <b className={classes.marginLeft}>
              {formatTokenAmount(availableAmount, denom, lang, ', ')}
            </b>
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('undelegate from')}</Typography>
              <Box display="flex" alignItems="center">
                <Avatar
                  className={classes.validatorAvatar}
                  alt={validator.name}
                  src={validator.image}
                />
                <Typography>{validator.name}</Typography>
              </Box>
              <Box mt={2}>
                <Typography gutterBottom>{t('memo')}</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="filled"
                  placeholder={t('description optional')}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('amount')}</Typography>
              <Box display="flex" alignItems="center">
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="0"
                  type="number"
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: <InputAdornment position="end">{denom}</InputAdornment>,
                  }}
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setPercentage(((100 * Number(e.target.value)) / totalAmount).toFixed(2))
                  }}
                />
                <TextField
                  className={classes.percentageTextField}
                  variant="filled"
                  placeholder="0"
                  type="number"
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  inputProps={{
                    className: classes.numberInput,
                  }}
                  value={percentage}
                  onChange={(e) => {
                    setPercentage(e.target.value)
                    setAmount(((totalAmount * Number(e.target.value)) / 100).toFixed(2))
                  }}
                />
              </Box>
            </Grid>
          </Grid>
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
            <Typography variant="h5">{formatCrypto(Number(amount), denom, lang)}</Typography>
            <Typography>{formatCurrency(Number(amount) * price, currency, lang)}</Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!Number(amount) || Number(amount) > totalAmount}
            onClick={() => onConfirm(Number(amount), denom, memo)}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default SelectValidators