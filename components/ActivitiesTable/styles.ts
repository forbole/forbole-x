import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  rowHeader: {
    background: theme.palette.grey[400],
    padding: theme.spacing(0, 2),
    color: theme.palette.grey[500],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: {
    padding: theme.spacing(3.25, 2),
  },
  table: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.shape.borderRadius,
  },
  checkIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    verticalAlign: 'middle',
    marginLeft: theme.spacing(0.5),
    color: theme.palette.success.main,
  },
  tabIndicator: {
    backgroundColor: theme.palette.text.primary,
  },
  typograph: {
    padding: theme.spacing(2, 0),
  },
}))

export default useStyles
