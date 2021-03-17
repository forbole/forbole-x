import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    smallAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    largeAvatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
