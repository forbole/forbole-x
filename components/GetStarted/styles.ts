import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15vh',
    width: theme.spacing(60),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    width: theme.spacing(30),
  },
}))

export default useStyles
