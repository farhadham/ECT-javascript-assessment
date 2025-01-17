# Task: Deep Copying an Object with Circular Reference Handling

## Thought Process

The aim of this task was to implement a function that performs a deep copy of any object, while gracefully handling circular references. This required an approach to ensure all object types, such as arrays, plain objects, and special cases (like Date), are copied correctly without infinite recursion.

## Challenges Encountered

- Avoiding infinite recursion caused by circular references within the object structure.
- Handling special cases like Date objects that require unique copying logic.
- Ensuring deeply nested objects and arrays are properly cloned without retaining references to the original structure.

## Decisions Made

- **WeakMap for Circular Reference Tracking:** Used a Map to track visited objects and their clones, preventing infinite recursion.
- **Special Type Handling:** Added specific logic to handle Date objects, ensuring they are copied with their value attached.
- **Generic Copying for Objects and Arrays:** Implemented recursive logic to copy arrays and objects while respecting their prototype chains.

## Testing

Unit tests were designed to validate the deep copy implementation across various scenarios:

- Verified that primitive values (e.g., numbers, strings, null) are returned as-is.
- Confirmed that objects and arrays are deeply copied, with no shared references between the original and the copy.
- Tested circular structures to ensure no infinite recursion occurs, and circular references are maintained in the copy.
- Ensured that Date objects are accurately cloned with their value and type preserved.
- Validated the function against deeply nested objects and arrays, including combinations of the above cases.
- Checked that empty objects and arrays are copied correctly.

---

# Task: Checking Object Equivalence

## Thought Process

The goal was to write a function that checks if two objects are equivalent. The function had to compare objects, arrays, dates, and primitive types while considering null and undefined as equal.

## Challenges Encountered

- Handling null and undefined as equal values.
- Comparing arrays and ensuring their order and length match.
- Comparing objects while handling their keys and values recursively.
- Accounting for Date objects by comparing their time values.

## Decisions Made

- **Primitive and Reference Equality:** If two values are strictly equal (===), they are considered equivalent.
- **Null and Undefined:** These are treated as equal.
- **Date Handling:** Compared Date objects using their timestamp values.
- **Array Handling:** Used a recursive comparison to ensure all items in arrays match in value and order.
- **General Object Handling:** Checked that both objects have the same keys and recursively compared their values.

## Testing

Unit tests were written to verify the function's behavior across different scenarios:

- Confirmed that null and undefined are treated as equal.
- Checked equivalence for plain objects, including nested objects.
- Verified that arrays are compared recursively, considering their order.
- Ensured that Date objects with the same time are considered equal.
- Tested equivalence for deeply nested structures combining objects, arrays, and dates.
- Validated that mismatches in keys, values, or array lengths are identified correctly.
