/* eslint-disable no-await-in-loop */
import { Box, Card, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import get from 'lodash/get';
import useStyles from './styles';
import SectoredByButton from './SectoredByButton';
import { SectoredBy, sectoredByTypes } from './types';
import Chart from './Chart';
import EmptyState from './EmptyState';
import {
  fetchAccountBalance,
  fetchBalancesByValidators,
} from '../../graphql/fetch/accountBalances';
import { getTokenAmountBalance, sumTokenAmounts } from '../../misc/utils';
import { useWalletsContext } from '../../contexts/WalletsContext';
import cryptocurrencies from '../../misc/cryptocurrencies';
import AssetPopover from './AssetPopover';
import ValidatorPopover from './ValidatorPopover';

const AssetDistributionChart: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const { accounts } = useWalletsContext();
  const [sectoredBy, setSectoredBy] = React.useState<SectoredBy>(sectoredByTypes[0]);
  const [data, setData] = React.useState([]);
  const [popoverIndex, setPopoverIndex] = React.useState<number | undefined>();
  const [anchorPosition, setAnchorPosition] = React.useState(null);

  const fetchData = React.useCallback(async () => {
    try {
      if (sectoredBy === 'by assets') {
        const accountBalances: any = { total: {}, accountBalance: {} };
        for (let i = 0; i < accounts.length; i += 1) {
          const { accountBalance, total } = await fetchAccountBalance(
            accounts[i].address,
            accounts[i].crypto,
          );
          accountBalances.total = sumTokenAmounts([accountBalances.total || {}, total]);
          Object.keys(accountBalance).forEach(key => {
            accountBalances.accountBalance[key] = sumTokenAmounts([
              accountBalances.accountBalance[key] || {},
              accountBalance[key],
            ]);
          });
        }
        const rawData = [];
        Object.keys(accountBalances.total).forEach(denom => {
          rawData.push({
            name: denom.toUpperCase(),
            value: accountBalances.total[denom].amount * accountBalances.total[denom].price,
          });
        });
        const total = rawData.map(d => d.value).reduce((a, b) => a + b, 0);
        setData(
          rawData.map(d => ({
            name: d.name,
            image: cryptocurrencies[d.name].image,
            value: d.value === total ? 1 : Math.round(d.value / total),
            extraData: { ...accountBalances.accountBalance, total: accountBalances.total },
          })),
        );
      } else if (sectoredBy === 'by validators') {
        const balancesByValidator = {};
        for (let i = 0; i < accounts.length; i += 1) {
          const result = await fetchBalancesByValidators(accounts[i].address, accounts[i].crypto);
          Object.keys(result).forEach(key => {
            balancesByValidator[key] = {
              ...result[key],
              amount: sumTokenAmounts([
                get(balancesByValidator, `['${key}'].amount`, {}),
                get(result, `['${key}'].amount`, {}),
              ]),
            };
          });
        }
        const rawData = [];
        Object.keys(balancesByValidator).forEach(moniker => {
          rawData.push({
            name: moniker,
            // TODO: uncomment the line below when DSM has value > 0
            // value: getTokenAmountBalance(balancesByValidator[moniker].amount),
            value: Object.values(balancesByValidator[moniker].amount)
              .map((a: any) => a.amount)
              .reduce((a, b) => a + b, 0),
          });
        });
        const total = rawData.map(d => d.value).reduce((a, b) => a + b, 0);
        setData(
          rawData
            .filter(d => d.value > 0)
            .map(d => ({
              name: d.name,
              image: balancesByValidator[d.name].avatar,
              value:
                // eslint-disable-next-line no-nested-ternary
                total === 0 ? 1 / rawData.length : d.value === total ? 1 : d.value / total,
              extraData: balancesByValidator[d.name],
            })),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [sectoredBy, accounts]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card className={classes.container}>
      <Box display="flex" flexDirection="column" alignItems="center" my={2}>
        <Typography variant="h1">{t('asset distribution')}</Typography>
        <SectoredByButton sectoredBy={sectoredBy} onChange={setSectoredBy} />
      </Box>
      {data.length > 0 ? (
        <Chart
          data={data}
          setAnchorPosition={setAnchorPosition}
          setPopoverIndex={setPopoverIndex}
        />
      ) : (
        <EmptyState />
      )}
      {sectoredBy === 'by assets' ? (
        <AssetPopover
          anchorPosition={anchorPosition}
          onClose={() => setAnchorPosition(null)}
          // @ts-ignore
          accountBalance={get(data, `[${popoverIndex}].extraData`, {})}
          cryptocurrency={
            cryptocurrencies[get(data, `[${popoverIndex}].name`, '')] ||
            Object.values(cryptocurrencies)[0]
          }
          percentage={get(data, `[${popoverIndex}].value`, 0)}
        />
      ) : (
        <ValidatorPopover
          anchorPosition={anchorPosition}
          onClose={() => setAnchorPosition(null)}
          balance={get(data, `[${popoverIndex}].extraData.amount`, {})}
          validator={{
            moniker: get(data, `[${popoverIndex}].extraData.moniker`, ''),
            avatar: get(data, `[${popoverIndex}].extraData.avatar`, ''),
          }}
          percentage={get(data, `[${popoverIndex}].value`, 0)}
        />
      )}
    </Card>
  );
};

export default AssetDistributionChart;
