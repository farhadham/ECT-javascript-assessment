export const isEqual = (obj1: any, obj2: any): boolean => {
  // Handling primitives and same references
  if (obj1 === obj2) {
    return true;
  }

  // Handling null and undefined
  if (
    (obj1 === null || obj1 === undefined) &&
    (obj2 === null || obj2 === undefined)
  ) {
    return true;
  }

  // Handling mismatch types
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Handling Date objects
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  if (
    typeof obj1 === 'object' &&
    obj1 !== null &&
    typeof obj2 === 'object' &&
    obj2 !== null
  ) {
    // Handling arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((item, index) => isEqual(item, obj2[index]));
    }

    // Handling Objects with different constructors
    if (obj1.constructor !== obj2.constructor) {
      return false;
    }

    // Handling general object
    return Object.keys(obj1).every((item) => isEqual(obj1[item], obj2[item]));
  }

  return false;
};

// -------------
// Usage example
// -------------
const runDemos = () => {
  console.log(isEqual(null, undefined)); // true
  console.log(isEqual({ a: 1, b: [2, 3], c: null }, { a: 1, b: [2, 3] })); // true
  console.log(isEqual(new Date('2023-01-01'), new Date('2023-01-01'))); // true
  console.log(isEqual([1, null, 3], [1, undefined, 3])); // true
  console.log(isEqual([{ a: 1, b: [2, 3] }], [{ a: 1, b: [2, 3] }])); // true
  console.log(isEqual([1, 2, 3], [1, 2, 4])); // false
};

runDemos();
