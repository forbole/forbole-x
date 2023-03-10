import { useRouter } from 'next/router';
import React from 'react';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import { gql, useQuery } from '@apollo/client';
import { Box, Breadcrumbs, Link as MLink, Typography } from '@material-ui/core';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import AddressDetailCard from '../../components/AddressDetailCard';
import Layout from '../../components/Layout';
import DelegationsTable from '../../components/DelegationsTable';
import ActivitiesTable from '../../components/ActivitiesTable';
import cryptocurrencies from '../../misc/cryptocurrencies';
import {
  transformGqlAcountBalance,
  transformRedelegations,
  transformTransactions,
  transformUnbonding,
  transformValidatorsWithTokenAmount,
} from '../../misc/utils';
import { getRedelegations } from '../../graphql/queries/redelegations';
import { getTransactions } from '../../graphql/queries/transactions';
import { useGeneralContext } from '../../contexts/GeneralContext';
import AccountAvatar from '../../components/AccountAvatar';
import useLatestAccountBalance from '../../graphql/hooks/useLatestAccountBalance';
import useValidators from '../../graphql/hooks/useValidators';

const Account: React.FC = () => {
  const { favAddresses } = useGeneralContext();
  const router = useRouter();
  const { t } = useTranslation('common');
  const { address } = router.query;
  const addressDetail = favAddresses.find(x => x.address === address);
  const crypto = addressDetail
    ? cryptocurrencies[addressDetail.crypto]
    : Object.values(cryptocurrencies)[0];
  const validatorsData = useValidators(crypto.name);
  const { data: balanceData } = useLatestAccountBalance(crypto.name, (address || '') as string);
  const { data: redelegationsData } = useQuery(
    gql`
      ${getRedelegations(crypto.name)}
    `,
    {
      variables: {
        address: address || '',
      },
      pollInterval: 15000,
    },
  );

  const { data: transactionsData } = useQuery(
    gql`
      ${getTransactions(crypto.name)}
    `,
    {
      variables: {
        address: `{${address}}` || '',
      },
    },
  );

  const validators = transformValidatorsWithTokenAmount(validatorsData, balanceData);
  const unbondings = transformUnbonding(validatorsData, balanceData);
  const redelegations = transformRedelegations(redelegationsData, balanceData);
  const validatorsMap = keyBy(validators, 'address');

  const accountBalance = transformGqlAcountBalance(balanceData, Date.now());
  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  });

  const delegatedTokens = {};
  get(balanceData, 'account[0].delegated', []).forEach(d => {
    delegatedTokens[get(d, 'validator.validator_info.operator_address', '')] = [d.amount];
  });

  const activities = transformTransactions(
    transactionsData,
    validatorsMap,
    availableTokens.tokens_prices,
  );

  return (
    <Layout
      HeaderLeftComponent={
        addressDetail ? (
          <Breadcrumbs>
            <Link href="/address-book" passHref>
              <MLink color="textPrimary">{t('address book')}</MLink>
            </Link>
            <AccountAvatar address={addressDetail} hideAddress size="small" />
          </Breadcrumbs>
        ) : null
      }
      passwordRequired
      activeItem="/address-book"
      ChromeExtTitleComponent={
        <Box mt={1}>
          <Typography variant="h4">{t('address book')}</Typography>
        </Box>
      }
      back>
      {addressDetail ? (
        <AddressDetailCard address={addressDetail} accountBalance={accountBalance} />
      ) : null}
      <DelegationsTable
        isAddressDetail
        validators={validators}
        unbondings={unbondings}
        redelegations={redelegations}
        delegatedTokens={delegatedTokens}
        crypto={crypto}
        availableTokens={availableTokens}
        commissions={get(accountBalance, 'balance.commissions', {})}
      />
      <ActivitiesTable address={addressDetail} activities={activities} crypto={crypto} />
    </Layout>
  );
};

export default Account;
