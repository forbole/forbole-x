import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    container: {
      padding: theme.spacing(2),
      cursor: 'pointer',
      // '&:hover': {
      //   backgroundColor: ""
      // }
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
