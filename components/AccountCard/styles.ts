import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    container: {
      padding: theme.spacing(2),
    },
    name: {
      marginLeft: theme.spacing(1),
    },
  }),
  { name: 'HookGlobalStyles', index: 2 }
)

export default useStyles
