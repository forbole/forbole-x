export const getTokensPrices = (crypto: string): string => `
  subscription TokenPrice @${crypto} {
    token_price(limit: 1, order_by: {timestamp: desc}) {
      unit_name
      price
      timestamp
      token_unit {
        denom
        exponent
        token {
          token_units {
            denom
            exponent
          }
        }
      }
    }
  }
`
