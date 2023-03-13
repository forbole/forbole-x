import React from 'react';
import sendMsgToChromeExt from '../misc/sendMsgToChromeExt';
import usePersistedState from '../misc/usePersistedState';
import { useGeneralContext } from './GeneralContext';

const PASSWORD_EXPIRES_IN_MIN = 15;

interface WalletsState {
  isFirstTimeUser: boolean;
  appUnlockState: AppUnlockState;
  isChromeExtInstalled: boolean;
  wallets: Wallet[];
  accounts: Account[];
  password: string;
  updatePassword?: (password: string) => void;
  unlockWallets?: (password: string) => void;
  addWallet?: (wallet: CreateWalletParams) => void;
  updateWallet?: (id: string, wallet: UpdateWalletParams) => void;
  deleteWallet?: (id: string) => void;
  addAccount?: (account: CreateAccountParams, securityPassword: string) => void;
  updateAccount?: (address: string, walletId: string, account: UpdateAccountParams) => void;
  deleteAccount?: (address: string, walletId: string) => void;
  viewMnemonicPhrase?: (id: string, securityPassword: string) => Promise<string>;
  viewMnemonicPhraseBackup?: (
    id: string,
    securityPassword: string,
    backupPassword: string,
  ) => Promise<string>;
  reset?: () => void;
  signOut?: () => void;
}

const initialState: WalletsState = {
  isFirstTimeUser: false,
  appUnlockState: 'locked',
  isChromeExtInstalled: false,
  wallets: [],
  accounts: [],
  password: '',
};

const WalletsContext = React.createContext<WalletsState>(initialState);

