/* eslint-disable camelcase */
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  DialogActions,
  CircularProgress,
  useTheme,
  DialogContent,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import invoke from 'lodash/invoke'
import keyBy from 'lodash/keyBy'
import { Autocomplete } from '@material-ui/lab'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { useWalletsContext } from '../../contexts/WalletsContext'
import {
  getTokenAmountBalance,
  formatCurrency,
  formatTokenAmount,
  getEquivalentCoinToSend,
} from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { useAddressSendDialogHook } from './hooks'
import TokenAmountInput from '../TokenAmountInput'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  note?: string
  img?: string
}

interface AddressSendDialogProps {
  address: FavAddress
  open: boolean
  onClose(): void
}

const AddressSendDialog: React.FC<AddressSendDialogProps> = ({ open, onClose, address }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { currency } = useGeneralContext()

  const { accounts, password } = useWalletsContext()
  const isMobile = useIsMobile()
  const [loading, setLoading] = React.useState(false)
  const [memo, setMemo] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const theme = useTheme()
  const crypto = address ? cryptocurrencies[address.crypto] : Object.values(cryptocurrencies)[0]

  const avaiableAccounts = (accounts || []).filter((a) => a.crypto === address.crypto)
  const avaiableAccountsMap = keyBy(avaiableAccounts, 'address')
  const [sender, setSender] = React.useState<Account>(avaiableAccounts[0])

  const { getAvailableAmount } = useAddressSendDialogHook({ account: sender, crypto })
  const { availableAmount, availableTokens } = getAvailableAmount()

  const onConfirm = React.useCallback(
    async (r: { amount: { amount: number; denom: string }; address: string }, m: string) => {
      try {
        setLoading(true)
        const msg = () => {
          const coinsToSend = getEquivalentCoinToSend(
            r.amount,
            availableTokens.coins,
            availableTokens.tokens_prices
          )
          return {
            type: 'cosmos-sdk/MsgSend',
            value: {
              from_address: sender.address,
              to_address: address.address,
              amount: [{ amount: coinsToSend.amount.toString(), denom: coinsToSend.denom }],
            },
          }
        }
        await invoke(window, 'forboleX.sendTransaction', password, sender.address, {
          msgs: [msg()],
          memo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        setLoading(false)
      }
    },
    [availableTokens]
  )

  const insufficientTokens = React.useMemo(() => {
    if (Number(amount) > availableAmount?.[crypto.name]?.amount || Number(amount) <= 0) {
      return true
    }
    return false
  }, [amount, availableAmount])

  React.useEffect(() => {
    if (open) {
      setLoading(false)
      setAmount('')
      setSender(avaiableAccounts[0])
    }
  }, [open])

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('send')}</DialogTitle>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          onConfirm(
            {
              address: sender.address,
              amount: {
                amount: Number(amount),
                denom: crypto.name,
              },
            },
            memo
          )
        }}
      >
        <DialogContent>
          <Box mx={3} my={4}>
            <Box mb={2}>
              <Typography>
                {t('available amount')} {availableAmount?.[crypto.name]?.amount || '0'}{' '}
                {crypto.name}
              </Typography>
            </Box>
            <Box my={2}>
              <Typography gutterBottom>{t('sender address')}</Typography>
              <Autocomplete
                options={Object.keys(avaiableAccountsMap)}
                getOptionLabel={(option) =>
                  `${avaiableAccountsMap[option].name} ${avaiableAccountsMap[option].address}`
                }
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) => {
                  return options.filter((o) =>
                    avaiableAccountsMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }}
                onChange={(_e, a: string) => setSender(avaiableAccountsMap[a])}
                renderOption={(a) => (
                  <Box display="flex" alignItems="center">
                    <Typography>{`${avaiableAccountsMap[a].name}  ${avaiableAccountsMap[a].address}`}</Typography>
                  </Box>
                )}
                renderInput={({ InputProps, inputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select account')}
                    inputProps={{
                      ...inputProps,
                      value: `${sender.name} ${sender.address}`,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      ...InputProps,
                      className: '',
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <DropDownIcon {...iconProps} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <Box my={2}>
              <Typography gutterBottom>{t('amount')}</Typography>

              <TokenAmountInput
                value={amount}
                placeholder="0"
                denom={crypto.name}
                onValueChange={(a) => setAmount(a)}
                onDenomChange={() => null}
                availableAmount={availableAmount}
              />
            </Box>
            <Box my={2}>
              <Typography gutterBottom>{t('note')}</Typography>
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
                {formatTokenAmount(availableAmount, address.crypto, lang, ', ')}
              </Typography>
              <Typography>
                {formatCurrency(getTokenAmountBalance(availableAmount), currency, lang)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              classes={{ root: classes.button }}
              color="primary"
              disabled={loading || insufficientTokens}
              type="submit"
            >
              {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddressSendDialog
