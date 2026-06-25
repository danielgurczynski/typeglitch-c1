/**
 * Defines the configuration for latency-based chaos.
 */
export interface LatencyOptions {
  /**
   * A fixed delay in milliseconds to add to each response.
   * If not provided, no delay is added.
   * @default 0
   */
  delayMs?: number;
}

/**
 * The main configuration object for all chaos operations.
 * Users will provide this object to configure the behavior of TypeGlitch.
 */
export interface ChaosConfig {
  /**
   * Latency-related chaos settings. When provided, these settings
   * will be applied to intercepted requests.
   */
  latency?: LatencyOptions;

  // Other chaos categories will be added here in the future.
}
