import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = () => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        itemButton: {
          width: theme.spacing(16),
        },
        button: {
          width: theme.spacing(16),
          '&:disabled': {
            backgroundColor: theme.palette.buttonDisabled,
            color: 'white',
          },
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
