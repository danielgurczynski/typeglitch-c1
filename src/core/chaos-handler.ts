import {
  RestHandler,
  RestRequest,
  ResponseComposition,
  RestContext,
} from 'msw';
import { ChaosConfig } from '../schema';
import { applyLatency } from './latency';
import { getProbabilisticHttpError } from './errors';

// A generic resolver function provided by the user for their original mock.
export type OriginalResolver = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => any;

/**
 * Wraps an MSW resolver with chaos engineering logic based on the provided config.
 * The chaos effects are layered in a specific order.
 */
export function createChaosHandler(
  config: ChaosConfig,
  originalResolver: OriginalResolver
): RestHandler['resolver'] {
  return async (req, res, ctx) => {
    // 1. Apply Latency (from Week 2)
    await applyLatency(config.latency);

    // 2. Inject HTTP Status Errors (from Week 3)
    const errorStatus = getProbabilisticHttpError(config.httpErrors);
    if (errorStatus) {
      // For now, an error injection returns an empty body.
      // Future work could involve corrupted error payloads.
      return res(ctx.status(errorStatus));
    }

    // If no chaos was applied, proceed to the original handler.
    return originalResolver(req, res, ctx);
  };
}
