import { calcTotalCount, calcTotalSum } from '../functions';

test('Should calculate the total sum in cart correctly', () => {
  const testCart = [
    { id: 1, itemCount: 2, price: 9000 },
    { id: 2, itemCount: 3, price: 9000 },
  ];
  expect(calcTotalSum(testCart)).toBe('450.00');
});

test('Should calculate total amount in cart correctly', () => {
  const testCart = [
    { id: 1, itemCount: 2 },
    { id: 2, itemCount: 3 },
  ];
  expect(calcTotalCount(testCart)).toBe(5);
});
