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

const Multisend: React.FC<ActivitiesTableProps> = ({ activity, account, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')

  return (
    <div>
      <div className={classes.info__footer}>
        <div className={classes.footer__container}>
          <p className={classes.footer__type}>{t(activity.tag)}</p>
        </div>
        <Box display="flex" alignItems="center">
          <Avatar className={classes.validatorAvatar} alt={account.name} src={account.imageURL} />
          <Typography className={classes.validatorTypography}>{account.name}</Typography>
          {t(`${activity.tag}Activity`)}
          <span className={classes.amount}>{formatCrypto(activity.amount, crypto.name, lang)}</span>
          {t('toTheFollowingRecepients')}
        </Box>
      </div>
      <div className={classes.detail}>
        {activity.detail.map((x) => (
          <div>
            {x.address} {t('received')} {x.amount}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Multisend
