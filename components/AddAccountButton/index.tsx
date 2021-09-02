/* eslint-disable no-await-in-loop */
import { Dialog, IconButton, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import useStateHistory from '../../misc/useStateHistory'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import AddIcon from '../../assets/images/icons/icon_add wallet.svg'
import useIsMobile from '../../misc/useIsMobile'
import SelectNetworkContent from './SelectNetwork'
import SelectAddressesContent from './SelectAddresses'
import SecurityPasswordDialogContent from '../SecurityPasswordDialogContent'
import SuccessContent from '../Success'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import { closeAllLedgerConnections } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'

let ledgerTransport

enum Stage {
  SecurityPassword = 'security password',
  ConnectLedger = 'connect ledger',
  SelectNetwork = 'select network',
  SelectAddresses = 'select addresses',
  SuccessStage = 'success',
}

interface AddAccountButtonProps {
  walletId: string
}

const AddAccountButton: React.FC<AddAccountButtonProps> = ({ walletId }) => {
  const { t } = useTranslation('common')
  const smallIconProps = useIconProps()
  const classes = useStyles()
  const [crypto, setCrypto] = React.useState('')
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const onClose = () => {
    setDialogOpen(false)
    closeAllLedgerConnections()
  }
  const theme = useTheme()
  const isMobile = useIsMobile()
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.SecurityPassword
  )
  const { addAccount, accounts, wallets, viewMnemonicPhrase } = useWalletsContext()
  const wallet = wallets.find((w) => w.id === walletId)

  const onSubmit = React.useCallback(
    async (addresses) => {
      try {
        for (let i = 0; i < addresses.length; i += 1) {
          const { address, index } = addresses[i]
          await addAccount(
            { name: `${crypto} ${index}`, crypto, walletId, index, address },
            securityPassword
          )
        }
        setStage(Stage.SuccessStage, true)
      } catch (err) {
        console.log(err)
      }
    },
    [accounts, addAccount, walletId, wallet, crypto, securityPassword, viewMnemonicPhrase]
  )

  React.useEffect(() => {
    if (dialogOpen) {
      setCrypto('')
      setSecurityPassword('')
      setStage(wallet.type === 'ledger' ? Stage.ConnectLedger : Stage.SecurityPassword, true)
    }
  }, [dialogOpen, wallet])

  return (
    <>
      <IconButton onClick={() => setDialogOpen(true)} style={{ marginLeft: theme.spacing(-1) }}>
        <AddIcon {...smallIconProps} />
      </IconButton>
      <Dialog fullWidth open={dialogOpen} onClose={onClose} fullScreen={isMobile}>
        {isPrevStageAvailable ? (
          <IconButton className={classes.backButton} onClick={toPrevStage}>
            <BackIcon {...smallIconProps} />
          </IconButton>
        ) : null}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon {...smallIconProps} />
        </IconButton>
        {stage === Stage.ConnectLedger ? (
          <ConnectLedgerDialogContent
            onConnect={(transport) => {
              if (!crypto) {
                setStage(Stage.SelectNetwork)
              } else {
                ledgerTransport = transport
                setStage(Stage.SelectAddresses)
              }
            }}
            ledgerAppName={get(cryptocurrencies[crypto], 'ledgerAppName')}
          />
        ) : null}
        {stage === Stage.SecurityPassword ? (
          <SecurityPasswordDialogContent
            loading={false}
            onConfirm={(p) => {
              setSecurityPassword(p)
              setStage(Stage.SelectNetwork)
            }}
            walletId={walletId}
          />
        ) : null}
        {stage === Stage.SelectNetwork ? (
          <SelectNetworkContent
            onSelect={(c) => {
              setCrypto(c)
              setStage(wallet.type === 'ledger' ? Stage.ConnectLedger : Stage.SelectAddresses)
            }}
          />
        ) : null}
        {stage === Stage.SelectAddresses ? (
          <SelectAddressesContent
            onSelect={onSubmit}
            walletId={walletId}
            crypto={crypto}
            securityPassword={securityPassword}
            ledgerTransport={ledgerTransport}
          />
        ) : null}
        {stage === Stage.SuccessStage ? (
          <SuccessContent onClose={onClose} content="success added account" />
        ) : null}
      </Dialog>
    </>
  )
}

export default AddAccountButton
