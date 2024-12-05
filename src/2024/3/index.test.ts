import { a, b } from '.';

it('solves provided a', () => {
  expect(
    a(
      `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
    ),
  ).toBe(161);
});

it('solves provided b', () => {
  expect(
    b(
      `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
    ),
  ).toBe(48);
});
