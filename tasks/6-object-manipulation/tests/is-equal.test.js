import { describe, it, expect } from 'vitest';

import { isEqual } from '../is-equal';

describe('isEqual function', () => {
  it('should handle null and undefined equivalence', () => {
    expect(isEqual(null, undefined)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(null, 0)).toBe(false);
  });

  it('should handle primitive values', () => {
    expect(isEqual(42, 42)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(42, 43)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
  });

  it('should handle Date objects', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-01');
    const date3 = new Date('2023-01-02');

    expect(isEqual(date1, date2)).toBe(true);
    expect(isEqual(date1, date3)).toBe(false);
  });

  it('should handle arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, null, 3], [1, undefined, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('should handle plain objects', () => {
    const obj1 = { a: 1, b: [2, 3], c: null };
    const obj2 = { a: 1, b: [2, 3] };
    const obj3 = { a: 1, b: [2, 4] };

    expect(isEqual(obj1, obj2)).toBe(true); // `c` is null in obj1 but undefined in obj2
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('should handle nested structures', () => {
    const nested1 = { a: 1, b: { c: [2, 3], d: new Date('2023-01-01') } };
    const nested2 = { a: 1, b: { c: [2, 3], d: new Date('2023-01-01') } };
    const nested3 = { a: 1, b: { c: [2, 4], d: new Date('2023-01-01') } };

    expect(isEqual(nested1, nested2)).toBe(true);
    expect(isEqual(nested1, nested3)).toBe(false);
  });

  it('should handle arrays of objects', () => {
    const arr1 = [{ a: 1, b: [2, 3] }];
    const arr2 = [{ a: 1, b: [2, 3] }];
    const arr3 = [{ a: 1, b: [2, 4] }];

    expect(isEqual(arr1, arr2)).toBe(true);
    expect(isEqual(arr1, arr3)).toBe(false);
  });

  it('should handle objects with missing keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };

    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should return false for different types', () => {
    expect(isEqual(42, '42')).toBe(false);
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual([], {})).toBe(false);
  });
});
