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

//Generator composition
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

//TO generate random password
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
}

let str = '';

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z

//“yield” is a two-way street
{
  function* gen() {
    // Pass a question to the outer code and wait for an answer
    let result = yield '2 + 2 = ?'; // (*)

    console.log(result); //4
  }

  let generator = gen();

  let question = generator.next().value; // <-- yield returns the value

  generator.next(4); // --> pass the result into the generator
}

{
  function* gen() {
    let ask1 = yield '2 + 2 = ?';

    console.log(ask1); // 4

    let ask2 = yield '3 * 3 = ?';

    console.log(ask2); // 9
  }

  let generator = gen();

  console.log(generator.next().value); // "2 + 2 = ?"

  console.log(generator.next(4).value); // "3 * 3 = ?"

  console.log(generator.next(9).done); // true
}

//generator.throw
{
  function* gen() {
    try {
      let result = yield '2 + 2 = ?'; // (1)

      console.log(
        'The execution does not reach here, because the exception is thrown above'
      );
    } catch (e) {
      console.log(e); // shows the error
    }
  }

  let generator = gen();

  let question = generator.next().value;

  generator.throw(new Error('The answer is not found in my database')); // (2)
}

//generator.return
{
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  const g = gen();

  console.log(g.next()); // { value: 1, done: false }
  console.log(g.return('foo')); // { value: "foo", done: true }
  console.log(g.next()); // { value: undefined, done: true }
}
