import React from 'react';
import { Dialog, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import capitalize from 'lodash/capitalize';
import useStyles from './styles';
import EditIcon from '../../assets/images/icons/icon_edit.svg';
import CloseIcon from '../../assets/images/icons/icon_cross.svg';
import BackIcon from '../../assets/images/icons/icon_back.svg';
import WalletIcon from '../../assets/images/icons/icon_wallet_manage.svg';
import useIconProps from '../../misc/useIconProps';
import useIsMobile from '../../misc/useIsMobile';
import useStateHistory from '../../misc/useStateHistory';
import ChangeWalletMonikerDialog from './ChangeWalletMoniker';
import ChangeSecurityPassword from './ChangeSecurityPassword';
import ViewMnemonicPhrase from './ViewMnemonicPhrase';
import SelectMenu from './SelectMenu';
import DeleteWallet from './DeleteWallet';

enum Stage {
  SelectMenuStage = 'select menu',
  ChangeWalletMonikerStage = 'change wallet moniker',
  ChangeSecurityPasswordStage = 'change security password',
  ViewMnenomicPhraseStage = 'view mnenomic phrase',
  DeleteWalletStage = 'delete wallet stage',
}

interface EditWalletButtonProps {
  wallet: Wallet;
  isChromeExt?: boolean;
  onCreateWallet?: () => void;
}

interface Content {
  content: React.ReactNode;
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const EditWalletButton: React.FC<EditWalletButtonProps> = ({
  wallet,
  isChromeExt,
  onCreateWallet,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const smallIconProps = useIconProps();
  const largeIconProps = useIconProps(3);
  const isMobile = useIsMobile();
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.SelectMenuStage,
  );

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<Element>();
  const onClose = () => {
    setDialogOpen(false);
  };

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case Stage.ChangeWalletMonikerStage:
        return {
          content: <ChangeWalletMonikerDialog walletId={wallet.id} onClose={onClose} />,
        };
      case Stage.ChangeSecurityPasswordStage:
        return {
          dialogWidth: 'xs',
          content: <ChangeSecurityPassword walletId={wallet.id} onClose={onClose} />,
        };
      case Stage.ViewMnenomicPhraseStage:
        return {
          dialogWidth: 'sm',
          content: <ViewMnemonicPhrase walletId={wallet.id} onClose={onClose} />,
        };
      case Stage.DeleteWalletStage:
        return {
          dialogWidth: 'xs',
          content: <DeleteWallet walletId={wallet.id} onClose={onClose} />,
        };
      case Stage.SelectMenuStage:
      default:
        return {
          content: (
            <SelectMenu
              wallet={wallet}
              changeWalletMoniker={() => setStage(Stage.ChangeWalletMonikerStage)}
              changeSecurityPassword={() => setStage(Stage.ChangeSecurityPasswordStage)}
              checkMnemonicPhrase={() => setStage(Stage.ViewMnenomicPhraseStage)}
              deleteWallet={() => setStage(Stage.DeleteWalletStage)}
            />
          ),
        };
    }
  }, [stage, t]);

  React.useEffect(() => {
    if (dialogOpen && !isChromeExt) {
      setStage(Stage.SelectMenuStage, true);
    }
  }, [dialogOpen, isChromeExt]);

  const onMenuItemClick = React.useCallback((nextStage: Stage) => {
    setStage(nextStage, true);
    setDialogOpen(true);
    setMenuAnchor(undefined);
  }, []);

  return (
    <>
      <IconButton
        onClick={e => (isChromeExt ? setMenuAnchor(e.currentTarget) : setDialogOpen(true))}>
        {isChromeExt ? <WalletIcon {...largeIconProps} /> : <EditIcon {...smallIconProps} />}
      </IconButton>
      {isChromeExt ? (
        <Menu
          anchorEl={menuAnchor}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          keepMounted
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(undefined)}>
          <MenuItem
            button
            onClick={() => {
              if (onCreateWallet) {
                onCreateWallet();
              }
              setMenuAnchor(undefined);
            }}>
            {t('add wallet')}
          </MenuItem>
          <MenuItem button onClick={() => onMenuItemClick(Stage.ChangeWalletMonikerStage)}>
            {t('change wallet moniker').split(' ').map(capitalize).join(' ')}
          </MenuItem>
          {wallet.type === 'ledger' ? null : (
            <>
              <MenuItem button onClick={() => onMenuItemClick(Stage.ChangeSecurityPasswordStage)}>
                {t('change security password').split(' ').map(capitalize).join(' ')}
              </MenuItem>
              <MenuItem button onClick={() => onMenuItemClick(Stage.ViewMnenomicPhraseStage)}>
                {t('view secret recovery phrase').split(' ').map(capitalize).join(' ')}
              </MenuItem>
            </>
          )}
          <MenuItem button onClick={() => onMenuItemClick(Stage.DeleteWalletStage)}>
            <Typography color="error">{t('delete wallet')}</Typography>
          </MenuItem>
        </Menu>
      ) : null}
      <Dialog fullWidth open={dialogOpen} onClose={onClose} fullScreen={isMobile}>
        {isPrevStageAvailable && stage !== Stage.DeleteWalletStage ? (
          <IconButton className={classes.backButton} onClick={toPrevStage}>
            <BackIcon {...smallIconProps} />
          </IconButton>
        ) : null}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon {...smallIconProps} />
        </IconButton>
        {content.content}
      </Dialog>
    </>
  );
};

export default React.memo(EditWalletButton);
