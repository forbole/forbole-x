import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      flex: 1,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    subtitle: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    title: {
      fontSize: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    dialogContent: {
      overflowY: 'auto',
      width: '100%',
    },
    fullWidthButton: {
      flex: 1,
      margin: theme.spacing(2, 1),
    },
    accountRow: {
      padding: `${theme.spacing(2.375)}px 0`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
