import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import get from 'lodash/get'
import Layout from '../components/Layout'
import ValidatorsTable from '../components/ValidatorsTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import cryptocurrencies from '../misc/cryptocurrencies'
import { getValidators } from '../graphql/queries/validators'
import { transformValidators } from '../misc/utils'
import { getLatestAccountBalance } from '../graphql/queries/accountBalances'
import SelectAccountButton from '../components/SelectAccountButton'

const Delegate: React.FC = () => {
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const [activeAccount, setActiveAccount] = React.useState(get(accounts, 0))

  const crypto = activeAccount
    ? cryptocurrencies[activeAccount.crypto]
    : Object.values(cryptocurrencies)[0]

  const { data } = useQuery(
    gql`
      ${getValidators(crypto.name)}
    `
  )
  const validators = transformValidators(data)

  const { data: balanceData } = useQuery(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address: activeAccount ? activeAccount.address : '' }, pollInterval: 15000 }
  )
  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  React.useEffect(() => {
    if (!activeAccount && accounts.length) {
      setActiveAccount(get(accounts, 0))
    }
  }, [activeAccount, accounts])

  return (
    <Layout passwordRequired activeItem="/delegate">
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('delegate')}</Typography>
        {activeAccount ? (
          <Box ml={2}>
            <SelectAccountButton
              activeAccount={activeAccount}
              onAccountChange={(ac) => setActiveAccount(ac)}
            />
          </Box>
        ) : null}
      </Box>
      <ValidatorsTable
        account={activeAccount}
        validators={validators}
        crypto={crypto}
        availableTokens={availableTokens}
      />
    </Layout>
  )
}

export default Delegate
