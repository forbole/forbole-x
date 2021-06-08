import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = () => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        button: {
          width: theme.spacing(16),
        },
        confirmTitle: {
          fontSize: theme.spacing(4),
        },
      }),
    {
      name: 'HookGlobalStyles',
      index: 2,
    }
  )
  return {
    classes: useStyles(),
  }
}
