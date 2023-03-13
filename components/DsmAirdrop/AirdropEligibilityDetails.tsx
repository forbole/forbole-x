import React from 'react';
import { Box, Typography, useTheme, alpha } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import TickIcon from '../../assets/images/icons/icon_tick.svg';
import WarningIcon from '../../assets/images/icons/icon_warning.svg';
import { formatCrypto } from '../../misc/utils';
import useIconProps from '../../misc/useIconProps';

interface AirdropEligibilityDetailsProps {
  dataStakingInfo: any;
  lpInfos: any;
  nonEligibleAddresses?: ChainConnection[];
  greyTick?: boolean;
}

const AirdropEligibilityDetails: React.FC<AirdropEligibilityDetailsProps> = ({
  dataStakingInfo,
  lpInfos,
  nonEligibleAddresses,
  greyTick,
}) => {
  const { t, lang } = useTranslation('common');
  const theme = useTheme();
  const iconProps = useIconProps(
    undefined,
    greyTick ? theme.palette.grey[300] : theme.palette.primary.main,
  );
  const errorIconProps = useIconProps(undefined, theme.palette.error.main);

  return (
    <>
      {dataStakingInfo !== null && dataStakingInfo !== undefined ? (
        <Box>
          {dataStakingInfo.map(item => {
            const chain = item.chain_name;
            const dsm = item.dsm_allotted;
            const { claimed } = item;
            return (
              <Box key={item}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  pt={theme.spacing(0.2)}
                  mb={0.5}>
                  <Box pr={theme.spacing(0.2)} display="flex" alignItems="center">
                    <TickIcon {...iconProps} />
                  </Box>
                  <Typography
                    style={{
                      color: theme.palette.primary.main,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    {t('chain staker', {
                      chain,
                      suffix: item.forbole_delegator ? '& Forbole Delegator' : '',
                    })}
                    {/* {dsm DSM} */}
                    {claimed ? (
                      <Typography
                        style={{
                          color: theme.palette.text.secondary,
                          paddingLeft: theme.spacing(1),
                        }}>
                        {formatCrypto(dsm, { unit: 'DSM', lang })} {t('claimed')}
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          color: theme.palette.text.primary,
                          paddingLeft: theme.spacing(1),
                        }}>
                        {formatCrypto(dsm, { unit: 'DSM', lang })}
                      </Typography>
                    )}
                  </Typography>
                </Box>
                <Box
                  bgcolor={theme.palette.grey[100]}
                  display="inline-block"
                  px={2}
                  ml={3}
                  borderRadius={theme.spacing(2)}>
                  <Typography color="textSecondary">{item.address}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : null}
      {lpInfos !== null && lpInfos !== undefined ? (
        <Box pb={theme.spacing(0.2)}>
          {lpInfos.map(item => {
            const chain = item.chain_name;
            const dsm = item.dsm_allotted;
            const { claimed } = item;
            return (
              <Box key={item}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  pt={theme.spacing(0.2)}
                  mb={0.5}>
                  <Box pr={theme.spacing(0.2)} display="flex" alignItems="center">
                    <TickIcon {...iconProps} />
                  </Box>
                  <Typography
                    style={{
                      color: theme.palette.primary.main,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    {chain} {t('lp staker')}
                    {claimed ? (
                      <Typography
                        style={{
                          color: theme.palette.text.secondary,
                          paddingLeft: theme.spacing(1),
                        }}>
                        {formatCrypto(dsm, { unit: 'DSM', lang })} {t('claimed')}
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          color: theme.palette.text.primary,
                          paddingLeft: theme.spacing(1),
                        }}>
                        {formatCrypto(dsm, { unit: 'DSM', lang })}
                      </Typography>
                    )}{' '}
                  </Typography>
                </Box>
                <Box
                  bgcolor={theme.palette.grey[100]}
                  display="inline-block"
                  px={2}
                  ml={3}
                  borderRadius={theme.spacing(2)}>
                  <Typography color="textSecondary">{item.address}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : null}
      {nonEligibleAddresses
        ? nonEligibleAddresses.map(a => (
            // eslint-disable-next-line react/jsx-indent
            <Box key={a.externalAddress + a.chainName}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                pt={theme.spacing(0.2)}
                mb={0.5}>
                <Box pr={1} display="flex" alignItems="center">
                  <WarningIcon {...errorIconProps} />
                </Box>
                <Box
                  bgcolor={alpha(theme.palette.error.main, 0.15)}
                  display="inline-block"
                  px={2}
                  borderRadius={theme.spacing(2)}>
                  <Typography color="error">{a.externalAddress}</Typography>
                </Box>
              </Box>
              <Typography
                style={{
                  color: theme.palette.error.main,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                {t('not eligible for airdrop')}
              </Typography>
            </Box>
          ))
        : null}
    </>
  );
};

export default AirdropEligibilityDetails;
