import React from 'react'
import { useRouter } from 'next/router'
import get from 'lodash/get'

const useIsChromeExt = (): { isChromeExt: boolean; isSentFromWeb: boolean } => {
  const router = useRouter()
  const hideMenuQueryParam = get(router, 'query.hideMenu', '')
  const isSentFromWeb = !!get(router, 'query.fromWeb', '')
  const isChromeExt = !!(hideMenuQueryParam || (process.browser && (window as any).hideMenu))

  React.useEffect(() => {
    if (hideMenuQueryParam) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(window as any).hideMenu = true
    }
  }, [hideMenuQueryParam])

  return { isChromeExt, isSentFromWeb }
}

export default useIsChromeExt
