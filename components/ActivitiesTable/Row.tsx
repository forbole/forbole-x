import { Box, Avatar, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { formatCrypto, formatTokenAmount } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'

interface RowProps {
  activity: Activity
  account: Account
  crypto: Cryptocurrency
}

const Row: React.FC<RowProps> = ({ activity, account, crypto }) => {
  const { classes } = useGetStyles(activity.tag)
  const { t, lang } = useTranslation('common')
  const isMobile = useIsMobile()

  const Content = () => {
    if (activity.tag === 'delegate') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('to')}
          </Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.name}
            src={activity.detail.image}
          />
          <Typography className={classes.validatorTypography}>{activity.detail.name}</Typography>
        </>
      )
    }
    if (activity.tag === 'redelegate') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('from').toLocaleLowerCase()}
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
        </>
      )
    }
    if (activity.tag === 'undelegate') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span>
            {t('from').toLocaleLowerCase()}
          </Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.name}
            src={activity.detail.image}
          />
          <Typography className={classes.validatorTypography}>{activity.detail.name}</Typography>
        </>
      )
    }
    if (activity.tag === 'deposit') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
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
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)}
            {/* TODO: get rewards amount */}
            {/* <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span> */}{' '}
            {t('from').toLocaleLowerCase()}
          </Typography>
          <Avatar
            className={classes.validatorAvatar}
            alt={activity.detail.name}
            src={activity.detail.image}
          />
          <Typography className={classes.validatorTypography}>{activity.detail.name}</Typography>
        </>
      )
    }
    if (activity.tag === 'multisend') {
      return (
        <>
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
            <Typography className={classes.validatorTypography}>{account.name}</Typography>
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
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
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
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
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
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
        </>
      )
    }
    if (activity.tag === 'vote') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
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
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
        </>
      )
    }
    if (activity.tag === 'submitProposal') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>{t(`${activity.tag}Activity`)}</Typography>
          <Typography className={classes.proposalTypography}>{activity.detail.name}</Typography>
        </>
      )
    }
    if (activity.tag === 'editValidator') {
      return (
        <>
          <Avatar className={classes.accountAvatar} alt={account.name} src={crypto.image} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          <Typography>
            {t(`${activity.tag}Activity`)} {activity.detail.name}
          </Typography>
        </>
      )
    }
    if (activity.tag === 'send') {
      // eslint-disable-next-line react/require-default-props
      const Self = ({ marginLeft }: { marginLeft?: boolean }) => (
        <>
          <Avatar
            className={marginLeft ? classes.validatorAvatar : classes.accountAvatar}
            alt={account.name}
            src={crypto.image}
          />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
        </>
      )
      return (
        <>
          {activity.detail.fromAddress === account.address ? (
            <Self />
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
          {activity.detail.toAddress === account.address ? (
            <Self marginLeft />
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
