import {
  Box,
  CircularProgress,
  Divider,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  Typography,
  IconButton,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { LaunchpadLedger } from '@cosmjs/ledger-amino';
import TerraApp from '@terra-money/ledger-terra-js';
import CopyIcon from '../../assets/images/icons/icon_copy.svg';
import LedgerImage from '../../assets/images/ledger.svg';
import LedgerDevice from '../../assets/images/ledger_device.svg';
import LedgerSignImage from '../../assets/images/sign_ledger.svg';
import LedgerSignPinImage from '../../assets/images/sign_ledger_with_PIN.svg';
import LedgerOpenAppImage from '../../assets/images/ledger_open_app.svg';
import LedgerViewTxImage from '../../assets/images/ledger_view_tx.svg';
import LedgerSignTxImage from '../../assets/images/ledger_sign_tx.svg';
import ImageDefaultDark from '../../assets/images/image_default_dark.svg';
import ImageDefaultLight from '../../assets/images/image_default_light.svg';
import useIconProps from '../../misc/useIconProps';
import useStyles from './styles';
import { closeAllLedgerConnections } from '../../misc/utils';
import { CustomTheme } from '../../misc/theme';
import { useGeneralContext } from '../../contexts/GeneralContext';

interface ConnectLedgerDialogContentProps {
  account?: Account;
  onConnect(transport: any): void;
  ledgerAppName?: string;
  signTransaction?: boolean;
  isTxSigned?: boolean;

  /**
   * Used to force the UI to update to the next ledgerapp to be connected
   */
  ledgerAppIndex?: number;
}

const signInstructions = [
  {
    image: [LedgerSignImage, LedgerSignPinImage],
    description: 'sign ledger instruction 1',
  },
  {
    image: LedgerOpenAppImage,
    description: 'open ledger app instruction',
  },
  {
    image: [LedgerViewTxImage, LedgerSignTxImage],
    description: 'sign ledger instruction 2',
  },
];

const ConnectLedgerDialogContent: React.FC<ConnectLedgerDialogContentProps> = ({
  onConnect,
  ledgerAppName,
  signTransaction,
  isTxSigned,
  account,
  ledgerAppIndex,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const [instruction, setInstruction] = React.useState(signInstructions[0]);
  const { theme } = useGeneralContext();
  const themeStyle: CustomTheme = useTheme();
  const iconProps = useIconProps();
  // const [isCopySuccess, setIsCopySuccess] = React.useState(false);
  const retryTimeoutRef = React.useRef<any>(undefined);

  const copyText = React.useCallback(
    e => {
      e.stopPropagation();
      navigator.clipboard.writeText(account ? account.address : null);
      // setIsCopySuccess(true);
    },
    [account?.address],
  );

  const connectLedger = React.useCallback(async () => {
    let transport;
    try {
      transport = await TransportWebHID.create();
      if (ledgerAppName === 'terra') {
        const ledger = new TerraApp(transport);
        // Check if ledger app is open
        const response = await ledger.getAddressAndPubKey([44, 330, 0, 0, 0], 'terra');
        if (!response || !response.bech32_address) {
          throw new Error(response.error_message);
        }
      } else {
        const ledger = new LaunchpadLedger(transport, { ledgerAppName });
        // Check if ledger app is open
        await ledger.getCosmosAppVersion();
      }
      setInstruction(signInstructions[1]);
      onConnect(transport);
      setInstruction(signInstructions[2]);
      clearTimeout(retryTimeoutRef.current);
    } catch (err) {
      if (err.name === 'TransportOpenUserCancelled') {
        // Ledger app is opened already
        setInstruction(signInstructions[0]);
      } else if (
        err.message === 'Please close OLOS and open the Desmos Ledger app on your Ledger device.'
      ) {
        setInstruction(signInstructions[1]);
      } else if (err.message.includes('The device is already open.')) {
        // Ledger is connected previously. Close the previous connections
        setInstruction(signInstructions[1]);
        closeAllLedgerConnections();
        // No specific ledger app required
      } else if (!ledgerAppName && err.message !== 'Ledger’s screensaver mode is on') {
        setInstruction(signInstructions[0]);
        onConnect(transport);
      }
    }
  }, [ledgerAppName, retryTimeoutRef, ledgerAppIndex]);

  React.useEffect(() => {
    retryTimeoutRef.current = setInterval(() => {
      connectLedger();
    }, 2000);

    const retryTimeoutID = retryTimeoutRef.current;

    return () => {
      clearTimeout(retryTimeoutID);
    };
  }, [connectLedger]);

  return (
    <DialogContent className={classes.dialogContent}>
      {isTxSigned ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%">
          <Box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'relative', display: 'flex' }}>
            <CircularProgress size={themeStyle.spacing(27)} thickness={5} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {theme === 'dark' ? (
                <ImageDefaultDark width={themeStyle.spacing(25)} height={themeStyle.spacing(25)} />
              ) : (
                <ImageDefaultLight width={themeStyle.spacing(25)} height={themeStyle.spacing(25)} />
              )}
            </Box>
          </Box>
          <Typography align="center" style={{ marginTop: themeStyle.spacing(4) }}>
            {t('sign ledger instruction 3')}
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" mb={6}>
          {account ? (
            <>
              <DialogTitle>{t('verify your address')}</DialogTitle>
              <DialogContentText>{t('verify your address description')}</DialogContentText>{' '}
            </>
          ) : (
            <>
              <DialogTitle>{t('connect ledger')}</DialogTitle>
              <DialogContentText>{t('connect ledger description')}</DialogContentText>
            </>
          )}
          {signTransaction && !isTxSigned ? (
            <>
              {instruction.image instanceof Array ? (
                <Carousel indicators={false} interval={3000}>
                  {instruction.image.map(item => {
                    const Svg = item;
                    return <Svg key={String(item)} item={item} />;
                  })}
                </Carousel>
              ) : (
                <instruction.image />
              )}
              <Box mt={4}>
                <Typography align="center">
                  {ledgerAppName
                    ? t(instruction.description, { ledgerAppName })
                    : t('connect ledger instruction')}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              {account ? (
                <Box display="flex" alignItems="center" flexDirection="column">
                  <LedgerDevice />
                  <Box
                    display="flex"
                    alignItems="center"
                    my={3}
                    pl={themeStyle.spacing(0.2)}
                    bgcolor="rgba(196, 196, 196, 0.1)"
                    borderRadius={themeStyle.spacing(1)}>
                    <Typography color="textSecondary" variant="body2">
                      {account.address}
                    </Typography>
                    <Divider
                      orientation="vertical"
                      flexItem
                      style={{
                        margin: themeStyle.spacing(1),
                        backgroundColor: themeStyle.palette.button,
                      }}
                    />
                    <IconButton style={{ paddingLeft: '0px' }} onClick={copyText}>
                      <CopyIcon {...iconProps} />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <>
                  <LedgerImage />
                  <Box mt={4}>
                    <Typography>
                      {ledgerAppName
                        ? t('open ledger app instruction', { ledgerAppName })
                        : t('connect ledger instruction')}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      )}
    </DialogContent>
  );
};

export default ConnectLedgerDialogContent;
