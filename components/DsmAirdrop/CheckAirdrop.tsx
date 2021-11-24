import React from 'react'
import {
  Box,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Typography,
  useTheme,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Paper,
  CircularProgress,
} from '@material-ui/core'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import TickIcon from '../../assets/images/icons/icon_tick.svg'
import ParachuteIcon from '../../assets/images/parachute.svg'
import useStyles from './styles'

interface CheckAirdropProps {
  profile: Profile
  profileLoading: boolean
  onConfirm(): void
}

const CheckAirdrop: React.FC<CheckAirdropProps> = ({ onConfirm, profile, profileLoading }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const [loading, setLoading] = React.useState(false)
  const [address, setAddress] = React.useState('')
  const [verifyData, setVerifyData] = React.useState(null)
  const [dataStakingInfo, setDataStakingInfo] = React.useState(null)
  const [lpInfos, setLpInfos] = React.useState(null)
  const [error, setError] = React.useState(false)

  const verify = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await axios.get(`https://api.airdrop.desmos.network/users/${address}`)
      const { data } = result
      setVerifyData(data)
      // eslint-disable-next-line camelcase
      const { staking_infos, dsm_allotted, lp_infos } = data
      setDataStakingInfo(staking_infos)
      setLpInfos(lp_infos)
      setLoading(false)
      setError(false)
    } catch (err) {
      setError(true)
      setLoading(false)
      console.log(err)
    }
  }, [address])
  return (
    <Box
      display="flex"
      flexDirection="row"
      // justifyContent="flex-start"
      alignItems="center"
      padding={theme.spacing(0.5)}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        //   padding={theme.spacing(1)}
        width="70%"
      >
        <Box pl={theme.spacing(1)}>
          <Box mb={theme.spacing(1)}>
            <Typography variant="h1">{t('dsm airdrop announced')}</Typography>
            <Typography variant="h4">{t('check your availability')}</Typography>
          </Box>
          <form noValidate>
            <Typography>{t('insert your address')}</Typography>{' '}
            <Box display="flex" flexDirection="row">
              <TextField
                error={error}
                helperText={error ? t('invalid address') : undefined}
                className={classes.searchBarStyle}
                style={{
                  width: '70%',
                }}
                fullWidth={undefined}
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('cosmos address placeholder')}
              />
              <Box padding={0} width="30%">
                <Button
                  type="submit"
                  fullWidth={undefined}
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault()
                    verify()
                  }}
                  style={{
                    height: 'auto',
                    padding: theme.spacing(2, 1.75),
                    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
                    marginLeft: theme.spacing(0.125),
                  }}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={theme.spacing(3)} />
                  ) : (
                    'calculate'
                  )}
                </Button>
              </Box>
            </Box>
          </form>
          {verifyData !== null && (
            <Box>
              <Typography>{t('your allocation')}</Typography>
              <Typography variant="h3">{verifyData.dsm_allotted} DSM</Typography>
            </Box>
          )}
          {dataStakingInfo !== null && dataStakingInfo !== undefined ? (
            <Box>
              {dataStakingInfo.map((item, key) => {
                const chain = item.chain_name
                // console.log(dataStakingInfo);
                return (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    // pl={theme.spacing(0.2)}
                    pt={theme.spacing(0.2)}
                    key={key}
                  >
                    <Box pr={theme.spacing(0.2)}>
                      <TickIcon />
                    </Box>
                    <Typography style={{ color: theme.palette.primary.main, padding: 0 }}>
                      {chain} Staker {item.forbole_delegator ? '& Forbole Delegator' : null}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          ) : null}
          {lpInfos !== null && lpInfos !== undefined ? (
            <Box pb={theme.spacing(0.2)}>
              {lpInfos.map((item, key) => {
                const chain = item.chain_name
                return (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    pt={theme.spacing(0.2)}
                    key={key}
                  >
                    <Box pr={theme.spacing(0.2)}>
                      <TickIcon />
                    </Box>
                    <Typography style={{ color: theme.palette.primary.main, padding: 0 }}>
                      {chain} {t('lp staker')}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          ) : null}
          {dataStakingInfo !== null && dataStakingInfo !== undefined ? (
            <form noValidate>
              <Box padding={0} width="20%">
                <Button
                  type="submit"
                  fullWidth={undefined}
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault()
                    onConfirm()
                  }}
                  style={{
                    height: 'auto',
                    padding: theme.spacing(2, 1.75),
                    marginLeft: theme.spacing(0.125),
                  }}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={theme.spacing(3)} />
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
  )
}

export default CheckAirdrop
