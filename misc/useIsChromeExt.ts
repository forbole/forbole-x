import React from 'react';
import { useRouter } from 'next/router';
import get from 'lodash/get';

const useIsChromeExt = (): { isChromeExt: boolean; isSentFromWeb: boolean } => {
  const router = useRouter();
  const isChromeExtQueryParam =
    get(router, 'query.isChromeExt', '') || get(router, 'query.hideMenu', ''); // TODO: hideMenu is deprecated
  const isSentFromWeb = !!get(router, 'query.fromWeb', '');
  const isChromeExt = !!(isChromeExtQueryParam || (process.browser && (window as any).isChromeExt));

  React.useEffect(() => {
    if (isChromeExtQueryParam) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      (window as any).isChromeExt = true;
    }
  }, [isChromeExtQueryParam]);

  return { isChromeExt, isSentFromWeb };
};

export default useIsChromeExt;
