import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  event__header: {
    background: theme.palette.action.table,
    padding: '0 1rem',
    color: '#777777',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  event__body_container: {
    padding: '1rem',
  },
  body_container__info: {
    fontSize: '1rem',
  },
  table: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.shape.borderRadius,
  },
  checkIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    verticalAlign: 'text-top',
    marginLeft: theme.spacing(0.5),
    color: theme.palette.success.main,
  },
  tabIndicator: {
    backgroundColor: theme.palette.text.primary,
  },
}))

export default useStyles
