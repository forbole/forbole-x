import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = (status?: string) => {
  const statusColor = () => {
    if (status === 'rejected' || status === 'failed') {
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
        activeStatus: {
          fontSize: theme.spacing(2),
          color: 'white',
          background: status === 'vote' ? theme.palette.primary.main : theme.palette.success.main,
          width: theme.spacing(12),
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
