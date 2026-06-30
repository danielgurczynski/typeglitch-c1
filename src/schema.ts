/**
 * Defines a programmable delay to simulate network latency.
 */
export interface LatencyConfig {
  delayMs: number;
  jitter?: 'uniform' | 'gaussian';
}

/**
 * Defines a network error response to be injected instead of the real one.
 */
export interface StatusErrorConfig {
  /** The HTTP status code to return, e.g., 500, 404. */
  statusCode: number;

  /** The probability (from 0.0 to 1.0) of this error being triggered. */
  probability: number;
}

/**
 * The core configuration for applying chaos to a request.
 * Each property represents a different type of "glitch".
 */
export interface ChaosConfig {
  /** Applies latency to the response. */
  latency?: LatencyConfig;

  /** Overrides the response with a specified HTTP status error. */
  statusError?: StatusErrorConfig;

  // Future chaos types will be added here
}
