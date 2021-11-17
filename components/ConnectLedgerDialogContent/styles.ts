import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    dialogContent: {
      overflowY: 'initial',
    },
    selectionBox: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      height: theme.spacing(32),
      padding: theme.spacing(2, 4),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
