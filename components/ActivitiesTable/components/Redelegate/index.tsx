import { Box, Avatar, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface ActivitiesTableProps {
  activity: any
  account: any
}

// const formatPercentage = (percent: number, lang: string) =>
//   new Intl.NumberFormat(lang, {
//     style: 'percent',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
// }).format(percent)

const formatCrypto = (amount: number, unit: string, lang: string) =>
  `${new Intl.NumberFormat(lang, {
    signDisplay: 'never',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(amount)} ${unit}`

const Redelegate: React.FC<ActivitiesTableProps> = ({ activity, account }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')

  return (
    <div className={classes.info__footer}>
      <div className={classes.footer__container}>
        <p className={classes.footer__type}>
          {activity.tag.charAt(0).toUpperCase() + activity.tag.slice(1)}
        </p>
      </div>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.validatorAvatar} alt={account.name} src={account.image} />
        <Typography className={classes.validatorTypography}>{account.name}</Typography>
        {activity.tag}d
        <span className={classes.amount}>
          {formatCrypto(activity.delegatedAmount, 'ATOM', 'en')}
        </span>
        from
        <Avatar
          className={classes.validatorAvatar}
          alt={activity?.src?.name}
          src={activity?.src?.image}
        />
        <Typography className={classes.validatorTypography}>{activity?.src?.name}</Typography>to
        <Avatar
          className={classes.validatorAvatar}
          alt={activity.dst.name}
          src={activity.dst.image}
        />
        <Typography className={classes.validatorTypography}>{account.name}</Typography>
      </Box>
    </div>
  )
}

export default Redelegate
