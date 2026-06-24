/**
 * Configuration for latency-based chaos.
 */
export interface ChaosLatencyConfig {
  /**
   * A fixed delay to add to the response, in milliseconds.
   * @example 500
   */
  delayMs?: number;
}

/**
 * Configuration for a specific API route.
 */
export interface ChaosConfig {
  /**
   * The probability (from 0 to 1) that chaos will be applied to a request.
   * If not provided, it defaults to 1 (100% of the time).
   * @default 1
   */
  probability?: number;

  /**
   * Latency-related chaos options.
   */
  latency?: ChaosLatencyConfig;
}

/**
 * The top-level schema defining chaos configurations for URL patterns.
 */
export interface ChaosSchema {
  [urlPattern: string]: ChaosConfig;
}
