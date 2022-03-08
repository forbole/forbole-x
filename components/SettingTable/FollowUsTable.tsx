import { Paper, Divider, Box, Typography, useTheme, Link } from '@material-ui/core'
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
      }}
    >
      <Link
        className={classes.socialMediaLink}
        href="https://twitter.com/forboleX"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box p={2} display="flex" alignItems="flex-start" justifyContent="space-between">
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

          <Typography>@forboleX</Typography>
        </Box>
      </Link>
      <Divider />
      <Link
        className={classes.socialMediaLink}
        href="https://t.me/forbole"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box p={2} display="flex" alignItems="flex-start" justifyContent="space-between">
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
      </Link>
      <Divider />
      <Link
        className={classes.socialMediaLink}
        href="https://www.forbole.com/blog"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box p={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <ForboleIcon {...iconProps} />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('forbole blog')}
            </Typography>
          </Box>
          <Typography>forbole.com/blog</Typography>
        </Box>
      </Link>
      <Divider />
      <Link
        className={classes.socialMediaLink}
        href="https://desmos.bigdipper.live/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box p={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <BigDipperExplorerIcon {...iconProps} />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('big dipper block explorer')}
            </Typography>
          </Box>
          <Typography>bigdipper.live</Typography>
        </Box>
      </Link>
      <Divider />
      <Link
        // class='social-icon-link github'
        className={classes.socialMediaLink}
        href="https://github.com/forbole"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box p={2} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex">
            <GithubIcon {...iconProps} />
            <Typography className={classes.iconText} variant="subtitle1">
              {t('github')}
            </Typography>
          </Box>
          <Typography>github.com/forbole</Typography>
        </Box>
      </Link>
    </Paper>
  )
}

export default FollowUsTable
