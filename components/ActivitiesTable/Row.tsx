import { Box, Avatar, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { formatCrypto, formatTokenAmount } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import AccountAvatar from '../AccountAvatar'
import ValidatorAvatar from '../ValidatorAvatar'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  note?: string
  img?: string
}

interface RowProps {
  address?: FavAddress
  activity: Activity
  account?: Account
  crypto: Cryptocurrency
}

const Row: React.FC<RowProps> = ({ activity, account, crypto, address }) => {
  const { classes } = useGetStyles(activity.tag)
  const { t, lang } = useTranslation('common')
  const isMobile = useIsMobile()
  const accountDetail = account
    ? { name: account.name, address: account.address }
    : { name: address.moniker, address: address.address }
  const Content = () => {
    if (activity.tag === 'delegate') {
      return (
        <>
          <Box mr={1}>
            <AccountAvatar account={account} address={address} hideAddress size="small" />
          </Box>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('to')}
          </Typography>
          <Box ml={1}>
            <ValidatorAvatar crypto={crypto} validator={activity.detail.validator} size="small" />
          </Box>
        </>
      )
    }
    if (activity.tag === 'redelegate') {
      return (
        <>
          <Box mr={1}>
            <AccountAvatar account={account} address={address} hideAddress size="small" />
          </Box>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('from').toLocaleLowerCase()}
          </Typography>
          <Box mx={1}>
            <ValidatorAvatar
              crypto={crypto}
              validator={activity.detail.srcValidator}
              size="small"
            />
          </Box>
          <Typography>{t('to')}</Typography>
          <Box ml={1}>
            <ValidatorAvatar
              crypto={crypto}
              validator={activity.detail.dstValidator}
              size="small"
            />
          </Box>
        </>
      )
    }
    if (activity.tag === 'undelegate') {
      return (
        <>
          <Box mr={1}>
            <AccountAvatar account={account} address={address} hideAddress size="small" />
          </Box>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('from').toLocaleLowerCase()}
          </Typography>
          <Box ml={1}>
            <ValidatorAvatar crypto={crypto} validator={activity.detail.validator} size="small" />
          </Box>
        </>
      )
    }
    if (activity.tag === 'deposit') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('to')}
          </Typography>
          <Typography className={classes.receiverTypography}>{activity.detail.name}</Typography>
        </>
      )
    }
    if (activity.tag === 'withdrawReward') {
      return (
        <>
          <Box mr={1}>
            <AccountAvatar account={account} address={address} hideAddress size="small" />
          </Box>
          <Typography>
            {t(`${activity.tag}Activity`)}
            {/* TODO: get rewards amount */}
            {/* <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span> */}{' '}
            {t('from').toLocaleLowerCase()}
          </Typography>
          <Box ml={1}>
            <ValidatorAvatar crypto={crypto} validator={activity.detail.validator} size="small" />
          </Box>
        </>
      )
    }
    if (activity.tag === 'multisend') {
      return (
        <>
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
            <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatTokenAmount(activity.amount, crypto.name, lang)}
              </span>
              {t('toTheFollowingRecepients')}
            </Typography>
          </Box>
          <Box className={classes.detail}>
            {activity.detail.map((x, i) => (
              <Typography key={`${x.address}_${i}`}>
                {x.address} {t('received')}{' '}
                <span className={classes.amount}>{formatCrypto(x.amount, crypto.name, lang)}</span>
              </Typography>
            ))}
          </Box>
        </>
      )
    }
    if (activity.tag === 'createValidator') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity?.detail?.name}
            src={activity?.detail?.image}
          />
          <Typography className={classes.validatorTypography}>{activity?.detail?.name}</Typography>
        </>
      )
    }
    if (activity.tag === 'fund') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('toCommunityPool')}
          </Typography>
        </>
      )
    }
    if (activity.tag === 'verifyInvariant') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
        </>
      )
    }
    if (activity.tag === 'vote') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Typography className={classes.proposalTypography}>{activity.detail.name}</Typography>
          <Typography>
            {t('with')}
            <span className={classes.amount}>{activity.detail.ans}</span>
          </Typography>
        </>
      )
    }
    if (activity.tag === 'unjail') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
        </>
      )
    }
    if (activity.tag === 'submitProposal') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Typography className={classes.proposalTypography}>{activity.detail.name}</Typography>
        </>
      )
    }
    if (activity.tag === 'editValidator') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)} {activity.detail.name}
          </Typography>
        </>
      )
    }
    if (activity.tag === 'send') {
      return (
        <>
          {activity.detail.fromAddress === accountDetail.address ? (
            <Box mr={1}>
              <AccountAvatar account={account} address={address} hideAddress size="small" />
            </Box>
          ) : (
            <Typography className={classes.proposalTypography}>
              {activity.detail.fromAddress}
            </Typography>
          )}
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('to')}
          </Typography>
          {activity.detail.toAddress === accountDetail.address ? (
            <Box ml={1}>
              <AccountAvatar account={account} address={address} hideAddress size="small" />
            </Box>
          ) : (
            <Typography className={classes.proposalTypography}>
              {activity.detail.toAddress}
            </Typography>
          )}
        </>
      )
    }
    if (activity.tag === 'setRewardAddress') {
      return (
        <>
          <Typography className={classes.validatorTypography}>
            {activity.detail.srcAddress}
          </Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Typography className={classes.proposalTypography}>
            {activity.detail.dstAddress}
          </Typography>
        </>
      )
    }
    return null
  }

  return (
    <Box className={classes.rowContainer}>
      <Box className={classes.tagContainer}>
        <Typography variant="body2" className={classes.tag}>
          {t(activity.tag)}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" mt={isMobile ? 2 : 0}>
        <Content />
      </Box>
    </Box>
  )
}

export default Row
