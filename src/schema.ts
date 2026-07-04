import { HttpStatusCode } from './core/status-errors';

/**
 * Configuration for adding artificial latency to responses.
 */
export interface LatencyOptions {
  delayMs: number;
  jitter?: {
    type: 'uniform' | 'gaussian';
    rangeMs: number;
  };
}

/**
 * Configuration for injecting HTTP status code errors.
 */
export interface StatusErrorOptions {
  probability: number;
  statusCodes: HttpStatusCode[];
}

/**
 * Configuration for returning a 200 OK with an empty body.
 */
export interface SilentFailOptions {
  probability: number;
}

/**
 * The main configuration schema that defines all possible chaos operations
 * for a given mocked endpoint.
 */
export interface ChaosConfig {
  latency?: LatencyOptions;
  statusError?: StatusErrorOptions;
  silentFail?: SilentFailOptions;
}
