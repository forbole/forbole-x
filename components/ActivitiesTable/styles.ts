import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

export const useGetStyles = (tag?: string) => {
  const useStyles = React.useMemo(
    () =>
      makeStyles((theme: CustomTheme) =>
        createStyles({
          rowHeader: {
            background: theme.palette.grey[50],
            padding: theme.spacing(2),
            color: theme.palette.grey[400],
            display: 'flex',
            justifyContent: 'space-between',
          },
          wrapText: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          },
          row: {
            padding: theme.spacing(3.25, 2),
          },
          table: {
            // border: `1px solid ${theme.palette.grey[100]}`,
            borderRadius: theme.shape.borderRadius,
          },
          checkIcon: {
            verticalAlign: 'middle',
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(-0.5),
            color: theme.palette.success.main,
          },
          tabIndicator: {
            backgroundColor: theme.palette.indicator,
          },
          typograph: {
            padding: theme.spacing(2, 0),
          },
          rowContainer: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
              display: 'block',
            },
          },
          tagContainer: {
            width: theme.spacing(24),
          },
          tag: {
            background: tag ? `${theme.palette.tagColor[tag]}4D` : theme.palette.grey[100],
            color: tag ? theme.palette.tagColor[tag] : theme.palette.grey[100],
            width: 'fit-content',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(0.6, 1.75),
          },
          accountAvatar: {
            width: theme.spacing(3.5),
            height: theme.spacing(3.5),
            marginRight: theme.spacing(1),
          },
          validatorAvatar: {
            width: theme.spacing(3.5),
            height: theme.spacing(3.5),
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
          },
          validatorTypography: {
            marginRight: theme.spacing(1),
          },
          amount: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            fontWeight: 600,
          },
          receiverTypography: {
            marginLeft: theme.spacing(1),
          },
          proposalTypography: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
          },
          detail: {
            marginTop: theme.spacing(3),
          },
        }),
      ),
    [tag],
  );

  return {
    classes: useStyles(),
  };
};
