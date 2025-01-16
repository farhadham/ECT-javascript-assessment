import { describe, it, expect } from 'vitest';

import { deepCopy } from '../deep-copy';

describe('deepCopy function', () => {
  it('should return primitives as is', () => {
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(null)).toBeNull();
    expect(deepCopy(undefined)).toBeUndefined();
    expect(deepCopy(true)).toBe(true);
  });

  it('should handle plain objects', () => {
    const obj = { a: 1, b: 'test', c: { nested: true } };
    const copied = deepCopy(obj);

    expect(copied).toEqual(obj);
    expect(copied).not.toBe(obj);
    expect(copied.c).not.toBe(obj.c);
  });

  it('should handle arrays', () => {
    const arr = [1, 'two', { nested: true }];
    const copied = deepCopy(arr);

    expect(copied).toEqual(arr);
    expect(copied).not.toBe(arr);
    expect(copied[2]).not.toBe(arr[2]);
  });

  it('should handle circular references', () => {
    const obj = { a: 1 };
    obj.self = obj;

    const copied = deepCopy(obj);

    expect(copied).toEqual(obj);
    expect(copied).not.toBe(obj);
    expect(copied.self).toBe(copied);
  });

  it('should handle Date objects', () => {
    const date = new Date();
    const copiedDate = deepCopy(date);

    expect(copiedDate).toEqual(date);
    expect(copiedDate).not.toBe(date);
    expect(copiedDate instanceof Date).toBe(true);
  });

  it('should handle complex nested structures', () => {
    const obj = {
      a: 1,
      b: [2, { c: 3 }],
      d: new Date(),
    };
    obj.e = obj;

    const copied = deepCopy(obj);

    expect(copied).toEqual(obj);
    expect(copied).not.toBe(obj);
    expect(copied.b).not.toBe(obj.b);
    expect(copied.b[1]).not.toBe(obj.b[1]);
    expect(copied.d).toEqual(obj.d);
    expect(copied.d).not.toBe(obj.d);
    expect(copied.e).toBe(copied);
  });

  it('should handle empty objects and arrays', () => {
    expect(deepCopy({})).toEqual({});
    expect(deepCopy([])).toEqual([]);
  });
});
