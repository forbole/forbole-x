import { Divider, Box, Typography, useTheme, Paper } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { TwitterIcon, TelegramIcon, EmailIcon } from 'react-share'
import BigDipperIcon from '../../assets/images/icons/icon_bigdipper.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { CustomTheme } from '../../misc/theme'

const FollowUsTable: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const themeStyle: CustomTheme = useTheme()
  const iconProps = useIconProps(3)

  return (
    <Paper>
      <Box p={themeStyle.spacing(0.1)} pb={themeStyle.spacing(8)}>
        <a
          href="https://twitter.com/forbole"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.externalLink}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            p={themeStyle.spacing(0.2)}
          >
            <Box display="flex">
              <TwitterIcon
                size={24}
                round
                iconFillColor={themeStyle.palette.socialMediaIcon.fill}
                bgStyle={{ fill: themeStyle.palette.socialMediaIcon.background }}
              />
              <Typography className={classes.iconText}>{t('twitter')}</Typography>
            </Box>
            <Typography>@Desmos Network</Typography>
          </Box>
        </a>
        <Divider />
        <a
          href="https://t.me/forbole"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.externalLink}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            p={themeStyle.spacing(0.2)}
          >
            <Box display="flex">
              <TelegramIcon
                size={24}
                round
                iconFillColor={themeStyle.palette.socialMediaIcon.fill}
                bgStyle={{ fill: themeStyle.palette.socialMediaIcon.background }}
              />
              <Typography className={classes.iconText}>{t('telegram')}</Typography>
            </Box>
            <Typography>@Desmos</Typography>
          </Box>
        </a>
        <Divider />
        <a href="mailto:support@forbole.com" className={classes.externalLink}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            p={themeStyle.spacing(0.2)}
          >
            <Box display="flex">
              <EmailIcon
                size={24}
                round
                iconFillColor={themeStyle.palette.socialMediaIcon.fill}
                bgStyle={{ fill: themeStyle.palette.socialMediaIcon.background }}
              />
              <Typography className={classes.iconText}>{t('email')}</Typography>
            </Box>
            <Typography>@Bigger Dipper</Typography>
          </Box>
        </a>
        <Divider />
        <a
          href="https://twitter.com/forbole"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.externalLink}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            p={themeStyle.spacing(0.2)}
          >
            <Box display="flex">
              <BigDipperIcon {...iconProps} />
              <Typography className={classes.iconText}>Big Dipper</Typography>
            </Box>
            <Typography>bigdipper.live</Typography>
          </Box>
        </a>
        <Divider />
      </Box>
    </Paper>
  )
}

export default FollowUsTable
