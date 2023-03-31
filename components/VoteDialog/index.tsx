import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import CloseIcon from '../../assets/images/icons/icon_cross.svg';
import useStyles from './styles';
import useIconProps from '../../misc/useIconProps';
import SelectAnswer from './SelectAnswer';
import { useWalletsContext } from '../../contexts/WalletsContext';
import useSendTransaction from '../../misc/tx/useSendTransaction';

interface VoteDialogProps {
  crypto: Cryptocurrency;
  open: boolean;
  onClose(): void;
  proposal: Proposal;
}

const VoteDialog: React.FC<VoteDialogProps> = ({ crypto, open, onClose, proposal }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const { password } = useWalletsContext();
  const sendTransaction = useSendTransaction();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setLoading(false);
    }
  }, [open]);

  const chooseAnswer = React.useCallback(
    async (account: Account, vote: { name: string; id: '1' | '2' | '3' | '4' }, memo: string) => {
      try {
        setLoading(true);
        const msg = {
          typeUrl: '/cosmos.gov.v1beta1.MsgVote',
          value: {
            option: Number(vote.id),
            proposalId: proposal.id,
            voter: account.address,
          },
        } as unknown as TransactionMsgVote;
        await sendTransaction(password, account.address, {
          msgs: [msg],
          memo,
        });
        setLoading(false);
        onClose();
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    },
    [proposal, password, sendTransaction],
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('vote')}</DialogTitle>
      <SelectAnswer crypto={crypto} onNext={chooseAnswer} proposal={proposal} loading={loading} />
    </Dialog>
  );
};

export default VoteDialog;
