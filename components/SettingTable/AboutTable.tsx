import { Paper, Divider, Box, Typography, useTheme, Link as MLink } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import Link from 'next/link'
import useIconProps from '../../misc/useIconProps'
import ArrowNextIcon from '../../assets/images/icons/icon_arrow_next.svg'
import pkg from '../../package.json'

const AboutTable: React.FC = () => {
  const { t } = useTranslation('common')
  const themeStyle = useTheme()
  const iconProps = useIconProps()
  return (
    <Paper
      style={{
        padding: themeStyle.spacing(1),
      }}
    >
      <Link href="/settings/about-forbole-x" passHref>
        <MLink color="textPrimary">
          <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography color="textPrimary" variant="subtitle1">
              {t('about forbole x')}
            </Typography>
            <ArrowNextIcon {...iconProps} />
          </Box>
        </MLink>
      </Link>
      <Divider />
      <Link href="/settings/privacy-policy" passHref>
        <MLink color="textPrimary">
          <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography color="textPrimary" variant="subtitle1">
              {t('privacy policy')}
            </Typography>
            <ArrowNextIcon {...iconProps} />
          </Box>
        </MLink>
      </Link>
      <Divider />
      <Link href="/settings/terms-of-conditions" passHref>
        <MLink color="textPrimary">
          <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography color="textPrimary" variant="subtitle1">
              {t('terms of conditions')}
            </Typography>
            <ArrowNextIcon {...iconProps} />
          </Box>
        </MLink>
      </Link>
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
