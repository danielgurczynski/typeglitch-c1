/**
 * Defines the distribution for jitter.
 * 'uniform': A random delay between 0 and maxMs.
 * 'gaussian': A random delay following a normal distribution. (Not yet implemented)
 */
export type JitterDistribution = 'uniform' | 'gaussian';

export interface Jitter {
  distribution: JitterDistribution;
  maxMs: number;
}

/**
 * Configuration for simulating network latency.
 */
export interface Latency {
  /**
   * A fixed delay in milliseconds to add to every response.
   */
  delayMs?: number;

  /**
   * Variable delay to simulate network jitter.
   */
  jitter?: Jitter;

  /**
   * If true, the request will hang indefinitely, simulating a non-responsive server.
   * This will cause a client-side timeout. Overrides delay and jitter.
   * @default false
   */
  hang?: boolean;
}

/**
 * The main configuration object for TypeGlitch.
 */
export interface ChaosConfig {
  /**
   * The probability (from 0 to 1) that any chaos will be applied to a request.
   * @default 1
   */
  probability?: number;
  
  /**
   * Latency-related chaos settings.
   */
  latency?: Latency;

  // ... other chaos settings like status codes, body corruption etc.
}
