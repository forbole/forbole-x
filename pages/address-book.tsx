import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AddressBookTable from '../components/AddressBook'
import AddAddressDialog from '../components/AddAddressDialog'
import cryptocurrencies from '../misc/cryptocurrencies'

const AddressBook: React.FC = () => {
  const { t } = useTranslation('common')

  const [addAddressOpen, setAddAddressOpen] = React.useState(false)

  const cryptocurrenciesType = Object.values(cryptocurrencies)

  const networks = []
  cryptocurrenciesType.forEach((x, i) => {
    networks.push({ id: i, crypto: x.name, img: x.image, name: x.prefix })
  })

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
