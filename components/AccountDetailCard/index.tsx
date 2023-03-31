import { Box, Button, Card, Divider, Grid, useTheme, Tabs, Tab } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import get from 'lodash/get';
import StarIcon from '../../assets/images/icons/icon_star.svg';
import EditIcon from '../../assets/images/icons/icon_edit_tool.svg';
import MoreIcon from '../../assets/images/icons/icon_more.svg';
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg';
import AccountAvatar from '../AccountAvatar';
import { useGeneralContext } from '../../contexts/GeneralContext';
import BalanceChart, { dateRanges } from '../BalanceChart';
import useStyles from './styles';
import useIconProps from '../../misc/useIconProps';
import { useWalletsContext } from '../../contexts/WalletsContext';
import StatBox from './StatBox';
import DelegationDialog from '../DelegationDialog';
import WithdrawRewardsDialog from '../WithdrawRewardsDialog';
import {
  formatCurrency,
  formatTokenAmount,
  getTokenAmountBalance,
  getTotalBalance,
  getTotalTokenAmount,
} from '../../misc/utils';
import useAccountsBalancesWithinPeriod from '../../graphql/hooks/useAccountsBalancesWithinPeriod';
import SendDialog from '../SendDialog';
import useIsMobile from '../../misc/useIsMobile';
import EditAccountDialog from '../EditAccountDialog';
import cryptocurrencies from '../../misc/cryptocurrencies';

interface AccountDetailCardProps {
  profileExist: boolean;
  onCreateProfile(): void;
  wallet: Wallet;
  account: Account;
  validators: Validator[];
  accountBalance: AccountBalance;
  availableTokens: any;
}

