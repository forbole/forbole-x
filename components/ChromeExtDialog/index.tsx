import { Box, Button, Typography, Dialog, DialogContent } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import useIconProps from '../../misc/useIconProps'
import useStyles from './styles'
import useIsMobile from '../../misc/useIsMobile'
import IconExtDark from '../../assets/images/icons/icon_ext_dark.svg'
import IconExtLight from '../../assets/images/icons/icon_ext_light.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'

const ChromeExtDialog: React.FC = () => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps(20)
  const classes = useStyles()
  const isMobile = useIsMobile()
  const { theme } = useGeneralContext()

  return (
    <Dialog fullWidth open fullScreen={isMobile}>
      <DialogContent>
        <Box display="flex" alignItems="center" flexDirection="column" my={8}>
          <Box my={2}>
            {theme === 'dark' ? <IconExtDark {...iconProps} /> : <IconExtLight {...iconProps} />}
          </Box>
          <Typography variant="h4">{t('chrome extention')}</Typography>
          <Typography>{t('please install chrome extension')}</Typography>
          <Button
            target="_blank"
            href={process.env.NEXT_PUBLIC_CHROME_EXT_INSTALL_URL}
            component="a"
            classes={{ root: classes.fixedWidthButton }}
            variant="contained"
            color="primary"
          >
            {t('install')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ChromeExtDialog
