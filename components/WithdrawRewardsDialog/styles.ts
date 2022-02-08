import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      width: theme.spacing(16),
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    backButton: {
      position: 'absolute',
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
    dialogContent: {
      overflowY: 'auto',
      background: theme.palette.dialogBackground,
    },
    validatorAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: theme.spacing(1),
    },
    fullWidthButton: {
      flex: 1,
      margin: theme.spacing(2, 1),
    },
    totalReward: {
      marginBottom: theme.spacing(3),
    },
    h1: {
      marginBottom: theme.spacing(3),
    },
    controllLabel: {
      marginTop: theme.spacing(1),
      width: '50%',
      marginRight: 0,
      '&:nth-of-type(odd)': {
        paddingRight: theme.spacing(4),
      },
      '&:nth-of-type(even)': {
        paddingLeft: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        '&:nth-of-type(even)': {
          paddingLeft: 0,
          paddingRight: theme.spacing(4),
        },
      },
    },
    rewardsAmount: {
      flex: 1,
      textAlign: 'right',
    },
    tablePagination: {
      justifyContent: 'center',
    },
    tabIndicator: {
      backgroundColor: theme.palette.indicator,
      width: theme.spacing(1),
    },
    tabs: {
      '& .Mui-selected': {
        color: theme.palette.indicator,
      },
    },
    tab: {
      margin: theme.spacing(0, 4),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
