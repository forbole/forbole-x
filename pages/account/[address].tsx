import { Breadcrumbs, Link as MLink, Card, Box, Typography, Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import { gql, useQuery, useSubscription } from '@apollo/client'
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
import AccountBalanceCard from '../../components/AccountBalanceCard'
import IBCTransferDialog from '../../components/IBCTransferDialog'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts, wallets } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const wallet = wallets.filter((x) => x.id === account?.walletId)[0]
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
    {
      variables: {
        address: account ? account.address : '',
      },
    }
  )
  const { data: redelegationsData } = useSubscription(
    gql`
      ${getRedelegations(crypto.name)}
    `,
    {
      variables: {
        address: account ? account.address : '',
      },
    }
  )
  const { data: transactionsData } = useQuery(
    gql`
      ${getTransactions(crypto.name)}
    `,
    {
      variables: {
        address: account ? `{${account.address}}` : '',
      },
    }
  )
  console.log(transactionsData)

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
  get(balanceData, 'account[0].delegated', []).forEach((d) => {
    delegatedTokens[get(d, 'validator.validator_info.operator_address', '')] = [d.amount]
  })

  const activities = transformTransactions(
    transactionsData,
    validatorsMap,
    availableTokens.tokens_prices
  )

  const [isIBCDialogOpen, setIsIBCDialogOpen] = React.useState(false)

  return (
    <Layout
      passwordRequired
      activeItem="/wallets"
      HeaderLeftComponent={
        account ? (
          <Breadcrumbs>
            <Link href="/wallets" passHref>
              <MLink color="textPrimary">{t('wallet')}</MLink>
            </Link>
            <AccountAvatar account={account} hideAddress size="small" />
          </Breadcrumbs>
        ) : null
      }
    >
      {account ? (
        <AccountDetailCard
          wallet={wallet}
          account={account}
          validators={validators}
          accountBalance={accountBalance}
          availableTokens={availableTokens}
        />
      ) : null}
      {/* <Box mb={2}>
        <Card>
          <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4">{t('ibc transfer')}</Typography>
              <Typography color="textSecondary">{t('ibc transfer description')}</Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={() => setIsIBCDialogOpen(true)}>
              {t('ibc transfer')}
            </Button>
          </Box>
        </Card>
      </Box> */}
      {account ? <AccountBalanceCard accountBalance={accountBalance} account={account} /> : null}
      <DelegationsTable
        wallet={wallet}
        account={account}
        validators={validators}
        unbondings={unbondings}
        redelegations={redelegations}
        delegatedTokens={delegatedTokens}
        crypto={crypto}
        availableTokens={availableTokens}
      />
      <ActivitiesTable account={account} activities={activities} crypto={crypto} />
      {account ? (
        <IBCTransferDialog
          account={account}
          availableTokens={availableTokens}
          open={isIBCDialogOpen}
          onClose={() => setIsIBCDialogOpen(false)}
        />
      ) : null}
    </Layout>
  )
}

export default Account
