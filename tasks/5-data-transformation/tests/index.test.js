import { describe, it, expect } from 'vitest';

import { transformSmallArray, transformLargeArray } from '..';

describe('transformSmallArray', () => {
  it('should aggregate values with the same key', () => {
    const input = [
      { key: 'apple', value: 10 },
      { key: 'banana', value: 20 },
      { key: 'apple', value: 5 },
    ];
    const expectedOutput = {
      apple: 15,
      banana: 20,
    };

    expect(transformSmallArray(input)).toEqual(expectedOutput);
  });

  it('should return an empty object for an empty array', () => {
    const input = [];
    const expectedOutput = {};

    expect(transformSmallArray(input)).toEqual(expectedOutput);
  });

  it('should handle arrays with one element', () => {
    const input = [{ key: 'orange', value: 30 }];
    const expectedOutput = {
      orange: 30,
    };

    expect(transformSmallArray(input)).toEqual(expectedOutput);
  });

  it('should correctly handle negative values', () => {
    const input = [
      { key: 'apple', value: -10 },
      { key: 'banana', value: 20 },
      { key: 'apple', value: -5 },
    ];
    const expectedOutput = {
      apple: -15,
      banana: 20,
    };

    expect(transformSmallArray(input)).toEqual(expectedOutput);
  });

  it('should handle arrays with multiple unique keys', () => {
    const input = [
      { key: 'carrot', value: 3 },
      { key: 'tomato', value: 5 },
      { key: 'cucumber', value: 7 },
    ];
    const expectedOutput = {
      carrot: 3,
      tomato: 5,
      cucumber: 7,
    };

    expect(transformSmallArray(input)).toEqual(expectedOutput);
  });
});

describe('transformLargeArray', () => {
  it('should aggregate values with the same key', () => {
    const input = [
      { key: 'apple', value: 10 },
      { key: 'banana', value: 20 },
      { key: 'apple', value: 5 },
    ];
    const expectedOutput = {
      apple: 15,
      banana: 20,
    };

    expect(transformLargeArray(input)).toEqual(expectedOutput);
  });

  it('should return an empty object for an empty array', () => {
    const input = [];
    const expectedOutput = {};

    expect(transformLargeArray(input)).toEqual(expectedOutput);
  });

  it('should handle arrays with one element', () => {
    const input = [{ key: 'orange', value: 30 }];
    const expectedOutput = {
      orange: 30,
    };

    expect(transformLargeArray(input)).toEqual(expectedOutput);
  });

  it('should correctly handle negative values', () => {
    const input = [
      { key: 'apple', value: -10 },
      { key: 'banana', value: 20 },
      { key: 'apple', value: -5 },
    ];
    const expectedOutput = {
      apple: -15,
      banana: 20,
    };

    expect(transformLargeArray(input)).toEqual(expectedOutput);
  });

  it('should handle arrays with multiple unique keys', () => {
    const input = [
      { key: 'carrot', value: 3 },
      { key: 'tomato', value: 5 },
      { key: 'cucumber', value: 7 },
    ];
    const expectedOutput = {
      carrot: 3,
      tomato: 5,
      cucumber: 7,
    };

    expect(transformLargeArray(input)).toEqual(expectedOutput);
  });
});
