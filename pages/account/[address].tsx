import { Box, Button, Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React from 'react'
import AccountAvatar from '../../components/AccountAvatar'
import AccountDetailCard from '../../components/AccountDetailCard'
import BalanceChart from '../../components/BalanceChart'
import Layout from '../../components/Layout'
import { useSettingsContext } from '../../contexts/SettingsContext'
import { useWalletsContext } from '../../contexts/WalletsContext'

const Account: React.FC = () => {
  const router = useRouter()
  const { lang } = useTranslation()
  const { currency } = useSettingsContext()
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)

  return (
    <Layout passwordRequired activeItem="/wallets">
      {account ? <AccountDetailCard account={account} /> : null}
    </Layout>
  )
}

export default Account
