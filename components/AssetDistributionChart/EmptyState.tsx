import React from 'react'
import { Box, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import ForboleLogoDark from '../../assets/images/forboleLogo_dark.svg'
import ForboleLogoLight from '../../assets/images/forboleLogo_light.svg'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'

const EmptyState: React.FC = () => {
  const classes = useStyles()
  const themeStyle = useTheme()
  const { theme } = useGeneralContext()
  const { t } = useTranslation('common')
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height={themeStyle.spacing(33.5)}
    >
      {theme === 'light' ? (
        <ForboleLogoLight
          style={{
            display: 'flex',
            marginTop: '1rem',
          }}
        />
      ) : (
        <ForboleLogoDark
          style={{
            display: 'flex',
            marginTop: '1rem',
          }}
        />
      )}
      <Typography className={classes.noAsset}>{t('no asset')}</Typography>
    </Box>
  )
}

export default EmptyState
