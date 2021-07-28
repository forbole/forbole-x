/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import invoke from 'lodash/invoke'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import useStateHistory from '../../misc/useStateHistory'
import { getEquivalentCoinToSend, getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIsMobile from '../../misc/useIsMobile'
import SelectChain from './SelectChain'
import AddChannel from './AddChannel'
import SelectDetails from './SelectDetails'

enum IBCTransferStage {
  SelectChainStage = 'select chain',
  AddChannelStage = 'add channel',
  SelectDetailsStage = 'select details',
}

interface IBCTransferDialogProps {
  account: Account
  availableTokens: AvailableTokens
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const IBCTransferDialog: React.FC<IBCTransferDialogProps> = ({
  account,
  open,
  onClose,
  availableTokens,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { password } = useWalletsContext()
  const isMobile = useIsMobile()

  const [channel, setChannel] = React.useState('')
  const [chainId, setChainId] = React.useState('')

  const [loading, setLoading] = React.useState(false)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<IBCTransferStage>(
    IBCTransferStage.SelectChainStage
  )

  const availableAmount = React.useMemo(
    () => getTokenAmountFromDenoms(availableTokens.coins, availableTokens.tokens_prices),
    [availableTokens]
  )

  const confirmChain = React.useCallback(
    (params: { chainId: string; channel: string }) => {
      console.log(params)
      setChainId(params.chainId)
      setChannel(params.channel)
      setStage(IBCTransferStage.SelectDetailsStage)
    },
    [setChainId, setChannel, setStage]
  )

  const confirmIBCTransfer = React.useCallback(
    async (amount: number, denom: string, address: string, memo: string) => {
      try {
        setLoading(true)
        const coinsToSend = getEquivalentCoinToSend(
          { amount, denom },
          availableTokens.coins,
          availableTokens.tokens_prices
        )
        const msgs = [
          {
            type: 'cosmos-sdk/MsgTransfer',
            value: {
              source_port: 'transfer',
              source_channel: channel,
              token: { denom: coinsToSend.denom, amount: coinsToSend.amount.toString() },
              sender: account.address,
              receiver: address,
              timeout_timestamp: (Date.now() + 3600000) * 1000,
            },
          },
        ]
        await invoke(window, 'forboleX.sendTransaction', password, account.address, {
          msgs,
          memo,
        })
        setLoading(false)
        onClose()
      } catch (err) {
        setLoading(false)
      }
    },
    [setStage, password, availableTokens, account, channel]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case IBCTransferStage.AddChannelStage:
        return {
          title: t('add ibc channel'),
          content: <AddChannel onConfirm={confirmChain} />,
        }
      case IBCTransferStage.SelectDetailsStage:
        return {
          title: t('ibc transfer'),
          content: (
            <SelectDetails
              onConfirm={confirmIBCTransfer}
              chainId={chainId}
              account={account}
              availableAmount={availableAmount}
              loading={loading}
            />
          ),
        }
      case IBCTransferStage.SelectChainStage:
      default:
        return {
          title: t('ibc transfer'),
          content: (
            <SelectChain
              onAddChannelClick={() => setStage(IBCTransferStage.AddChannelStage)}
              onConfirm={confirmChain}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (open) {
      setChainId('')
      setChannel('')
      setLoading(false)
      setStage(IBCTransferStage.SelectChainStage, true)
    }
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth={content.dialogWidth || 'sm'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
    >
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      {content.content}
    </Dialog>
  )
}

export default IBCTransferDialog
