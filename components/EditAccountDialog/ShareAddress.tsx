import {
  Box,
  Button,
  Snackbar,
  DialogContent,
  Divider,
  Typography,
  useTheme,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { Alert } from '@material-ui/lab';
import QRCode from 'qrcode.react';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';
import FacebookIcon from '../../assets/images/icons/facebook.svg';
import TwitterIcon from '../../assets/images/icons/twitter.svg';
import TelegramIcon from '../../assets/images/icons/telegram.svg';
import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';
import EmailIcon from '../../assets/images/icons/gmail.svg';
import useStyles from './styles';
import { CustomTheme } from '../../misc/theme';

interface ShareAddressProps {
  address: string;
}

const ShareAddress: React.FC<ShareAddressProps> = ({ address }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const theme: CustomTheme = useTheme();
  const [isCopySuccess, setIsCopySuccess] = React.useState(false);

  const copyText = React.useCallback(() => {
    navigator.clipboard.writeText(address);
    setIsCopySuccess(true);
  }, [address]);

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box my={2} display="flex">
          <Box>
            <Typography>{t('address')}</Typography>
            <Typography color="textSecondary">{address}</Typography>
          </Box>
          <Box justifyContent="flex-end" display="flex" flex={1} alignItems="center">
            <Button variant="outlined" className={classes.iconButton} onClick={copyText}>
              {t('copy')}
            </Button>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box mt={3}>
          <Typography>{t('share to')}</Typography>
        </Box>
        <Box mt={2} display="flex">
          <Box width={theme.spacing(7)}>
            <FacebookShareButton
              url="https://www.forbole.com/"
              quote={address}
              hashtag="#forbole-X"
              className={classes.socialMediaButton}
            >
              <FacebookIcon
                size={42}
                round
                iconFillColor={theme.palette.socialMediaIcon.fill}
                bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
              />
            </FacebookShareButton>
          </Box>

          <Box width={theme.spacing(7)}>
            <TwitterShareButton
              url="https://www.forbole.com/"
              title={address}
              hashtags={['#forbole']}
              className={classes.socialMediaButton}
            >
              <TwitterIcon
                size={42}
                round
                iconFillColor={theme.palette.socialMediaIcon.fill}
                bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
              />
            </TwitterShareButton>
          </Box>

          <Box width={theme.spacing(7)}>
            <TelegramShareButton
              url="https://www.forbole.com/"
              title={address}
              className={classes.socialMediaButton}
            >
              <TelegramIcon
                size={42}
                round
                iconFillColor={theme.palette.socialMediaIcon.fill}
                bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
              />
            </TelegramShareButton>
          </Box>

          <Box width={theme.spacing(7)}>
            <WhatsappShareButton
              url="https://www.forbole.com/"
              title={address}
              separator=":: "
              className={classes.socialMediaButton}
            >
              <WhatsappIcon
                size={42}
                round
                iconFillColor={theme.palette.socialMediaIcon.fill}
                bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
              />
            </WhatsappShareButton>
          </Box>

          <Box width={theme.spacing(7)}>
            <EmailShareButton
              url="https://www.forbole.com/"
              subject="backup mnemonic phrase"
              body={address}
              separator=":: "
              className={classes.socialMediaButton}
            >
              <EmailIcon
                size={42}
                round
                iconFillColor={theme.palette.socialMediaIcon.fill}
                bgStyle={{ fill: theme.palette.socialMediaIcon.background }}
              />
            </EmailShareButton>
          </Box>
        </Box>
        <Box my={4} justifyContent="center" display="flex">
          <Box textAlign="center">
            <QRCode value={address} size={175} bgColor="#ffffff" fgColor="#000000" renderAs="svg" />
            <Typography>{t('scan for address')}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <Snackbar
        open={isCopySuccess}
        autoHideDuration={5000}
        onClose={() => setIsCopySuccess(false)}
      >
        <Alert onClose={() => setIsCopySuccess(false)} severity="success">
          {t('copied to clipboard')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareAddress;
