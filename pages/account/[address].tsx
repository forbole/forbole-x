import {
  Box,
  Breadcrumbs,
  Button,
  Link as MLink,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@material-ui/core'
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
  transformProfile,
  transformRedelegations,
  transformTransactions,
  transformUnbonding,
  transformValidatorsWithTokenAmount,
  transformVestingAccount,
} from '../../misc/utils'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'
import { getRedelegations } from '../../graphql/queries/redelegations'
import { getTransactions } from '../../graphql/queries/transactions'
import AccountBalanceCard from '../../components/AccountBalanceCard'
import IBCTransferDialog from '../../components/IBCTransferDialog'
import ProfileCard from '../../components/ProfileCard'
import { getProfile } from '../../graphql/queries/profile'
import ProfileDialog from '../../components/ProfileDialog'
import { getVestingAccount } from '../../graphql/queries/vestingAccount'
import VestingDialog from '../../components/VestingDialog'
import useIconProps from '../../misc/useIconProps'
import DropDownIcon from '../../assets/images/icons/icon_arrow down_title.svg'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { accounts, wallets } = useWalletsContext()
  const iconProps = useIconProps()
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
  const { data: profileData } = useSubscription(
    gql`
      ${getProfile(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' } }
  )
  const { data: vestingAccountData } = useSubscription(
    gql`
      ${getVestingAccount(crypto.name)}
    `,
    { variables: { address: account ? account.address : '' } }
  )

  const profile = React.useMemo(() => transformProfile(profileData), [profileData])
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
  const [isVestingDialogOpen, setIsVestingDialogOpen] = React.useState(false)

  const [accountsMenuAnchor, setAccountsMenuAnchor] = React.useState<Element>()

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
          <>
            <Breadcrumbs>
              <Box
                maxWidth={theme.spacing(20)}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                <Link href="/wallets" passHref>
                  <MLink variant="h4" color="textPrimary">
                    {wallet.name}
                  </MLink>
                </Link>
              </Box>
              <MLink color="textPrimary" onClick={(e) => setAccountsMenuAnchor(e.currentTarget)}>
                <Box display="flex" alignItems="center">
                  <AccountAvatar
                    account={account}
                    hideAddress
                    titleProps={{ variant: 'h4', color: 'textPrimary' }}
                    avatarSize={3}
                  />
                  <Box ml={1}>
                    <DropDownIcon {...iconProps} />
                  </Box>
                </Box>
              </MLink>
            </Breadcrumbs>
            <Menu
              anchorEl={accountsMenuAnchor}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              keepMounted
              open={!!accountsMenuAnchor}
              onClose={() => setAccountsMenuAnchor(undefined)}
            >
              {accounts
                .filter((a) => a.walletId === account.walletId)
                .map((a) => (
                  <Link href={`/account/${a.address}`} passHref>
                    <MenuItem
                      key={a.address}
                      button
                      onClick={() => setAccountsMenuAnchor(undefined)}
                    >
                      <AccountAvatar account={a} hideAddress size="small" />
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </>
        ) : null
      }
    >
      {profile.dtag ? (
        <ProfileCard profile={profile} onEditProfile={() => setIsProfileDialogOpen(true)} />
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
        <IBCTransferDialog
          account={account}
          availableTokens={availableTokens}
          open={isIBCDialogOpen}
          onClose={() => setIsIBCDialogOpen(false)}
        />
      ) : null}
      <ProfileDialog
        account={account}
        profile={profile}
        open={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
      />
      <VestingDialog
        open={isVestingDialogOpen}
        onClose={() => setIsVestingDialogOpen(false)}
        account={account}
        totalAmount={vestingAccount.total}
        vestingPeriods={vestingAccount.vestingPeriods}
      />
    </Layout>
  )
}

export default Account
