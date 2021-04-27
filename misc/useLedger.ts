import React from 'react'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { LaunchpadLedger } from '@cosmjs/ledger-amino'
import { rawSecp256k1PubkeyToAddress } from '@cosmjs/launchpad'
import cryptocurrencies from './cryptocurrencies'

const useLedger = () => {
  const [pubkey, setPubkey] = React.useState<any>()

  const connect = React.useCallback(async () => {
    const transport = await TransportWebUSB.create()
    const app = new LaunchpadLedger(transport)
    const result = await app.getPubkey()
    setPubkey(result)
  }, [setPubkey])

  const getAddress = React.useCallback(
    (crypto: string) => rawSecp256k1PubkeyToAddress(pubkey, cryptocurrencies[crypto].prefix),
    [pubkey]
  )

  return { connect, getAddress }
}

export default useLedger
