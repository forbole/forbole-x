import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

export const useGetStyles = (status?: string, alignRight?: boolean) => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        table: {
          border: `1px solid ${theme.palette.grey[100]}`,
          borderRadius: theme.shape.borderRadius,
          '& .MuiTableCell-root': {
            borderBottom: 'none',
          },
        },
        tableRow: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[50],
          },
        },
        tableCell: {
          borderBottom: 'none',
          padding: theme.spacing(1.5, 2),
          maxWidth: theme.spacing(20),
          whiteSpace: 'nowrap',
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
        activeStatus: {
          height: theme.spacing(3.5),
          marginRight: theme.spacing(1),
          marginLeft: '5%',
          position: 'relative',
          paddingLeft: theme.spacing(11.5),
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
            borderRadius: theme.spacing(2),
          },
        },
        inActiveStatus: {
          width: '100%',
          height: theme.spacing(3.5),
          marginRight: theme.spacing(1),
          position: 'relative',
          display: 'flex',
          justifyContent: alignRight ? 'flex-end' : 'flex-start',
        },
        typograph: {
          width: theme.spacing(15),
          marginLeft: theme.spacing(4),
          '&:before': {
            content: '""',
            width: theme.spacing(1),
            marginLeft: theme.spacing(-2.5),
            height: theme.spacing(1),
            top: '20%',
            background: theme.palette.statusColor[status]
              ? theme.palette.statusColor[status]
              : 'grey',
            display: 'block',
            position: 'absolute',
            borderRadius: theme.spacing(2),
          },
        },
        table__label: {
          fontWeight: 500,
        },
        helpOutLintContainer: {
          display: 'inline-flex',
        },
        helpOutLine: {
          width: theme.spacing(1.8),
          height: theme.spacing(1.8),
          marginLeft: theme.spacing(0.6),
        },
        popover: {
          pointerEvents: 'none',
        },
        popoverContainer: {
          padding: theme.spacing(2),
          maxWidth: '300px',
        },
        ellipsisText: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whitespace: 'nowrap',
        },
        itemWrapper: {
          marginTop: theme.spacing(2),
        },
        item: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        condition: {
          width: theme.spacing(1),
          height: theme.spacing(1),
          background: theme.palette.condition.zero,
          marginLeft: theme.spacing(1),
          borderRadius: '50%',
          '&.green': {
            background: theme.palette.condition.one,
          },
          '&.yellow': {
            background: theme.palette.condition.two,
          },
          '&.red': {
            background: theme.palette.condition.three,
          },
        },
      }),
    {
      name: 'HookGlobalStyles',
      index: 2,
    },
  );
  return {
    classes: useStyles(),
  };
};
