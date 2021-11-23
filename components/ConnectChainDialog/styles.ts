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
    table: {
      border: `1px solid ${theme.palette.grey[100]}`,
    },
    tableCell: {
      borderBottom: 'none',
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[50],
      },
    },
    list: {
      maxHeight: theme.spacing(50),
      overflowY: 'auto',
      backgroundColor: theme.palette.grey[50],
    },
    denseCheckbox: {
      padding: 0,
      marginLeft: theme.spacing(-1.5),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
