import { Button, IconButton, Menu, MenuItem, Box } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import useIconProps from '../../misc/useIconProps'
import ChangeAccountMonikerDialog from './ChangeAccountMonikerDialog'
import DeleteAccountDialog from './DeleteAccountDialog'

const AccountMenuButton: React.FC<{
  account: Account
  buttonComponent?: React.ReactElement
}> = ({ account, buttonComponent }) => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const classes = useStyles()
  const [anchor, setAnchor] = React.useState<Element>()

  const [changeAccountNameOpen, setChangeAccountNameOpen] = React.useState(false)
  const [deleteAccountOpen, setDeleteAccountOpen] = React.useState(false)

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])

  return (
    <>
      {buttonComponent ? (
        React.cloneElement(buttonComponent, { onClick: (e) => setAnchor(e.currentTarget) })
      ) : (
        <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
          <MoreIcon {...iconProps} />
        </IconButton>
      )}
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
        <MenuItem
          className={classes.menuItem}
          button
          onClick={() => {
            setChangeAccountNameOpen(true)
            onClose()
          }}
        >
          {t('change account moniker')}
        </MenuItem>
        <Box m={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setDeleteAccountOpen(true)
              onClose()
            }}
          >
            {t('delete account')}
          </Button>
        </Box>
      </Menu>
      <ChangeAccountMonikerDialog
        open={changeAccountNameOpen}
        onClose={() => setChangeAccountNameOpen(false)}
        account={account}
      />
      <DeleteAccountDialog
        open={deleteAccountOpen}
        onClose={() => setDeleteAccountOpen(false)}
        account={account}
      />
    </>
  )
}

export default React.memo(AccountMenuButton)
