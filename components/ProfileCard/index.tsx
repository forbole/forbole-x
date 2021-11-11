import { Card, CardMedia, CardContent, Typography, Avatar, Box, Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIsMobile from '../../misc/useIsMobile'

interface ProfileCardProps {
  profile: Profile
  onEditProfile(): void
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditProfile }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { theme } = useGeneralContext()
  const isMobile = useIsMobile()

  return (
    <Card className={classes.container}>
      <CardMedia
        className={classes.coverImage}
        image={profile.coverPic || `/static/images/default_cover_image_${theme}.png`}
        title={profile.nickname}
      />
      <CardContent className={classes.content}>
        <Box display={isMobile ? 'flex' : 'block'} alignItems="flex-end">
          <Avatar
            className={classes.avatar}
            title={profile.nickname}
            src={profile.profilePic || `/static/images/default_profile_pic_${theme}.png`}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={isMobile ? 'center' : 'flex-start'}
            flex={1}
          >
            <Box ml={isMobile ? 2 : 0}>
              <Typography variant={isMobile ? 'h6' : 'h4'}>{profile.nickname}</Typography>
              <Box mt={isMobile ? -1 : 0} mb={isMobile ? 2 : 0}>
                <Typography
                  variant={isMobile ? 'body2' : 'body1'}
                  color="textSecondary"
                  gutterBottom
                >
                  @{profile.dtag}
                </Typography>
              </Box>
            </Box>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={onEditProfile}
              size="small"
            >
              {t('edit profile')}
            </Button>
          </Box>
        </Box>
        <Typography>{profile.bio}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
