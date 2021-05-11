import { Breadcrumbs, Link as MLink, Box } from '@material-ui/core'
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
import Proposal from '../../components/Proposal'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const { no } = router.query
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
      activeItem="/proposals"
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
      <Proposal
        proposal={{
          no: '01',
          proposer: {
            name: 'forbole',
            image:
              'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
            address: 'address',
          },
          title: 'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
          content:
            'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
          detail:
            'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about the impact that validators charging 0% commission has on the Cosmos Hub, particularly with respect to the decentralization of the Cosmos Hub and the sustainability for validator operations.\n\nDiscussion around this topic has taken place in many places including numerous threads on the Cosmos Forum, public Telegram channels, and in-person meetups. Because this has been one of the primary discussion points in off-chain Cosmos governance discussions, we believe it is important to get a signal on the matter from the on-chain governance process of the Cosmos Hub.\n\nThere have been past discussions on the Cosmos Forum about placing an in-protocol restriction on validators from charging 0% commission.',
          votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
          duration: '(in 14 days)',
          isActive: true,
          tag: 'deposit',
          type: 'text proposal',
          depositDetails: [
            {
              depositor: {
                name: 'forbole',
                image:
                  'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
                address: 'address',
              },
              amount: 100000,
              time: '10 Jan 2020, 13:00:23',
            },
            {
              depositor: {
                name: 'forbole',
                image:
                  'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
                address: 'address',
              },
              amount: 100000,
              time: '10 Jan 2020, 13:00:23',
            },
          ],
        }}
      />
    </Layout>
  )
}

export default Account
