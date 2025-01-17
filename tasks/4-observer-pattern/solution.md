# Task: Implementing the Observer Pattern for a Counter Class

## Thought Process

The goal of this task was to implement the Observer pattern for a `Counter` class. Observers should be able to monitor changes in the counter and respond to specific conditions. A `Monitor` class was created to raise an alarm if a counter value exceeded a predefined threshold. The solution was also extended to handle multiple counters and allow filtering events by counter ID.

## Challenges Encountered

- Designing a flexible system where multiple counters could notify multiple observers independently.
- Ensuring observers only react to changes in counters they are subscribed to.

## Decisions Made

- **Counter Class:** Each counter has a unique ID, maintains its own value, and allows observers to subscribe or unsubscribe.
- **Monitor Class:** Observers are notified whenever a counter changes. If the counter value exceeds a threshold, a warning is logged to the console.
- **Observer Pattern:** The `notify` method in the `Counter` class informs all subscribed monitors whenever the counter changes.
- **Event Filtering:** Observers are notified with the counter's ID and value, making it easier to track which counter triggered the event.

## Testing

I wrote unit tests to check that:

- Incrementing and resetting counters work as expected.
- Observers are notified when counters change.
- Observers stop receiving updates when unsubscribed.
- Threshold warnings are raised correctly for values exceeding the limit.
- A single observer can monitor multiple counters independently.
