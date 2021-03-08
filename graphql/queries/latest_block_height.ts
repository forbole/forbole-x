export const LATEST_BLOCK_HEIGHT = `
query LatestBlockHeight{
  block (limit: 1, offset: 2, order_by:{height: desc}) {
    height
  }
}
`;
