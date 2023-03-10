const getTokensPrices = (crypto: string): string => `
query TokenPrice @api(name: ${crypto}bdjuno) {
    token_price(limit: 1, order_by: {timestamp: desc, id: desc}) {
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
`;

export default getTokensPrices;
