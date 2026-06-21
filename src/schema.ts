/**
 * Defines the configuration for latency simulation.
 */
export interface DelayOptions {
  /**
   * A fixed delay in milliseconds to apply to the response.
   */
  fixedMs: number;
}

/**
 * The core schema defining a set of chaos effects to apply to a request.
 */
export interface ChaosSchema {
  /**
   * Configuration for simulating network latency.
   * If undefined, no delay is applied.
   */
  delay?: DelayOptions;

  // Future properties for errors, data corruption, etc. will be added here.
}
