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
  CircularProgress,
  useTheme,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import keyBy from 'lodash/keyBy';
import shuffle from 'lodash/shuffle';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import useStyles from './styles';
import useIconProps from '../../misc/useIconProps';
import { formatCrypto, formatCurrency } from '../../misc/utils';
import { useGeneralContext } from '../../contexts/GeneralContext';
import ValidatorAvatar from '../ValidatorAvatar';
import MemoInput from '../MemoInput';

interface SelectValidatorsProps {
  onConfirm(toValidator: Validator, memo: string): void;
  validators: Validator[];
  amount: number;
  denom: string;
  crypto: Cryptocurrency;
  loading: boolean;
  availableAmount: TokenAmount;
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({
  validators,
  amount,
  denom,
  onConfirm,
  crypto,
  loading,
  availableAmount,
}) => {
  const { amount: totalAmount, price } = Object.values(availableAmount)[0];
  const { t, lang } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const { currency, currencyRate, hideAmount } = useGeneralContext();
  const theme = useTheme();
  const [toValidator, setToValidator] = React.useState<Validator>();
  const [memo, setMemo] = React.useState('');
  const [consent, setConsent] = React.useState(true);

  const validatorsMap = keyBy(validators, 'address');
  const randomizedValidators = React.useMemo(() => shuffle(validators), []);

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onConfirm(toValidator, memo);
      }}>
      <DialogContent className={classes.dialogContent}>
        <Box ml={4} minHeight={360} maxHeight={600}>
          <Typography className={classes.marginBottom}>
            {t('total delegation amount')}{' '}
            <b className={classes.marginLeft}>
              {formatCrypto(amount, { unit: denom, lang, hideAmount })}
            </b>
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('redelegate to')}</Typography>
              <Box display="flex" alignItems="center">
                <Autocomplete
                  options={randomizedValidators.map(({ address }) => address)}
                  getOptionLabel={option => validatorsMap[option].name}
                  openOnFocus
                  fullWidth
                  filterOptions={(options: string[], { inputValue }: any) =>
                    options.filter(o =>
                      (validatorsMap[o].name || '')
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()),
                    )
                  }
                  onChange={(e, address) => setToValidator(validatorsMap[address])}
                  renderOption={address => (
                    <ValidatorAvatar
                      crypto={crypto}
                      validator={validatorsMap[address]}
                      size="small"
                      withoutLink
                    />
                  )}
                  renderInput={({ InputProps, ...params }) => (
                    <TextField
                      {...params}
                      variant="filled"
                      placeholder={t('select validator')}
                      InputProps={{
                        ...InputProps,
                        className: '',
                        disableUnderline: true,
                        startAdornment: toValidator ? (
                          <Box mr={-1}>
                            <Avatar
                              className={classes.validatorAvatar}
                              alt={toValidator.name}
                              src={toValidator.image}
                            />
                          </Box>
                        ) : null,
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
              <Box mt={2}>
                <Typography gutterBottom>{t('memo')}</Typography>
                <MemoInput
                  fullWidth
                  multiline
                  rows={3}
                  variant="filled"
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
                  contentEditable={false}
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
          mx={2}>
          <Box>
            <Typography variant="h5">{formatCrypto(amount, { unit: denom, lang })}</Typography>
            <Typography>
              {formatCurrency(Number(amount) * price * currencyRate, {
                currency,
                lang,
              })}
            </Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={loading || !toValidator || !consent}
            type="submit">
            {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  );
};

export default SelectValidators;
