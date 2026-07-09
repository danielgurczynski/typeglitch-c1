/**
 * Configuration for returning a random HTTP error status code.
 * @property probability - A number between 0 and 1.
 * @property codes - An array of HTTP status codes to choose from (e.g., [404, 500, 503]).
 */
export type StatusCodeConfig = {
  type: 'statusCode';
  probability: number;
  codes: number[];
};

/**
 * Configuration for simulating a 'Silent Fail'.
 * This returns a 200 OK status but with an empty body.
 * @property probability - A number between 0 and 1.
 */
export type SilentFailConfig = {
  type: 'silent';
  probability: number;
};

/**
 * A union of all possible status-related glitches.
 */
export type StatusGlitchConfig = StatusCodeConfig | SilentFailConfig;

/**
 * The main configuration for a TypeGlitch profile.
 * Defines the chaos to be applied to a set of requests.
 */
export interface ChaosConfig {
  // latency?: LatencyConfig;
  status?: StatusGlitchConfig;
}
