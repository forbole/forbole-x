import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    container: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    avatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: theme.spacing(1),
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[50],
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
