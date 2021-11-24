import { Button, Typography, Box, useTheme, CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import TickIcon from '../../assets/images/icons/tick.svg'
import TickActiveIcon from '../../assets/images/icons/tick_active.svg'
import useIconProps from '../../misc/useIconProps'
import { CommonStage } from '.'
import { CustomTheme } from '../../misc/theme'

interface CheckClaimableProps {
  profile: Profile
  chainConnections: ChainConnection[]
  profileLoading: boolean
  onConfirm(): void
}

const CheckClaimable: React.FC<CheckClaimableProps> = ({
  onConfirm,
  profile,
  chainConnections,
  profileLoading,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const theme: CustomTheme = useTheme()

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm()
      }}
    >
      <Box display="flex" justifyContent="center">
        <Box className={classes.stageContent} width="100%">
          <Typography>{t('airdrop eligibility subtitle')}</Typography>
          <Box className={classes.stepsCard} bgcolor={theme.palette.cardBackground}>
            <Box className={classes.step} display="flex" alignItems="center">
              {
                // eslint-disable-next-line no-nested-ternary
                profileLoading ? (
                  <CircularProgress size={theme.spacing(2)} color="primary" />
                ) : profile.dtag ? (
                  <TickActiveIcon {...iconProps} />
                ) : (
                  <TickIcon {...iconProps} />
                )
              }
              <Box marginRight={theme.spacing(0.15)} />
              <Typography>{t('airdrop eligibility rule one')}</Typography>
            </Box>
            <Box bgcolor={theme.palette.background.paper} width="100%" height="1px" />
            <Box className={classes.step} display="flex" alignItems="center">
              {
                // eslint-disable-next-line no-nested-ternary
                profileLoading ? (
                  <CircularProgress size={theme.spacing(2)} color="primary" />
                ) : chainConnections.length ? (
                  <TickActiveIcon {...iconProps} />
                ) : (
                  <TickIcon {...iconProps} />
                )
              }
              <Box marginRight={theme.spacing(0.15)} />
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
              disabled={profileLoading}
            >
              {t('get started button')}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}

export default CheckClaimable
