import { formatDenom } from '.';

test('formatDenom', async () => {
  const denom = 'daric';
  const value = 1000000;
  const result = formatDenom(denom, value);

  expect(result.raw).toEqual(1);
  expect(result.format).toEqual('1.00');
});
