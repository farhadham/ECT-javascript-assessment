# Task: Transforming an Array into an Aggregated Object

## Thought Process

The objective of this task was to transform an array of objects into an aggregated object where the keys are unique, and their corresponding values are summed. This required handling duplicate keys while ensuring performance for both small and large datasets.

## Challenges Encountered

- Ensuring that duplicate keys in the array are combined and their values summed accurately.
- Designing separate solutions to handle small and large arrays effectively, minimizing overhead for large datasets.
- Addressing scenarios such as empty arrays, negative values, and single-element arrays.

## Decisions Made

- **Small Array Handling:** Used Array.reduce() for its conciseness and readability, making it ideal for smaller datasets.
- **Large Array Handling:** Opted for a for loop to optimize performance for larger datasets.

## Testing

I wrote unit tests to validate the implementation across various scenarios:

- Confirmed that values associated with duplicate keys are summed correctly.
- Verified that an empty array returns an empty object.
- Ensured proper handling of arrays with only one object.
- Tested scenarios with negative values to ensure correct aggregation.
- Checked that all keys in the array are uniquely represented in the result.
