import React from 'react'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { Cosmos } from 'ledger-app-cosmos'
import cryptocurrencies from './cryptocurrencies'

const useLedger = () => {
  const getAddress = React.useCallback(async (crypto: string, index: number) => {
    const transport = await TransportWebUSB.create()
    const app = new Cosmos(transport)
    const result = await app.getAddressAndPublicKey(
      [44, cryptocurrencies[crypto].coinType, 0, 0, index],
      cryptocurrencies[crypto].prefix
    )
    return result.bech32_address
  }, [])

  return { getAddress }
}

export default useLedger
