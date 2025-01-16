export const areEquivalent = (obj1: any, obj2: any): boolean => {
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

  // Handling Date objects
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    // Handling arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((item, index) => areEquivalent(item, obj2[index]));
    }

    // Handling general object
    return Object.keys(obj1).every((item) =>
      areEquivalent(obj1[item], obj2[item]),
    );
  }

  return false;
};

// -------------
// Usage example
// -------------
const runDemos = () => {
  console.log(areEquivalent(null, undefined)); // true
  console.log(areEquivalent({ a: 1, b: [2, 3], c: null }, { a: 1, b: [2, 3] })); // true
  console.log(areEquivalent(new Date('2023-01-01'), new Date('2023-01-01'))); // true
  console.log(areEquivalent([1, null, 3], [1, undefined, 3])); // true
  console.log(areEquivalent([{ a: 1, b: [2, 3] }], [{ a: 1, b: [2, 3] }])); // true
  console.log(areEquivalent([1, 2, 3], [1, 2, 4])); // false
};

runDemos();
