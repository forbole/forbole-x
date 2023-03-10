import {
  Button,
  Checkbox,
  DialogContent,
  FormControlLabel,
  Typography,
  Box,
  Link,
  useTheme,
} from '@material-ui/core';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import React from 'react';
import useStyles from './styles';
import { CustomTheme } from '../../misc/theme';

interface RequestPhraseDialogContentProps {
  onConfirm(): void;
  consent: boolean;
  setConsent: (value: boolean) => void;
  title: string;
}

const RequestPhraseDialogContent: React.FC<RequestPhraseDialogContentProps> = ({
  onConfirm,
  consent,
  setConsent,
  title,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const themeStyle: CustomTheme = useTheme();

  return (
    <Box className={classes.requestBox}>
      <form
        noValidate
        onSubmit={e => {
          e.preventDefault();
          onConfirm();
        }}>
        <DialogContent className={classes.dialogContent}>
          <Typography>{title}</Typography>
          <Box className={classes.checkboxContent}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                  style={{
                    color: themeStyle.palette.text.secondary,
                  }}
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                />
              }
              label={
                <Trans
                  i18nKey={t('private key consent')}
                  components={[
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: themeStyle.spacing(1.8),
                        color: themeStyle.palette.text.secondary,
                      }}
                    />,
                    <Link
                      href="https://medium.com/desmosnetwork/desmos-airdrop-faqs-d5107dd34f17#P6"
                      target="_blank"
                      style={{
                        fontSize: themeStyle.spacing(1.8),
                        color: themeStyle.palette.text.secondary,
                        textDecoration: 'underline',
                      }}
                    />,
                  ]}
                />
              }
            />
            <Button
              fullWidth
              variant="contained"
              classes={{ root: classes.requestButton }}
              color="primary"
              disabled={!consent}
              type="submit">
              {t('consent button')}
            </Button>
          </Box>
        </DialogContent>
      </form>
    </Box>
  );
};

export default RequestPhraseDialogContent;
