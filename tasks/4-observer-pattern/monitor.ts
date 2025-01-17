/**
 * Monitor Class
 * Observes counters and raises warnings when values exceed a threshold.
 */
export class Monitor {
  private threshold: number; // Threshold value for raising warnings

  constructor(threshold: number) {
    this.threshold = threshold;
  }

  /**
   * Called when the observed counter changes.
   * Logs a warning if the counter value exceeds the threshold.
   * @param counterId - The ID of the counter.
   * @param counterValue - The current value of the counter.
   */
  update(counterId: string, counterValue: number) {
    console.log(
      `Counter ${counterId} is incremented. Current value is: ${counterValue}`,
    );

    // Logging warning
    if (counterValue > this.threshold) {
      console.log(
        `WARNING! Counter ${counterId} has passed the limit of ${this.threshold} and currently has the value of ${counterValue}`,
      );
    }
  }
}
