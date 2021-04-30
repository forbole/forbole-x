import { Breadcrumbs, Link as MLink } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import get from 'lodash/get'
import { gql, useSubscription } from '@apollo/client'
import AccountAvatar from '../../components/AccountAvatar'
import AccountDetailCard from '../../components/AccountDetailCard'
import Layout from '../../components/Layout'
import ValidatorsTable from '../../components/ValidatorsTable'
import ActivitiesTable from '../../components/ActivitiesTable'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getValidators } from '../../graphql/queries/validators'
import { transformGqlAcountBalance, transformValidatorsWithTokenAmount } from '../../misc/utils'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]

  const { data } = useSubscription(
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

  const validators = transformValidatorsWithTokenAmount(data, balanceData)
  const accountBalance = transformGqlAcountBalance(balanceData, Date.now())
  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  const delegatedTokens = {}
  get(balanceData, 'account[0].delegated.nodes', []).forEach((d) => {
    delegatedTokens[get(d, 'validator.validator_info.operator_address', '')] = [d.amount]
  })

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
      <ValidatorsTable
        account={account}
        validators={validators}
        delegatedTokens={delegatedTokens}
        crypto={crypto}
        tokensPrices={availableTokens.tokens_prices}
      />
      <ActivitiesTable
        account={{
          name: 'Chan',
          imageURL:
            'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        }}
        activities={[
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'staking',
            tag: 'delegate',
            detail: {
              name: 'Figmant',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
            },
            amount: 11887597,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'staking',
            tag: 'undelegate',
            detail: {
              name: 'Figmant',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
            },
            amount: 11887597,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'staking',
            tag: 'redelegate',
            detail: {
              src: {
                name: 'Forbole',
                image:
                  'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              },
              dst: {
                name: 'Figmant',
                image:
                  'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              },
            },
            amount: 11887597,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'governance',
            tag: 'deposit',
            detail: {
              name: '# proposal 18',
              url:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
            },
            amount: 11887597,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'transfer',
            tag: 'withdrawReward',
            detail: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
            },
            amount: 11887597,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'transfer',
            tag: 'multisend',
            detail: [
              {
                address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
                amount: 50,
              },
              {
                address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
                amount: 50,
              },
              {
                address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
                amount: 50,
              },
              {
                address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
                amount: 50,
              },
            ],
            amount: 200,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'transfer',
            tag: 'createValidator',
            detail: {
              name: 'Figmant',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
            },
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'transfer',
            tag: 'fund',
            amount: 20000,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'governance',
            tag: 'verifyInvariant',
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'governance',
            tag: 'vote',
            detail: {
              name: '# proposal 18',
              url: '',
              ans: 'yes',
            },
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'governance',
            tag: 'unjail',
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'governance',
            tag: 'submitProposal',
            detail: {
              name: '# proposal 18',
              url: '',
            },
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'slashing',
            tag: 'editValidator',
            detail: {
              name: 'moniker',
            },
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'transfer',
            tag: 'send',
            detail: {
              address: 'cosmos384erfel29482394jfswe234',
            },
            amount: 20000,
          },
          {
            ref: '#dhags3950wd05058235540fjikof',
            date: '10 Dec 2021 18:12 UTC',
            tab: 'slashing',
            tag: 'setRewardAddress',
            detail: {
              srcAddress: 'cosmos384erfel29482394jfswe234',
              dstAddress: 'cosmos384erfel29482394jfswe234',
            },
            amount: 20000,
          },
        ]}
        crypto={crypto}
      />
    </Layout>
  )
}

export default Account
