import { Button, IconButton, Menu, MenuItem, Box, Dialog } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import EditIcon from '../../assets/images/icons/icon_edit.svg'
import useIconProps from '../../misc/useIconProps'
import ChangeWalletMonikerDialog from './ChangeWalletMoniker'
import ChangeSecurityPasswordDialog from './ChangeSecurityPassword'
import ViewMnemonicPhraseDialog from './ViewMnemonicPhrase'
import DeleteWalletDialog from './DeleteWallet'
import MenuDialog from '.'

const WalletMenuButton: React.FC<{ walletId: string }> = ({ walletId }) => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const classes = useStyles()
  const [anchor, setAnchor] = React.useState<Element>()

  const [changeWalletNameOpen, setChangeWalletNameOpen] = React.useState(false)
  const [changeSecurityPasswordOpen, setChangeSecurityPasswordOpen] = React.useState(false)
  const [viewMnemonicPhraseOpen, setViewMnemonicPhraseOpen] = React.useState(false)
  const [createAccountOpen, setCreateAccountOpen] = React.useState(false)
  const [deleteWalletOpen, setDeleteWalletOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])
  const onClick = (e) => {
    setAnchor(e.currentTarget)
    setDialogOpen(true)
  }

  return (
    <>
      <IconButton onClick={(e) => onClick(e)}>
        <EditIcon {...iconProps} />
        111
      </IconButton>
      <Dialog open={dialogOpen}>


      </Dialog>
    </>
  )
}

export default WalletMenuButton
