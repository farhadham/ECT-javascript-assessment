import { Monitor } from './monitor';

/**
 * Counter Class
 * Represents a counter with a unique ID and observer support.
 */
export class Counter {
  private id: string;
  private counter: number;
  private observers: Set<Monitor>; // Set of attached observers

  constructor(id: string) {
    this.id = id;
    this.counter = 0;
    this.observers = new Set();
  }

  public increment() {
    ++this.counter;
    this.notify();
  }

  public getValue() {
    return this.counter;
  }

  public reset() {
    this.counter = 0;
  }

  /**
   * Subscribes an observer to monitor the counter.
   * @param monitor - The observer to subscribe.
   */
  public subscribe(monitor: Monitor) {
    this.observers.add(monitor);
  }

  /**
   * Unsubscribes an observer from monitoring the counter.
   * @param monitor - The observer to unsubscribe.
   */
  public unsubscribe(monitor: Monitor) {
    this.observers.delete(monitor);
  }

  /**
   * Notifies all subscribed observers of changes in the counter.
   */
  private notify() {
    this.observers.forEach((observer) => {
      observer.update(this.id, this.counter);
    });
  }
}

// -------------
// Usage example
// -------------
export const runDemos = () => {
  // Create counters
  const counter1 = new Counter('Counter1');
  const counter2 = new Counter('Counter2');

  // Create a monitor with a threshold of 10
  const monitor1 = new Monitor(10);

  // Attach monitor to both counters
  counter1.subscribe(monitor1);
  counter2.subscribe(monitor1);

  // Simulate counter changes
  console.log('Incrementing Counter1: 3 times');
  counter1.increment();
  counter1.increment();
  counter1.increment();
  console.log(
    'finished incrementing Counter1: 3 times - No warning for threshold of 10',
  );

  console.log('\nIncrementing Counter2: 12 times');
  for (let i = 0; i < 12; i++) {
    counter2.increment();
  }
  console.log(
    'finished incrementing Counter1: 12 times - 2 warnings for threshold of 10',
  );
  counter1.reset();
};
