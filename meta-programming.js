/**
 * META PROGRAMMING
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming
 *
 * 1. Write a function addLogging(obj) that takes an object obj and
 * adds a logging functionality to all of its methods.
 * The logging function should print the name of the method and
 * its arguments whenever the method is called.
 *
 * 2. Create a proxy for an array that automatically sorts its elements in
 * ascending order whenever an element is added to it.
 */

// EXERCISE 1
const obj = {
  add(a, b) {
    return a + b;
  },
  sub(a, b) {
    return a - b;
  },
};

const addLogging = (obj) => {
  const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
      const propValue = Reflect.get(target, prop, receiver);

      if (typeof propValue === 'function') {
        return function (...args) {
          console.log(`Calling method ${prop} with arguments: ${args}`);
          return propValue.apply(this, args);
        };
      }
      return propValue;
    },
  });

  return proxy;
};

const meta = addLogging(obj);
console.log(meta.add(1, 2));
console.log(meta.sub(4, 2));

// EXERCISE 2
const array = [3, 2, 4];

const sortAsc = (arr) => {
  const handler = {
    set: (target, prop, value) => {
      const result = Reflect.set(target, prop, value);

      if (prop !== 'length') {
        target.sort((a, b) => a - b);
      }

      return result;
    },
  };

  return new Proxy(arr, handler);
};

const sortedArr = sortAsc(array);
sortedArr.pop();
sortedArr.push(5);
sortedArr.unshift(10);
console.log(sortedArr);
