import {
  Box,
  CircularProgress,
  FormControlLabel,
  Radio,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  transformGqlAcountBalance,
  getTotalBalance,
  getTotalTokenAmount,
  formatTokenAmount,
} from '../../misc/utils';
import useStyles from './styles';
import useLatestAccountBalance from '../../graphql/hooks/useLatestAccountBalance';
import { useGeneralContext } from '../../contexts/GeneralContext';

interface AccountRowProps {
  account: Account;
}

const AccountRow: React.FC<AccountRowProps> = ({ account }) => {
  const { t, lang } = useTranslation('common');
  const classes = useStyles();
  const theme = useTheme();
  const { hideAmount } = useGeneralContext();
  const { data: balanceData, loading } = useLatestAccountBalance(account.crypto, account.address);
  const { tokenAmounts, usdBalance } = React.useMemo(() => {
    const accountBalance = transformGqlAcountBalance(balanceData, Date.now());
    return {
      tokenAmounts: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
    };
  }, [balanceData]);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      className={classes.accountRow}>
      <FormControlLabel
        value={account.address}
        control={<Radio color="primary" />}
        label={account.address}
      />
      <Box flex={1} display="flex" justifyContent="end">
        {loading ? (
          <CircularProgress size={theme.spacing(2)} />
        ) : (
          <Typography align="right">
            {formatTokenAmount(tokenAmounts, { defaultUnit: account.crypto, lang, hideAmount })}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AccountRow;
