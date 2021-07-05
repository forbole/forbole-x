import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AddressBookTable from '../components/AddressBook'
import CreateButton from '../components/CreateButton'
import AddAddressDialog from '../components/AddAddressDialog'

const AddressBook: React.FC = () => {
  const { t } = useTranslation('common')

  const [addAddressOpen, setAddAddressOpen] = React.useState(false)

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

      <AddressBookTable networks={networks} />
      <AddAddressDialog
        networks={networks}
        open={addAddressOpen}
        onClose={() => setAddAddressOpen(false)}
      />
    </Layout>
  )
}

export default AddressBook
