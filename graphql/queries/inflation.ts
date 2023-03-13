const getInflation = (crypto: string): string => `
  query Inflation @api(name: ${crypto}bdjuno) {
    inflation(limit: 1, order_by: {height: desc}) {
      value
      height
    }
  }
`;

export default getInflation;
