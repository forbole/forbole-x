import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = (status?: string) => {
  const statusColor = () => {
    if (status === 'rejected') {
      return 'unbonded'
    }
    if (status === 'removed') {
      return 'unknown'
    }
    return 'active'
  }
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        button: {
          width: theme.spacing(16),
          // padding: theme.spacing(1, 1.5),
          // color: theme.palette.button,
          // cursor: 'pointer',
          // border: `1px solid ${
          //   theme.palette.type === 'light' ? theme.palette.button : theme.palette.indicator
          // }`,
          // borderRadius: theme.shape.borderRadius,
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
