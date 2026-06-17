import { type ChaosRule } from '../schema';

/**
 * A utility to pause execution for a given duration.
 * @param ms - The duration to wait in milliseconds.
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Applies configured chaos rules to a network request lifecycle.
 * This is the core logic that will be called by the interceptor (e.g., MSW).
 * It modifies the execution flow, e.g., by adding delays or throwing errors.
 *
 * @param rule - The chaos rule matching the current request.
 * @returns A promise that resolves when the pre-response chaos has been applied.
 */
export async function applyChaos(rule: ChaosRule): Promise<void> {
  // 1. Apply Latency Chaos
  if (rule.delay && rule.delay > 0) {
    await sleep(rule.delay);
  }

  // Future chaos logic (e.g., errors, data corruption) will be added here.
}
