'use strict';

//Recall iterables
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    // called once, in the beginning of for..of
    return {
      current: this.from,
      last: this.to,

      next() {
        // called every iteration, to get the next value
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let value of range) {
  console.log(value); // 1 then 2, then 3, then 4, then 5
}

//Async iterables
//syntax: Symbol.asyncIterator
{
  let range = {
    from: 1,
    to: 5,

    [Symbol.asyncIterator]() {
      // (1)
      return {
        current: this.from,
        last: this.to,

        async next() {
          // (2)

          // note: we can use "await" inside the async next:
          await new Promise((resolve) => setTimeout(resolve, 1000)); // (3)

          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  };

  (async () => {
    for await (let value of range) {
      // (4)
      console.log(value); // 1,2,3,4,5
    }
  })();
}

//NOTES: The spread syntax ... doesn’t work asynchronously

//Recall generators
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (let value of generateSequence(1, 5)) {
  console.log(value); // 1,2,3,4,5
}

//using symbol.iterator to return a generator
{
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

  for (let value of range) {
    console.log(value); // 1, then 2, then 3, then 4, then 5
  }
}

//Async generators (finally)
//syntax: async function*
{
  async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
      // Wow, can use await!
      await new Promise((resolve) => setTimeout(resolve, 1000));

      yield i;
    }
  }

  (async () => {
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
      console.log(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
    }
  })();
}

//Async iterable range
{
  let range = {
    from: 1,
    to: 5,

    // this line is same as [Symbol.asyncIterator]: async function*() {
    async *[Symbol.asyncIterator]() {
      for (let value = this.from; value <= this.to; value++) {
        // make a pause between values, wait for something
        await new Promise((resolve) => setTimeout(resolve, 1000));

        yield value;
      }
    },
  };

  (async () => {
    for await (let value of range) {
      console.log(value); // 1, then 2, then 3, then 4, then 5
    }
  })();
}
