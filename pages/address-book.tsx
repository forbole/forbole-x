import React from 'react'
import { gql, useSubscription } from '@apollo/client'
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import groupBy from 'lodash/groupBy'
import get from 'lodash/get'
import Layout from '../components/Layout'
import ValidatorsTable from '../components/ValidatorsTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import cryptocurrencies from '../misc/cryptocurrencies'
import { getValidators } from '../graphql/queries/validators'
import { transformValidators } from '../misc/utils'
import AddressBookTable from '../components/AddressBook'
import DropDownIcon from '../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../misc/useIconProps'
import { getLatestAccountBalance } from '../graphql/queries/accountBalances'
import CreateButton from '../components/CreateButton'
import AddAddressDialog from '../components/AddAddressDialog'

const AddressBook: React.FC = () => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const { accounts, wallets } = useWalletsContext()
  const router = useRouter()
  const accountsMap = React.useMemo(
    () =>
      groupBy(
        accounts.map((a, index) => ({ ...a, index })),
        'walletId'
      ),
    [accounts]
  )

  const [addAddressOpen, setAddAddressOpen] = React.useState(false)
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<Element>()
  const [activeAccountIndex, setActiveAccountIndex] = React.useState(0)
  const { data } = useSubscription(
    gql`
      ${getValidators('DSM')}
    `
  )
  const validators = transformValidators(data)

  const activeAccount = accounts[activeAccountIndex]

  const crypto = activeAccount
    ? cryptocurrencies[activeAccount.crypto]
    : Object.values(cryptocurrencies)[0]

  const { data: balanceData } = useSubscription(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address: activeAccount ? activeAccount.address : '' } }
  )
  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  const networks = [
    {
      name: 'Cosmoshub - ATOM',
      id: '01',
      crypto: 'ATOM',
    },
    {
      name: 'Desmoshub - DSM',
      id: '02',
      crypto: 'DSM',
    },
  ]

  return (
    <Layout passwordRequired activeItem="/address-book">
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('address book')}</Typography>
        <Box justifyContent="flex-end" display="flex" flex="1">
          <Button onClick={() => setAddAddressOpen(true)}>
            <CreateButton text="add address" />
          </Button>
        </Box>
      </Box>

      <AddressBookTable />
      <AddAddressDialog
        networks={networks}
        open={addAddressOpen}
        onClose={() => setAddAddressOpen(false)}
      />
    </Layout>
  )
}

export default AddressBook
