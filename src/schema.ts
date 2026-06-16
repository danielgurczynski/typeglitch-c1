import { z } from 'zod';

/**
 * Defines the Zod schema for chaos configurations.
 * This is used for runtime validation of chaos profiles.
 */
export const ChaosConfigSchema = z.object({
  /**
   * Applies a fixed delay to the response, simulating network latency.
   */
  delay: z
    .object({
      /** The delay duration in milliseconds. */
      ms: z.number().int().min(0),
    })
    .optional(),

  // More chaos options like errors and data corruption will be added here.
});

/**
 * The TypeScript type inferred from the Zod schema.
 * This is the primary configuration object used to control TypeGlitch's behavior.
 */
export type ChaosConfig = z.infer<typeof ChaosConfigSchema>;
