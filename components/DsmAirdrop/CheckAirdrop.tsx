import React from 'react';
import { Box, Typography, useTheme, Button, TextField, CircularProgress } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import TickIcon from '../../assets/images/icons/icon_tick.svg';
import ParachuteIcon from '../../assets/images/parachute.svg';
import SelectAccountDialog from '../SelectAccountDialog';
import useStyles from './styles';
import { formatCrypto } from '../../misc/utils';
import AirdropEligibilityDetails from './AirdropEligibilityDetails';

interface CheckAirdropProps {
  onConfirm(): void;
  claimEnabled: boolean;
  setSelectedAddress: (address: string) => void;
  externalAddress: string;
  setExternalAddress: (address: string) => void;
}

const CheckAirdrop: React.FC<CheckAirdropProps> = ({
  onConfirm,
  claimEnabled,
  setSelectedAddress,
  externalAddress,
  setExternalAddress,
}) => {
  const classes = useStyles();
  const { t, lang } = useTranslation('common');
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [verifyData, setVerifyData] = React.useState(null);
  const [dataStakingInfo, setDataStakingInfo] = React.useState(null);
  const [lpInfos, setLpInfos] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [isSelectAccountDialogOpen, setIsSelectAccountDialogOpen] = React.useState(false);

  const verify = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/users/${externalAddress}`,
      ).then(r => r.json());
      setVerifyData(data);
      // eslint-disable-next-line camelcase
      const { staking_infos, dsm_allotted, lp_infos } = data;
      setDataStakingInfo(staking_infos);
      setLpInfos(lp_infos);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
    }
  }, [externalAddress]);

  return (
    <>
      <Box display="flex" flexDirection="row" pt={8} padding={theme.spacing(0.5)}>
        <Box display="flex" flexDirection="column" justifyContent="flex-start" width="70%">
          <Box pl={theme.spacing(1)}>
            <Box mb={theme.spacing(1)}>
              <Typography variant="h1">{t('dsm airdrop announced')}</Typography>
              <Typography variant="h4">{t('check your availability')}</Typography>
            </Box>
            <form noValidate>
              <Typography gutterBottom>{t('insert your address')}</Typography>{' '}
              <Box display="flex" flexDirection="row" mb={8}>
                <TextField
                  error={error}
                  helperText={error ? t('invalid dsm address') : undefined}
                  autoFocus
                  variant="filled"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  style={{ width: '70%' }}
                  value={externalAddress}
                  onChange={e => setExternalAddress(e.target.value)}
                  placeholder={t('cosmos address placeholder')}
                />
                <Box padding={0} width="30%">
                  <Button
                    type="submit"
                    fullWidth={undefined}
                    variant="contained"
                    color="primary"
                    onClick={e => {
                      e.preventDefault();
                      verify();
                    }}
                    style={{
                      borderRadius: theme.spacing(0, 0.5, 0.5, 0),
                      marginLeft: theme.spacing(0.125),
                    }}>
                    {loading ? (
                      <CircularProgress color="inherit" size={theme.spacing(3.5)} />
                    ) : (
                      'calculate'
                    )}
                  </Button>
                </Box>
              </Box>
            </form>
            {verifyData !== null && (
              <Box mb={2}>
                <Typography>{t('your allocation')}</Typography>
                <Typography variant="h3">
                  {formatCrypto(verifyData.dsm_allotted, { unit: 'DSM', lang })}
                </Typography>
              </Box>
            )}
            <AirdropEligibilityDetails lpInfos={lpInfos} dataStakingInfo={dataStakingInfo} />
            {[...(dataStakingInfo || []), ...(lpInfos || [])].filter(i => !i.claimed).length ? (
              <form noValidate>
                <Typography
                  style={{
                    color: theme.palette.text.secondary,
                  }}>
                  {t('check airdrop slogan')}
                </Typography>
                <Box mt={4} padding={0} minWidth="20%">
                  <Button
                    id="button"
                    variant="contained"
                    color="primary"
                    onClick={() => setIsSelectAccountDialogOpen(true)}>
                    {loading ? (
                      <CircularProgress color="inherit" size={theme.spacing(3.5)} />
                    ) : (
                      t('claim now')
                    )}
                  </Button>
                </Box>
              </form>
            ) : null}
          </Box>
        </Box>
        <Box width="30%" mr={theme.spacing(0.5)} py={theme.spacing(1)}>
          <ParachuteIcon />
        </Box>
      </Box>
      <SelectAccountDialog
        setSelectedAddress={setSelectedAddress}
        open={isSelectAccountDialogOpen}
        onSubmit={(e, value) => {
          e.preventDefault();
          onConfirm();
        }}
        onClose={() => setIsSelectAccountDialogOpen(false)}
      />
    </>
  );
};

export default CheckAirdrop;
