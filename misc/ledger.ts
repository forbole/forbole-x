import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { Cosmos } from 'ledger-app-cosmos'
import cryptocurrencies from './cryptocurrencies'

export const connectLedger = async (): Promise<Cosmos> => {
  const transport = await TransportWebUSB.create()
  const app = new Cosmos(transport)
  return app
}

export const getAddress = async (app: Cosmos, crypto: string, index: number): Promise<string> => {
  const result = await app.getAddressAndPublicKey(
    [44, 118, 0, 0, index],
    cryptocurrencies[crypto].prefix
  )
  return result.bech32_address
}
