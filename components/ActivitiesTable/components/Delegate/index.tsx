import { Box, Avatar, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { Activity, Account, formatCrypto } from '../../index'

interface ActivitiesTableProps {
  activity: Activity
  account: Account
  crypto: Crypto
}

const Delegate: React.FC<ActivitiesTableProps> = ({ activity, account, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')

  return (
    <div className={classes.info__footer}>
      <div className={classes.footer__container}>
        <p className={classes.footer__type}>{t(activity.tag)}</p>
      </div>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.validatorAvatar} alt={account.name} src={account.imageURL} />
        <Typography className={classes.validatorTypography}>{account.name}</Typography>
        {t(`${activity.tag}Activity`)}
        <span className={classes.amount}>{formatCrypto(activity.amount, crypto.name, lang)}</span>
        to
        <Avatar
          className={classes.validatorAvatar}
          alt={activity.detail.name}
          src={activity.detail.image}
        />
        <Typography className={classes.validatorTypography}>{activity.detail.name}</Typography>
      </Box>
    </div>
  )
}

export default Delegate
