import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = () => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        button: {
          padding: theme.spacing(1, 1.5),
          color: theme.palette.button,
          cursor: 'pointer',
          border: `1px solid ${
            theme.palette.type === 'light' ? theme.palette.button : theme.palette.indicator
          }`,
          borderRadius: theme.shape.borderRadius,
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
