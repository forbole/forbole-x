import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = () => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        root: {
          width: '10px',
          height: '10px',
          background: theme.palette.condition.zero,
          margin: '0',
          borderRadius: '50%',
          '&.green': {
            background: theme.palette.condition.one,
          },
          '&.yellow': {
            background: theme.palette.condition.two,
          },
          '&.red': {
            background: theme.palette.condition.three,
          },
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
