import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useGetStyles = (status?: string, alignRight?: boolean) => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        itemButton: {
          width: theme.spacing(16),
        },
        menuItem: {
          padding: theme.spacing(1),
          width: theme.spacing(20),
          // borderBottom: `1px solid ${theme.palette.grey[100]}`,
        },
        dialogButton: {
          flex: 1,
          margin: theme.spacing(4, 2),
          color: 'white',
        },
        closeButton: {
          position: 'absolute',
          top: theme.spacing(2),
          right: theme.spacing(2),
        },
        smallAvatar: {
          width: theme.spacing(3),
          height: theme.spacing(3),
          marginRight: theme.spacing(1),
          // position: "absolute",
          // transform: "translateY(10%)",
          // marginLeft: "5px",
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
            width: theme.spacing(1.5),
            marginLeft: theme.spacing(-2.5),
            height: theme.spacing(1.5),
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

export default useGetStyles;
