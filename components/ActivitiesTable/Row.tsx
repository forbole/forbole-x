import { Box, Avatar, Typography, Link, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { formatTokenAmount, getVoteAnswer } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import AccountAvatar from '../AccountAvatar'
import ValidatorAvatar from '../ValidatorAvatar'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  note?: string
  img?: string
}

interface RowProps {
  address?: FavAddress
  activity: Activity
  account?: Account
  crypto: Cryptocurrency
}

const Row: React.FC<RowProps> = ({ activity, account, crypto, address }) => {
  const { classes } = useGetStyles(activity.tag)
  const theme = useTheme()
  const { t, lang } = useTranslation('common')
  const isMobile = useIsMobile()
  const accountDetail = account
    ? { name: account.name, address: account.address }
    : { name: address.moniker, address: address.address }
  const Content = React.useMemo(
    () => () => {
      if (activity.tag === 'delegate') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatTokenAmount(activity.amount, crypto.name, lang)}
              </span>
              {t('to')}
            </Typography>
            <Box ml={1}>
              <ValidatorAvatar crypto={crypto} validator={activity.detail.validator} size="small" />
            </Box>
          </>
        )
      }
      if (activity.tag === 'redelegate') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatTokenAmount(activity.amount, crypto.name, lang)}
              </span>
              {t('from').toLocaleLowerCase()}
            </Typography>
            <Box mx={1}>
              <ValidatorAvatar
                crypto={crypto}
                validator={activity.detail.srcValidator}
                size="small"
              />
            </Box>
            <Typography>{t('to')}</Typography>
            <Box ml={1}>
              <ValidatorAvatar
                crypto={crypto}
                validator={activity.detail.dstValidator}
                size="small"
              />
            </Box>
          </>
        )
      }
      if (activity.tag === 'undelegate') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatTokenAmount(activity.amount, crypto.name, lang)}
              </span>
              {t('from').toLocaleLowerCase()}
            </Typography>
            <Box ml={1}>
              <ValidatorAvatar crypto={crypto} validator={activity.detail.validator} size="small" />
            </Box>
          </>
        )
      }
      if (activity.tag === 'deposit') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatTokenAmount(activity.amount, crypto.name, lang)}
              </span>
              {t('to')}
            </Typography>
            <Link
              href={`${crypto.blockExplorerBaseUrl}/proposals/${activity.detail.proposalId}`}
              target="_blank"
              variant="body1"
              className={classes.proposalTypography}
            >
              {t('proposal with id', { id: activity.detail.proposalId })}
            </Link>
          </>
        )
      }
      if (activity.tag === 'withdrawReward') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>
              {t(`${activity.tag}Activity`)}
              {/* TODO: get rewards amount */}
              {/* <span className={classes.amount}>
              {formatTokenAmount(activity.amount, crypto.name, lang)}
            </span> */}{' '}
              {t('from').toLocaleLowerCase()}
            </Typography>
            <Box ml={1}>
              <ValidatorAvatar crypto={crypto} validator={activity.detail.validator} size="small" />
            </Box>
          </>
        )
      }
      if (activity.tag === 'multisend') {
        return (
          <Box>
            {activity.detail.inputs.map((input, i) => {
              return (
                <Box
                  key={`${input.address}_${i}`}
                  mr={1}
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Link
                    href={`${crypto.blockExplorerBaseUrl}/accounts/${input.address}`}
                    target="_blank"
                    variant="body1"
                    style={{ marginRight: theme.spacing(1) }}
                  >
                    {account && input.address === account.address ? (
                      <AccountAvatar
                        ledgerIconDisabled
                        account={account}
                        address={address}
                        hideAddress
                        size="small"
                      />
                    ) : (
                      input.address
                    )}
                  </Link>
                  <Typography>{t(`${activity.tag}Activity`)}</Typography>
                  <span className={classes.amount}>
                    {formatTokenAmount(input.tokenAmount, crypto.name, lang)}
                  </span>
                  {i === activity.detail.inputs.length - 1 ? (
                    <Typography>{t('toTheFollowingRecepients')}</Typography>
                  ) : null}
                </Box>
              )
            })}
            <Box className={classes.detail}>
              {activity.detail.outputs.map((output, i) => (
                <Box
                  key={`${output.address}_${i}`}
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Link
                    href={`${crypto.blockExplorerBaseUrl}/accounts/${output.address}`}
                    target="_blank"
                    variant="body1"
                    style={{ marginRight: theme.spacing(1) }}
                  >
                    {account && output.address === account.address ? (
                      <AccountAvatar
                        ledgerIconDisabled
                        account={account}
                        address={address}
                        hideAddress
                        size="small"
                      />
                    ) : (
                      output.address
                    )}
                  </Link>
                  <Typography>{t('received')}</Typography>
                  <span className={classes.amount}>
                    {formatTokenAmount(output.tokenAmount, crypto.name, lang)}
                  </span>
                </Box>
              ))}
            </Box>
          </Box>
        )
      }
      if (activity.tag === 'createValidator') {
        return (
          <>
            <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
            <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
            <Typography>{t(`${activity.tag}Activity`)}</Typography>
            <Avatar
              className={classes.validatorAvatar}
              alt={activity?.detail?.name}
              src={activity?.detail?.image}
            />
            <Typography className={classes.validatorTypography}>
              {activity?.detail?.name}
            </Typography>
          </>
        )
      }
      if (activity.tag === 'fund') {
        return (
          <>
            <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
            <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatTokenAmount(activity.amount, crypto.name, lang)}
              </span>
              {t('toCommunityPool')}
            </Typography>
          </>
        )
      }
      if (activity.tag === 'verifyInvariant') {
        return (
          <>
            <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
            <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
            <Typography>{t(`${activity.tag}Activity`)}</Typography>
          </>
        )
      }
      if (activity.tag === 'vote') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>{t(`${activity.tag}Activity`)}</Typography>
            <Link
              href={`${crypto.blockExplorerBaseUrl}/proposals/${activity.detail.proposalId}`}
              target="_blank"
              variant="body1"
              className={classes.proposalTypography}
            >
              {t('proposal with id', { id: activity.detail.proposalId })}
            </Link>
            <Typography>
              {t('with')}
              <span className={classes.amount}>{t(getVoteAnswer(activity.detail.ans))}</span>
            </Typography>
          </>
        )
      }
      if (activity.tag === 'unjail') {
        return (
          <>
            <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
            <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
            <Typography>{t(`${activity.tag}Activity`)}</Typography>
          </>
        )
      }
      if (activity.tag === 'submitProposal') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>
              {t(`${activity.tag}Activity`)} <b>{activity.detail.proposalTitle}</b>
            </Typography>
          </>
        )
      }
      if (activity.tag === 'editValidator') {
        return (
          <>
            <Avatar className={classes.accountAvatar} alt={accountDetail.name} src={crypto.image} />
            <Typography className={classes.validatorTypography}>{accountDetail.name}</Typography>
            <Typography>
              {t(`${activity.tag}Activity`)} {activity.detail.name}
            </Typography>
          </>
        )
      }
      if (activity.tag === 'send') {
        return (
          <>
            {activity.detail.fromAddress === accountDetail.address ? (
              <Box mr={1}>
                <Link
                  href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                  target="_blank"
                >
                  <AccountAvatar
                    ledgerIconDisabled
                    account={account}
                    address={address}
                    hideAddress
                    size="small"
                  />
                </Link>
              </Box>
            ) : (
              <Link
                className={classes.proposalTypography}
                variant="body1"
                href={`${crypto.blockExplorerBaseUrl}/accounts/${activity.detail.fromAddress}`}
                target="_blank"
              >
                {activity.detail.fromAddress}
              </Link>
            )}
            <Typography>
              {t(`${activity.tag}Activity`)}
              <span className={classes.amount}>
                {formatTokenAmount(activity.amount, crypto.name, lang)}
              </span>
              {t('to')}
            </Typography>
            {activity.detail.toAddress === accountDetail.address ? (
              <Box ml={1}>
                <Link
                  href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                  target="_blank"
                >
                  <AccountAvatar
                    ledgerIconDisabled
                    account={account}
                    address={address}
                    hideAddress
                    size="small"
                  />
                </Link>
              </Box>
            ) : (
              <Link
                className={classes.proposalTypography}
                variant="body1"
                href={`${crypto.blockExplorerBaseUrl}/accounts/${activity.detail.toAddress}`}
                target="_blank"
              >
                {activity.detail.toAddress}
              </Link>
            )}
          </>
        )
      }
      if (activity.tag === 'setRewardAddress') {
        return (
          <>
            <Box mr={1}>
              <Link
                href={`${crypto.blockExplorerBaseUrl}/accounts/${accountDetail.address}`}
                target="_blank"
              >
                <AccountAvatar
                  ledgerIconDisabled
                  account={account}
                  address={address}
                  hideAddress
                  size="small"
                />
              </Link>
            </Box>
            <Typography>{t(`${activity.tag}Activity`)}</Typography>
            <Link
              className={classes.proposalTypography}
              variant="body1"
              href={`${crypto.blockExplorerBaseUrl}/accounts/${activity.detail.withdrawAddress}`}
              target="_blank"
            >
              {activity.detail.withdrawAddress}
            </Link>
          </>
        )
      }
      return null
    },
    [activity.ref, JSON.stringify(activity.detail || {}), classes]
  )

  return (
    <Box className={classes.rowContainer}>
      <Box className={classes.tagContainer}>
        <Typography variant="body2" className={classes.tag}>
          {t(activity.tag)}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" mt={isMobile ? 2 : 0}>
        <Content />
      </Box>
    </Box>
  )
}

export default Row
