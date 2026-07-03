/**
 * Configuration for injecting artificial latency.
 */
export interface LatencyConfig {
  /** The base delay in milliseconds. */
  delayMs: number;
}

/**
 * Configuration for injecting HTTP status errors.
 */
export interface ChaosStatusErrorConfig {
  /** Probability of injecting a status error (0 to 1). */
  probability: number;
  /** Array of HTTP status codes to choose from (e.g., [404, 500, 503]). */
  codes: number[];
}

/**
 * Defines the complete configuration for all active chaos effects.
 */
export interface ChaosConfig {
  latency?: LatencyConfig;
  statusErrors?: ChaosStatusErrorConfig;
}
