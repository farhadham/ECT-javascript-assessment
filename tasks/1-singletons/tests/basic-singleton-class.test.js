import { describe, beforeEach, it, expect } from 'vitest';

import { SingletonIncrementor } from '../basic-singleton';

describe('SingletonIncrementor', () => {
  beforeEach(() => {
    SingletonIncrementor.instance = null;
  });

  describe('getInstance', () => {
    it('should create only one instance', () => {
      const instance1 = SingletonIncrementor.getInstance();
      const instance2 = SingletonIncrementor.getInstance();

      expect(instance1).toBe(instance2);
    });

    it('should maintain the same instance across multiple calls', () => {
      const instances = Array.from({ length: 5 }, () =>
        SingletonIncrementor.getInstance(),
      );

      instances.forEach((instance) => {
        expect(instance).toBe(instances[0]);
      });
    });
  });

  describe('incrementOnce', () => {
    it('should start with initial value of 0', () => {
      const instance = SingletonIncrementor.getInstance();
      expect(instance.incrementOnce()).toBe(1);
    });

    it('should increment value by 1 each time', () => {
      const instance = SingletonIncrementor.getInstance();
      expect(instance.incrementOnce()).toBe(1);
      expect(instance.incrementOnce()).toBe(2);
      expect(instance.incrementOnce()).toBe(3);
    });

    it('should maintain count across different references to the singleton', () => {
      const instance1 = SingletonIncrementor.getInstance();
      const instance2 = SingletonIncrementor.getInstance();

      expect(instance1.incrementOnce()).toBe(1);
      expect(instance2.incrementOnce()).toBe(2);
      expect(instance1.incrementOnce()).toBe(3);
      expect(instance2.incrementOnce()).toBe(4);
    });
  });

  describe('state isolation', () => {
    it('should maintain state between getInstance calls', () => {
      const instance1 = SingletonIncrementor.getInstance();
      instance1.incrementOnce();
      instance1.incrementOnce();

      const instance2 = SingletonIncrementor.getInstance();
      expect(instance2.incrementOnce()).toBe(3);
    });
  });
});
