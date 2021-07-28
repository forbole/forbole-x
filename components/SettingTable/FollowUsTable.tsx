import { Divider, Box, Typography, useTheme, Paper } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { TwitterIcon, TelegramIcon } from 'react-share'
import BigDipperIcon from '../../assets/images/icons/icon_bigdipper.svg'
import ForboleIcon from '../../assets/images/icons/icon_forbole.svg'
import Githubcon from '../../assets/images/icons/icon_github.svg'
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
      <Box p={themeStyle.spacing(0.1)} pb={themeStyle.spacing(7)}>
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
        <a
          href="https://www.forbole.com/blog"
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
              <ForboleIcon {...iconProps} />
              <Typography className={classes.iconText}>{t('forbole blog')}</Typography>
            </Box>
            <Typography>forbole.com/blog</Typography>
          </Box>
        </a>
        <Divider />
        <a
          href="https://cosmos.bigdipper.live/"
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
              <Typography className={classes.iconText}>Big Dipper block explorer</Typography>
            </Box>
            <Typography>bigdipper.live</Typography>
          </Box>
        </a>
        <Divider />
        <a
          href="https://github.com/forbole"
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
              <Githubcon {...iconProps} />
              <Typography className={classes.iconText}>Github</Typography>
            </Box>
            <Typography>github.com/forbole</Typography>
          </Box>
        </a>
        <Divider />
      </Box>
    </Paper>
  )
}

export default FollowUsTable
