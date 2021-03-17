import { Avatar, Box, Breadcrumbs, Link as MLink } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import times from 'lodash/times'
import AccountAvatar from '../../components/AccountAvatar'
import AccountDetailCard from '../../components/AccountDetailCard'
import Layout from '../../components/Layout'
import ValidatorsTable from '../../components/ValidatorsTable'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const crypto = account ? cryptocurrencies[account.crypto] : {}

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
      {account ? <AccountDetailCard account={account} /> : null}
      <ValidatorsTable
        validators={times(100).map(() => ({
          image:
            'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
          name: 'Forbole',
          commission: 0.015,
          vpRatios: 0.05,
          delegatedAmount: 11887597,
          amtRatio: 0.05,
          reward: 122321,
        }))}
        crypto={crypto}
      />
    </Layout>
  )
}

export default Account
