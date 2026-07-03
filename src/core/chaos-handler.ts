import { ChaosConfig } from '../schema';
import { applyLatency } from './latency';
import { pickStatusError } from './status-errors';
import { HttpResponse } from 'msw';

/**
 * The core chaos handler that intercepts a request and applies configured chaos effects.
 * This is a simplified representation to be used within an MSW resolver.
 *
 * @param config The active chaos configuration.
 * @param originalRequest A function that performs the original request and returns a Response.
 * @returns A Response, either the original or a chaos-injected one.
 */
export async function applyChaos(
  config: ChaosConfig,
  originalRequest: () => Promise<Response>
): Promise<Response> {
  // 1. Apply Latency
  if (config.latency) {
    await applyLatency(config.latency);
  }

  // 2. Check for Status Error Injection
  if (config.statusErrors) {
    const injectedStatus = pickStatusError(config.statusErrors);
    if (injectedStatus) {
      // If a status error is chosen, we short-circuit the original request.
      return new HttpResponse(null, {
        status: injectedStatus,
        statusText: `TypeGlitch Injected Error`,
      });
    }
  }

  // If no terminating chaos was applied, perform the original request.
  const response = await originalRequest();

  // Future chaos effects like payload mutation could go here, after the response is fetched.

  return response;
}
