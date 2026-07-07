import { ZodSchema } from 'zod';

/**
 * Defines the probability and distribution for latency injection.
 */
export interface ChaosLatencyConfig {
  // Probability of latency being applied (0 to 1)
  probability: number;
  // The minimum delay in milliseconds.
  min: number;
  // The maximum delay in milliseconds.
  max: number;
}

/**
 * Defines the configuration for status code-based errors.
 */
export interface ChaosStatusConfig {
  // Probability of ANY status-related error occurring (0 to 1).
  probability: number;
  // List of HTTP status codes to randomly choose from.
  // Defaults to a set of common 4xx and 5xx codes.
  allowedCodes?: number[];
  // If true, a portion of status errors will be 'Silent Fails'
  // (i.e., a 200 OK status with an empty JSON body), testing client-side parsing.
  includeSilentFail?: boolean;
}

/**
 * The root configuration for a single endpoint.
 */
export interface ChaosConfig {
  latency?: ChaosLatencyConfig;
  status?: ChaosStatusConfig;
  // Future: Add data corruption config
  // data?: ChaosDataConfig<T>;
}

/**
 * A schema that combines a Zod schema for type validation with
 * chaos engineering configuration.
 */
export interface ChaosSchema<T extends ZodSchema> {
  schema: T;
  chaos: ChaosConfig;
}
