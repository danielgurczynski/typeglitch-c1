/**
 * @file Defines the core data structures and types for configuring chaos behaviors.
 */

/**
 * Represents the probability of an event occurring, from 0 (never) to 1 (always).
 */
export type Probability = number;

/**
 * Configuration for injecting latency into a response.
 */
export interface Latency {
  /**
   * The fixed delay to add to the response, in milliseconds.
   * Future versions will support jitter and distribution-based delays.
   */
  delayMs: number;
}

/**
 * Configuration for injecting an HTTP status code error.
 */
export interface HttpError {
  /**
   * The HTTP status code to return (e.g., 500, 404, 403).
   */
  status: number;
}

/**
 * A rule defining one or more chaos effects to apply to a request handler.
 * Each effect has an associated probability.
 */
export interface ChaosRule {
  /**
   * The configuration for applying a latency effect.
   */
  latency?: {
    probability: Probability;
    options: Latency;
  };

  /**
   * The configuration for applying an HTTP error effect.
   */
  httpError?: {
    probability: Probability;
    options: HttpError;
  };
}

/**
 * The root configuration for TypeGlitch.
 * It maps request handler identifiers (e.g., URL path patterns or operation IDs)
 * to their corresponding chaos rules.
 *
 * @example
 * const config: ChaosConfig = {
 *   '/api/users/:id': {
 *     latency: {
 *       probability: 0.5,
 *       options: { delayMs: 1500 }
 *     },
 *     httpError: {
 *       probability: 0.1,
 *       options: { status: 500 }
 *     }
 *   }
 * }
 */
export type ChaosConfig = Record<string, ChaosRule>;
