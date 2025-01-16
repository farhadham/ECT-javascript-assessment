type ListDataType = {
  key: string;
  value: number;
};

type AggregatedResultType = { [key: string]: number };

/**
 * This function takes an array of objects, where each object has a `key` and a `value`,
 * and aggregates the values based on the `key`. If a key appears multiple times in
 * the input array, their values are summed up in the output object.
 * Suitable for small arrays ~< 50000 items
 *
 * @param arr - An array of objects where each object has:
 *   - `key` (string): The key by which the aggregation is performed.
 *   - `value` (number): The numeric value to aggregate.
 * @returns An object where the keys are the unique `key` values from the input array,
 *          and the values are the sum of all corresponding `value` entries.
 */
export const transformSmallArray = (arr: ListDataType[]) => {
  return arr.reduce((acc: AggregatedResultType, curr) => {
    // If key exists, add to existing value, else, create new key-value pair
    acc[curr.key] = (acc[curr.key] ?? 0) + curr.value;
    return acc;
  }, {});
};

/**
 * This function takes an array of objects, where each object has a `key` and a `value`,
 * and aggregates the values based on the `key`. If a key appears multiple times in
 * the input array, their values are summed up in the output object.
 * Suitable for Large arrays ~> 50000 items
 *
 * @param arr - An array of objects where each object has:
 *   - `key` (string): The key by which the aggregation is performed.
 *   - `value` (number): The numeric value to aggregate.
 * @returns An object where the keys are the unique `key` values from the input array,
 *          and the values are the sum of all corresponding `value` entries.
 */
export const transformLargeArray = (arr: ListDataType[]) => {
  const result: AggregatedResultType = Object.create(null);

  for (const item of arr) {
    result[item.key] = (result[item.key] ?? 0) + item.value;
  }

  return result;
};

// -------------
// Usage example
// -------------
const runDemos = () => {
  console.log(
    `--------------\nTransforming and aggregating array to object\n--------------\n`,
  );
  const testArray = [
    { key: 'A', value: 1 },
    { key: 'C', value: 2 },
    { key: 'B', value: 3 },
    { key: 'A', value: 5 },
  ];
  console.log('Transforming array:', testArray);
  const result = transformSmallArray(testArray);
  console.log('Result', result);
};

runDemos();
