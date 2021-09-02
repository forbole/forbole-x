import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    container: {
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    marginTop: {
      marginTop: theme.spacing(3),
      whiteSpace: 'pre-line',
      lineHeight: Number(theme.typography.h4.lineHeight || 1) * 1.2,
    },
    marginTopSub: {
      marginTop: theme.spacing(6),
    },
    button: {
      marginTop: theme.spacing(3),
      width: theme.spacing(30),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
