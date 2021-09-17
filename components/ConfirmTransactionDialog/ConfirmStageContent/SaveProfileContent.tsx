import { Divider, Typography, Box, useTheme, Avatar } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import SaveProfileIcon from '../../../assets/images/icons/icon_profile_tx.svg'
import { useGeneralContext } from '../../../contexts/GeneralContext'
import useStyles from '../styles'

interface SaveProfileContentProps {
  msgs: TransactionMsgSaveProfile[]
}

const SaveProfileContent: React.FC<SaveProfileContentProps> = ({ msgs }) => {
  const { t } = useTranslation('common')
  const themeStyle = useTheme()
  const { theme } = useGeneralContext()
  const classes = useStyles()

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <SaveProfileIcon width={themeStyle.spacing(6)} height={themeStyle.spacing(6)} />
        <Box mt={2} mb={4}>
          <Typography variant="h4">{t('save profile')}</Typography>
        </Box>
      </Box>
      {msgs.map((msg, i) => (
        <React.Fragment key={String(i)}>
          <img
            src={msg.value.coverPicture || `/static/images/default_cover_image_${theme}.png`}
            alt="cover"
            className={classes.coverImg}
          />
          <Avatar
            className={classes.avatar}
            title={msg.value.nickname}
            src={msg.value.profilePicture || `/static/images/default_profile_pic_${theme}.png`}
          />
          <Box my={1}>
            <Typography>{t('nickname')}</Typography>
            <Typography color="textSecondary">{msg.value.nickname}</Typography>
          </Box>
          <Divider />
          <Box my={1}>
            <Typography>{t('dtag')}</Typography>
            <Typography color="textSecondary">@{msg.value.dtag}</Typography>
          </Box>
          <Divider />
          <Box my={1}>
            <Typography>{t('bio')}</Typography>
            <Typography color="textSecondary">{msg.value.bio}</Typography>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </>
  )
}

export default SaveProfileContent
