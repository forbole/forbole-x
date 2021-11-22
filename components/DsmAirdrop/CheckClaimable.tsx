import { Button, Typography, Box, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import TickIcon from '../../assets/images/icons/tick.svg'
import useIconProps from '../../misc/useIconProps'
import { CommonStage } from '.'
import { CustomTheme } from '../../misc/theme'

interface CheckClaimableProps {
  onConfirm(): void
}

const CheckClaimable: React.FC<CheckClaimableProps> = ({ onConfirm }) => {
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
              <TickIcon {...iconProps} />
              <Box marginRight={`${theme.spacing(1.25)}`} />
              <Typography>{t('airdrop eligibility rule one')}</Typography>
            </Box>
            <Box bgcolor={theme.palette.background.paper} width="100%" height="1px" />
            <Box className={classes.step} display="flex" alignItems="center">
              <TickIcon {...iconProps} />
              <Box marginRight={`${theme.spacing(1.25)}`} />
              <Typography>{t('airdrop eligibility rule two')}</Typography>
            </Box>
          </Box>
          <Typography>{t('airdrop eligibility description')}</Typography>

          <Box flex={1} display="flex" flexDirection="column" mb={3}>
            <Button className={classes.button} color="primary" variant="contained" type="submit">
              {t('get started button')}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}

export default CheckClaimable
