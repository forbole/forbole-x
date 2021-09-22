import React from 'react'
import { Box, IconButton, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import Layout from '../../components/Layout'
import SettingTable from '../../components/SettingTable'
import useIconProps from '../../misc/useIconProps'

const Setting: React.FC = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const iconProps = useIconProps(3, theme.palette.grey[900])
  // Show back btn for chrome extension
  const router = useRouter()
  const hideMenuQueryParam = get(router, 'query.hideMenu', '')
  const isChromeExt = hideMenuQueryParam || (process.browser && (window as any).hideMenu)

  return (
    <Layout passwordRequired>
      <Box display="flex" alignItems="center" mb={2}>
        {isChromeExt ? (
          <IconButton style={{ marginRight: theme.spacing(2) }} onClick={() => router.back()}>
            <BackIcon {...iconProps} />
          </IconButton>
        ) : null}
        <Typography variant="h1">{t('settings')}</Typography>
      </Box>
      <SettingTable />
    </Layout>
  )
}

export default Setting
