/* eslint-disable camelcase */
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useTranslation from 'next-translate/useTranslation';
import keyBy from 'lodash/keyBy';
import React from 'react';
import intervalToDuration from 'date-fns/intervalToDuration';
import get from 'lodash/get';
import useIconProps from '../../misc/useIconProps';
import useStyles from './styles';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import TokenAmountInput from '../TokenAmountInput';
import MemoInput from '../MemoInput';
import { getTokenAmountFromDenoms, formatCrypto } from '../../misc/utils';
import { useGeneralContext } from '../../contexts/GeneralContext';

interface InputAmountProps {
  loading: boolean;
  crypto: Cryptocurrency;
  onNext(address: string, amount: number, denom: string, memo: string): void;
  proposal: Proposal;
  open: boolean;
  availableTokens: AvailableTokens;
  accounts: Account[];
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const calculateRemainingTime = (timeString: string) =>
  intervalToDuration({
    end: new Date(timeString || null),
    start: new Date(),
  });

const formatDoubleDigits = (num: number) => `0${num}`.slice(-2);

const Timer: React.FC<{ timeString: string }> = ({ timeString }) => {
  const { t } = useTranslation('common');
  const [remainingTime, setRemainingTime] = React.useState(calculateRemainingTime(timeString));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(timeString));
    }, 1000);
    return () => interval && clearInterval(interval);
  }, []);

  return (
    <Typography variant="h6">
      {`${t('deposit end in', {
        days: remainingTime.days,
        hours: remainingTime.hours,
        minutes: formatDoubleDigits(remainingTime.minutes),
        seconds: formatDoubleDigits(remainingTime.seconds),
      })}`}
    </Typography>
  );
};

const InputAmount: React.FC<InputAmountProps> = ({
  loading,
  crypto,
  onNext,
  proposal,
  open,
  availableTokens,
  accounts,
  address,
  setAddress,
}) => {
  const { t, lang } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const theme = useTheme();
  const { hideAmount } = useGeneralContext();

  const accountsMap = keyBy(accounts, 'address');
  const [memo, setMemo] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [consent, setConsent] = React.useState(true);

  const { availableAmount } = React.useMemo(
    () => ({
      availableAmount: getTokenAmountFromDenoms(
        availableTokens.coins,
        availableTokens.tokens_prices,
      ),
    }),
    [availableTokens],
  );
  const [denom, setDenom] = React.useState(crypto.name);
  const insufficientFund = get(availableAmount, `${denom}.amount`, 0) < Number(amount);

  const changeAccount = (a: string) => {
    setAddress(accountsMap[a].address);
    setDenom(accountsMap[a].crypto);
  };

  const remainAmount = () => {
    if (
      get(proposal, `totalDeposits.${crypto.name}.amount`, 0) >
      get(proposal, `minDeposit.${crypto.name}.amount`, 0)
    ) {
      return 0;
    }
    return (
      get(proposal, `minDeposit.${crypto.name}.amount`, 0) -
      get(proposal, `totalDeposits.${crypto.name}.amount`, 0)
    );
  };

  React.useEffect(() => {
    if (open) {
      setAmount('');
      setMemo('');
      setAddress(accounts[0].address);
      setDenom(crypto.name);
    }
  }, [open]);

  return address ? (
    <>
      <DialogContent>
        <Box textAlign="center" mb={4}>
          {proposal.depositEndTimeRaw ? <Timer timeString={proposal.depositEndTimeRaw} /> : null}
          <Typography variant="subtitle1" color="textSecondary">
            {`${t('remaining deposit amount')} `}
            {formatCrypto(remainAmount(), { unit: crypto.name, lang, hideAmount })}
          </Typography>
        </Box>
        <Box>
          <Box>
            <Typography variant="button" className={classes.button}>
              {t('address')}
            </Typography>
            <Box display="flex" alignItems="center" mb={4}>
              <Autocomplete
                options={accounts.map(ac => ac.address)}
                getOptionLabel={option =>
                  `${accountsMap[option].name} \n ${accountsMap[option].address}`
                }
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) => {
                  return options.filter(o =>
                    accountsMap[o].name.toLowerCase().includes(inputValue.toLowerCase()),
                  );
                }}
                onChange={(_e, adr: string) => changeAccount(adr)}
                renderOption={adr => (
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
                onValueChange={e => setAmount(e)}
                onDenomChange={setDenom}
                availableAmount={availableAmount}
              />
            </Box>
            <Box textAlign="right">
              <Typography variant="subtitle1" color="textSecondary">
                {`${'available amount'} ${formatCrypto(
                  Number(get(availableAmount, `${denom}.amount`, 0)),
                  { unit: crypto.name, lang, hideAmount },
                )}`}
              </Typography>
            </Box>

            <Box mt={4}>
              <Typography variant="button" className={classes.button}>
                {t('memo')}
              </Typography>
              <MemoInput
                fullWidth
                multiline
                rows={4}
                placeholder={t('description optional')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={memo}
                setValue={setMemo}
                consent={consent}
                setConsent={setConsent}
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
            disabled={loading || !Number(amount) || insufficientFund || !consent}
            onClick={() => onNext(address, Number(amount), denom, memo)}
          >
            {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  ) : null;
};

export default InputAmount;
