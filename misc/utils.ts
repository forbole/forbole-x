import get from 'lodash/get'
import last from 'lodash/last'
import cloneDeep from 'lodash/cloneDeep'
import drop from 'lodash/drop'
import keyBy from 'lodash/keyBy'
import flatten from 'lodash/flatten'
import { format, differenceInDays } from 'date-fns'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { EnglishMnemonic } from '@cosmjs/crypto'
import defaultDenoms from './defaultDenoms'
import connectableChains from './connectableChains'

export const formatPercentage = (percent: number, lang: string): string =>
  new Intl.NumberFormat(lang, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percent || 0)

export const formatCrypto = (
  amount: number,
  unit: string,
  lang: string,
  hideUnit?: boolean,
  compact?: boolean
): string =>
  `${new Intl.NumberFormat(lang, {
    signDisplay: 'never',
    maximumFractionDigits: compact ? 2 : 6,
    notation: compact ? 'compact' : undefined,
  }).format(amount || 0)}${hideUnit ? '' : ` ${(unit || '').toUpperCase()}`}`

export const formatCurrency = (
  amount: number,
  currency: string,
  lang: string,
  hideUnit?: boolean,
  compact?: boolean
): string =>
  `${new Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : undefined,
  }).format(amount || 0)}${hideUnit ? '' : ` ${currency}`}`

export const getTokenAmountFromDenoms = (
  coins: Array<{ denom: string; amount: string }>,
  denoms: TokenPrice[]
): TokenAmount => {
  const result = {}
  ;(coins || []).forEach((coin) => {
    const denomsToUse = denoms.length ? denoms : defaultDenoms
    denomsToUse.some((d) => {
      const unit = get(d, 'token_unit.token.token_units', []).find(
        (t) => t && coin && t.denom === coin.denom
      )
      if (unit) {
        const base = get(d, 'token_unit.token.token_units', []).find((t) => t.denom === d.unit_name)
        const denom = base.denom.toUpperCase()
        if (result[denom]) {
          result[denom].amount += Number(
            (Number(coin.amount) * 10 ** (unit.exponent - base.exponent)).toFixed(6)
          )
        } else {
          result[denom] = {
            amount: Number(
              (Number(coin.amount) * 10 ** (unit.exponent - base.exponent)).toFixed(6)
            ),
            price: d.price,
          }
        }
        return true
      }
      return false
    })
  })
  return result
}

export const formatTokenAmount = (
  tokenAmount: TokenAmount,
  defaultUnit: string,
  lang: string,
  delimiter?: string
): string =>
  tokenAmount && Object.keys(tokenAmount).length
    ? Object.keys(tokenAmount)
        .map((ta) => formatCrypto(tokenAmount[ta].amount, ta, lang))
        .join(delimiter || '\n')
    : formatCrypto(0, defaultUnit, lang)

export const sumTokenAmounts = (tokenAmounts: TokenAmount[]): TokenAmount => {
  const amount: TokenAmount = {}
  tokenAmounts.forEach((ba) => {
    Object.keys(ba).forEach((t) => {
      if (!amount[t]) {
        amount[t] = { amount: 0, price: 0 }
      }
      amount[t].amount = Number(((amount[t].amount || 0) + ba[t].amount).toFixed(6))
      amount[t].price = ba[t].price
    })
  })
  return amount
}

export const getTotalTokenAmount = (
  accountBalance?: AccountBalance
): { amount: TokenAmount; timestamp: number } => {
  if (!accountBalance) {
    return {
      amount: {},
      timestamp: 0,
    }
  }
  const { balance, timestamp } = accountBalance
  const amount = sumTokenAmounts(Object.values(balance))
  return {
    amount,
    timestamp,
  }
}

export const getTokenAmountBalance = (tokenAmount: TokenAmount, crypto?: string): number =>
  Object.keys(tokenAmount)
    .filter((k) => !crypto || k === crypto)
    .map((k) => tokenAmount[k].amount * tokenAmount[k].price)
    .reduce((x, y) => x + y, 0)

