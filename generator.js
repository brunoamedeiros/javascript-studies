/**
 * GENERATOR
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
 *
 * 1. Write a generator function range(start, end) that yields all integers between
 * start and end, inclusive. Use it to print all even numbers between 1 and 10.
 *
 * 2. Write a generator function fibonacci() that yields the Fibonacci sequence.
 * Use it to print the first 10 numbers of the sequence.
 */

// EXERCISE 1
const range = function* (start, end) {
  for (let number = start; number <= end; number++) {
    yield number;
  }
};

for (let integer of range(1, 10)) {
  if (integer % 2 == 0) {
    console.log(integer);
  }
}

// EXERCISE 2
const fibonacci = function* () {
  let a = 0,
    b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
};

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
