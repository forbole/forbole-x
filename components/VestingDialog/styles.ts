import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    title: {
      fontSize: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    table: {
      border: `1px solid ${theme.palette.grey[100]}`,
      borderRadius: theme.shape.borderRadius,
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    tableCell: {
      borderBottom: 'none',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