export const getTotalBalance = (
  accountBalance?: AccountBalance,
  crypto?: string
): { balance: number; timestamp: number } => {
  if (!accountBalance) {
    return {
      balance: 0,
      timestamp: 0,
    }
  }
  const { balance, timestamp } = accountBalance
  return {
    balance: Object.values(balance)
      .map((b) => getTokenAmountBalance(b, crypto))
      .reduce((x, y) => x + y, 0),
    timestamp,
  }
}

export const getWalletsBalancesFromAccountsBalances = (
  wallets: Wallet[],
  accounts: AccountWithBalance[]
): WalletWithBalance[] =>
  wallets.map((w) => {
    const accBalances = accounts
      .filter((a) => a.walletId === w.id)
      .map((a) => a.balances.map((b) => getTotalBalance(b)))
    let balances = accBalances[0] || []
    drop(accBalances).forEach((ab) => {
      balances = balances.map((b, i) => ({
        balance: b.balance + ab[i].balance,
        timestamp: b.timestamp,
      }))
    })
    return {
      ...w,
      balances: balances.sort((a, b) => a.timestamp - b.timestamp),
    }
  })

export const transformGqlAcountBalance = (data: any, timestamp: number): AccountBalance => {
  const denoms = get(data, 'account[0].available[0].tokens_prices', [])
  const balance = {
    available: getTokenAmountFromDenoms(get(data, 'account[0].available[0].coins', []), denoms),
    delegated: getTokenAmountFromDenoms(
      get(data, 'account[0].delegated', []).map((d) => d.amount),
      denoms
    ),
    unbonding: getTokenAmountFromDenoms(
      get(data, 'account[0].unbonding', [])
        .filter((d) => new Date(`${d.completion_timestamp}Z`).getTime() > Date.now())
        .map((d) => d.amount),
      denoms
    ),
    rewards: getTokenAmountFromDenoms(
      get(data, 'account[0].rewards', []).map((d) => get(d, 'amount[0]')),
      denoms
    ),
    commissions: getTokenAmountFromDenoms(
      flatten(get(data, 'account[0].validator[0].validator.commissions', []).map((d) => d.amount)),
      denoms
    ),
  }
  return {
    balance,
    timestamp,
    availableTokens: get(data, 'account[0].available[0]', { coins: [], tokens_prices: [] }),
  }
}

const statuses = ['unknown', 'unbonded', 'unbonded', 'active']

export const getValidatorStatus = (status: number, jailed: boolean): string => {
  if (jailed) {
    return 'jailed'
  }
  return statuses[status]
}

export const transformValidators = (data: any, profilesData?: any): Validator[] => {
  if (!data) {
    return []
  }
  const profiles = profilesData ? keyBy(profilesData.profile, 'address') : {}
  const validators = data.validator
    .map((validator) => ({
      address: get(validator, 'info.operator_address', ''),
      image:
        get(profiles, `${get(validator, 'info.self_delegate_address', '')}.profile_pic`) ||
        get(validator, 'description[0].avatar_url', ''),
      name:
        get(profiles, `${get(validator, 'info.self_delegate_address', '')}.nickname`) ||
        get(profiles, `${get(validator, 'info.self_delegate_address', '')}.dtag`) ||
        get(validator, 'description[0].moniker', ''),
      commission: get(validator, 'commission[0].commission', 0),
      votingPower: get(validator, 'voting_power[0].voting_power', 0),
      selfRatio:
        get(validator, 'self_delegations[0].amount.amount', 0) /
        get(validator, 'voting_power[0].voting_power', 0) /
        10 ** 6, // TODO: use tokens_prices to handle denoms
      status: getValidatorStatus(
        get(validator, 'status[0].status', 0),
        get(validator, 'status[0].jailed', false)
      ),
      isActive: get(validator, 'status[0].status', 0) === statuses.indexOf('active'),
      missedBlockCounter: get(
        validator,
        ['validator_signing_infos', 0, 'missed_blocks_counter'],
        0
      ),
    }))
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((validator, i) => ({
      ...validator,
      order: i + 1,
    }))
  return validators
}

