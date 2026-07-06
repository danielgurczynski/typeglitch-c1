import type { LatencyConfig } from './core/latency';

/**
 * Configuration for injecting HTTP status code errors.
 */
export interface StatusErrorConfig {
  /**
   * The probability of a status error being injected, from 0.0 to 1.0.
   * If not provided, it defaults to 1.0 (always trigger).
   * @default 1.0
   */
  probability?: number;

  /**
   * The list of HTTP status codes to choose from when an error is triggered.
   * If an error is triggered and this list is empty, it defaults to 500.
   */
  allowedStatusCodes: number[];
}

/**
 * The main configuration object for TypeGlitch.
 */
export interface ChaosConfig {
  /**
   * Defines latency-related chaos like delays and jitter.
   */
  latency?: LatencyConfig;

  /**
   * Defines HTTP status code errors.
   */
  statusErrors?: StatusErrorConfig;
}
