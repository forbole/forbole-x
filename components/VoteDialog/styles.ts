import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    title: {
      fontSize: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    button: {
      flex: 1,
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
    dialog: {
      background: theme.palette.dialogBackground,
    },
    fullWidthButton: {
      flex: 1,
      margin: theme.spacing(2, 1),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
