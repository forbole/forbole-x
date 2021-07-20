import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import SettingTable from '../components/SettingTable'
import AddAddressDialog from '../components/AddAddressDialog'

const Setting: React.FC = () => {
  const { t } = useTranslation('common')
  const [addAddressOpen, setAddAddressOpen] = React.useState(false)

  return (
    <Layout passwordRequired>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('settings')}</Typography>
        <Box justifyContent="flex-end" display="flex" flex="1">
          <Button onClick={() => setAddAddressOpen(true)} color="primary" variant="outlined">
            {t('settings')}
          </Button>
        </Box>
      </Box>
      <SettingTable />
      <AddAddressDialog open={addAddressOpen} onClose={() => setAddAddressOpen(false)} />
    </Layout>
  )
}

export default Setting
