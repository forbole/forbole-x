import { Paper, Divider, Box, Typography, useTheme } from '@material-ui/core'
import { TwitterIcon, TelegramIcon } from 'react-share'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import ForboleIcon from '../../assets/images/icons/icon_forbole.svg'
import GithubIcon from '../../assets/images/icons/icon_github.svg'
import BigDipperExplorerIcon from '../../assets/images/icons/icon_big_dipper_explorer.svg'
import { CustomTheme } from '../../misc/theme'

const FollowUsTable: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const themeStyle: CustomTheme = useTheme()
  const iconProps = useIconProps(3)

  return (
    <Paper
      style={{
        padding: themeStyle.spacing(1),
        paddingRight: themeStyle.spacing(1),
        paddingBottom: themeStyle.spacing(50),
      }}
    >
      <a
        // class='social-icon-link github'
        className={classes.socialMediaLink}
        href="https://twitter.com/forbole"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <TwitterIcon
              size={24}
              round
              iconFillColor={themeStyle.palette.socialMediaIcon.fill}
              bgStyle={{ fill: themeStyle.palette.socialMediaIcon.background }}
            />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('twitter')}
            </Typography>
          </Box>

          <Typography>@forbole</Typography>
        </Box>
      </a>
      <Divider />
      <a
        className={classes.socialMediaLink}
        href="https://t.me/forbole"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <TelegramIcon
              size={24}
              round
              iconFillColor={themeStyle.palette.socialMediaIcon.fill}
              bgStyle={{ fill: themeStyle.palette.socialMediaIcon.background }}
            />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('telegram')}
            </Typography>
          </Box>

          <Typography>@forbole</Typography>
        </Box>
      </a>
      <Divider />
      <a
        className={classes.socialMediaLink}
        href="https://www.forbole.com/blog"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <ForboleIcon {...iconProps} />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('forbole blog')}
            </Typography>
          </Box>
          <Typography>forbole.com/blog</Typography>
        </Box>
      </a>
      <Divider />
      <a
        className={classes.socialMediaLink}
        href="https://cosmos.bigdipper.live/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <BigDipperExplorerIcon {...iconProps} />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('big dipper blog explorer')}
            </Typography>
          </Box>
          <Typography>bigdipper.live</Typography>
        </Box>
      </a>
      <Divider />
      <a
        // class='social-icon-link github'
        className={classes.socialMediaLink}
        href="https://github.com/forbole"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <GithubIcon {...iconProps} />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('github')}
            </Typography>
          </Box>
          <Typography>github.com/forbole</Typography>
        </Box>
      </a>
      <Divider />
    </Paper>
  )
}

export default FollowUsTable
