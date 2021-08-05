import { Box, Button, Typography, IconButton, Dialog, DialogContent } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import useIconProps from '../../misc/useIconProps'
import useStyles from './styles'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useIsMobile from '../../misc/useIsMobile'
import IconExtDark from '../../assets/images/icons/icon_ext_dark.svg'
import IconExtLight from '../../assets/images/icons/icon_ext_light.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface ChromeExtDialogProps {
  open: boolean
  onClose(): void
}

const ChromeExtDialog: React.FC<ChromeExtDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const iconProps2 = useIconProps(20)
  const classes = useStyles()
  const isMobile = useIsMobile()
  const { theme } = useGeneralContext()

  // update chrome app link

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogContent>
        <Box display="flex" alignItems="center" flexDirection="column" my={8}>
          <Box my={2}>
            {theme === 'dark' ? <IconExtDark {...iconProps2} /> : <IconExtLight {...iconProps2} />}
          </Box>
          <Typography variant="h4">{t('chrome extention')}</Typography>
          <Typography>{t('please install chrome extension')}</Typography>
          <Button
            target="_blank"
            href="http://www.google.com/"
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
