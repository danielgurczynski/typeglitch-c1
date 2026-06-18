import { ChaosConfig } from '../schema';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Applies chaos effects based on the provided configuration before executing
 * and returning the result of the original function (e.g., an API response).
 *
 * This is the core engine that manipulates requests/responses.
 *
 * @param config The chaos configuration for this specific handler.
 * @param originalFn The original, unaltered function to be executed after chaos is applied.
 * @returns The result of the original function.
 */
export async function applyChaos<T>(
  config: ChaosConfig | undefined,
  originalFn: () => T | Promise<T>
): Promise<T> {
  if (!config) {
    return await originalFn();
  }

  // 1. Apply Latency
  if (config.delay && config.delay > 0) {
    await sleep(config.delay);
  }

  // 2. Apply other chaos (e.g., status code changes, data corruption)
  // ...to be implemented in future commits.

  // 3. Execute and return the original response
  return await originalFn();
}
