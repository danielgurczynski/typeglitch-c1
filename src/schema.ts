import { z } from 'zod';

/**
 * Configuration for adding latency to responses.
 * - 'fixed': A constant delay for every response.
 */
export const LatencyConfigSchema = z.object({
    type: z.literal('fixed'),
    delayMs: z.number().min(0),
}).strict();

export type LatencyConfig = z.infer<typeof LatencyConfigSchema>;

/**
 * Defines the set of chaos operations to be applied to a request.
 */
export const ChaosConfigSchema = z.object({
    /**
     * If provided, adds a delay to the response.
     * This is the first step towards more complex jitter simulation.
     */
    latency: LatencyConfigSchema.optional(),

    // Future chaos options like error rates or payload fuzzing will be added here.
}).strict();

export type ChaosConfig = z.infer<typeof ChaosConfigSchema>;
