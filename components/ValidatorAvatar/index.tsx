import { Box, Avatar, Typography, Link } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { formatPercentage } from '../../misc/utils';
import useStyles from './styles';

interface ValidatorAvatarProps {
  validator: Validator;
  crypto: Cryptocurrency;
  size?: 'small' | 'base' | 'large';
  withoutLink?: boolean;
  withCommission?: boolean;
}

const ValidatorAvatar: React.FC<ValidatorAvatarProps> = ({
  validator,
  crypto,
  size = 'base',
  withoutLink,
  withCommission,
}) => {
  const classes = useStyles();
  const { t, lang } = useTranslation('common');

  let avatarClass = '';
  let titleVariant: Variant = 'h5';
  if (size === 'small') {
    avatarClass = classes.smallAvatar;
    titleVariant = 'body1';
  } else if (size === 'large') {
    avatarClass = classes.largeAvatar;
    titleVariant = 'h3';
  }

  if (withCommission) {
    titleVariant = 'h6';
  }

  if (!validator) {
    return null;
  }

  return withoutLink ? (
    <Box display="flex" alignItems="center">
      <Avatar className={avatarClass} alt={validator.name} src={validator.image} />
      <Box ml={1}>
        <Typography className={classes.wrapText} color="textPrimary" variant={titleVariant}>
          {validator.name}
        </Typography>
        {withCommission ? (
          <Typography variant="body2">
            {t('validator commission', {
              commission: formatPercentage(validator.commission, lang),
            })}
          </Typography>
        ) : null}
      </Box>
    </Box>
  ) : (
    <Link
      href={`${crypto.blockExplorerBaseUrl}/validators/${validator.address}`}
      color="textPrimary"
      target="_blank">
      <Box display="flex" alignItems="center">
        <Avatar className={avatarClass} alt={validator.name} src={validator.image} />
        <Box className={classes.wrapText} ml={1}>
          {/* TODO: verify if this link works */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link color="primary" variant={titleVariant}>
            {validator.name}
          </Link>
          {withCommission ? (
            <Typography variant="body2">
              {t('validator commission', {
                commission: formatPercentage(validator.commission, lang),
              })}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Link>
  );
};

export default ValidatorAvatar;
