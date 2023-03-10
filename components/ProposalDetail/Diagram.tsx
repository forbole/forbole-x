import { Box, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useGetStyles } from './styles';
import { formatPercentage, formatCrypto } from '../../misc/utils';

interface DiagramProps {
  crypto: Cryptocurrency;
  value: number;
  title: string;
  color: string;
  percentage: number;
}

const Diagram: React.FC<DiagramProps> = ({ value, title, color, crypto, percentage }) => {
  const { classes } = useGetStyles(color);
  const { t, lang } = useTranslation('common');

  return (
    <Box m={1} position="relative">
      <Box className={classes.label}>
        <Typography variant="subtitle2" className={classes.title}>
          {`${t(title)} (${formatPercentage(percentage, lang)})`}
        </Typography>
        <Typography variant="subtitle2" className={classes.amount}>
          {formatCrypto(value, { unit: crypto.name, lang })}
        </Typography>
      </Box>
    </Box>
  );
};

export default Diagram;
