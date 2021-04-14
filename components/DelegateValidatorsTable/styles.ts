import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useGetStyles = (status?: string, alignRight?: boolean) => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        container: {
          marginBottom: theme.spacing(4),
        },
        table: {
          border: `1px solid ${theme.palette.grey[100]}`,
          borderRadius: theme.shape.borderRadius,
          '& .MuiTableCell-root': {
            borderBottom: 'none',
          },
        },
        tableRow: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        tableCell: {
          borderBottom: 'none',
          fontSize: '1rem',
        },
        box: {
          cursor: 'point',
        },
        status: {
          marginRight: '35%',
        },
        validatorAvatar: {
          width: theme.spacing(3.5),
          height: theme.spacing(3.5),
          marginRight: theme.spacing(1),
        },
        flagAvatar: {
          width: theme.spacing(3.5),
          height: theme.spacing(3),
          marginRight: theme.spacing(1),
        },
        tabIndicator: {
          backgroundColor: theme.palette.text.primary,
        },
        star: {
          marginLeft: theme.spacing(4),
          verticalAlign: 'initial',
        },
        activeStatus: {
          height: theme.spacing(3.5),
          marginRight: theme.spacing(1),
          marginLeft: '5%',
          position: 'relative',
          paddingLeft: theme.spacing(2.5),
          fontSize: '0.875rem',
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '10%',
          '&:before': {
            content: '""',
            width: theme.spacing(1.5),
            marginLeft: '5%',
            height: theme.spacing(1.5),
            left: '0',
            top: '20%',
            background: status ? theme.palette.statusColor[status] : 'grey',
            display: 'block',
            position: 'absolute',
            borderRadius: '15px',
          },
        },
        inActiveStatus: {
          width: '100%',
          // width: theme.spacing(7),
          height: theme.spacing(3.5),
          marginRight: theme.spacing(1),
          // marginLeft: '5%',
          position: 'relative',
          // paddingLeft: theme.spacing(2.5),
          // fontSize: '0.875rem',
          // background: 'blue',
          display: 'flex',
          // justifyContent: 'flex-end',
          justifyContent: alignRight ? 'flex-end' : 'flex-start',
          // flex: 1,
          // '&:before': {
          //   content: '""',
          //   width: theme.spacing(1.5),
          //   marginLeft: '5%',
          //   height: theme.spacing(1.5),
          //   left: '0',
          //   top: '20%',
          //   // background: '#FFD800',
          //   background: status ? theme.palette.statusColor[status] : 'grey',
          //   display: 'block',
          //   position: 'absolute',
          //   borderRadius: '15px',
          // },
        },
        typograph: {
          width: theme.spacing(15),
          // // width: theme.spacing(7),
          // height: theme.spacing(3.5),
          // marginRight: theme.spacing(1),
          // marginRight: '5%',
          // marginLeft: '5%',
          marginLeft: theme.spacing(4),
          // position: 'relative',
          // left: '10',
          // paddingLeft: theme.spacing(3.5),
          // fontSize: '0.875rem',
          // width: theme.spacing(13),
          // background: 'white',
          // flex: 1,
          '&:before': {
            content: '""',
            width: theme.spacing(1.5),
            marginLeft: '-20px',
            // marginLeft: theme.spacing(3.5),
            height: theme.spacing(1.5),
            // left: '0',
            top: '20%',
            background: theme.palette.statusColor[status]
              ? theme.palette.statusColor[status]
              : 'grey',
            display: 'block',
            position: 'absolute',
            borderRadius: '15px',
          },
        },
        button: {
          fontWeight: 400,
          padding: '0.4rem 1rem',
          background: '#FD3B4C',
          borderRadius: 5,
          color: '#FFFFFF',
          textDecoration: 'none',
          marginLeft: theme.spacing(9),
        },
        table__label: {
          fontWeight: 500,
          // background: 'red',
        },
        helpOutLintContainer: {
          display: 'inline-flex',
        },
        helpOutLine: {
          width: '0.9rem',
          height: '0.9rem',
          marginLeft: '0.3rem',
        },
        popover: {
          pointerEvents: 'none',
        },
        popoverContainer: {
          padding: '1rem',
          maxWidth: '300px',
        },
        popoverLabel: {
          height: 0,
          display: 'flex',
          alignItems: 'center',
          paddingRight: alignRight ? '25%' : '0',
          justifyContent: alignRight ? 'flex-end' : 'flex-start',
        },
      }),
    {
      name: 'HookGlobalStyles',
      index: 2,
    }
  )
  return {
    classes: useStyles(),
  }
}