export const transformValidatorsWithTokenAmount = (validators: Validator[], balanceData: any) => {
  const tokensPrices = get(balanceData, 'account[0].available[0].tokens_prices', [])
  const delegatedByValidator = {}
  get(balanceData, 'account[0].delegated', []).forEach((d) => {
    if (Number(get(d, 'amount.amount', '0')) > 0) {
      delegatedByValidator[get(d, 'validator.validator_info.operator_address', '')] =
        getTokenAmountFromDenoms([d.amount], tokensPrices)
    }
  })
  const rewardsByValidator = {}
  get(balanceData, 'account[0].rewards', []).forEach((d) => {
    const coins = d.amount.filter((a) => Number(a.amount) > 0)
    if (coins.length > 0) {
      rewardsByValidator[get(d, 'validator.validator_info.operator_address', '')] =
        getTokenAmountFromDenoms(coins, tokensPrices)
    }
  })
  const unbondingByValidator = {}
  get(balanceData, 'account[0].unbonding', []).forEach((d) => {
    if (new Date(`${d.completion_timestamp}Z`).getTime() > Date.now()) {
      unbondingByValidator[get(d, 'validator.validator_info.operator_address', '')] =
        getTokenAmountFromDenoms([d.amount], tokensPrices)
    }
  })
  const commissionsByValidator = {}
  get(balanceData, 'account[0].validator', []).forEach((v) => {
    get(v, 'validator.commissions', []).forEach((d) => {
      commissionsByValidator[get(v, 'operator_address', '')] = getTokenAmountFromDenoms(
        d.amount,
        tokensPrices
      )
    })
  })
  return validators.map((v) => ({
    ...v,
    delegated: delegatedByValidator[v.address],
    rewards: rewardsByValidator[v.address],
    unbonding: unbondingByValidator[v.address],
    commissionAmount: commissionsByValidator[v.address],
  }))
}

export const transformUnbonding = (validatorsData: Validator[], balanceData: any): Unbonding[] => {
  const validators = keyBy(validatorsData, 'address')
  const tokensPrices = get(balanceData, 'account[0].available[0].tokens_prices', [])
  return get(balanceData, 'account[0].unbonding', [])
    .map((u) => ({
      validator: validators[get(u, 'validator.validator_info.operator_address', '')],
      amount: getTokenAmountFromDenoms([u.amount], tokensPrices),
      height: Number(u.height),
      completionDate: new Date(`${u.completion_timestamp}Z`),
    }))
    .filter((r) => r.completionDate.getTime() > Date.now())
    .sort((a, b) => b.height - a.height)
}

export const transformRedelegations = (data: any, balanceData: any): Redelegation[] => {
  const tokensPrices = get(balanceData, 'account[0].available[0].tokens_prices', [])
  return get(data, 'redelegations', [])
    .map((u) => ({
      fromValidator: {
        name: get(
          u,
          'from_validator.description[0].moniker',
          get(u, 'from_validator.info.operator_address', '')
        ),
        address: get(u, 'from_validator.info.operator_address', ''),
        image: get(u, 'from_validator.description[0].avatar_url', ''),
      },
      toValidator: {
        name: get(
          u,
          'to_validator.description[0].moniker',
          get(u, 'to_validator.info.operator_address', '')
        ),
        address: get(u, 'to_validator.info.operator_address', ''),
        image: get(u, 'to_validator.description[0].avatar_url', ''),
      },
      amount: getTokenAmountFromDenoms([u.amount], tokensPrices),
      height: Number(u.height),
      completionDate: new Date(`${u.completion_timestamp}Z`),
    }))
    .filter((r) => r.completionDate.getTime() > Date.now())
    .sort((a, b) => b.height - a.height)
}

