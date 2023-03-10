import React from 'react';
import { Avatar, Box, Button, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import cryptocurrencies from '../../misc/cryptocurrencies';
import useStyles from './styles';

interface SelectNetworkProps {
  onSelect: (network: string) => void;
}

const SelectNetwork: React.FC<SelectNetworkProps> = ({ onSelect }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  return (
    <>
      <DialogTitle>{t('add account')}</DialogTitle>
      <DialogContent>
        <Box mt={2} mb={1} display="flex" flex={1}>
          <Typography>{t('select network')}</Typography>
        </Box>
        {Object.keys(cryptocurrencies).map(c => (
          <Box key={c} mb={1} display="flex" flex={1}>
            <Button
              variant="contained"
              className={classes.addAccountButton}
              onClick={() => onSelect(c)}
            >
              <Box display="flex" flex={1}>
                <Avatar
                  className={classes.smallAvatar}
                  alt={cryptocurrencies[c].name}
                  src={cryptocurrencies[c].image}
                />
                <Box ml={1}>
                  <Typography color="textPrimary">{cryptocurrencies[c].name}</Typography>
                </Box>
              </Box>
            </Button>
          </Box>
        ))}
      </DialogContent>
    </>
  );
};

export default SelectNetwork;
