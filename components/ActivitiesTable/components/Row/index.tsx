import { Box, Avatar, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { Activity, Account, formatCrypto } from '../../index'

interface RowProps {
  activity: Activity
  account: Account
  crypto: Crypto
}

const Row: React.FC<RowProps> = ({ activity, account }) => {
  const { classes } = useGetStyles(activity.tag)
  const { t, lang } = useTranslation('common')

  const Content = () => {
    if (activity.tag === 'delegate') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatCrypto(activity.amount, crypto.name, lang)}
            </span>
            {t('to')}
          </Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.name}
            src={activity.detail.image}
          />
          <Typography className={classes.validatorTypography}>{activity.detail.name}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'redelegate') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatCrypto(activity.amount, crypto.name, lang)}
            </span>
            {t('from')}
          </Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.src.name}
            src={activity.detail.src.image}
          />
          <Typography className={classes.validatorTypography}>
            {activity.detail.src.name}
          </Typography>
          <Typography>{t('to')}</Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.dst.name}
            src={activity.detail.dst.image}
          />
          <Typography className={classes.validatorTypography}>
            {activity.detail.dst.name}
          </Typography>
        </Box>
      )
    }
    if (activity.tag === 'undelegate') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatCrypto(activity.amount, crypto.name, lang)}
            </span>
            {t('from')}
          </Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.name}
            src={activity.detail.image}
          />
          <Typography className={classes.validatorTypography}>{activity.detail.name}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'deposit') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatCrypto(activity.amount, crypto.name, lang)}
            </span>
            {t('to')}
          </Typography>
          <Typography className={classes.receiverTypography}>{activity.detail.name}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'withdrawReward') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatCrypto(activity.amount, crypto.name, lang)}
            </span>
            {t('from')}
          </Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.name}
            src={activity.detail.image}
          />
          <Typography className={classes.validatorTypography}>{activity.detail.name}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'multisend') {
      return (
        <Box>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
            <Typography className={classes.validatorTypography}>{account.name}</Typography>
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatCrypto(activity.amount, crypto.name, lang)}
              </span>
              {t('toTheFollowingRecepients')}
            </Typography>
          </Box>
          <Box className={classes.detail}>
            {activity.detail.map((x) => (
              <Typography>
                {x.address} {t('received')} {x.amount}
              </Typography>
            ))}
          </Box>
        </Box>
      )
    }
    if (activity.tag === 'createValidator') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity?.detail?.name}
            src={activity?.detail?.image}
          />
          <Typography className={classes.validatorTypography}>{activity?.detail?.name}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'fund') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatCrypto(activity.amount, crypto.name, lang)}
            </span>
            {t('toCommunityPool')}
          </Typography>
        </Box>
      )
    }
    if (activity.tag === 'verifyInvariant') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'vote') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Typography className={classes.proposalTypography}>{activity.detail.name}</Typography>
          <Typography>
            {t('with')}
            <span className={classes.amount}>{activity.detail.ans}</span>
          </Typography>
        </Box>
      )
    }
    if (activity.tag === 'unjail') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'submitProposal') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Typography className={classes.proposalTypography}>{activity.detail.name}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'editValidator') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)} {activity.detail.name}
          </Typography>
        </Box>
      )
    }
    if (activity.tag === 'send') {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.accountAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatCrypto(activity.amount, crypto.name, lang)}
            </span>
            {t('to')}
          </Typography>
          <Typography className={classes.proposalTypography}>{activity.detail.address}</Typography>
        </Box>
      )
    }
    if (activity.tag === 'setRewardAddress') {
      return (
        <Box display="flex" alignItems="center">
          <Typography className={classes.validatorTypography}>
            {activity.detail.srcAddress}
          </Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Typography className={classes.proposalTypography}>
            {activity.detail.dstAddress}
          </Typography>
        </Box>
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
      <Content />
    </Box>
  )
}

export default Row
