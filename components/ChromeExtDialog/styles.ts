import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    fixedWidthButton: {
      color: `${theme.palette.common.white} !important`,
      width: theme.spacing(20),
      marginTop: theme.spacing(6),
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.5),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
