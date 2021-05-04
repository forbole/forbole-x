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
    },
    // marginLeft: {
    //   marginLeft: theme.spacing(1),
    // },
    // marginBottom: {
    //   marginBottom: theme.spacing(2),
    // },
    validatorAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: theme.spacing(1),
    },
    // percentageTextField: {
    //   width: theme.spacing(16),
    //   marginLeft: theme.spacing(2),
    // },
    // numberInput: {
    //   paddingRight: 0,
    //   marginRight: theme.spacing(-1),
    // },
    fullWidthButton: {
      flex: 1,
      margin: theme.spacing(2, 1),
    },
    tabs: {
      marginTop: theme.spacing(6),
    },
    tab: {
      margin: theme.spacing(0, 4),
    },
    tabIndicator: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.indicator,
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
    },
    rewardsAmount: {
      flex: 1,
      textAlign: 'right',
    },
    tablePagination: {
      justifyContent: 'center',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
