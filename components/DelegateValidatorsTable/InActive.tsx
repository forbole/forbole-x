import { Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'

interface InActiveProps {
  status: string
  align: string
}

const InActive: React.FC<InActiveProps> = ({ status, align }) => {
  const { classes } = useGetStyles(status, align)
  const { t, lang } = useTranslation('common')

  return (
    <Box className={classes.inActiveStatus}>
      <Typography className={classes.typograph}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Typography>
    </Box>
  )
}

export default InActive
