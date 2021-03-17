import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

interface StatBoxProps {
  title: string
  value: string
  subtitle: string
}

const StatBox: React.FC<StatBoxProps> = ({ title, subtitle, value }) => {
  return (
    <Grid item lg={2} md={3} xs={12}>
      <Box ml={6}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography color="textSecondary">{subtitle}</Typography>
      </Box>
    </Grid>
  )
}

export default StatBox
