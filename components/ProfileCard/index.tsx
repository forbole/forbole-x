import { Card, CardMedia, CardContent, Typography, Avatar, Box, Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import Markdown from '../Markdown'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIsMobile from '../../misc/useIsMobile'

interface ProfileCardProps {
  profile: Profile
  chainConnections: ChainConnection[]
  onEditProfile(): void
  onChainConnectionClick(): void
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  chainConnections,
  onEditProfile,
  onChainConnectionClick,
}) => {
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
              size={isMobile ? 'small' : 'medium'}
            >
              {t('edit profile')}
            </Button>
          </Box>
        </Box>
        <Markdown>{profile.bio}</Markdown>
        <Button color="primary" onClick={onChainConnectionClick}>
          {t('connections', { connections: chainConnections.length })}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
