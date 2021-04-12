import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Grid,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import RemoveIcon from '../../assets/images/icons/icon_clear.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import { useSettingsContext } from '../../contexts/SettingsContext'

interface SelectRecipientsProps {
  onConfirm(recipients: Array<{ amount: number; address: string }>, memo: string): void
  availableAmount: number
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
  const { currency } = useSettingsContext()
  const [recipients, setRecipients] = React.useState<Array<{ amount: string; address: string }>>([
    { amount: '', address: '' },
  ])
  const [memo, setMemo] = React.useState('')

  const totalAmount = React.useMemo(
    () => recipients.map((r) => Number(r.amount) || 0).reduce((a, b) => a + b, 0),
    [recipients]
  )

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box ml={4} minHeight={360} maxHeight={600}>
          <Typography className={classes.marginBottom}>
            {t('available amount')}{' '}
            <b className={classes.marginLeft}>
              {formatCrypto(availableAmount, account.crypto, lang)}
            </b>
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('delegate to')}</Typography>
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
                  onClick={() => setRecipients((d) => [...d, { address: '', amount: '' }])}
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
                  {/* TODO: select tokens from token_unit */}
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder="0"
                    type="number"
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">{account.crypto}</InputAdornment>
                      ),
                    }}
                    value={v.amount}
                    onChange={(e) =>
                      setRecipients((d) =>
                        d.map((a, j) =>
                          j === i
                            ? {
                                ...a,
                                amount: e.target.value,
                              }
                            : a
                        )
                      )
                    }
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
            <Typography variant="h5">{formatCrypto(totalAmount, account.crypto, lang)}</Typography>
            <Typography>{formatCurrency(totalAmount, currency, lang)}</Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!recipients.filter((v) => v.address && Number(v.amount)).length}
            onClick={() =>
              onConfirm(
                recipients
                  .filter((v) => v.address && Number(v.amount))
                  .map((v) => ({
                    address: v.address,
                    amount: Number(v.amount),
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
