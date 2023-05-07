/**
 * ENUMERABILITY AND OWNERSHIP OF PROPERTIES
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
 *
 * 1. Create an object myObject with two properties: prop1 and prop2.
 * Make prop1 enumerable and prop2 non-enumerable.
 * Write a function printProperties(obj) that prints
 * all enumerable properties of an object.
 *
 * 2. Write a program that reads a string of text and
 * counts the frequency of each word in the text.
 * Make sure that the word count object you create is not enumerable,
 * but the individual word counts are enumerable.
 */

// EXERCISE 1
const myObject = {};

Object.defineProperty(myObject, 'prop1', {
  value: 'PDI Exercise prop 1',
  enumerable: true,
});

Object.defineProperty(myObject, 'prop2', {
  value: 'PDI Exercise prop 2',
  enumerable: false,
});

const printProperties = (obj) => {
  for (const key in obj) {
    if (obj.propertyIsEnumerable(key)) {
      console.log(obj[key]);
    }
  }
};

printProperties(myObject);

// EXERCISE 2
const exercise2 = (text) => {
  const words = text.toLowerCase().split(' ');
  const frequencies = words.reduce((frequency, word) => {
    frequency[word] = (frequency[word] || 0) + 1;
    return frequency;
  }, {});

  // Non-enumerable property
  Object.defineProperty(frequencies, 'totalCount', {
    value: words.length,
    enumerable: false,
  });

  // Individual word counts enumerable
  for (const word in frequencies) {
    if (word !== 'totalCount') {
      Object.defineProperty(frequencies, word, {
        enumerable: true,
      });
    }
  }

  return frequencies;
};

const frequencies = exercise2('The quick brown fox jumps over the lazy dog.');
console.log(frequencies);
console.log(frequencies.totalCount);
for (const word in frequencies) {
  console.log(`${word}: ${frequencies[word]}`);
}
