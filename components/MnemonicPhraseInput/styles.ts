import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    input: {
      padding: theme.spacing(1, 3),
      border: `1px solid ${theme.palette.text.secondary}`,
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      ...theme.typography.body1,
      '&:hover': {
        border: `1px solid ${theme.palette.text.primary}`,
      },
    },
    label: {
      position: 'absolute',
      top: theme.spacing(1),
      left: theme.spacing(1),
      userSelect: 'none',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
