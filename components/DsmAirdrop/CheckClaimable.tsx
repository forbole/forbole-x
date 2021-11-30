/* eslint-disable camelcase */
import {
  Button,
  Typography,
  Box,
  useTheme,
  CircularProgress,
  Dialog,
  IconButton,
  DialogContent,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import TickIcon from '../../assets/images/icons/tick.svg'
import TickActiveIcon from '../../assets/images/icons/tick_active.svg'
import useIconProps from '../../misc/useIconProps'
import ImageDefaultDark from '../../assets/images/image_default_dark.svg'
import ImageDefaultLight from '../../assets/images/image_default_light.svg'
import { CustomTheme } from '../../misc/theme'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'

let timer

interface CheckClaimableProps {
  profile: Profile
  account: Account
  externalAddress: string
  chainConnections: ChainConnection[]
  profileLoading: boolean
  chainConnectionsLoading: boolean
  onConfirm(): void
}

const CheckClaimable: React.FC<CheckClaimableProps> = ({
  onConfirm,
  profile,
  account,
  externalAddress,
  chainConnections,
  profileLoading,
  chainConnectionsLoading,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const themeStyle: CustomTheme = useTheme()
  const { theme } = useGeneralContext()

  const [isGrantActive, setIsGrantActive] = React.useState(false)
  const [isGranting, setIsGranting] = React.useState(false)
  const [canGetGrant, setCanGetGrant] = React.useState(false)

  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = React.useState(false)

  const shouldGetGrant = canGetGrant && !isGranting && !isGrantActive

  const checkFeeGrant = React.useCallback(async () => {
    try {
      const { can_get_grant, has_enough_dsm, has_requested_grant } = await fetch(
        `${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/airdrop/grants/${account.address}/${externalAddress}`
      ).then((r) => r.json())
      setCanGetGrant(can_get_grant || has_requested_grant || has_enough_dsm)
      setIsGranting(has_requested_grant && !has_enough_dsm)
      setIsGrantActive(has_enough_dsm)
      if (has_enough_dsm) {
        clearInterval(timer)
        setIsLoadingDialogOpen(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [account])

  React.useEffect(() => {
    checkFeeGrant()
    return () => clearTimeout(timer)
  }, [])

  const grantFee = React.useCallback(async () => {
    try {
      setIsLoadingDialogOpen(true)
      await fetch(`${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/airdrop/grants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_address: externalAddress,
          desmos_address: account.address,
        }),
      })
      checkFeeGrant()
      timer = setInterval(checkFeeGrant, 5000)
    } catch (err) {
      setIsLoadingDialogOpen(false)
      console.log(err)
    }
  }, [externalAddress, account])

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (shouldGetGrant) {
            grantFee()
          } else {
            onConfirm()
          }
        }}
      >
        <Box display="flex" justifyContent="center">
          <Box className={classes.stageContent} width="100%">
            <Typography>{t('airdrop eligibility subtitle')}</Typography>
            <Box className={classes.stepsCard} bgcolor={themeStyle.palette.cardBackground}>
              {canGetGrant ? (
                <>
                  <Box className={classes.step} display="flex" alignItems="center">
                    {
                      // eslint-disable-next-line no-nested-ternary
                      isGranting && !isGrantActive ? (
                        <CircularProgress size={themeStyle.spacing(2)} color="primary" />
                      ) : isGrantActive ? (
                        <TickActiveIcon {...iconProps} />
                      ) : (
                        <TickIcon {...iconProps} />
                      )
                    }
                    <Box marginRight={themeStyle.spacing(0.15)} />
                    <Typography>{t('get a grant')}</Typography>
                  </Box>
                  <Box bgcolor={themeStyle.palette.background.paper} width="100%" height="1px" />
                </>
              ) : null}
              <Box className={classes.step} display="flex" alignItems="center">
                {
                  // eslint-disable-next-line no-nested-ternary
                  profileLoading ? (
                    <CircularProgress size={themeStyle.spacing(2)} color="primary" />
                  ) : profile.dtag ? (
                    <TickActiveIcon {...iconProps} />
                  ) : (
                    <TickIcon {...iconProps} />
                  )
                }
                <Box marginRight={themeStyle.spacing(0.15)} />
                <Typography>{t('airdrop eligibility rule one')}</Typography>
              </Box>
              <Box bgcolor={themeStyle.palette.background.paper} width="100%" height="1px" />
              <Box className={classes.step} display="flex" alignItems="center">
                {
                  // eslint-disable-next-line no-nested-ternary
                  chainConnectionsLoading ? (
                    <CircularProgress size={themeStyle.spacing(2)} color="primary" />
                  ) : chainConnections.length ? (
                    <TickActiveIcon {...iconProps} />
                  ) : (
                    <TickIcon {...iconProps} />
                  )
                }
                <Box marginRight={themeStyle.spacing(0.15)} />
                <Typography>{t('airdrop eligibility rule two')}</Typography>
              </Box>
            </Box>
            <Typography>{t('airdrop eligibility description')}</Typography>

            <Box flex={1} display="flex" flexDirection="column" mb={3} mt={5.5}>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
                disabled={
                  profileLoading || chainConnectionsLoading || (isGranting && !isGrantActive)
                }
              >
                {t(shouldGetGrant ? 'get a grant' : 'get started button')}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
      {/* Loading Dialog */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isLoadingDialogOpen}
        onClose={() => setIsLoadingDialogOpen(false)}
      >
        <IconButton className={classes.closeButton} onClick={() => setIsLoadingDialogOpen(false)}>
          <CloseIcon {...iconProps} />
        </IconButton>
        <DialogContent className={classes.dialogContent}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            my={12}
          >
            <Box
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{ position: 'relative', display: 'flex' }}
            >
              <CircularProgress size={themeStyle.spacing(27)} thickness={5} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {theme === 'dark' ? (
                  <ImageDefaultDark
                    width={themeStyle.spacing(25)}
                    height={themeStyle.spacing(25)}
                  />
                ) : (
                  <ImageDefaultLight
                    width={themeStyle.spacing(25)}
                    height={themeStyle.spacing(25)}
                  />
                )}
              </Box>
            </Box>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              style={{ marginTop: themeStyle.spacing(4) }}
            >
              {t('getting grant')}
            </Typography>
            <Typography align="center">{t('getting grant description')}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CheckClaimable
