import { ChaosConfig } from '../schema';
import { applyLatency } from './latency';
import { getStatusError } from './status-errors';
import { MockedRequest, ResponseResolver, context } from 'msw';

type MswContext = typeof context;

/**
 * Creates a higher-order MSW response resolver that injects chaos based on the provided configuration.
 *
 * @param config The chaos configuration for this handler.
 * @param originalResolver The original MSW response resolver to be called for successful responses.
 * @returns An MSW ResponseResolver that applies chaos effects.
 */
export function createChaosHandler(
  config: ChaosConfig,
  originalResolver: ResponseResolver<MockedRequest, MswContext>
): ResponseResolver<MockedRequest, MswContext> {
  return async (req, res, ctx) => {
    // Latency is applied to all responses, including errors and silent fails.
    await applyLatency(config.latency);

    // 1. Check for Silent Fail
    // This returns a 200 OK with an empty body, simulating a successful
    // but unexpectedly empty response.
    if (config.silentFail && Math.random() < config.silentFail.probability) {
      return res(ctx.status(200), ctx.json({}));
    }

    // 2. Check for Status Error
    const statusError = getStatusError(config.statusError);
    if (statusError) {
      return res(ctx.status(statusError));
    }

    // 3. Pass through to the original resolver for a normal successful response.
    return originalResolver(req, res, ctx);
  };
}
