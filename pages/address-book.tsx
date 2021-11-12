import React from 'react'
import { Box, Button, IconButton, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AddressBookTable from '../components/AddressBook'
import AddAddressDialog from '../components/AddAddressDialog'
import { CustomTheme } from '../misc/theme'
import useIsChromeExt from '../misc/useIsChromeExt'
import AddIcon from '../assets/images/icons/icon_add_wallet.svg'
import useIconProps from '../misc/useIconProps'

const AddressBook: React.FC = () => {
  const { t } = useTranslation('common')
  const theme: CustomTheme = useTheme()
  const { isChromeExt } = useIsChromeExt()
  const iconProps = useIconProps(3)
  const [addAddressOpen, setAddAddressOpen] = React.useState(false)

  return (
    <Layout
      passwordRequired
      activeItem="/address-book"
      ChromeExtTitleComponent={
        <Box mt={1}>
          <Typography variant="h4">{t('address book')}</Typography>
        </Box>
      }
      ChromeExtRightComponent={
        <IconButton onClick={() => setAddAddressOpen(true)}>
          <AddIcon {...iconProps} />
        </IconButton>
      }
    >
      {isChromeExt ? null : (
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h1">{t('address book')}</Typography>
          <Box justifyContent="flex-end" display="flex" flex="1">
            <Button
              onClick={() => setAddAddressOpen(true)}
              color="primary"
              variant="outlined"
              style={{ color: theme.palette.button, border: '1px solid' }}
            >
              {t('add address')}
            </Button>
          </Box>
        </Box>
      )}
      <AddressBookTable />
      <AddAddressDialog open={addAddressOpen} onClose={() => setAddAddressOpen(false)} />
    </Layout>
  )
}

export default AddressBook
