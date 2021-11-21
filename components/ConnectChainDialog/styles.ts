import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      flex: 1,
      margin: theme.spacing(2),
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
    selectionBox: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      height: theme.spacing(32),
      padding: theme.spacing(2, 4),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
    dialogContent: {
      overflowY: 'initial',
    },
    tableCell: {
      borderBottom: 'none',
    },
    tableRow: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
