import React from 'react'
import { Box, Typography, useTheme, Button, TextField, CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import TickIcon from '../../assets/images/icons/icon_tick.svg'
import { formatCrypto } from '../../misc/utils'

interface AirdropEligibilityDetailsProps {
  dataStakingInfo: any
  lpInfos: any
}

const AirdropEligibilityDetails: React.FC<AirdropEligibilityDetailsProps> = ({
  dataStakingInfo,
  lpInfos,
}) => {
  const { t, lang } = useTranslation('common')
  const theme = useTheme()

  return (
    <>
      {dataStakingInfo !== null && dataStakingInfo !== undefined ? (
        <Box>
          {dataStakingInfo.map((item, key) => {
            const chain = item.chain_name
            const dsm = item.dsm_allotted
            const { claimed } = item
            return (
              <Box key={key}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  pt={theme.spacing(0.2)}
                  mb={0.5}
                >
                  <Box pr={theme.spacing(0.2)} display="flex" alignItems="center">
                    <TickIcon />
                  </Box>
                  <Typography
                    style={{
                      color: theme.palette.primary.main,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
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
                        }}
                      >
                        {formatCrypto(dsm, 'DSM', lang)} {t('claimed')}
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          color: theme.palette.text.primary,
                          paddingLeft: theme.spacing(1),
                        }}
                      >
                        {formatCrypto(dsm, 'DSM', lang)}
                      </Typography>
                    )}
                  </Typography>
                </Box>
                <Box
                  bgcolor={theme.palette.grey[100]}
                  display="inline-block"
                  px={2}
                  borderRadius={theme.spacing(2)}
                >
                  <Typography color="textSecondary">{item.address}</Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      ) : null}
      {lpInfos !== null && lpInfos !== undefined ? (
        <Box pb={theme.spacing(0.2)}>
          {lpInfos.map((item, key) => {
            const chain = item.chain_name
            const dsm = item.dsm_allotted
            const { claimed } = item
            return (
              <Box key={key}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  pt={theme.spacing(0.2)}
                  mb={0.5}
                >
                  <Box pr={theme.spacing(0.2)} display="flex" alignItems="center">
                    <TickIcon />
                  </Box>
                  <Typography
                    style={{
                      color: theme.palette.primary.main,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    {chain} {t('lp staker')}
                    {claimed ? (
                      <Typography
                        style={{
                          color: theme.palette.text.secondary,
                          paddingLeft: theme.spacing(1),
                        }}
                      >
                        {formatCrypto(dsm, 'DSM', lang)} {t('claimed')}
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          color: theme.palette.text.primary,
                          paddingLeft: theme.spacing(1),
                        }}
                      >
                        {formatCrypto(dsm, 'DSM', lang)}
                      </Typography>
                    )}{' '}
                  </Typography>
                </Box>
                <Box
                  bgcolor={theme.palette.grey[100]}
                  display="inline-block"
                  px={2}
                  borderRadius={theme.spacing(2)}
                >
                  <Typography color="textSecondary">{item.address}</Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      ) : null}
    </>
  )
}

export default AirdropEligibilityDetails
