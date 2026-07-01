import { RestHandler, RestRequest, ResponseComposition, RestContext, DefaultBodyType } from 'msw';
import { ChaosConfig } from '../schema';
import { applyLatency } from './latency';

type OriginalMswHandler = (
  req: RestRequest,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext
) => any;

/**
 * The core chaos handler that wraps a user's original MSW handler.
 * It inspects the chaos configuration and applies glitches before (or instead of)
 * calling the original handler.
 */
export function createChaosHandler(
  config: ChaosConfig,
  originalHandler: OriginalMswHandler
): RestHandler {

  return async (req, res, ctx) => {
    const shouldApplyChaos = Math.random() < (config.probability ?? 1);

    if (!shouldApplyChaos) {
      return originalHandler(req, res, ctx);
    }
    
    // 1. Apply Latency.
    // If hang:true is set, this promise will never resolve, halting execution.
    await applyLatency(config.latency);

    // 2. TODO: Apply Status Code errors.

    // 3. TODO: Apply Body corruption.

    console.log('[TypeGlitch] Passing to original handler post-chaos.');
    return originalHandler(req, res, ctx);
  };
}
