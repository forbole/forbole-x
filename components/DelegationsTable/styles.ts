import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    container: {
      marginBottom: theme.spacing(2),
    },
    table: {
      // border: `1px solid ${theme.palette.grey[100]}`,
      borderRadius: theme.shape.borderRadius,
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[50],
      },
    },
    tableCell: {
      borderBottom: 'none',
    },
    validatorAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: theme.spacing(1),
    },
    tabIndicator: {
      backgroundColor: theme.palette.indicator,
    },
    wrapText: {
      maxWidth: theme.spacing(10),
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        maxWidth: theme.spacing(6),
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
