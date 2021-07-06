import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AddressBookTable from '../components/AddressBook'
import AddAddressDialog from '../components/AddAddressDialog'

const AddressBook: React.FC = () => {
  const { t } = useTranslation('common')
  const [addAddressOpen, setAddAddressOpen] = React.useState(false)

  return (
    <Layout passwordRequired activeItem="/address-book">
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('address book')}</Typography>
        <Box justifyContent="flex-end" display="flex" flex="1">
          <Button onClick={() => setAddAddressOpen(true)} color="primary" variant="outlined">
            {t('add address')}
          </Button>
        </Box>
      </Box>
      <AddressBookTable />
      <AddAddressDialog open={addAddressOpen} onClose={() => setAddAddressOpen(false)} />
    </Layout>
  )
}

export default AddressBook
