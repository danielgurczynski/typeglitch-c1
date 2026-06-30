import type { ResponseComposition, RestContext, RestRequest } from 'msw';
import type { ChaosConfig, StatusErrorConfig } from '../schema';

const applyLatency = (delayMs: number) => new Promise(resolve => setTimeout(resolve, delayMs));

/**
 * Determines if an error should be returned based on probability.
 * @param config The status error configuration.
 * @returns True if the error should be triggered.
 */
const shouldUseError = (config: StatusErrorConfig): boolean => {
  if (config.probability <= 0) return false;
  if (config.probability >= 1) return true;
  return Math.random() < config.probability;
};

/**
 * Creates a chaos-enabled MSW request handler.
 * The handler will apply configured glitches before passing the request through.
 * @param config The chaos configuration for this handler.
 * @returns An MSW request handler function.
 */
export const createChaosHandler = (config: ChaosConfig) => {
  return async (
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext
  ) => {
    // Glitch: Status Error
    // This glitch is terminal; if it triggers, no other glitches are applied.
    if (config.statusError && shouldUseError(config.statusError)) {
      const { statusCode } = config.statusError;
      return res(ctx.status(statusCode));
    }

    // Glitch: Latency
    if (config.latency) {
        // NOTE: Jitter logic not implemented yet
        await applyLatency(config.latency.delayMs);
    }

    // If no glitches terminated the request, pass it through to the original resolver.
    return req.passthrough();
  };
};