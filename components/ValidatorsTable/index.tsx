import React from 'react';
import { Box, Card, Tabs, Tab } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useGetStyles } from './styles';
import Table from './Table';
import { useGeneralContext } from '../../contexts/GeneralContext';

interface ValidatorsTableProps {
  validators: Validator[];
  crypto: Cryptocurrency;
  account: Account;
  availableTokens: AvailableTokens;
}

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({
  validators,
  crypto,
  account,
  availableTokens,
}) => {
  const { favValidators } = useGeneralContext();
  const { classes } = useGetStyles();
  const { t } = useTranslation('common');
  const [currentTab, setCurrentTab] = React.useState(0);

  const tabs = React.useMemo(
    () => [
      {
        label: 'active validators',
        validators: validators.filter(v => v.isActive),
      },
      {
        label: 'inactive validators',
        validators: validators.filter(v => !v.isActive),
      },
      {
        label: 'favourite',
        validators: validators.filter(v => favValidators.includes(v.address)),
      },
    ],
    [validators, favValidators],
  );

  return (
    <Card>
      <Box p={4} pt={2}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          onChange={(e, v) => setCurrentTab(v)}>
          {tabs.map(tab => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.validators.length})`} />
          ))}
        </Tabs>
        <Table
          validators={tabs[currentTab].validators || []}
          availableTokens={availableTokens}
          crypto={crypto}
          account={account}
          initialActiveSort="order"
          initialSortDirection="asc"
          currentTab={currentTab}
        />
      </Box>
    </Card>
  );
};

export default ValidatorsTable;
