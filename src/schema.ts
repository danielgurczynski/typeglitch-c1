/**
 * @module
 * This module defines the core data structures for configuring chaos.
 * The `ChaosSchema` is the central configuration object that maps request
 * identifiers to a set of `ChaosRule`s to be applied.
 */

/**
 * Defines latency-related glitches.
 * @see Roadmap: Week 2
 */
export interface LatencyGlitch {
  /**
   * The base delay to add to the response, in milliseconds.
   */
  delayMs: number;
  /**
   * The maximum random variation (jitter) to add or subtract from the delay, in milliseconds.
   * A value of 50 would result in a random delay between `delayMs - 50` and `delayMs + 50`.
   * @default 0
   */
  jitterMs?: number;
}

/**
 * Defines HTTP error response glitches.
 * @see Roadmap: Week 3
 */
export interface ErrorGlitch {
  /**
   * A list of HTTP status codes to choose from.
   * e.g., [400, 404, 500]
   */
  statusCodes: number[];
  /**
   * The probability (from 0.0 to 1.0) that an error response will be sent.
   */
  probability: number;
}

/**
 * Defines data corruption glitches.
 * This is a placeholder for future implementation.
 * @see Roadmap: Week 4
 */
export interface CorruptionGlitch {
  /**
   * Enables or disables data corruption for a given request.
   * Specific corruption logic will be defined later.
   */
  enabled: boolean;
}

/**
 * A `ChaosRule` encapsulates all the possible glitches that can be applied
 * to a single intercepted network request.
 */
export interface ChaosRule {
  /** Optional latency glitch configuration. */
  latency?: LatencyGlitch;

  /** Optional error glitch configuration. */
  error?: ErrorGlitch;

  /** Optional data corruption glitch configuration. */
  corruption?: CorruptionGlitch;
}

/**
 * The `ChaosSchema` is the root configuration for TypeGlitch.
 * It's a map where keys are unique identifiers for request handlers
 * (e.g., "GET /api/users", "getProfileQuery") and values are the
 * `ChaosRule`s to apply for that handler.
 *
 * @example
 * ```ts
 * const schema: ChaosSchema = {
 *   'getUsers': {
 *     latency: { delayMs: 500, jitterMs: 100 },
 *     error: { statusCodes: [500, 503], probability: 0.1 }
 *   }
 * }
 * ```
 */
export type ChaosSchema = Record<string, ChaosRule>;
