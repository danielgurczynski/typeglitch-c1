/**
 * @module Schema
 * Defines the core data structures for configuring chaos engineering rules.
 */

/**
 * Represents the HTTP methods that a chaos rule can apply to.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * A discriminated union representing a single chaos engineering effect.
 * This will be expanded as more capabilities like data corruption are added.
 */
export type ChaosEffect =
  | {
      /** Applies a fixed latency to the response. */
      type: 'LATENCY';
      /** The delay to add, in milliseconds. */
      delayMs: number;
    }
  | {
      /** Returns a specific HTTP error status code. */
      type: 'ERROR';
      /** The HTTP status code to return. */
      status: number;
    };

/**
 * Defines a rule for intercepting a specific API request and applying a chaos effect.
 */
export interface ChaosRule {
  /**
   * Identifier for the rule, useful for logging and management.
   */
  id: string;

  /**
   * The URL path to match. Can be a string for an exact match or a RegExp for pattern matching.
   * e.g., '/api/users/:id' or /^\/api\/users\/[\w-]+$/
   */
  path: string | RegExp;

  /**
   * The HTTP methods to which this rule applies.
   * If omitted, the rule applies to all methods.
   */
  methods?: HttpMethod[];

  /**
   * The probability (from 0.0 to 1.0) that the chaos effect will be applied on a matched request.
   * @default 1.0
   */
  probability?: number;

  /**
   * The chaos effect to apply if the request is matched and passes the probability check.
   */
  effect: ChaosEffect;
}

/**
 * The root configuration object for TypeGlitch.
 * It consists of an array of rules that are evaluated in order for each request.
 * The first rule that matches a request will be applied.
 */
export type ChaosSchema = ChaosRule[];
