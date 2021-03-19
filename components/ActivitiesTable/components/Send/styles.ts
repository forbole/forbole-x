import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    event__header: {
      background: '#F6F7F9',
      padding: '0 1rem',
      color: '#777777',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    event__body_container: {
      padding: '1rem',
    },
    body_container__change: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
    },
    change__difference: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    difference__value: {
      fontSize: '1.125rem',
    },
    arrow: {
      margin: '0 0.3rem',
    },
    change__value: {
      marginLeft: '0.5rem',
    },
    body_container__info: {
      fontSize: '1rem',
    },
    info__footer: {
      display: 'flex',
      alignItems: 'center',
    },
    footer__type: {
      background: '#c9c9c9',
      borderRadius: '4px',
      padding: '0.3rem 0.875rem',
      color: 'white',
      margin: '0',
      // visibility: 'hidden',
    },
    footer__value: {
      // fontWeight: 600,
      margin: '0 0 0 2.5rem',
    },
    table: {
      border: `1px solid ${theme.palette.grey[100]}`,
      borderRadius: theme.shape.borderRadius,
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    tableCell: {
      borderBottom: 'none',
    },
    validatorAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
    checkIcon: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      verticalAlign: 'text-top',
      marginLeft: theme.spacing(0.5),
      color: theme.palette.success.main,
    },
    validatorTypography: {
      marginRight: theme.spacing(1),
    },
    amount: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      fontWeight: 600,
    },
    tabIndicator: {
      backgroundColor: theme.palette.text.primary,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
