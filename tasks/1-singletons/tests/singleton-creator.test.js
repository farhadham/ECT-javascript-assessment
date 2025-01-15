import { describe, it, expect, vi } from 'vitest';

import { Utility, TestClass } from '../singleton-creator';

describe('SessionSingleton', () => {
  it('should create a singleton instance of a given class', () => {
    const singleton = new Utility.SessionSingleton(TestClass);

    const instance1 = singleton.instance();
    const instance2 = singleton.instance();

    expect(instance1).toBe(instance2);
  });

  it('should retain state across multiple accesses', () => {
    const singleton = new Utility.SessionSingleton(TestClass);

    const instance = singleton.instance();
    expect(instance.getName()).toBe('empty');

    instance.setName('Yanni');
    expect(instance.getName()).toBe('Yanni');

    const anotherAccess = singleton.instance();
    expect(anotherAccess.getName()).toBe('Yanni');
  });

  it('should only call the constructor of the class once', () => {
    const mockConstructor = vi.fn();

    class MockClass {
      constructor() {
        mockConstructor();
      }
    }

    const singleton = new Utility.SessionSingleton(MockClass);

    // Access the singleton instance multiple times
    singleton.instance();
    singleton.instance();

    // Ensure the constructor was called only once
    expect(mockConstructor).toHaveBeenCalledTimes(1);
  });

  it('should work with multiple distinct singleton managers', () => {
    const singletonA = new Utility.SessionSingleton(TestClass);
    const singletonB = new Utility.SessionSingleton(TestClass);

    const instanceA = singletonA.instance();
    const instanceB = singletonB.instance();

    // Ensure different singleton managers have different instances
    expect(instanceA).not.toBe(instanceB);

    // Verify independent state management
    instanceA.setName('A');
    instanceB.setName('B');

    expect(instanceA.getName()).toBe('A');
    expect(instanceB.getName()).toBe('B');
  });

  it('should handle custom class types correctly', () => {
    class CustomClass {
      constructor() {
        this.value = 42;
      }

      getValue() {
        return this.value;
      }

      setValue(value) {
        this.value = value;
      }
    }

    const singleton = new Utility.SessionSingleton(CustomClass);

    const instance = singleton.instance();
    expect(instance.getValue()).toBe(42);

    instance.setValue(100);
    expect(instance.getValue()).toBe(100);
  });
});
