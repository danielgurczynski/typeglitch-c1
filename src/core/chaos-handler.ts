import type { ChaosConfig } from '../schema';

/**
 * A generic request handler function signature.
 * This will be adapted for specific integrations like MSW or Express.
 */
export type GenericHandler = (...args: any[]) => any | Promise<any>;

/**
 * A helper to promisify setTimeout for async delays.
 * @param ms The number of milliseconds to wait.
 */
const applyDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Creates a new handler that wraps an original request handler
 * to inject chaos based on the provided configuration.
 *
 * This is the core engine of TypeGlitch.
 *
 * @param originalHandler The original request handler to wrap.
 * @param config The chaos configuration object.
 * @returns A new handler with chaos logic injected.
 */
export function createChaosHandler<T extends GenericHandler>(
  originalHandler: T,
  config: ChaosConfig
): T {
  const chaosHandler = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // 1. Apply delay if configured
    if (config.delay?.ms) {
      await applyDelay(config.delay.ms);
    }

    // TODO: Apply other chaos effects (errors, data corruption, etc.)

    // 2. Execute the original handler
    return originalHandler(...args);
  };

  return chaosHandler as T;
}
