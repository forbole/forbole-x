/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton, DialogContent, Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import ShareAddress from './ShareAddress'
import useStateHistory from '../../misc/useStateHistory'
import { getTokenAmountFromDenoms } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { useWalletsContext } from '../../contexts/WalletsContext'
import AccountInfo from './AccountInfo'
import useIsMobile from '../../misc/useIsMobile'
import EditRewardAddress from './EditRewardAddress'
import ConfirmEdit from './ConfirmEdit'
import RemoveAccount from './RemoveAccount'
import Success from '../Success'
import SecurityPassword from '../SecurityPasswordDialogContent'

enum EditAccountStage {
  AccountInfoStage = 'account info',
  RewardAddressIntroStage = 'reward address intro',
  AddressSharingStage = 'address sharing',
  EditRewardAddressStage = 'edit reward address',
  ConfiremEditStage = 'confirm edit',
  SecurityPasswordStage = 'security password',
  SuccessStage = 'success',
  RemoveAccountStage = 'remove account stage',
}

interface EditAccountDialogProps {
  account: Account
  open: boolean
  onClose(): void
  availableTokens: { coins: Array<{ amount: string; denom: string }>; tokens_prices: TokenPrice[] }
}

interface Content {
  title?: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const EditAccountDialog: React.FC<EditAccountDialogProps> = ({
  account,
  open,
  onClose,
  availableTokens,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { updateAccount, password } = useWalletsContext()
  const isMobile = useIsMobile()
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const [memo, setMemo] = React.useState('')
  const [rewardAddress, setRewardAddress] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<EditAccountStage>(
    EditAccountStage.AccountInfoStage
  )

  const saveMoniker = React.useCallback(
    async (n: string) => {
      try {
        await updateAccount(account.address, { name: n })
        onClose()
      } catch (err) {
        console.log(err)
      }
    },
    [updateAccount, account.address]
  )

  const editRewardAddress = React.useCallback(
    (r: string, m: string) => {
      setRewardAddress(r)
      setMemo(m)
      setStage(EditAccountStage.ConfiremEditStage)
    },
    [setStage, setRewardAddress, rewardAddress]
  )

  const confirmEdit = React.useCallback(() => {
    // add sendTransactionMessage
    setStage(EditAccountStage.SecurityPasswordStage)
  }, [setStage])

  // add update reward address in chrome ext and add transactionData
  const transactionData = React.useMemo(
    () => ({
      address: account.address,
      password,
      // transactions: delegations
      //   .map((r) => {
      //     const coinsToSend = getEquivalentCoinToSend(
      //       { amount: r.amount, denom },
      //       availableTokens.coins,
      //       availableTokens.tokens_prices
      //     )
      //     return formatTransactionMsg(account.crypto, {
      //       type: 'delegate',
      //       delegator: account.address,
      //       validator: r.validator.address,
      //       ...coinsToSend,
      //     })
      //   })
      //   .filter((a) => a),
      gasFee: get(crypto, 'defaultGasFee', {}),
      memo,
    }),
    [availableTokens, account, password, memo]
  )

  const { availableAmount, defaultGasFee } = React.useMemo(
    () => ({
      availableAmount: getTokenAmountFromDenoms(
        availableTokens.coins,
        availableTokens.tokens_prices
      ),
      defaultGasFee: getTokenAmountFromDenoms(
        get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
        availableTokens.tokens_prices
      ),
    }),
    [availableTokens]
  )

  const sendTransactionMessage = React.useCallback(
    async (securityPassword: string) => {
      try {
        // setLoading(true)
        // const result = await sendMsgToChromeExt({
        //   event: 'signAndBroadcastTransactions',
        //   data: {
        //     securityPassword,
        //     ...transactionData,
        //     transactions: transactionData.transactions.map((msg) =>
        //       formatTypeUrlTransactionMsg(msg)
        //     ),
        //   },
        // })
        // console.log(result)
        // setLoading(false)
        setStage(EditAccountStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case EditAccountStage.RemoveAccountStage:
        return {
          title: t('remove account'),
          dialogWidth: 'xs',
          content: <RemoveAccount onClose={onClose} address={account.address} />,
        }
      case EditAccountStage.SuccessStage:
        return {
          dialogWidth: 'xs',
          content: <Success onClose={onClose} content="rewards was successfully withdrew" />,
        }
      case EditAccountStage.SecurityPasswordStage:
        return {
          content: (
            <SecurityPassword
              onConfirm={sendTransactionMessage}
              loading={loading}
              walletId={account.walletId}
            />
          ),
        }
      case EditAccountStage.RewardAddressIntroStage:
        return {
          title: t('reward address intro title'),
          content: (
            <DialogContent className={classes.dialogContent}>
              <Box mx={4} mb={8} mt={2}>
                <Typography className={classes.marginBottom}>
                  {t('reward address detail')}
                </Typography>
              </Box>
            </DialogContent>
          ),
        }
      case EditAccountStage.AddressSharingStage:
        return {
          title: t('address sharing title'),
          content: <ShareAddress address={account.address} />,
        }
      case EditAccountStage.EditRewardAddressStage:
        return {
          title: t('edit reward address'),
          content: (
            <EditRewardAddress account={account} onNext={(r, m) => editRewardAddress(r, m)} />
          ),
        }
      case EditAccountStage.ConfiremEditStage:
        return {
          title: t('confirm edit title'),
          content: (
            <ConfirmEdit
              newRewardAddress={rewardAddress}
              currentRewardAddress={account.address}
              memo={memo}
              gasFee={defaultGasFee}
              onConfirm={confirmEdit}
              rawTransactionData=""
              denom={Object.keys(availableAmount)[0]}
            />
          ),
        }
      case EditAccountStage.AccountInfoStage:
      default:
        return {
          title: t('account info title'),
          content: (
            <AccountInfo
              account={account}
              onEdit={() => setStage(EditAccountStage.EditRewardAddressStage)}
              onRemove={() => setStage(EditAccountStage.RemoveAccountStage)}
              onSave={saveMoniker}
              onDetail={() => setStage(EditAccountStage.RewardAddressIntroStage)}
              onShare={() => setStage(EditAccountStage.AddressSharingStage)}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (open) {
      setMemo('')
      setLoading(false)
      setStage(EditAccountStage.AccountInfoStage, true)
    }
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth={content.dialogWidth || 'sm'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        className: classes.dialogContent,
      }}
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

export default EditAccountDialog