export const transformTransactions = (
  data: any,
  validatorsMap: { [address: string]: Validator },
  prices: TokenPrice[]
): Activity[] => {
  const tokensPrices = prices.length ? prices : defaultDenoms
  return get(data, 'messages_by_address', [])
    .map((t) => {
      if (t.type.includes('MsgSend')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'transfer',
          tag: 'send',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            fromAddress: get(t, 'value.from_address', ''),
            toAddress: get(t, 'value.to_address', ''),
          },
          amount: getTokenAmountFromDenoms(get(t, 'value.amount', []), tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgMultiSend')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'transfer',
          tag: 'multisend',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            inputs: get(t, 'value.inputs', []).map((input) => ({
              ...input,
              tokenAmount: getTokenAmountFromDenoms(input.coins, tokensPrices),
            })),
            outputs: get(t, 'value.outputs', []).map((output) => ({
              ...output,
              tokenAmount: getTokenAmountFromDenoms(output.coins, tokensPrices),
            })),
          },
          amount: getTokenAmountFromDenoms(get(t, 'value.amount', []), tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgDelegate')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'staking',
          tag: 'delegate',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            validator: get(validatorsMap, `${get(t, 'value.validator_address', '')}`, {}),
          },
          amount: getTokenAmountFromDenoms([get(t, 'value.amount', {})], tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgBeginRedelegate')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'staking',
          tag: 'redelegate',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            srcValidator: get(validatorsMap, `${get(t, 'value.validator_src_address', '')}`, {}),
            dstValidator: get(validatorsMap, `${get(t, 'value.validator_dst_address', '')}`, {}),
          },
          amount: getTokenAmountFromDenoms([get(t, 'value.amount', {})], tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgUndelegate')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'staking',
          tag: 'undelegate',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            validator: get(validatorsMap, `${get(t, 'value.validator_address', '')}`, {}),
          },
          amount: getTokenAmountFromDenoms([get(t, 'value.amount', {})], tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgWithdrawDelegatorReward')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'distribution',
          tag: 'withdrawReward',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            validator: get(validatorsMap, `${get(t, 'value.validator_address', '')}`, {}),
          },
          amount: getTokenAmountFromDenoms([get(t, 'value.amount', {})], tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgDeposit')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'governance',
          tag: 'deposit',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            proposalId: get(t, 'value.proposal_id', ''),
          },
          amount: getTokenAmountFromDenoms(get(t, 'value.amount', []), tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgVote')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'governance',
          tag: 'vote',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            proposalId: get(t, 'value.proposal_id', ''),
            ans: get(t, 'value.option', ''),
          },
          amount: getTokenAmountFromDenoms([get(t, 'value.amount', {})], tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgSubmitProposal')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'governance',
          tag: 'submitProposal',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            proposalTitle: get(t, 'value.content.title', ''),
          },
          amount: getTokenAmountFromDenoms([get(t, 'value.amount', {})], tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      if (t.type.includes('MsgSetWithdrawAddress')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'distribution',
          tag: 'setRewardAddress',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            delegatorAddress: get(t, 'value.delegator_address', ''),
            withdrawAddress: get(t, 'value.withdraw_address', ''),
          },
          amount: getTokenAmountFromDenoms([get(t, 'value.amount', {})], tokensPrices),
          success: get(t, 'transaction.success', false),
        }
      }
      return null
    })
    .filter((a) => !!a)
}

export const getEquivalentCoinToSend = (
  amount: { amount: number; denom: string },
  availableCoins: Array<{ amount: string; denom: string }>,
  tokensPrices: TokenPrice[]
): { amount: number; denom: string } => {
  const tokenPrice = (tokensPrices.length ? tokensPrices : defaultDenoms).find(
    (tp) => tp.unit_name.toLowerCase() === amount.denom.toLowerCase()
  )
  if (!tokenPrice) {
    return { amount: 0, denom: '' }
  }
  const coinDenom: { denom: string; exponent: number } = get(
    tokenPrice,
    'token_unit.token.token_units',
    []
  ).find((unit) => !!availableCoins.find((c) => c.denom.toLowerCase() === unit.denom.toLowerCase()))
  return {
    amount: Math.round(
      amount.amount * 10 ** (get(tokenPrice, 'token_unit.exponent', 0) - coinDenom.exponent)
    ),
    denom: coinDenom.denom,
  }
}

