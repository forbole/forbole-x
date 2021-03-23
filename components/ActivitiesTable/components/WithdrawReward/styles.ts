import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  info__footer: {
    display: 'flex',
    alignItems: 'center',
  },
  footer__container: {
    width: theme.spacing(20),
    fontSize: '14px',
  },
  footer__type: {
    background: '#243059',
    width: 'fit-content',
    borderRadius: '4px',
    padding: '0.3rem 0.875rem',
    color: 'white',
    margin: '0',
  },
  validatorAvatar: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  validatorTypography: {
    marginRight: theme.spacing(1),
  },
  amount: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontWeight: 600,
  },
}))

export default useStyles
