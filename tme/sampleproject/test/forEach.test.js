const assert = require('assert');
const { forEach } = require('../index');

let numbers;
beforeEach(() => {
  numbers = [1, 2, 3];
});

it('Should sum an array', () => {
  let total = 0;

  forEach(numbers, (value) => {
    total += value;
  });

  assert.strictEqual(total, 6);
  numbers.push(4, 5, 6);
});

it('beforeEach should initialise numbers array', () => {
  assert.strictEqual(numbers.length, 3);
});
