import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    container: {
      marginBottom: theme.spacing(2),
    },
    bannerImage: {
      height: theme.spacing(11.25),
      cursor: 'pointer',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
