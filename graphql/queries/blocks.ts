const getBlockByTimestamp = () => `
  query Block($timestamp: timestamp!){
    block(limit: 1, order_by: { height: desc }, where: { timestamp: { _lte: $timestamp } }) {
      height
      timestamp
    }
  }
`;

export default getBlockByTimestamp;

// export const getBlockByTimestamp = (crypto: string) => `
//   query Block($timestamp: timestamp!) @api(name: ${crypto}bdjuno) {
//     block(limit: 1, order_by: { timestamp: desc }, where: { timestamp: { _lte: $timestamp } }) {
//       height
//       timestamp
//     }
//   }
// `
