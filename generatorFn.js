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

//Generators are iterable
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
