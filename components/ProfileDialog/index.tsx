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
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import CameraIcon from '../../assets/images/icons/icon_camera.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useSendTransaction from '../../misc/tx/useSendTransaction'
import uploadIPFSImage from '../../misc/uploadIPFSImage'

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
  const sendTransaction = useSendTransaction()

  const [loading, setLoading] = React.useState(false)
  const [profile, setProfile] = React.useState(defaultProfile)
  const [coverPicUploading, setCoverPicUploading] = React.useState(false)
  const [profilePicUploading, setProfilePicUploading] = React.useState(false)
  const [isUploadErr, setIsUploadErr] = React.useState(false)

  const [errors, setErrors] = React.useState({ dtag: false, nickname: false, bio: false })

  React.useEffect(() => {
    if (open) {
      setLoading(false)
      setProfile(defaultProfile)
      setCoverPicUploading(false)
      setProfilePicUploading(false)
      setErrors({ dtag: false, nickname: false, bio: false })
    }
  }, [open])

  const onSubmit = React.useCallback(async () => {
    // Validate entries
    let hasErr = false
    const errs = { dtag: false, nickname: false, bio: false }
    if (
      profile.dtag.length < 6 ||
      profile.dtag.length > 30 ||
      !profile.dtag.match(/^[A-Za-z0-9_]+$/)
    ) {
      errs.dtag = true
      hasErr = true
    }
    if (profile.nickname && profile.nickname.length < 2) {
      errs.nickname = true
      hasErr = true
    }
    if (profile.bio.length > 1000) {
      errs.bio = true
      hasErr = true
    }
    setErrors(errs)
    if (hasErr) {
      return
    }
    try {
      setLoading(true)
      const value = {
        dtag: profile.dtag,
        nickname: profile.nickname,
        bio: profile.bio,
        profilePicture: profile.profilePic,
        coverPicture: profile.coverPic,
        creator: account.address,
      }
      // Remove key with empty space
      Object.keys(value).forEach((k) => {
        if (!value[k]) {
          delete value[k]
        }
      })
      const msgs: TransactionMsgSaveProfile[] = [
        {
          typeUrl: '/desmos.profiles.v1beta1.MsgSaveProfile',
          value,
        },
      ]
      await sendTransaction(password, account.address, {
        msgs,
        memo: '',
      })
      setLoading(false)
      onClose()
    } catch (err) {
      setLoading(false)
    }
  }, [password, account, profile, sendTransaction])

  return (
    <>
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
                <ButtonBase
                  component="div"
                  className={classes.imgOverlay}
                  onClick={async () => {
                    try {
                      const coverPic = await uploadIPFSImage(() => setCoverPicUploading(true))
                      setCoverPicUploading(false)
                      setProfile((p) => ({ ...p, coverPic }))
                    } catch (err) {
                      console.log(err)
                      setIsUploadErr(true)
                      setCoverPicUploading(false)
                    }
                  }}
                >
                  {coverPicUploading ? (
                    <CircularProgress />
                  ) : (
                    <Box className={classes.coverCameraIconContainer}>
                      <CameraIcon {...iconProps} fill={themeStyle.palette.text.primary} />
                    </Box>
                  )}
                </ButtonBase>
              </Box>
              <Box display="flex" justifyContent="flex-start">
                <Box position="relative" display="flex" mt={-4.5} ml={4}>
                  <Avatar
                    className={classes.avatar}
                    title={profile.nickname}
                    src={profile.profilePic || `/static/images/default_profile_pic_${theme}.png`}
                  />
                  <ButtonBase
                    component="div"
                    className={classes.avatarOverlay}
                    onClick={async () => {
                      try {
                        const profilePic = await uploadIPFSImage(() => setProfilePicUploading(true))
                        setProfilePicUploading(false)
                        setProfile((p) => ({ ...p, profilePic }))
                      } catch (err) {
                        console.log(err)
                        setIsUploadErr(true)
                        setProfilePicUploading(false)
                      }
                    }}
                  >
                    {profilePicUploading ? (
                      <CircularProgress />
                    ) : (
                      <Box className={classes.avatarCameraIconContainer}>
                        <CameraIcon {...iconProps} fill={themeStyle.palette.text.primary} />
                      </Box>
                    )}
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
                  error={errors.nickname}
                  helperText={errors.nickname ? t('profile nickname rules') : undefined}
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
                  error={errors.dtag}
                  helperText={errors.dtag ? t('profile dtag rules') : undefined}
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
                  error={errors.bio}
                  helperText={errors.bio ? t('profile bio rules') : undefined}
                />
              </Box>
              <Box display="flex" flex={1} pt={8}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={loading || !profile.dtag || coverPicUploading || profilePicUploading}
                  type="submit"
                >
                  {loading ? <CircularProgress size={themeStyle.spacing(3.5)} /> : t('next')}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </form>
      </Dialog>
      <Snackbar open={isUploadErr} autoHideDuration={5000} onClose={() => setIsUploadErr(false)}>
        <Alert onClose={() => setIsUploadErr(false)} severity="error">
          {t('image upload error')}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ProfileDialog
