import { Paper, Divider, Box, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useRouter } from 'next/router'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import ArrowNextIcon from '../../assets/images/icons/icon_arrow_next.svg'
import pkg from '../../package.json'

const AboutTable: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const themeStyle = useTheme()
  const iconProps = useIconProps()
  const router = useRouter()

  return (
    <Paper
      style={{
        padding: themeStyle.spacing(1),
        paddingRight: themeStyle.spacing(1),
        paddingBottom: themeStyle.spacing(60),
      }}
    >
      <Box
        mx={2}
        my={2}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        onClick={() => router.push('/settings/about_forbole_portal')}
        className={classes.row}
      >
        <Typography variant="subtitle1">{t('about forbole portal')}</Typography>

        <ArrowNextIcon {...iconProps} style={{ marginTop: '4px' }} />
      </Box>
      <Divider />
      <Box
        mx={2}
        my={2}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        onClick={() => router.push('/settings/privacy_policy')}
        className={classes.row}
      >
        <Typography variant="subtitle1">{t('privacy policy')}</Typography>

        <ArrowNextIcon {...iconProps} style={{ marginTop: '4px' }} />
      </Box>
      <Divider />
      <Box
        mx={2}
        my={2}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        onClick={() => router.push('/settings/terms_of_conditions')}
        className={classes.row}
      >
        <Typography variant="subtitle1">{t('terms of conditions')}</Typography>

        <ArrowNextIcon {...iconProps} style={{ marginTop: '4px' }} />
      </Box>
      <Divider />
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('version')}</Typography>

        <Typography>v{pkg.version}</Typography>
      </Box>
      <Divider />
    </Paper>
  )
}

export default AboutTable
