/* eslint-disable camelcase */
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import keyBy from 'lodash/keyBy'
import React from 'react'
import intervalToDuration from 'date-fns/intervalToDuration'
import get from 'lodash/get'
import { gql, useSubscription } from '@apollo/client'
import useIconProps from '../../misc/useIconProps'
import useStyles from './styles'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import TokenAmountInput from '../TokenAmountInput'
import { getTokenAmountFromDenoms, formatCrypto } from '../../misc/utils'
import { useWalletsContext } from '../../contexts/WalletsContext'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'

interface InputAmountProps {
  crypto: Cryptocurrency
  onNext(address: string, amount: number, memo: string): void
  proposal: Proposal
  open: boolean
}

const InputAmount: React.FC<InputAmountProps> = ({ crypto, onNext, proposal, open }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { accounts: allAccounts } = useWalletsContext()
  const accounts = allAccounts.filter((a) => a.crypto === crypto.name)

  const iconProps = useIconProps()
  const remainingTime = intervalToDuration({
    end: new Date(proposal.depositEndTimeRaw),
    start: Date.now(),
  })
  const accountsMap = keyBy(accounts, 'address')
  const [memo, setMemo] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [address, setAddress] = React.useState(accounts[0].address)

  const { data: balanceData } = useSubscription(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address } }
  )

  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  const { availableAmount } = React.useMemo(
    () => ({
      availableAmount: getTokenAmountFromDenoms(
        availableTokens.coins,
        availableTokens.tokens_prices
      ),
    }),
    [availableTokens]
  )
  const [denom, setDenom] = React.useState(crypto.name)
  const insufficientFund = get(availableAmount, `${denom}.amount`, 0) < Number(amount)

  const changeAccount = (a: string) => {
    setAddress(accountsMap[a].address)
    setDenom(accountsMap[a].crypto)
  }

  const remainAmount = () => {
    if (
      get(proposal, `totalDeposits.${crypto.name}.amount`, 0) >
      get(proposal, `minDeposit.${crypto.name}.amount`, 0)
    ) {
      return 0
    }
    return (
      get(proposal, `minDeposit.${crypto.name}.amount`, 0) -
      get(proposal, `totalDeposits.${crypto.name}.amount`, 0)
    )
  }

  React.useEffect(() => {
    if (open) {
      setAmount('')
      setMemo('')
      setAddress(accounts[0].address)
      setDenom(crypto.name)
    }
  }, [open])

  return (
    <>
      <DialogContent>
        <Box textAlign="center" mb={4}>
          <Typography variant="h6">
            {`${t('deposit end in')} ${remainingTime.days} ${'days'} ${remainingTime.hours}:${
              remainingTime.minutes
            }:${remainingTime.seconds}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`${t('remaining deposit amount')} `}
            {formatCrypto(remainAmount(), crypto.name, lang)}
          </Typography>
        </Box>
        <Box>
          <Box>
            <Typography variant="button" className={classes.button}>
              {t('address')}
            </Typography>
            <Box display="flex" alignItems="center" mb={4}>
              <Autocomplete
                options={accounts.map((ac) => ac.address)}
                getOptionLabel={(option) =>
                  `${accountsMap[option].name} \n ${accountsMap[option].address}`
                }
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) => {
                  return options.filter((o) =>
                    accountsMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }}
                onChange={(_e, adr: string) => changeAccount(adr)}
                renderOption={(adr) => (
                  <Box display="flex" alignItems="center">
                    <Typography>{`${accountsMap[adr].name}\n${accountsMap[adr].address}`}</Typography>
                  </Box>
                )}
                renderInput={({ InputProps, inputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select account')}
                    inputProps={{
                      ...inputProps,
                      value: `${accountsMap[address].name} \n ${accountsMap[address].address}`,
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

            <Box mt={4}>
              <Typography variant="button" className={classes.button}>
                {t('amount')}
              </Typography>
              <TokenAmountInput
                value={amount}
                denom={denom}
                onValueChange={(e) => setAmount(e)}
                onDenomChange={setDenom}
                availableAmount={availableAmount}
              />
            </Box>
            <Box textAlign="right">
              <Typography variant="subtitle1" color="textSecondary">
                {`${'available amount'} ${formatCrypto(
                  Number(get(availableAmount, `${denom}.amount`, 0)),
                  crypto.name,
                  lang
                )}`}
              </Typography>
            </Box>

            <Box mt={4}>
              <Typography variant="button" className={classes.button}>
                {t('memo')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" flex={1} mb={3} mx={2}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!Number(amount) || insufficientFund}
            onClick={() => onNext(address, Number(amount), memo)}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default InputAmount
