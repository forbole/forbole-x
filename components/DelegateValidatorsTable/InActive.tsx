import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useGetStyles } from './styles'

interface InActiveProps {
  status: string
  alignRight: boolean
}

const InActive: React.FC<InActiveProps> = ({ status, alignRight }) => {
  const { classes } = useGetStyles(status, alignRight)

  return (
    <Box className={classes.inActiveStatus}>
      <Typography className={classes.typograph}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Typography>
    </Box>
  )
}

export default InActive
