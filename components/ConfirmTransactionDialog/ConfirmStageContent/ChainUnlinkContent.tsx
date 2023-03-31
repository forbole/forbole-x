import React from 'react';
import { Avatar, Box, Divider, Typography, useTheme } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import DisconnectIcon from '../../../assets/images/icons/icon_disconnect.svg';
import connectableChains from '../../../misc/connectableChains';
import useIconProps from '../../../misc/useIconProps';

interface ChainUnlinkContentProps {
  msgs: TransactionMsgUnlinkChainAccount[];
  account: Account;
}

const ChainUnlinkContent: React.FC<ChainUnlinkContentProps> = ({ msgs, account }) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const iconProps = useIconProps(undefined, theme.palette.grey[4]);
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Avatar src={connectableChains.desmos.image} />
          <Box mx={2}>
            <DisconnectIcon {...iconProps} />
          </Box>
          <Avatar src={connectableChains[msgs[0].value.chainName].image} />
        </Box>
        <Box mt={2} mb={4}>
          <Typography variant="h4">{t('disconnect')}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('from')}</Typography>
        <Typography color="textSecondary">{account.address}</Typography>
      </Box>
      <Divider />
      {msgs.map(m => (
        <React.Fragment key={m.value.target}>
          <Box my={1}>
            <Typography>{t('disconnect')}</Typography>
            <Typography color="textSecondary" gutterBottom>
              {m.value.target}
            </Typography>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
};

export default ChainUnlinkContent;
