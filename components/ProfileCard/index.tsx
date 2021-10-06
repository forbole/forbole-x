import { Card, CardMedia, CardContent, Typography, Avatar, Box, Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface ProfileCardProps {
  profile: Profile
  onEditProfile(): void
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditProfile }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { theme } = useGeneralContext()

  return (
    <Card className={classes.container}>
      <CardMedia
        className={classes.coverImage}
        image={profile.coverPic || `/static/images/default_cover_image_${theme}.png`}
        title={profile.nickname}
      />
      <CardContent className={classes.content}>
        <Avatar
          className={classes.avatar}
          title={profile.nickname}
          src={profile.profilePic || `/static/images/default_profile_pic_${theme}.png`}
        />
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4">{profile.nickname}</Typography>
            <Typography gutterBottom>@{profile.dtag}</Typography>
          </Box>
          <Button className={classes.button} variant="outlined" onClick={onEditProfile}>
            {t('edit profile')}
          </Button>
        </Box>
        <Typography>{profile.bio}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
