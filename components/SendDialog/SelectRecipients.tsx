import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  Grid,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import RemoveIcon from '../../assets/images/icons/icon_clear.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { getTokenAmountBalance, formatCurrency, formatTokenAmount } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'
import TokenAmountInput from '../TokenAmountInput'

interface SelectRecipientsProps {
  onConfirm(
    recipients: Array<{ amount: { amount: number; denom: string }; address: string }>,
    memo: string
  ): void
  availableAmount: TokenAmount
  account: Account
}

const SelectRecipients: React.FC<SelectRecipientsProps> = ({
  account,
  availableAmount,
  onConfirm,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { currency } = useGeneralContext()
  const [recipients, setRecipients] = React.useState<
    Array<{ amount: string; denom: string; address: string }>
  >([{ amount: '', denom: Object.keys(availableAmount)[0] || '', address: '' }])
  const [memo, setMemo] = React.useState('')

  const totalAmount: TokenAmount = React.useMemo(() => {
    const tokenAmount = {}
    recipients.forEach((r) => {
      if (tokenAmount[r.denom]) {
        tokenAmount[r.denom].amount += Number(r.amount)
      } else {
        tokenAmount[r.denom] = {
          amount: Number(r.amount),
          price: get(availableAmount, `${r.denom}.price`, ''),
        }
      }
    })
    return tokenAmount
  }, [recipients, availableAmount])

  const insufficientTokens = React.useMemo(() => {
    const result = []
    Object.keys(totalAmount).forEach((token) => {
      if (get(totalAmount, `${token}.amount`, 0) > get(availableAmount, `${token}.amount`, 0)) {
        result.push(token)
      }
    })
    return result
  }, [totalAmount, availableAmount])

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box ml={4} minHeight={360} maxHeight={600}>
          <Typography className={classes.marginBottom}>
            {t('available amount')}{' '}
            <b className={classes.marginLeft}>
              {formatTokenAmount(availableAmount, account.crypto, lang, ', ')}
            </b>
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('recipient address')}</Typography>
              {recipients.map((v, i) => (
                <Box
                  key={i.toString()}
                  display="flex"
                  alignItems="center"
                  ml={recipients.length <= 1 ? 0 : -5}
                  mt={i === 0 ? 0 : 1}
                >
                  {recipients.length <= 1 ? null : (
                    <IconButton onClick={() => setRecipients((d) => d.filter((a, j) => j !== i))}>
                      <RemoveIcon {...iconProps} />
                    </IconButton>
                  )}
                  {/* TODO: select from address book */}
                  <TextField
                    fullWidth
                    value={v.address}
                    onChange={(e) =>
                      setRecipients((d) =>
                        d.map((a, j) => (j === i ? { ...a, address: e.target.value } : a))
                      )
                    }
                    InputProps={{
                      disableUnderline: true,
                    }}
                    variant="filled"
                    placeholder={t('insert address')}
                  />
                </Box>
              ))}
              <Box mt={1}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() =>
                    setRecipients((d) => [
                      ...d,
                      { address: '', amount: '', denom: Object.keys(availableAmount)[0] },
                    ])
                  }
                >
                  {t('add address')}
                </Button>
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
              {recipients.map((v, i) => (
                <Box key={i.toString()} mt={i === 0 ? 0 : 1}>
                  <TokenAmountInput
                    value={v.amount}
                    denom={v.denom}
                    onValueChange={(amount) =>
                      setRecipients((d) => d.map((a, j) => (j === i ? { ...a, amount } : a)))
                    }
                    onDenomChange={(denom) =>
                      setRecipients((d) => d.map((a, j) => (j === i ? { ...a, denom } : a)))
                    }
                    availableAmount={availableAmount}
                  />
                </Box>
              ))}
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
            <Typography variant="h5">
              {formatTokenAmount(totalAmount, account.crypto, lang, ', ')}
            </Typography>
            <Typography>
              {formatCurrency(getTokenAmountBalance(totalAmount), currency, lang)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={
              !!insufficientTokens.length ||
              !recipients.filter((v) => v.address && Number(v.amount)).length
            }
            onClick={() =>
              onConfirm(
                recipients
                  .filter((v) => v.address && Number(v.amount))
                  .map((v) => ({
                    address: v.address,
                    amount: {
                      amount: Number(v.amount),
                      denom: v.denom,
                    },
                  })),
                memo
              )
            }
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default SelectRecipients
