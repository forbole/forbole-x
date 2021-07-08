import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    container: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