export const createEmptyChartData = (
  rawData: Array<{
    balance: number
    timestamp: number
  }>,
  from: number,
  to: number
): Array<{ balance: number; timestamp: number }> => {
  // Create a straight line
  const data = cloneDeep(rawData)
  if (data.length === 0) {
    data.unshift(
      {
        balance: 0,
        timestamp: from,
      },
      {
        balance: 0,
        timestamp: to,
      }
    )
  } else if (data.length === 1) {
    data.unshift({ balance: data[0].balance, timestamp: from })
  }
  return data
}

export const getCoinPrice = (coin: string): Promise<number> =>
  fetch(
    `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/coins/${coin}/market_chart?vs_currency=usd&days=1&interval=daily`
  ).then(async (result) => {
    const data = await result.json()
    return get(last(get(data, 'prices', [])), 1)
  })

const getTag = (status: string) => {
  if (status === 'PROPOSAL_STATUS_REJECTED') {
    return 'rejected'
  }
  if (status === 'PROPOSAL_STATUS_INVALID') {
    return 'invalid'
  }
  if (status === 'PROPOSAL_STATUS_PASSED') {
    return 'passed'
  }
  if (status === 'PROPOSAL_STATUS_VOTING_PERIOD') {
    return 'vote'
  }
  if (status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD') {
    return 'deposit'
  }
  if (status === 'PROPOSAL_STATUS_FAILED') {
    return 'failed'
  }
  return ''
}

export const transformProposals = (proposalData: any): Proposal[] => {
  return get(proposalData, 'proposal', [])
    .map((p) => ({
      id: get(p, 'id', ''),
      proposer: {
        name: get(p, 'proposer.validator_infos[0].validator.validator_descriptions[0].moniker', ''),
        image: get(
          p,
          'proposer.validator_infos[0].validator.validator_descriptions[0].avatar_url',
          ''
        ),
        address: get(p, 'proposer.address', ''),
      },
      title: get(p, 'title', ''),
      description: get(p, 'description', ''),
      type: get(p, 'proposal_type', ''),
      votingStartTime: `${format(new Date(get(p, 'voting_start_time')), 'dd MMM yyyy HH:mm')} UTC`,
      votingEndTime: `${format(new Date(get(p, 'voting_end_time')), 'dd MMM yyyy HH:mm')} UTC`,
      depositEndTime: `${format(new Date(get(p, 'deposit_end_time')), 'dd MMM yyyy HH:mm')} UTC`,
      depositEndTimeRaw: get(p, 'deposit_end_time'),
      submitTime: get(p, 'submit_time')
        ? `${format(new Date(get(p, 'submit_time')), 'dd MMM yyyy HH:mm')} UTC`
        : '',
      isActive: !!(
        get(p, 'status', '') === 'PROPOSAL_STATUS_VOTING' ||
        get(p, 'status', '') === 'PROPOSAL_STATUS_DEPOSIT'
      ),
      tag: getTag(get(p, 'status', '')),
      duration: differenceInDays(new Date(`${get(p, 'voting_end_time')}Z`), Date.now()),
    }))
    .sort((a, b) => (a.id < b.id ? 1 : -1))
}

