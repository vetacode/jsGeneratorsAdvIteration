'use strict';

//Syntax
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
console.log(generator); // [object Generator]

let one = generator.next();
console.log(JSON.stringify(one)); // {value: 1, done: false}

let two = generator.next();
console.log(JSON.stringify(two)); // {value: 2, done: false}

let three = generator.next();
console.log(JSON.stringify(three)); // {value: 3, done: true}

//Generators are ITERABLE
for (let value of generateSequence()) {
  console.log(value); //1,2
}

//to show yield 3:
{
  function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
  }

  for (let value of generateSequence()) {
    console.log(value);
  }
}

//coz iterables, it can be use with spread op syntax
{
  function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
  }

  let sequence = [0, ...generateSequence()];
  console.log(sequence); // [0,1,2,3]
}

//Using generators for iterables
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // a shorthand for [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

console.log([...range]); // [1,2,3,4,5]
