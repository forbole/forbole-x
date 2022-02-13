import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    container: {
      padding: theme.spacing(2),
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.menuBackground,
      },
    },
    sendButton: {
      color: 'white',
      width: theme.spacing(18),
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    delegateButton: {
      color: 'white',
      width: theme.spacing(18),
      padding: theme.spacing(0.5),
    },
    withdrawButton: {
      color: 'white',
      width: theme.spacing(22),
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
