import { describe, it, expect, vi } from 'vitest';

import { Counter } from '..';
import { Monitor } from '../monitor';

describe('Counter and Monitor Classes', () => {
  it('Counter increments correctly', () => {
    const counter = new Counter('TestCounter');
    counter.increment();
    expect(counter.getValue()).toBe(1);
    counter.increment();
    expect(counter.getValue()).toBe(2);
  });

  it('Counter resets correctly', () => {
    const counter = new Counter('TestCounter');
    counter.increment();
    counter.increment();
    expect(counter.getValue()).toBe(2);
    counter.reset();
    expect(counter.getValue()).toBe(0);
  });

  it('Monitor receives notifications when counter changes', () => {
    const monitor = new Monitor(10);
    const updateSpy = vi.spyOn(monitor, 'update');
    const counter = new Counter('TestCounter');
    counter.subscribe(monitor);

    counter.increment();
    expect(updateSpy).toHaveBeenCalledWith('TestCounter', 1);
    counter.increment();
    expect(updateSpy).toHaveBeenCalledWith('TestCounter', 2);
  });

  it('Monitor does not receive notifications after being unsubscribed', () => {
    const monitor = new Monitor(10);
    const updateSpy = vi.spyOn(monitor, 'update');
    const counter = new Counter('TestCounter');
    counter.subscribe(monitor);

    counter.increment();
    expect(updateSpy).toHaveBeenCalledWith('TestCounter', 1);

    counter.unsubscribe(monitor);
    counter.increment();
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  it('Monitor does not raise warnings for values below or equal to threshold', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const monitor = new Monitor(10);
    const counter = new Counter('TestCounter');

    counter.subscribe(monitor);
    for (let i = 0; i < 5; i++) {
      counter.increment();
    }

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining(
        'WARNING! Counter TestCounter has passed the limit of 10',
      ),
    );

    consoleSpy.mockRestore();
  });

  it('Monitor raises warnings for values exceeding threshold', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const monitor = new Monitor(10);
    const counter = new Counter('TestCounter');

    counter.subscribe(monitor);
    for (let i = 0; i < 12; i++) {
      counter.increment();
    }

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'WARNING! Counter TestCounter has passed the limit of 10',
      ),
    );

    consoleSpy.mockRestore();
  });

  it('Multiple counters notify the same monitor', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const monitor = new Monitor(5);
    const counter1 = new Counter('Counter1');
    const counter2 = new Counter('Counter2');

    counter1.subscribe(monitor);
    counter2.subscribe(monitor);

    for (let i = 0; i < 6; i++) {
      counter1.increment();
    }
    for (let i = 0; i < 7; i++) {
      counter2.increment();
    }

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'WARNING! Counter Counter1 has passed the limit of 5',
      ),
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'WARNING! Counter Counter2 has passed the limit of 5',
      ),
    );

    consoleSpy.mockRestore();
  });
});
