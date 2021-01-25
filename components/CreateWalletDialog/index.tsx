import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import ClossIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import React from 'react'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import Start from './Start'
import CreateWallet from './CreateWallet'
import { Secp256k1HdWallet } from '@cosmjs/launchpad'
import ConfirmMnemonic from './ConfirmMnemonic'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SecurityPassword from './SecurityPassword'
import ImportWallet from './ImportWallet'
import AccessMyWallet, { ImportStage } from './AccessMyWallet'
import WhatIsMnemonic from './WhatIsMnemonic'

enum CommonStage {
  Start = 'start',
  AccessMyWallet = 'access my wallet',
  CreateWallet = 'create wallet',
  ConfirmMnemonic = 'confirm mnemonic',
  SetSecurityPassword = 'set security password',
  ImportWallet = 'import wallet',
  WhatIsMnemonic = 'what is mnemonic',
}

type Stage = CommonStage | ImportStage

interface CreateWalletDialogProps {
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
  prevStage?: Stage
}

const CreateWalletDialog: React.FC<CreateWalletDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { addWallet } = useWalletsContext()
  const [stage, setStage] = React.useState<Stage>(CommonStage.Start)
  const [mnemonic, setMnemonic] = React.useState('')
  const [pubkey, setPubkey] = React.useState<Uint8Array>()
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const createWallet = React.useCallback(async () => {
    const wallet = await Secp256k1HdWallet.generate(24)
    setPubkey((wallet as any).pubkey)
    setMnemonic(wallet.mnemonic)
    setStage(CommonStage.CreateWallet)
  }, [setMnemonic])

  const importMnemonic = React.useCallback(
    async (input) => {
      try {
        const wallet = await Secp256k1HdWallet.fromMnemonic(input)
        setPubkey((wallet as any).pubkey)
        setMnemonic(wallet.mnemonic)
        setStage(CommonStage.SetSecurityPassword)
      } catch (err) {
        setError(t('invalid mnemonic'))
      }
    },
    [setMnemonic]
  )

  const confirmMnemonic = React.useCallback(
    (input) => {
      if (input === mnemonic) {
        setStage(CommonStage.SetSecurityPassword)
      } else {
        setError(t('invalid mnemonic'))
      }
    },
    [mnemonic, setStage, setError, pubkey]
  )

  const confirmSecurityPassword = React.useCallback(
    (pw: string) => {
      setSecurityPassword(pw)
      setStage(CommonStage.ImportWallet)
    },
    [setStage, setSecurityPassword]
  )

  const saveWallet = React.useCallback(
    async (name: string) => {
      try {
        await addWallet({
          name,
          pubkey,
          mnemonic,
          securityPassword,
        })
        onClose()
      } catch (err) {
        console.log(err)
      }
    },
    [addWallet, pubkey, mnemonic, securityPassword, onClose]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.AccessMyWallet:
        return {
          title: t('access my wallet title'),
          content: <AccessMyWallet onConfirm={setStage} onCreateWallet={createWallet} />,
          prevStage: CommonStage.Start,
        }
      case ImportStage.ImportMnemonicPhrase:
        return {
          title: t('mnemonic'),
          content: (
            <ConfirmMnemonic
              description={t('mnemonic description')}
              onConfirm={importMnemonic}
              error={error}
            />
          ),
          prevStage: CommonStage.AccessMyWallet,
        }
      case CommonStage.CreateWallet:
        return {
          title: t('create new wallet title'),
          content: (
            <CreateWallet
              mnemonic={mnemonic}
              onConfirm={() => setStage(CommonStage.ConfirmMnemonic)}
            />
          ),
          prevStage: CommonStage.Start,
        }
      case CommonStage.ConfirmMnemonic:
        return {
          title: t('create new wallet title'),
          content: (
            <ConfirmMnemonic
              description={t('confirm mnemonic description')}
              onConfirm={confirmMnemonic}
              error={error}
            />
          ),
          prevStage: CommonStage.CreateWallet,
        }
      case CommonStage.SetSecurityPassword:
        return {
          title: t('security password title'),
          content: <SecurityPassword onConfirm={confirmSecurityPassword} />,
          prevStage: CommonStage.ConfirmMnemonic,
        }
      case CommonStage.ImportWallet:
        return {
          title: t('import wallet title'),
          content: <ImportWallet onConfirm={saveWallet} />,
          prevStage: CommonStage.SetSecurityPassword,
        }
      case CommonStage.WhatIsMnemonic:
        return {
          title: t('what is mnemonic phrase'),
          content: <WhatIsMnemonic />,
          prevStage: CommonStage.Start,
        }
      case CommonStage.Start:
      default:
        return {
          title: t('create wallet title'),
          content: (
            <Start
              onWhatIsMnemonicClick={() => setStage(CommonStage.WhatIsMnemonic)}
              onCreateWalletClick={createWallet}
              onImportWalletClick={() => setStage(CommonStage.AccessMyWallet)}
            />
          ),
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      {content.prevStage ? (
        <IconButton className={classes.backButton} onClick={() => setStage(content.prevStage)}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <ClossIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{content.title}</DialogTitle>
      {content.content}
    </Dialog>
  )
}

export default CreateWalletDialog
