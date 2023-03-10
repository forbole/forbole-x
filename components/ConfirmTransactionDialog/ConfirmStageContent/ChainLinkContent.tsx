import React from 'react';
import { Avatar, Box, Divider, Typography, useTheme } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import ConnectIcon from '../../../assets/images/icons/icon_connect.svg';
import connectableChains from '../../../misc/connectableChains';
import useIconProps from '../../../misc/useIconProps';

interface ChainLinkContentProps {
  msgs: TransactionMsgLinkChainAccount[];
  account: Account;
}

const ChainLinkContent: React.FC<ChainLinkContentProps> = ({ msgs, account }) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const iconProps = useIconProps(undefined, theme.palette.grey[4]);
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Avatar src={connectableChains.desmos.image} />
          <Box mx={2}>
            <ConnectIcon {...iconProps} />
          </Box>
          <Avatar src={connectableChains[msgs[0].value.chainConfig.name].image} />
        </Box>
        <Box mt={2} mb={4}>
          <Typography variant="h4">{t('connect chain')}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('from')}</Typography>
        <Typography color="textSecondary">{account.address}</Typography>
      </Box>
      <Divider />
      {msgs.map((m, i) => (
        <React.Fragment key={m.value.chainAddress.value.value}>
          <Box my={1}>
            <Typography>{t('connect to')}</Typography>
            <Typography color="textSecondary" gutterBottom>
              {m.value.chainAddress.value.value}
            </Typography>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
};

export default ChainLinkContent;
