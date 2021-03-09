import * as R from 'ramda';
import numeral from 'numeral';
import { chainConfig } from '../config/chain_config';

class AccountBalance {
  public address: string;
  public rewardAddress: string;
  public price: number;
  public available: number;
  public delegate: number;
  public unbonding: number;
  public reward: number;
  public commission: number;
  public total: number;

  constructor(payload: any) {
    this.address = payload.address;
    this.rewardAddress = payload.rewardAddress;
    this.price = payload.price;
    this.available = payload.available;
    this.delegate = payload.delegate;
    this.unbonding = payload.unbonding;
    this.reward = payload.reward;
    this.commission = payload.commission;
    this.total = payload.total;
  }

  static fromJson(data: any) {
    // ==========================
    // base
    // ==========================
    const account = R.pathOr({}, ['account', 0], data)

    // ==========================
    // available
    // ==========================
    const available = R.pathOr(
      0,
      [0, 'amount'],
      R.pathOr([], ['available', 0, 'coins'], account).filter((x) => x.denom === chainConfig.base));

    // ==========================
    // delegate
    // ==========================
    const delegate = R.pathOr([], ['delegations'], account)
      .filter((x) => x?.amount?.denom === chainConfig.base)
      .reduce((a, b) => {
        return a + numeral(b?.amount?.amount).value()
      }, 0)

    // ==========================
    // unbonding
    // ==========================
    const unbonding = R.pathOr([], ['unbonding'], account)
      .filter((x) => x?.amount?.denom === chainConfig.base)
      .reduce((a, b) => {
        return a + numeral(b?.amount?.amount).value()
      }, 0)

    // ==========================
    // rewards
    // ==========================
    const reward = R.pathOr([], ['rewards'], account).map((x) => {
        return x?.amount?.filter((y) => {
          return y?.denom === chainConfig.base
        })
      })
      .reduce((a, b) => {
        const amount = b.reduce((c, d) => {
          return c + numeral(d?.amount).value()
        }, 0)
        return a + numeral(amount).value()
      }, 0)
    // ==========================
    // address
    // ==========================
    const address = R.pathOr('', ['account', 0, 'address'], data);
    const rewardAddress = R.pathOr(address, ['rewards', 0, 'withdraw_address'], data);

    // ==========================
    // commissions
    // ==========================
    const commission = numeral(R.pathOr(0, [0, 'amount'],
      R.pathOr([], ['validator', 0, 'commissions', 0, 'amount'], data)
        .filter((x) => x?.denom === chainConfig.base))).value();

    const total = available + delegate + unbonding + reward + commission;
    return new AccountBalance({
      rewardAddress,
      address,
      available,
      delegate,
      unbonding,
      reward,
      commission,
      total,
      price: 0,
      // price: R.pathOr(0, ['token_price', 0, 'price'], data),
    })
  }
}

export default AccountBalance;
