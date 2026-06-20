import { type Path } from 'msw';

/**
 * Defines a method for an HTTP request.
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

/**
 * The core configuration for a single chaos monkey patch.
 */
export interface ChaosConfig {
  /**
   * The probability of this chaos effect being applied, from 0 to 1.
   * @default 1
   */
  probability?: number;

  /**
   * A fixed delay in milliseconds to apply to the response.
   * This simulates network latency.
   */
  delayMs?: number;
}

/**
 * The base schema for intercepting a specific API endpoint.
 */
export interface ChaosSchema {
  /**
   * The request path to intercept.
   * e.g., '/users/:id'
   */
  path: Path;

  /**
   * The HTTP method to intercept.
   */
  method: HttpMethod;

  /**
   * The chaos configuration to apply to this endpoint.
   */
  config: ChaosConfig;
}
