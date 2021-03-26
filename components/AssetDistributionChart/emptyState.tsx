import React from 'react'
import { Box, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import ForboleLogo from '../../assets/images/forboleLogo.svg'
import useStyles from './styles'

const EmptyState: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('common')
  return (
    <Box display="flex" flexDirection="column" alignItems="center" height={theme.spacing(33.5)}>
      <ForboleLogo
        style={{
          display: 'flex',
          marginTop: '1rem',
        }}
      />
      <Typography className={classes.noAsset}>{t('noAsset')}</Typography>
    </Box>
  )
}

export default EmptyState
