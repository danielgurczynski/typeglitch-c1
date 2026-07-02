import { LatencyOptions } from './core/latency';

/**
 * Configuration for injecting HTTP status code errors.
 */
export interface HttpErrorOptions {
  /**
   * Probability (a number between 0 and 1) of an HTTP error being injected.
   * @example 0.3 // 30% chance of error
   */
  probability: number;
  /**
   * A list of HTTP status codes to randomly choose from when an error is injected.
   * @example [400, 404, 500, 503]
   */
  allowedStatusCodes: number[];
}

/**
 * The main configuration schema for defining chaos behavior.
 */
export interface ChaosConfig {
  /**
   * Configuration for simulating network latency and jitter.
   */
  latency?: LatencyOptions;
  /**
   * Configuration for injecting HTTP status code errors.
   */
  httpErrors?: HttpErrorOptions;
}

/**
 * Defines the shape of a chaos-enabled API endpoint.
 */
export interface ChaosSchema {
  [path: string]: {
    [method: string]: ChaosConfig;
  };
}
