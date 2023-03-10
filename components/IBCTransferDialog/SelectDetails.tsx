import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  useTheme,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import { Autocomplete } from '@material-ui/lab';
import ArrowIcon from '../../assets/images/icons/icon_arrow_right.svg';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import useStyles from './styles';
import cryptocurrencies from '../../misc/cryptocurrencies';
import useIconProps from '../../misc/useIconProps';
import AddressInput from '../AddressInput';
import MemoInput from '../MemoInput';
import { isAddressValid } from '../../misc/utils';

interface SelectDetailsProps {
  onConfirm(amount: number, denom: string, address: string, memo: string): void;
  account: Account;
  chainId: string;
  availableAmount: TokenAmount;
  loading: boolean;
}

const SelectDetails: React.FC<SelectDetailsProps> = ({
  account,
  onConfirm,
  availableAmount,
  chainId,
  loading,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const theme = useTheme();
  const [amount, setAmount] = React.useState('');
  const [denom, setDenom] = React.useState(Object.keys(availableAmount)[0]);
  const [address, setAddress] = React.useState('');
  const [memo, setMemo] = React.useState('');
  const [consent, setConsent] = React.useState(true);

  const insufficientFund = get(availableAmount, `${denom}.amount`, 0) < Number(amount);

  const chainMap = keyBy(cryptocurrencies[account.crypto].ibcChains, 'chainId');

  const sourceChain = chainMap[cryptocurrencies[account.crypto].chainId];
  const destinationChain = chainMap[chainId];

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onConfirm(Number(amount), denom, address, memo);
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box mb={4}>
          <Box mb={4} display="flex" justifyContent="center" alignItems="center">
            <Avatar
              className={classes.largeAvatar}
              alt={get(sourceChain, 'name', '')}
              src={get(sourceChain, 'image', '')}
            />
            <Typography>{get(sourceChain, 'name', '')}</Typography>
            <Box mx={2.5} display="flex">
              <ArrowIcon {...iconProps} />
            </Box>
            <Avatar
              className={classes.largeAvatar}
              alt={get(destinationChain, 'name', '')}
              src={get(destinationChain, 'image', '')}
            />
            <Typography>{get(destinationChain, 'name', '')}</Typography>
          </Box>
          <Typography>
            {t('recipient address')} ({get(destinationChain, 'name', '')})
          </Typography>
          <AddressInput
            value={address}
            onChange={setAddress}
            prefix={get(destinationChain, 'addressPrefix', '')}
          />
          <Box mb={2} />
          <Typography>{t('token')}</Typography>
          <Autocomplete
            options={Object.keys(availableAmount)}
            getOptionLabel={token => token}
            openOnFocus
            fullWidth
            filterOptions={(options: string[], { inputValue }: any) =>
              options.filter(token => token.toLowerCase().includes(inputValue.toLowerCase()))
            }
            onChange={(_e, token: string) => setDenom(token)}
            renderInput={({ InputProps, ...params }) => (
              <TextField
                {...params}
                variant="filled"
                placeholder={t('select token')}
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
          <Box mb={2} />
          <Typography>{t('amount')}</Typography>
          <TextField
            placeholder="0"
            type="number"
            variant="filled"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            fullWidth
            InputProps={{ disableUnderline: true }}
            error={insufficientFund}
            helperText={insufficientFund ? t('insufficient fund') : ''}
          />
          <Box mb={2} />
          <Typography>{t('memo')}</Typography>
          <MemoInput
            placeholder={t('optional')}
            variant="filled"
            fullWidth
            InputProps={{ disableUnderline: true }}
            multiline
            rows={4}
            value={memo}
            setValue={setMemo}
            consent={consent}
            setConsent={setConsent}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.fullWidthButton }}
          disabled={
            loading ||
            !Number(amount) ||
            insufficientFund ||
            !isAddressValid(get(destinationChain, 'addressPrefix', ''), address) ||
            !consent
          }
          type="submit"
        >
          {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
        </Button>
      </DialogActions>
    </form>
  );
};

export default SelectDetails;
