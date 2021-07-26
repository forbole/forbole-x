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
import useIconProps from '../../misc/useIconProps'
import useStyles from './styles'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import TokenAmountInput from '../TokenAmountInput'
import { getTokenAmountFromDenoms, formatCrypto } from '../../misc/utils'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface InputAmountProps {
  account: Account
  crypto: Cryptocurrency
  onNext(voteAccount: Account, amount: number, memo?: string): void
  proposal: Proposal
  availableTokens: AvailableTokens
}

const InputAmount: React.FC<InputAmountProps> = ({
  crypto,
  account,
  onNext,
  availableTokens,
  proposal,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { accounts: allAccounts } = useWalletsContext()
  const accounts = allAccounts.filter((a) => a.crypto === account.crypto)

  const iconProps = useIconProps()
  const remainingTime = intervalToDuration({
    end: new Date(proposal.depositEndTimeRaw),
    start: Date.now(),
  })
  const accountsMap = keyBy(accounts, 'address')
  const [memo, setMemo] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [voteAccount, setVoteAccount] = React.useState<Account>(account)
  const { availableAmount } = React.useMemo(
    () => ({
      availableAmount: getTokenAmountFromDenoms(
        availableTokens.coins,
        availableTokens.tokens_prices
      ),
    }),
    [availableTokens]
  )
  const [denom, setDenom] = React.useState(Object.keys(availableAmount)[0])
  const insufficientFund = get(availableAmount, `${denom}.amount`, 0) < Number(amount)

  const changeAccount = (a: string) => {
    setVoteAccount(accountsMap[a])
    setDenom(accountsMap[a].crypto)
  }

  const remainAmount = () => {
    if (proposal.totalDeposits[crypto.name].amount > proposal.minDeposit[crypto.name].amount) {
      return 0
    }
    return proposal.minDeposit[crypto.name].amount - proposal.totalDeposits[crypto.name].amount
  }

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
                options={accounts.map(({ address }) => address)}
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
                onChange={(_e, address: string) => changeAccount(address)}
                renderOption={(address) => (
                  <Box display="flex" alignItems="center">
                    <Typography>{`${accountsMap[address].name}\n${accountsMap[address].address}`}</Typography>
                  </Box>
                )}
                renderInput={({ InputProps, inputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select account')}
                    inputProps={{
                      ...inputProps,
                      value: `${voteAccount.name} \n ${voteAccount.address}`,
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
                denom={voteAccount.crypto}
                onValueChange={(e) => setAmount(e)}
                onDenomChange={() => null}
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
            onClick={() => onNext(voteAccount, Number(amount), memo)}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default InputAmount
