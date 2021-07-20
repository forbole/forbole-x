import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) =>
    createStyles({
      timeRangeButton: {
        borderColor: theme.palette.iconBorder,
        margin: theme.spacing(0, 1),
        padding: theme.spacing(0.5, 1.5),
        width: theme.spacing(20),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
      // row: {
      //   cursor: 'pointer',
      // },
      // menuItem: {
      //   padding: theme.spacing(1),
      //   width: theme.spacing(20),
      // },
      // dialogButton: {
      //   flex: 1,
      //   margin: theme.spacing(4, 2),
      //   color: 'white',
      // },
      // closeButton: {
      //   position: 'absolute',
      //   top: theme.spacing(2),
      //   right: theme.spacing(2),
      // },
      tabIndicator: {
        backgroundColor: theme.palette.indicator,
        width: theme.spacing(1),
      },
      // tab: {
      //   '& .Mui-selected': {
      //     color: theme.palette.indicator,
      //   },
      // },
    }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
