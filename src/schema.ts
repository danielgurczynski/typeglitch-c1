import { z } from 'zod';

/**
 * Defines the configuration for chaos engineering applied to a single API endpoint.
 */
export const ChaosRuleSchema = z.object({
  /**
   * Fixed delay in milliseconds to add to the response.
   * @default 0
   */
  delay: z.number().int().min(0).optional(),
});

export type ChaosRule = z.infer<typeof ChaosRuleSchema>;

/**
 * A map of route patterns (e.g., '/api/users/:id') to their chaos configurations.
 * The key is a string that can be matched against request URLs.
 */
export type ChaosSchema = Record<string, ChaosRule>;
