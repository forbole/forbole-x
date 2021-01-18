declare module '*.svg' {
  const content: any
  export default content
}

interface Wallet {
  id: string
  name: string
  mnemonic?: string
  privateKey?: string
}
