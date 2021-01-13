import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    flex: 1,
    margin: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  selectionBox: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    height: theme.spacing(38),
    padding: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    '&:hover': {
      border: `1px solid ${theme.palette.grey[300]}`,
    },
  },
  dialogContent: {
    overflowY: 'initial',
  },
}))

export default useStyles