export const transformProposal = (
  proposalData: any,
  balanceData: any,
  depositParams: any
): Proposal => {
  const p = get(proposalData, 'proposal[0]')
  const tokensPrices = get(balanceData, 'account[0].available[0].tokens_prices', [])
  let totalDepositsList = []
  return {
    id: get(p, 'id'),
    proposer: {
      name: get(p, 'proposer.validator_infos[0].validator.validator_descriptions[0].moniker'),
      image: get(p, 'proposer.validator_infos[0].validator.validator_descriptions[0].avatar_url'),
      address: get(p, 'proposer.address'),
    },
    title: get(p, 'title'),
    description: get(p, 'description'),
    type: get(p, 'proposal_type'),
    votingStartTime: get(p, 'voting_start_time')
      ? `${format(new Date(get(p, 'voting_start_time')), 'dd MMM yyyy HH:mm')} UTC`
      : '',
    votingEndTime: get(p, 'voting_end_time')
      ? `${format(new Date(get(p, 'voting_end_time')), 'dd MMM yyyy HH:mm')} UTC`
      : '',
    depositEndTime: get(p, 'deposit_end_time')
      ? `${format(new Date(get(p, 'deposit_end_time')), 'dd MMM yyyy HH:mm')} UTC`
      : '',
    depositEndTimeRaw: get(p, 'deposit_end_time'),
    submitTime: get(p, 'submit_time')
      ? `${format(new Date(get(p, 'submit_time')), 'dd MMM yyyy HH:mm')} UTC`
      : '',
    isActive: !!(
      get(p, 'status') === 'PROPOSAL_STATUS_VOTING_PERIOD' ||
      get(p, 'status') === 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
    ),
    tag: getTag(get(p, 'status')),
    duration: differenceInDays(new Date(`${get(p, 'voting_end_time')}Z`), Date.now()),
    depositDetails: get(p, 'proposal_deposits', []).map((x) => {
      if (get(x, 'denom') === tokensPrices.unit_name) {
        totalDepositsList = [...totalDepositsList, get(x, 'amount[0]')]
      }
      return {
        depositor: {
          name: get(x, 'depositor.validator_infos[0].validator.validator_descriptions[0].moniker'),
          image: get(
            x,
            'depositor.validator_infos[0].validator.validator_descriptions[0].avatar_url'
          ),
          address: get(x, 'depositor.address'),
        },
        amount: getTokenAmountFromDenoms(get(x, 'amount'), tokensPrices),
        time: `${format(new Date(get(x, 'block.timestamp')), 'dd MMM yyyy HH:mm')} UTC`,
      }
    }),
    totalDeposits: getTokenAmountFromDenoms(totalDepositsList, tokensPrices),
    minDeposit: depositParams
      ? getTokenAmountFromDenoms(
          get(depositParams, 'gov_params[0].deposit_params.min_deposit'),
          tokensPrices
        )
      : null,
    quorum: get(depositParams, 'gov_params[0].tally_params.quorum', 0),
    bondedTokens: get(p, 'staking_pool_snapshot.bonded_tokens', 0) / 10 ** 6,
    content: get(p, 'content'),
  }
}

export const transformVoteSummary = (proposalResult: any): any => {
  let abstain = 0
  let no = 0
  let veto = 0
  let yes = 0

  get(proposalResult, 'proposal_tally_result', []).forEach((p) => {
    abstain += get(p, 'abstain', 0) / 10 ** 6
    no += get(p, 'no', 0) / 10 ** 6
    veto += get(p, 'no_with_veto', 0) / 10 ** 6
    yes += get(p, 'yes', 0) / 10 ** 6
  })

  const totalAmount = abstain + no + veto + yes

  const voteSummary = {
    percentage: 0.0,
    amount: totalAmount,
    description: '',
    data: [
      {
        title: 'yes',
        percentage: totalAmount === 0 ? 0 : yes / totalAmount,
        value: yes,
      },
      {
        title: 'no',
        percentage: totalAmount === 0 ? 0 : no / totalAmount,
        value: no,
      },
      {
        title: 'veto',
        percentage: totalAmount === 0 ? 0 : veto / totalAmount,
        value: veto,
      },
      {
        title: 'abstain',
        percentage: totalAmount === 0 ? 0 : abstain / totalAmount,
        value: abstain,
      },
    ],
  }

  return voteSummary
}

export const getVoteAnswer = (answer: string) => {
  if (answer === 'VOTE_OPTION_YES') {
    return 'yes'
  }
  if (answer === 'VOTE_OPTION_NO') {
    return 'no'
  }
  if (answer === 'VOTE_OPTION_ABSTAIN') {
    return 'abstain'
  }
  return 'veto'
}

