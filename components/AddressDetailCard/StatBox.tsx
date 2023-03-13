import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import useIsMobile from '../../misc/useIsMobile';

interface StatBoxProps {
  title: string;
  value: string;
  subtitle: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, subtitle, value }) => {
  const isMobile = useIsMobile();
  return (
    <Grid item lg={2} md={3} xs={6}>
      <Box ml={isMobile ? 0 : 6}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography color="textSecondary">{subtitle}</Typography>
      </Box>
    </Grid>
  );
};

export default StatBox;
