import { Box, Button, DialogActions, DialogContent, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { formatCrypto, formatCurrency, formatTokenAmount } from '../../misc/utils'
import TokenAmountInput from '../TokenAmountInput'
import useStyles from './styles'

interface SelectAmountProps {
  onConfirm(amount: number, denom: string): void
  account: Account
  availableAmount: TokenAmount
}

const SelectAmount: React.FC<SelectAmountProps> = ({ account, onConfirm, availableAmount }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency } = useGeneralContext()
  const [amount, setAmount] = React.useState('')
  const [denom, setDenom] = React.useState(Object.keys(availableAmount)[0])

  const insufficientFund = get(availableAmount, `${denom}.amount`, 0) < Number(amount)

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box mb={32}>
          <Typography className={classes.marginBottom}>
            {t('available amount')}{' '}
            <b className={classes.marginLeft}>
              {formatTokenAmount(availableAmount, account.crypto, lang, ', ')}
            </b>
          </Typography>
          <Typography>{t('total delegated amount')}</Typography>
          <TokenAmountInput
            value={amount}
            denom={denom}
            onValueChange={setAmount}
            onDenomChange={setDenom}
            availableAmount={availableAmount}
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
            <Typography variant="h5">{formatCrypto(0, account.crypto, lang)}</Typography>
            <Typography>{formatCurrency(0, currency, lang)}</Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!Number(amount) || insufficientFund}
            onClick={() => onConfirm(Number(amount), denom)}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default SelectAmount
