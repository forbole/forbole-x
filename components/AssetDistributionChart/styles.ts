import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  timeRangeButton: {
    margin: theme.spacing(0, 1),
  },
  divider: {
    position: 'absolute',
    right: 0,
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: 0,
  },
  percentText: {
    marginTop: theme.spacing(-5),
  },
}))

export default useStyles
