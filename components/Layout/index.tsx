import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import qs from 'query-string';
import lzutf8 from 'lzutf8';
import useStyles from './styles';
import LeftMenu from './LeftMenu';
import NavBar from './NavBar';
import GetStarted from '../GetStarted';
import { useWalletsContext } from '../../contexts/WalletsContext';
import UnlockPasswordDialog from '../UnlockPasswordDialog';
import usePersistedState from '../../misc/usePersistedState';
import ConfirmTransactionDialog from '../ConfirmTransactionDialog';
import ChromeExtDialog from '../ChromeExtDialog';
import useIsChromeExt from '../../misc/useIsChromeExt';

export enum MenuWidth {
  Expanded = 32,
  Collapsed = 10,
}

interface LayoutProps {
  activeItem?: string;
  passwordRequired?: boolean;
  children: React.ReactNode;
  HeaderLeftComponent?: React.ReactNode;
  ChromeExtTitleComponent?: React.ReactNode;
  ChromeExtRightComponent?: React.ReactNode;
  back?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  activeItem,
  passwordRequired,
  HeaderLeftComponent,
  ChromeExtTitleComponent,
  ChromeExtRightComponent,
  back,
  children,
}) => {
  const classes = useStyles({});
  const theme = useTheme();
  const [isMenuExpanded, setIsMenuExpanded, loaded] = usePersistedState('isMenuExpanded', true);
  const { isFirstTimeUser, appUnlockState, isChromeExtInstalled, unlockWallets, password } =
    useWalletsContext();
  // Hide menu for chrome extension
  const router = useRouter();
  const { isChromeExt } = useIsChromeExt();

  // Open ConfirmTransactionDialog with correct query params
  const { address, transactionData, open, onClose } = React.useMemo(() => {
    const { url, query } = qs.parseUrl(router.asPath);
    return {
      address: get(router, 'query.address', ''),
      transactionData: get(router, 'query.transactionData', '')
        ? JSON.parse(
            lzutf8.decompress(get(router, 'query.transactionData', '""'), {
              inputEncoding: 'Base64',
            }),
          )
        : '',
      open: !!get(router, 'query.transactionData', ''),
      onClose: () =>
        router.replace(
          qs.stringifyUrl({
            url,
            query: { ...query, transactionData: undefined, address: undefined },
          }),
        ),
    };
  }, [router]);

  const initPassword = React.useCallback(async () => {
    try {
      if (appUnlockState !== 'unlocked') {
        if (localStorage.getItem('web-unlock-pasword')) {
          await unlockWallets(String(localStorage.getItem('web-unlock-pasword')));
          localStorage.removeItem('web-unlock-pasword');
        } else if (password) {
          await unlockWallets(password);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [password, appUnlockState, unlockWallets]);

  React.useEffect(() => {
    initPassword();
  }, [initPassword]);

  return loaded ? (
    <>
      <NavBar
        HeaderLeftComponent={HeaderLeftComponent}
        ChromeExtTitleComponent={ChromeExtTitleComponent}
        ChromeExtRightComponent={ChromeExtRightComponent}
        // eslint-disable-next-line no-nested-ternary
        menuWidth={isChromeExt || isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed}
        isChromeExt={isChromeExt}
        back={back}
      />
      {isChromeExt ? null : (
        <LeftMenu
          activeItem={activeItem}
          isMenuExpanded={isMenuExpanded}
          setIsMenuExpanded={setIsMenuExpanded}
        />
      )}
      <Box
        className={classes.main}
        style={{
          marginLeft: isChromeExt
            ? 0
            : theme.spacing(isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed),
        }}>
        {passwordRequired && isFirstTimeUser ? <GetStarted /> : null}
        {!passwordRequired || appUnlockState === 'unlocked' ? children : null}
      </Box>
      {passwordRequired && !isFirstTimeUser && isChromeExtInstalled ? (
        <UnlockPasswordDialog />
      ) : null}
      {!isChromeExtInstalled ? <ChromeExtDialog /> : null}
      {open ? (
        <ConfirmTransactionDialog
          address={address as string}
          transactionData={transactionData}
          open={open}
          onClose={onClose}
        />
      ) : null}
    </>
  ) : null;
};

export default React.memo(Layout);
