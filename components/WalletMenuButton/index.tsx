import { Button, IconButton, Menu, MenuItem, Box } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import EditIcon from '../../assets/images/icons/icon_edit.svg'
import useIconProps from '../../misc/useIconProps'

const WalletMenuButton: React.FC = () => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const classes = useStyles()
  const [anchor, setAnchor] = React.useState<Element>()

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])

  return (
    <>
      <IconButton className={classes.iconButton} onClick={(e) => setAnchor(e.currentTarget)}>
        <EditIcon {...iconProps} />
      </IconButton>
      <Menu
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={!!anchor}
        onClose={onClose}
      >
        <MenuItem button>{t('change wallet moniker')}</MenuItem>
        <MenuItem button>{t('change security password')}</MenuItem>
        <MenuItem button>{t('view mnemonic phrase')}</MenuItem>
        <MenuItem button>{t('add account to wallet')}</MenuItem>
        <Box m={2}>
          <Button fullWidth variant="contained" color="primary">
            {t('delete wallet')}
          </Button>
        </Box>
      </Menu>
    </>
  )
}

export default React.memo(WalletMenuButton)
