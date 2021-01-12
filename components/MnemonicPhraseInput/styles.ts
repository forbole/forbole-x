import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(1, 3),
    border: `1px solid ${theme.palette.text.secondary}`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    ...theme.typography.body1,
    '&:hover': {
      border: `1px solid ${theme.palette.text.primary}`,
    },
  },
  label: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
}))

export default useStyles
