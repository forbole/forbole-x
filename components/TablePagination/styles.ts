import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    lightGreyButton: {
      backgroundColor: theme.palette.grey[100],
      minWidth: 0,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(1.5),
      paddingTop: theme.spacing(1.5),
      marginRight: theme.spacing(1),
    },
    pageButton: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      padding: 0,
      marginRight: theme.spacing(1),
      minWidth: 0,
    },
    selectButton: {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.grey[300],
      height: theme.spacing(4.5),
      margin: theme.spacing(0, 2),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
