export const getInflation = (crypto: string): string => `
  query Inflation {
    inflation(limit: 1, order_by: {height: desc}) {
      value
      height
    }
  }
`
