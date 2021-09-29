import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = (color?: string, status?: string) => {
  const statusColor = () => {
    if (status === 'rejected') {
      return 'unbonded'
    }
    if (status === 'invalid') {
      return 'unknown'
    }
    return 'active'
  }
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        card: {
          marginBottom: theme.spacing(3.5),
        },
        box: {
          cursor: 'pointer',
        },
        validatorAvatar: {
          width: theme.spacing(3.5),
          height: theme.spacing(3.5),
          marginRight: theme.spacing(1),
          marginLeft: theme.spacing(1.5),
        },
        ellipsisText: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whitespace: 'nowrap',
          color: theme.palette.validator,
        },
        duration: {
          marginLeft: theme.spacing(0.5),
          color: theme.palette.type === 'light' ? '#e6a332' : '#e8ad47',
        },
        divider: {
          background: theme.palette.divider,
        },
        inActiveStatus: {
          width: '100%',
          height: theme.spacing(3.5),
          marginRight: theme.spacing(1),
          position: 'relative',
          display: 'flex',
        },
        tabIndicator: {
          backgroundColor: theme.palette.indicator,
        },
        activeStatus: {
          fontSize: theme.spacing(2),
          color: 'white',
          background: status === 'vote' ? theme.palette.primary.main : theme.palette.success.main,
          width: theme.spacing(12),
          '&:hover': {
            backgroundColor:
              status === 'vote' ? theme.palette.primary.dark : theme.palette.success.dark,
          },
        },
        number: {
          color: '#00000000',
        },
        vote: {
          position: 'absolute',
          bottom: '32px',
          right: '32px',
        },
        deposit: {
          position: 'absolute',
          top: '0px',
          right: '0px',
        },
        table: {
          marginTop: theme.spacing(2),
          '& .MuiTableCell-root': {
            borderBottom: 'none',
          },
        },
        table__label: {
          fontWeight: 500,
        },
        tableCell: {
          borderBottom: 'none',
          padding: theme.spacing(1.5, 2),
          maxWidth: theme.spacing(20),
          whiteSpace: 'nowrap',
        },
        tableRow: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[50],
          },
          verticalAlign: 'baseline',
        },
        title: {
          color: theme.palette.text.secondary,
        },
        amount: {
          color: theme.palette.text.primary,
        },
        label: {
          '&:before': {
            content: '""',
            width: theme.spacing(0.5),
            marginLeft: theme.spacing(-2.5),
            height: theme.spacing(5),
            top: '0',
            background: color,
            display: 'block',
            position: 'absolute',
            borderRadius: theme.spacing(2),
          },
        },
        yes: {
          color: theme.palette.success.main,
        },
        no: {
          color: theme.palette.error.main,
        },
        veto: {
          color: theme.palette.warning.main,
        },
        abstain: {
          color: theme.palette.primary.main,
        },
        typograph: {
          width: theme.spacing(8),
          marginLeft: theme.spacing(4),
          '&:before': {
            content: '""',
            width: theme.spacing(1.5),
            marginLeft: theme.spacing(-2.5),
            height: theme.spacing(1.5),
            top: '20%',
            background: theme.palette.statusColor[statusColor()]
              ? theme.palette.statusColor[statusColor()]
              : 'grey',
            display: 'block',
            position: 'absolute',
            borderRadius: theme.spacing(2),
          },
        },
        detailTable: {
          '& th,td': {
            fontSize: theme.typography.body1.fontSize,
          },
        },
      }),
    {
      name: 'HookGlobalStyles',
      index: 2,
    }
  )
  return {
    classes: useStyles(),
  }
}