export const transformVoteDetail = (voteDetail: any, proposal: Proposal): any => {
  return get(voteDetail, 'proposal_vote', []).map((d) => {
    const isValidator = !!get(d, 'account.validator_infos', []).length
    const votingPower = isValidator
      ? get(d, 'account.validator_infos[0].validator.validator_voting_powers[0].voting_power', 0)
      : Number(get(d, 'account.account_balance_histories[0].delegated[0].amount', '0')) / 10 ** 6
    return {
      voter: {
        name: get(d, 'account.validator_infos[0].validator.validator_descriptions[0].moniker', ''),
        image: get(
          d,
          'account.validator_infos[0].validator.validator_descriptions[0].avatar_url',
          ''
        ),
        address: get(d, 'voter_address', ''),
      },
      votingPower,
      votingPowerPercentage: votingPower / proposal.bondedTokens,
      votingPowerOverride: isValidator ? 0 : votingPower / proposal.bondedTokens,
      answer: getVoteAnswer(get(d, 'option')),
    }
  })
}

export const isAddressValid = (prefix: string, address: string): boolean => {
  return new RegExp(`^${prefix}([0-9a-zA-Z]){39}$`).test(address)
}

export const formatHeight = (height: number, lang?: string): string =>
  `${new Intl.NumberFormat(lang).format(height || 0)}`

export const closeAllLedgerConnections = async () => {
  const devices = await TransportWebHID.list()
  await Promise.all(devices.map((d) => d.close()))
}

export const getValidatorCondition = (signedBlockWindow: number, missedBlockCounter: number) => {
  return (1 - missedBlockCounter / signedBlockWindow) * 100
}

export const getValidatorConditionClass = (condition: number) => {
  let conditionClass = ''
  if (condition > 90) {
    conditionClass = 'green'
  } else if (condition > 70 && condition < 90) {
    conditionClass = 'yellow'
  } else {
    conditionClass = 'red'
  }

  return conditionClass
}

export const transformProfile = (data: any): Profile => {
  return {
    bio: get(data, 'profile[0].bio', ''),
    coverPic: get(data, 'profile[0].cover_pic', ''),
    dtag: get(data, 'profile[0].dtag', ''),
    nickname: get(data, 'profile[0].nickname', ''),
    profilePic: get(data, 'profile[0].profile_pic', ''),
  }
}

export const transformChainConnections = (data: any): ChainConnection[] => {
  const chains = Object.keys(connectableChains)
  return get(data, 'chain_link', []).map((d) => ({
    creationTime: new Date(`${d.creation_time}Z`).getTime(),
    externalAddress: d.external_address,
    userAddress: d.user_address,
    chainName:
      chains.find((k) => k === d.chain_config.name) ||
      chains.find((k) => d.external_address.match(new RegExp(`^${connectableChains[k].prefix}`))) ||
      d.chain_config.name,
  }))
}

export const transformVestingAccount = (
  data: any,
  denoms: TokenPrice[]
): { total: TokenAmount; vestingPeriods: VestingPeriod[] } => {
  const vestingPeriods: VestingPeriod[] = []
  const startTime = new Date(`${get(data, 'vesting_account[0].start_time')}Z`).getTime()
  const periods = get(data, 'vesting_account[0].vesting_periods', [])
  let sumTime = startTime
  let total: TokenAmount = {}
  for (let i = 0; i < periods.length; i += 1) {
    const period = periods[i]
    const amount = getTokenAmountFromDenoms(period.amount, denoms)
    sumTime += period.length * 1000
    total = sumTokenAmounts([total, amount])
    vestingPeriods.push({
      amount,
      date: sumTime,
    })
  }
  return { vestingPeriods, total }
}

export const isValidMnemonic = (input) => {
  try {
    // eslint-disable-next-line no-new
    new EnglishMnemonic(input)
    return true
  } catch (err) {
    return false
  }
}
