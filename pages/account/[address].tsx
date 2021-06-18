import { Breadcrumbs, Link as MLink } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import { gql, useSubscription } from '@apollo/client'
import AccountAvatar from '../../components/AccountAvatar'
import AccountDetailCard from '../../components/AccountDetailCard'
import Layout from '../../components/Layout'
import DelegationsTable from '../../components/DelegationsTable'
import ActivitiesTable from '../../components/ActivitiesTable'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getValidators } from '../../graphql/queries/validators'
import {
  transformGqlAcountBalance,
  transformRedelegations,
  transformTransactions,
  transformUnbonding,
  transformValidatorsWithTokenAmount,
} from '../../misc/utils'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'
import { getRedelegations } from '../../graphql/queries/redelegations'
import { getTransactions } from '../../graphql/queries/transactions'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const { data: validatorsData } = useSubscription(
    gql`
      ${getValidators(crypto.name)}
    `
  )
  const { data: balanceData } = useSubscription(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' } }
  )
  const { data: redelegationsData } = useSubscription(
    gql`
      ${getRedelegations(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' } }
  )
  const { data: transactionsData } = useSubscription(
    gql`
      ${getTransactions(crypto.name)}
    `,
    { variables: { address: account ? `{${account.address}}` : '' } }
  )

  const validators = transformValidatorsWithTokenAmount(validatorsData, balanceData)
  const unbondings = transformUnbonding(validatorsData, balanceData)
  const redelegations = transformRedelegations(redelegationsData, balanceData)
  const validatorsMap = keyBy(validators, 'address')

  const accountBalance = transformGqlAcountBalance(balanceData, Date.now())
  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  const delegatedTokens = {}
  get(balanceData, 'account[0].delegated.nodes', []).forEach((d) => {
    delegatedTokens[get(d, 'validator.validator_info.operator_address', '')] = [d.amount]
  })

  const activities = transformTransactions(
    transactionsData,
    validatorsMap,
    availableTokens.tokens_prices
  )

  return (
    <Layout
      passwordRequired
      activeItem="/wallets"
      HeaderLeftComponent={
        account ? (
          <Breadcrumbs>
            <Link href="/wallets" passHref>
              <MLink color="textPrimary">{t('wallet manage')}</MLink>
            </Link>
            <AccountAvatar account={account} hideAddress size="small" />
          </Breadcrumbs>
        ) : null
      }
    >
      {account ? (
        <AccountDetailCard
          account={account}
          validators={validators}
          accountBalance={accountBalance}
          availableTokens={availableTokens}
        />
      ) : null}
      <DelegationsTable
        account={account}
        validators={validators}
        unbondings={unbondings}
        redelegations={redelegations}
        delegatedTokens={delegatedTokens}
        crypto={crypto}
        availableTokens={availableTokens}
      />
      <ActivitiesTable account={account} activities={activities} crypto={crypto} />
    </Layout>
  )
}

export default Account
