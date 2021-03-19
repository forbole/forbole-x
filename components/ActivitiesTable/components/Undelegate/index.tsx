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

const Undelegate: React.FC<ActivitiesTableProps> = ({ activity, account }) => {
    const classes = useStyles()
    const { t, lang } = useTranslation('common')
    //   const [page, setPage] = React.useState(0)
    //   const [rowsPerPage, setRowsPerPage] = React.useState(10)
    //   const [currentTab, setCurrentTab] = React.useState(0)
    //   console.log('activities', activities)

  return (
    <div className={classes.info__footer}>
      <p className={classes.footer__type}>{a.tag.charAt(0).toUpperCase() + a.tag.slice(1)}</p>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.validatorAvatar} alt={account.name} src={account.image} />
        <Typography className={classes.validatorTypography}>{account.name}</Typography>
        {activity.tag}d
        <span className={classes.amount} >
          {formatCrypto(activity.delegatedAmount, 'ATOM', 'en')}
        </span>
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

export default Undelegate
