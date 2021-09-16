const defaultDenoms: TokenPrice[] = [
  {
    unit_name: 'dsm',
    price: 0,
    timestamp: new Date().toISOString(),
    token_unit: {
      denom: 'dsm',
      exponent: 6,
      token: {
        token_units: [
          {
            denom: 'udsm',
            exponent: 0,
          },
          {
            denom: 'dsm',
            exponent: 6,
          },
        ],
      },
    },
  },
]

export default defaultDenoms
