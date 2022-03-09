import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
  FilledTextFieldProps,
  CircularProgress,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGeneralContext } from '../../contexts/GeneralContext'

import { formatCurrency, formatTokenAmount, getTokenAmountBalance } from '../../misc/utils'
import useStyles from './styles'
import MemoInput from '../MemoInput'
import { CustomTheme } from '../../misc/theme'

interface WithdrawCommissionProps extends Partial<FilledTextFieldProps> {
  onConfirm(m: string): void
  account: Account
  totalAmount: TokenAmount
  loading: boolean
}

const WithdrawCommission: React.FC<WithdrawCommissionProps> = ({
  account,
  totalAmount,
  onConfirm,
  loading,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency, currencyRate, hideAmount } = useGeneralContext()
  const [value, setValue] = React.useState('')
  const [consent, setConsent] = React.useState(true)
  const themeStyle: CustomTheme = useTheme()

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(value)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box mb={4}>
          <Box mt={4} mb={2}>
            <Typography>{t('total commission amount')}</Typography>
            <Typography variant="h1" className={classes.h1}>
              {formatTokenAmount(totalAmount, {
                defaultUnit: account.crypto,
                lang,
                delimiter: ', ',
                hideAmount,
              })}
            </Typography>
          </Box>
        </Box>

        <Typography>{t('memo')}</Typography>
        <MemoInput
          fullWidth
          multiline
          rows={4}
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={t('description optional')}
          value={value}
          setValue={setValue}
          consent={consent}
          setConsent={setConsent}
        />
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
            <Typography variant="h5">
              {formatTokenAmount(totalAmount, { defaultUnit: account.crypto, lang })}
            </Typography>
            <Typography>
              {formatCurrency(getTokenAmountBalance(totalAmount) * currencyRate, {
                currency,
                lang,
              })}
            </Typography>
          </Box>
          <Button
            variant="contained"
            classes={{ root: classes.button }}
            color="primary"
            disabled={loading || !consent}
            type="submit"
          >
            {loading ? <CircularProgress size={themeStyle.spacing(3.5)} /> : t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default WithdrawCommission
