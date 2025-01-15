# Analyzing Asynchronous Behavior in JavaScript Loops

## Code Snippet 1: Using `let` in a Loop

**This will result in the numbers from 0 to 9.**

```
for (let key = 0; key < 10; key++) {
  setTimeout(function() {
    console.log('Index', key);
  }, 1000);
}
```

### Explanation:

With each iteration of the loop we schedule a `setTimeout` to be executed after 1 second.
Since `let` keyword declares a block-scoped variable, each iteration has its on unique `key` that `setTimeout` knows about and will log it after 1 second. This is because the let keyword ensures that the value of key at the time of the iteration is "captured" for that specific callback.

---

## Code Snippet 2: Using var in a Loop

**This will result in the number 10 being logged ten times.**

```
for (var key = 0; key < 10; key++) {
  setTimeout(function() {
    console.log('Index', key);
  }, 1000);
}
```

### Explanation:

With each iteration of the loop, we schedule a setTimeout to be executed after 1 second.
However, since the var keyword declares a function-scoped variable, the key variable is shared across all iterations of the loop.
By the time the setTimeout callbacks execute, the loop has already completed, and the value of key is 10 (the final value after the loop finishes).
As a result, all the setTimeout callbacks will log the same value (10), because they are all referring to the same key variable in memory, which has already been updated to 10 by the end of the loop.

---

## Code Snippet 3: Using Promise.all

**This will result in the numbers from 0 to 9 being logged, followed by "All operations completed".**

```
const promises = [];

for (let key = 0; key < 10; key++) {
  promises.push(
    new Promise(resolve => {
      setTimeout(() => {
        console.log('Index', key);
        resolve(key);
      }, 1000);
    })
  );
}

Promise.all(promises).then(() => {
  console.log('All operations completed');
});
```

### Explanation:

In this example, for each iteration of the loop, a new Promise is created and pushed to the promises array.
The Promise resolves after a setTimeout of 1 second, which logs the value of key.
Because let is used to declare key, each setTimeout callback correctly captures the current iteration’s value of key.
The Promise.all method waits for all the promises in the promises array to resolve. Once all the promises resolve (after all setTimeout calls finish logging), the .then() callback executes, logging "All operations completed".

---

## Code Snippet 4: Using async/await

**This will result in the numbers from 0 to 9 being logged sequentially, one per second.**

```
async function logKeys() {
  for (let key = 0; key < 10; key++) {
    await new Promise(resolve => {
      setTimeout(() => {
        console.log('Index', key);
        resolve(key);
      }, 1000);
    });
  }
}

logKeys();
```

### Explanation:

In this example, we use an async function along with await to log the numbers sequentially. For each iteration of the loop:
A new Promise is created, which resolves after 1 second.
The await keyword ensures that the next iteration does not start until the current promise resolves, effectively pausing the loop for 1 second during each iteration.
Since let is used to declare key, each setTimeout callback correctly captures the current iteration's value of key.
As a result:
The numbers 0 to 9 are logged one at a time, with a 1-second delay between each.
This approach ensures that each log happens sequentially, making it suitable for tasks that need to be executed in strict order.

---

### Use Cases for Each Approach

1. let + setTimeout:
   When you want asynchronous operations to execute independently while retaining the correct value for each iteration.

2. var + setTimeout:
   Not recommended in modern JavaScript due to potential bugs and unintended behavior.

3. Promise.all:
   Ideal for running multiple asynchronous operations in parallel and waiting for all of them to complete. Suitable for scenarios like fetching data from multiple APIs simultaneously.

4. async/await:
   Best suited for sequential execution where each operation depends on the previous one. Useful for workflows that require strict ordering, such as processing items one by one.
