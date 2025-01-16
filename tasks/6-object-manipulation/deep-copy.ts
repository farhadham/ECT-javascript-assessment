const deepCopy = <T>(obj: T, visited = new WeakMap()): T => {
  // Handling null and primitives base case
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handling date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Handling circular referencce before arrays and objects
  if (visited.has(obj)) {
    return visited.get(obj);
  }

  // Handling arrays
  if (Array.isArray(obj)) {
    const copyArr: unknown[] = [];
    // Caching first to prevent stack overflow. Because if we face self as an item of array, recursive will run forever trying to copy itself into array
    visited.set(obj, copyArr);
    for (const item of obj) {
      copyArr.push(deepCopy(item, visited));
    }
    return copyArr as T;
  }

  // Handling general object
  const copyObj: any = Object.create(Object.getPrototypeOf(obj));
  // Same reason of caching in array block
  visited.set(obj, copyObj);
  for (const [key, value] of Object.entries(obj)) {
    copyObj[key] = deepCopy(value, visited);
  }

  return copyObj;
};

// -------------
// Usage example
// -------------
const runDemos = () => {
  const obj1 = {
    a: 1,
    b: 'string',
    c: { nested: true },
    d: [1, 2, 3],
  };
  console.log('Test 1:', deepCopy(obj1));

  // Test 2: Circular reference
  const obj2: any = {
    a: 1,
    b: { inner: 'value' },
  };
  obj2.circular = obj2;
  const copy2 = deepCopy(obj2);
  console.log('Test 2 - Circular reference handled:', copy2.circular === copy2);
};

runDemos();