const WalletsProvider: React.FC = ({ children }) => {
  const { alwaysRequirePassword } = useGeneralContext();
  const [wallets, setWallets] = React.useState<Wallet[]>([]);
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [appUnlockState, setAppUnlockState] = React.useState(initialState.appUnlockState);
  const [isFirstTimeUser, setIsFirstTimeUser] = usePersistedState('isFirstTimeUser', false);
  const [isChromeExtInstalled, setIsChromeExtInstalled] = React.useState(false);
  const [password, setPassword] = usePersistedState(
    'password',
    '',
    PASSWORD_EXPIRES_IN_MIN * 60 * 1000,
    alwaysRequirePassword,
  );

  const reset = React.useCallback(async () => {
    await sendMsgToChromeExt({
      event: 'reset',
    });
    setIsFirstTimeUser(true);
    setAccounts([]);
    setWallets([]);
    setPassword('');
    setAppUnlockState('locked');
  }, [setIsFirstTimeUser, setAccounts, setWallets, setPassword, setAppUnlockState]);

  const checkIsFirstTimeUser = React.useCallback(async () => {
    try {
      const response = await sendMsgToChromeExt({
        event: 'ping',
      });
      setIsFirstTimeUser(response.isFirstTimeUser);
      setIsChromeExtInstalled(true);
    } catch (err) {
      setIsChromeExtInstalled(false);
    }
  }, []);

  const unlockWallets = React.useCallback(
    async (pw: string) => {
      try {
        if (!isFirstTimeUser) {
          setAppUnlockState('unlocking');
          const walletaResponse = await sendMsgToChromeExt({
            event: 'getWallets',
            data: {
              password: pw,
            },
          });
          const accountsResponse = await sendMsgToChromeExt({
            event: 'getAccounts',
            data: {
              password: pw,
            },
          });
          setWallets(walletaResponse.wallets);
          setAccounts(accountsResponse.accounts);
          setAppUnlockState('unlocked');
        }
        setPassword(pw);
      } catch (err) {
        setAppUnlockState('locked');
        throw err;
      }
    },
    [isFirstTimeUser, setPassword, setWallets, setAccounts, setAppUnlockState],
  );

  const signOut = React.useCallback(() => {
    setAppUnlockState(initialState.appUnlockState);
    setPassword(initialState.password);
    setWallets(initialState.wallets);
    setAccounts(initialState.accounts);
  }, []);

  const updatePassword = React.useCallback(
    async (pw: string) => {
      await sendMsgToChromeExt({
        event: 'changeUnlockPassword',
        data: {
          oldPassword: password,
          password: pw,
        },
      });
      setPassword(pw);
    },
    [setPassword, password],
  );

  const addWallet = React.useCallback(
    async (wallet: CreateWalletParams) => {
      const result = await sendMsgToChromeExt({
        event: 'addWallet',
        data: {
          wallet,
          password,
        },
      });
      setIsFirstTimeUser(false);
      setWallets(ws => [{ ...result.wallet, type: wallet.type }, ...ws]);
      setAccounts(acs => [...result.accounts, ...acs]);
    },
    [password, setIsFirstTimeUser, setWallets, setAccounts],
  );

  const updateWallet = React.useCallback(
    async (id: string, wallet: UpdateWalletParams) => {
      const result = await sendMsgToChromeExt({
        event: 'updateWallet',
        data: {
          wallet,
          id,
          password,
        },
      });
      setWallets(ws => ws.map(w => (w.id === id ? result.wallet : w)));
    },
    [password, setWallets],
  );

  const deleteWallet = React.useCallback(
    async (id: string) => {
      await sendMsgToChromeExt({
        event: 'deleteWallet',
        data: {
          id,
          password,
        },
      });
      await Promise.all(
        accounts
          .filter(a => a.walletId === id)
          .map(a =>
            sendMsgToChromeExt({
              event: 'deleteAccount',
              data: {
                address: a.address,
                walletId: a.walletId,
                password,
              },
            }),
          ),
      );
      setWallets(ws => {
        const newWallets = ws.filter(w => w.id !== id);
        if (!newWallets.length) {
          reset();
        }
        return newWallets;
      });
      setAccounts(acs => acs.filter(a => a.walletId !== id));
    },
    [password, accounts, setWallets, setIsFirstTimeUser, setAccounts, reset],
  );

  const addAccount = React.useCallback(
    async (account: CreateAccountParams, securityPassword: string) => {
      const result = await sendMsgToChromeExt({
        event: 'addAccount',
        data: {
          account,
          securityPassword,
          password,
        },
      });
      setAccounts(acs => [result.account, ...acs]);
    },
    [password, accounts, setAccounts],
  );

  const updateAccount = React.useCallback(
    async (address: string, walletId: string, account: UpdateAccountParams) => {
      const result = await sendMsgToChromeExt({
        event: 'updateAccount',
        data: {
          account,
          address,
          walletId,
          password,
        },
      });
      setAccounts(acs =>
        acs.map(a => (a.address === address && a.walletId === walletId ? result.account : a)),
      );
    },
    [password, setAccounts],
  );

  const deleteAccount = React.useCallback(
    async (address: string, walletId: string) => {
      await sendMsgToChromeExt({
        event: 'deleteAccount',
        data: {
          address,
          walletId,
          password,
        },
      });
      setAccounts(acs => acs.filter(a => a.address !== address || a.walletId !== walletId));
    },
    [password, setAccounts],
  );

  // Can be used to verify security password
  const viewMnemonicPhrase = React.useCallback(
    async (id: string, securityPassword: string) => {
      const { mnemonic } = await sendMsgToChromeExt({
        event: 'viewMnemonicPhrase',
        data: {
          id,
          securityPassword,
          password,
        },
      });
      return mnemonic;
    },
    [password],
  );

  const viewMnemonicPhraseBackup = React.useCallback(
    async (id: string, securityPassword: string, backupPassword: string) => {
      const { mnemonic } = await sendMsgToChromeExt({
        event: 'viewMnemonicPhraseBackup',
        data: {
          id,
          securityPassword,
          backupPassword,
          password,
        },
      });
      return mnemonic;
    },
    [password],
  );

  React.useEffect(() => {
    checkIsFirstTimeUser();
  }, []);

  return (
    <WalletsContext.Provider
      value={{
        isFirstTimeUser,
        appUnlockState,
        isChromeExtInstalled,
        wallets,
        accounts,
        password,
        unlockWallets,
        addWallet,
        updateWallet,
        deleteWallet,
        addAccount,
        updateAccount,
        deleteAccount,
        viewMnemonicPhraseBackup,
        viewMnemonicPhrase,
        reset,
        updatePassword,
        signOut,
      }}>
      {children}
    </WalletsContext.Provider>
  );
};

const useWalletsContext = (): WalletsState => React.useContext(WalletsContext);

export { WalletsProvider, useWalletsContext };
