import * as R from 'ramda';
import { UserInfo } from '../../../models'

export const userInfoParser = (data:any): UserInfo | null => {
  const check = R.pathOr(null, ['account', 0], data);
  if (check) {
    return UserInfo.fromJson(data);
  }
  return null;
};
