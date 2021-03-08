import * as R from 'ramda';

export const latestBlockHeightParser = (data:any): number | null => {
  return R.pathOr(null, ['block', 0, 'height'], data);
};
