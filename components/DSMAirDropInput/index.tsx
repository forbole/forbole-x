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

import useStyles from './styles'

interface DsmAirDropInputProps {
  profile: Profile
  profileLoading: boolean
  onConfirm(): void
}

const DsmAirDropInput: React.FC<DsmAirDropInputProps> = ({
  onConfirm,
  profile,
  profileLoading,
}) => {
  //   const classes = useStyles()
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
    <Paper>
      {' '}
      <Box display="flex" flexDirection="column" alignItems="flex-start" my={2}>
        <Typography variant="h1">{t('dsm airdrop announced')}</Typography>
        <Typography variant="h4">{t('check your availability')}</Typography>
      </Box>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          verify()
          onConfirm()
        }}
      >
        <Typography style={{ padding: theme.spacing(0, 2) }}>{t('insert your address')}</Typography>{' '}
        <Box display="flex" flexDirection="row">
          <TextField
            error={error}
            helperText={error ? t('invalid address') : undefined}
            // className={classes.searchBarStyle}
            style={{
              padding: theme.spacing(0, 0, 2, 2),
              width: '70%',
            }}
            fullWidth={undefined}
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t('cosmos address placeholder')}
          />
          <Box padding={0} width="20%">
            <Button
              type="submit"
              fullWidth={undefined}
              variant="contained"
              color="primary"
              style={{
                // backgroundColor: 'rgba(237, 108, 83, 1)',
                height: 'auto',
                padding: theme.spacing(2, 1.75),
                borderRadius: theme.spacing(0, 0.5, 0.5, 0),
                marginLeft: theme.spacing(0.125),
              }}
            >
              {loading ? <CircularProgress color="inherit" size={theme.spacing(3)} /> : 'claim now'}
            </Button>
          </Box>
        </Box>
      </form>
      {verifyData !== null && (
        <Box>
          <Typography>The allocated DSM amount is</Typography>
          <Typography style={{ paddingLeft: theme.spacing(2) }} variant="h3">
            {verifyData.dsm_allotted} DSM
          </Typography>
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
                pl={theme.spacing(2)}
                pt={theme.spacing(2)}
                key={key}
              >
                <Box pr={theme.spacing(1)}>
                  <TickIcon />
                </Box>
                <Typography style={{ color: 'rgba(237, 108, 83, 1)', padding: 0 }}>
                  {chain} Staker {item.forbole_delegator ? '& Forbole Delegator' : null}
                </Typography>
              </Box>
            )
          })}
        </Box>
      ) : null}
      {lpInfos !== null && lpInfos !== undefined ? (
        <Box>
          {lpInfos.map((item, key) => {
            const chain = item.chain_name
            return (
              <Box
                display="flex"
                flexDirection="row"
                pl={theme.spacing(2)}
                pt={theme.spacing(2)}
                key={key}
              >
                <Box pr={theme.spacing(1)}>
                  <TickIcon />
                </Box>
                <Typography style={{ color: 'rgba(237, 108, 83, 1)', padding: 0 }}>
                  {chain} LP Staker
                </Typography>
              </Box>
            )
          })}
        </Box>
      ) : null}
    </Paper>
  )
}

export default DsmAirDropInput
