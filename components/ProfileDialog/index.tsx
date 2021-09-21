import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  useTheme,
  ButtonBase,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import invoke from 'lodash/invoke'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import CameraIcon from '../../assets/images/icons/icon_camera.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface ProfileDialogProps {
  open: boolean
  onClose(): void
  profile: Profile
  account: Account
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  profile: defaultProfile,
  open,
  onClose,
  account,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const themeStyle = useTheme()
  const { theme } = useGeneralContext()
  const { password } = useWalletsContext()

  const [loading, setLoading] = React.useState(false)
  const [profile, setProfile] = React.useState(defaultProfile)

  React.useEffect(() => {
    if (open) {
      setLoading(false)
      setProfile(defaultProfile)
    }
  }, [open])

  const onSubmit = React.useCallback(async () => {
    try {
      setLoading(true)
      const msgs = [
        {
          typeUrl: '/desmos.profiles.v1beta1.MsgSaveProfile',
          value: {
            dtag: profile.dtag,
            nickname: profile.nickname,
            bio: profile.bio,
            profilePicture: profile.profilePic,
            coverPicture: profile.coverPic,
            creator: account.address,
          },
        },
      ]
      await invoke(window, 'forboleX.sendTransaction', password, account.address, {
        msgs,
        memo: '',
      })
      setLoading(false)
      onClose()
    } catch (err) {
      setLoading(false)
    }
  }, [password, account, profile])

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t(profile.dtag ? 'edit profile' : 'create profile')}</DialogTitle>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <DialogContent>
          <Box pb={2}>
            <Box position="relative" display="flex">
              <img
                src={profile.coverPic || `/static/images/default_cover_image_${theme}.png`}
                alt="cover"
                className={classes.coverImg}
              />
              <ButtonBase component="div" className={classes.imgOverlay}>
                <CameraIcon {...iconProps} />
              </ButtonBase>
            </Box>
            <Box display="flex" justifyContent="flex-start">
              <Box position="relative" display="flex" mt={-4.5} ml={4}>
                <Avatar
                  className={classes.avatar}
                  title={profile.nickname}
                  src={profile.profilePic || `/static/images/default_profile_pic_${theme}.png`}
                />
                <ButtonBase component="div" className={classes.avatarOverlay}>
                  <CameraIcon {...iconProps} />
                </ButtonBase>
              </Box>
            </Box>
            <Box mt={3}>
              <Typography>{t('nickname')}</Typography>
              <TextField
                fullWidth
                variant="filled"
                placeholder={t('nickname placeholder')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={profile.nickname}
                onChange={(e) => setProfile((p) => ({ ...p, nickname: e.target.value }))}
              />
            </Box>
            <Box mt={3}>
              <Typography>{t('dtag')}</Typography>
              <TextField
                fullWidth
                variant="filled"
                placeholder={t('dtag placeholder')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={profile.dtag}
                onChange={(e) => setProfile((p) => ({ ...p, dtag: e.target.value }))}
              />
            </Box>
            <Box mt={3}>
              <Typography>{t('bio')}</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="filled"
                placeholder={t('bio placeholder')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={profile.bio}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              />
            </Box>
            <Box display="flex" flex={1} pt={8}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disabled={loading || !profile.dtag}
                type="submit"
              >
                {loading ? <CircularProgress size={themeStyle.spacing(3.5)} /> : t('next')}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ProfileDialog