const AccountDetailCard: React.FC<AccountDetailCardProps> = ({
  profileExist,
  onCreateProfile,
  wallet,
  account,
  accountBalance,
  availableTokens,
  validators,
}) => {
  const { lang, t } = useTranslation('common');
  const { currency, currencyRate, hideAmount } = useGeneralContext();
  const classes = useStyles();
  const iconProps = useIconProps();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { updateAccount } = useWalletsContext();
  const [delegateDialogOpen, setDelegateDialogOpen] = React.useState(false);
  const [withdrawRewardsDialogOpen, setWithdrawRewardsDialogOpen] = React.useState(false);
  const [sendDialogOpen, setSendDialogOpen] = React.useState(false);
  const [editAccountDialogOpen, setEditAccountDialogOpen] = React.useState(false);
  const [timestamps, setTimestamps] = React.useState<Date[]>(
    dateRanges.find(d => d.isDefault).timestamps.map(timestamp => new Date(timestamp)),
  );
  const [currentTab, setCurrentTab] = React.useState(0);
  // Balance Data
  const { totalTokenAmount, usdBalance } = React.useMemo(() => {
    return {
      totalTokenAmount: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
    };
  }, [accountBalance]);
  // Chart Data
  const tabs = [t('overview'), ...Object.keys(totalTokenAmount)];
  const selectedTabToken = currentTab === 0 ? undefined : tabs[currentTab];
  const selectedTabTokenAmount = totalTokenAmount[selectedTabToken];
  const { data: accountsWithBalance, loading } = useAccountsBalancesWithinPeriod(
    [account],
    timestamps,
  );
  const chartData = accountsWithBalance.length
    ? accountsWithBalance[0].balances.map(b => {
        return {
          ...getTotalBalance(b, selectedTabToken),
          amount: selectedTabToken
            ? get(getTotalTokenAmount(b), ['amount', selectedTabToken, 'amount'], 0)
            : undefined,
        };
      })
    : [];

  const toggleFav = React.useCallback(() => {
    updateAccount(account.address, account.walletId, { fav: !account.fav });
  }, [account.address, account.fav, account.walletId, updateAccount]);

  const displayItems = Object.values(get(accountBalance, 'balance.commissions', {})).find(
    (c: any) => c.amount,
  )
    ? ['available', 'delegated', 'unbonding', 'rewards', 'commissions']
    : ['available', 'delegated', 'unbonding', 'rewards'];
  return (
    <>
      <Card className={classes.accountCard}>
        <Box
          p={isMobile ? 2 : 4}
          display={isMobile ? 'block' : 'flex'}
          justifyContent="space-between"
          alignItems="flex-start">
          <AccountAvatar ledgerIconDisabled size={isMobile ? 'base' : 'large'} account={account} />
          <Box display="flex" mt={isMobile ? 2 : 0} ml={isMobile ? -2 : 0}>
            {!profileExist && cryptocurrencies[account.crypto].supportsDesmosProfile ? (
              <Button
                classes={{ root: classes.profileButton }}
                variant="outlined"
                onClick={onCreateProfile}>
                {t('create profile')}
              </Button>
            ) : null}
            <Button
              classes={{ root: classes.delegateButton }}
              variant="contained"
              color="primary"
              onClick={() => setDelegateDialogOpen(true)}>
              {t('delegate')}
            </Button>
            <Button
              classes={{ root: classes.sendButton }}
              variant="contained"
              onClick={() => setSendDialogOpen(true)}>
              {t('send')}
            </Button>
            <Button
              classes={{ root: classes.withdrawButton }}
              variant="contained"
              color="secondary"
              onClick={() => setWithdrawRewardsDialogOpen(true)}>
              {t('withdraw')}
            </Button>
            <Box
              display="flex"
              position={isMobile ? 'absolute' : 'static'}
              top={theme.spacing(2)}
              right={theme.spacing(2)}>
              {isMobile ? null : (
                <Button
                  classes={{ root: classes.iconButton }}
                  variant={isMobile ? 'text' : 'outlined'}
                  onClick={toggleFav}>
                  {account.fav ? (
                    <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
                  ) : (
                    <StarIcon {...iconProps} />
                  )}
                </Button>
              )}
              <Button
                classes={{ root: classes.iconButton }}
                variant={isMobile ? 'text' : 'outlined'}
                onClick={() => setEditAccountDialogOpen(true)}>
                {isMobile ? <MoreIcon {...iconProps} /> : <EditIcon {...iconProps} />}
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
      {isMobile ? (
        <Box mt={2} />
      ) : (
        <Card className={classes.container}>
          <Divider />
          <Box pt={0} p={4} position="relative">
            <Box mb={5} mt={3}>
              <Tabs
                value={currentTab}
                classes={{ indicator: classes.tabIndicator, root: classes.tab }}
                onChange={(e, v) => setCurrentTab(v)}>
                {tabs.map(key => (
                  <Tab key={key} label={key} />
                ))}
              </Tabs>
            </Box>

            <BalanceChart
              crypto={account.crypto}
              data={chartData}
              onDateRangeChange={dateRange => {
                setTimestamps(dateRange.timestamps.map(ts => new Date(ts)));
              }}
              title={
                currentTab === 0
                  ? formatCurrency(usdBalance * currencyRate, { currency, lang, hideAmount })
                  : formatTokenAmount(
                      { [selectedTabToken]: selectedTabTokenAmount },
                      { defaultUnit: account.crypto, lang, hideAmount },
                    )
              }
              subtitle={
                currentTab === 0
                  ? ''
                  : formatCurrency(
                      selectedTabTokenAmount.amount * selectedTabTokenAmount.price * currencyRate,
                      { currency, lang, hideAmount },
                    )
              }
              loading={loading}
            />
            {/* Only show Stat Boxes for native token */}
            {account.crypto === selectedTabToken ? (
              <Box mt={isMobile ? 6 : 10}>
                <Grid container spacing={4}>
                  {displayItems.map(key => (
                    <StatBox
                      key={key}
                      title={t(key)}
                      value={formatTokenAmount(get(accountBalance, `balance.${key}`, {}), {
                        defaultUnit: account.crypto,
                        lang,
                        hideAmount,
                      })}
                      subtitle={formatCurrency(
                        getTokenAmountBalance(get(accountBalance, `balance.${key}`, {})) *
                          currencyRate,
                        { currency, lang, hideAmount },
                      )}
                    />
                  ))}
                </Grid>
              </Box>
            ) : null}
          </Box>
        </Card>
      )}
      <DelegationDialog
        open={delegateDialogOpen}
        onClose={() => setDelegateDialogOpen(false)}
        account={account}
        availableTokens={availableTokens}
        validators={validators}
      />
      <WithdrawRewardsDialog
        wallet={wallet}
        open={withdrawRewardsDialogOpen}
        onClose={() => setWithdrawRewardsDialogOpen(false)}
        account={account}
        tokensPrices={availableTokens.tokens_prices}
        validators={validators}
        commissions={get(accountBalance, 'balance.commissions', {})}
        openDelegationDialog={() => setDelegateDialogOpen(true)}
      />
      <SendDialog
        open={sendDialogOpen}
        onClose={() => setSendDialogOpen(false)}
        account={account}
        availableTokens={availableTokens}
      />
      <EditAccountDialog
        open={editAccountDialogOpen}
        onClose={() => setEditAccountDialogOpen(false)}
        account={account}
      />
    </>
  );
};

export default AccountDetailCard;
