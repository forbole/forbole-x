export const getInflation = (crypto: string): string => `
  subscription Inflation {
    inflation(limit: 1, order_by: {height: desc}) {
      value
      height
    }
  }
`
