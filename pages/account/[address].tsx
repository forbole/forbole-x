import { Breadcrumbs, Link as MLink } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import { gql, useQuery } from '@apollo/client'
import AccountAvatar from '../../components/AccountAvatar'
import AccountDetailCard from '../../components/AccountDetailCard'
import Layout from '../../components/Layout'
import DelegationsTable from '../../components/DelegationsTable'
import ActivitiesTable from '../../components/ActivitiesTable'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import {
  transformChainConnections,
  transformGqlAcountBalance,
  transformProfile,
  transformRedelegations,
  transformTransactions,
  transformUnbonding,
  transformValidatorsWithTokenAmount,
  transformVestingAccount,
} from '../../misc/utils'
import { getRedelegations } from '../../graphql/queries/redelegations'
import { getTransactions } from '../../graphql/queries/transactions'
import AccountBalanceCard from '../../components/AccountBalanceCard'
import IBCTransferDialog from '../../components/IBCTransferDialog'
import ProfileCard from '../../components/ProfileCard'
import { getProfile } from '../../graphql/queries/profile'
import ProfileDialog from '../../components/ProfileDialog'
import { getVestingAccount } from '../../graphql/queries/vestingAccount'
import VestingDialog from '../../components/VestingDialog'
import SelectAccountButton from '../../components/SelectAccountButton'
import { getChainConnections } from '../../graphql/queries/chainConnections'
import ConnectChainDialog from '../../components/ConnectChainDialog'
import useLatestAccountBalance from '../../graphql/hooks/useLatestAccountBalance'
import useValidators from '../../graphql/hooks/useValidators'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts, wallets } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const wallet = wallets.filter((x) => x.id === account?.walletId)[0]
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]

  const validatorsData = useValidators(crypto.name)
  const { data: balanceData } = useLatestAccountBalance(crypto.name, account ? account.address : '')
  const { data: redelegationsData } = useQuery(
    gql`
      ${getRedelegations(crypto.name)}
    `,
    {
      variables: {
        address: account ? account.address : '',
      },
      pollInterval: 15000,
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
  const { data: profileData } = useQuery(
    gql`
      ${getProfile(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' }, pollInterval: 15000 }
  )
  const { data: chainConnectionsData } = useQuery(
    gql`
      ${getChainConnections(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' }, pollInterval: 15000 }
  )
  const { data: vestingAccountData } = useQuery(
    gql`
      ${getVestingAccount(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' } }
  )

  const profile = React.useMemo(() => transformProfile(profileData), [profileData])
  const chainConnections = React.useMemo(
    () => transformChainConnections(chainConnectionsData),
    [chainConnectionsData]
  )
  const validators = React.useMemo(
    () => transformValidatorsWithTokenAmount(validatorsData, balanceData),
    [validatorsData, balanceData]
  )
  const unbondings = React.useMemo(
    () => transformUnbonding(validatorsData, balanceData),
    [validatorsData, balanceData]
  )
  const redelegations = React.useMemo(
    () => transformRedelegations(redelegationsData, balanceData),
    [redelegationsData, balanceData]
  )
  const validatorsMap = React.useMemo(() => keyBy(validators, 'address'), [validators])

  const accountBalance = React.useMemo(
    () => transformGqlAcountBalance(balanceData, Date.now()),
    [balanceData]
  )
  const availableTokens = React.useMemo(
    () =>
      get(balanceData, 'account[0].available[0]', {
        coins: [],
        tokens_prices: [],
      }),
    [balanceData]
  )

  const delegatedTokens = React.useMemo(() => {
    const result = {}
    get(balanceData, 'account[0].delegated', []).forEach((d) => {
      result[get(d, 'validator.validator_info.operator_address', '')] = [d.amount]
    })
    return result
  }, [balanceData])

  const activities = React.useMemo(
    () => transformTransactions(transactionsData, validatorsMap, availableTokens.tokens_prices),
    [transactionsData, validatorsMap, availableTokens]
  )

  const vestingAccount = React.useMemo(
    () => transformVestingAccount(vestingAccountData, availableTokens.tokens_prices),
    [vestingAccountData, availableTokens]
  )

  const [isIBCDialogOpen, setIsIBCDialogOpen] = React.useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = React.useState(false)
  const [isConnectChainDialogOpen, setIsConnectChainDialogOpen] = React.useState(false)
  const [isVestingDialogOpen, setIsVestingDialogOpen] = React.useState(false)

  return (
    <Layout
      passwordRequired
      back
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
      ChromeExtTitleComponent={
        account ? (
          <SelectAccountButton
            activeAccount={account}
            onAccountChange={(a) => router.replace(`/account/${a.address}`)}
          />
        ) : null
      }
    >
      {profile.dtag ? (
        <ProfileCard
          profile={profile}
          chainConnections={chainConnections}
          onEditProfile={() => setIsProfileDialogOpen(true)}
          onChainConnectionClick={() => setIsConnectChainDialogOpen(true)}
        />
      ) : null}
      {account ? (
        <AccountDetailCard
          profileExist={!!profile.dtag}
          onCreateProfile={() => setIsProfileDialogOpen(true)}
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
      {account ? (
        <AccountBalanceCard
          accountBalance={accountBalance}
          account={account}
          onVestingClick={() => setIsVestingDialogOpen(true)}
          hideVestingButton={!vestingAccount.vestingPeriods.length}
        />
      ) : null}
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
        <>
          <IBCTransferDialog
            account={account}
            availableTokens={availableTokens}
            open={isIBCDialogOpen}
            onClose={() => setIsIBCDialogOpen(false)}
          />
          <ProfileDialog
            account={account}
            profile={profile}
            open={isProfileDialogOpen}
            onClose={() => setIsProfileDialogOpen(false)}
          />
          <ConnectChainDialog
            account={account}
            connections={chainConnections}
            open={isConnectChainDialogOpen}
            onClose={() => setIsConnectChainDialogOpen(false)}
          />
          <VestingDialog
            open={isVestingDialogOpen}
            onClose={() => setIsVestingDialogOpen(false)}
            account={account}
            totalAmount={vestingAccount.total}
            vestingPeriods={vestingAccount.vestingPeriods}
          />
        </>
      ) : null}
    </Layout>
  )
}

export default Account
