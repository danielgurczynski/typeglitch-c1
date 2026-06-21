import { type ChaosSchema } from '../schema';
import { type ResponseResolver } from 'msw';

const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * A higher-order function that wraps an MSW ResponseResolver to apply chaos.
 * This allows for injecting delays, errors, and other unpredictable behaviors.
 *
 * @param resolver The original MSW response resolver.
 * @param schema The chaos configuration to apply.
 * @returns A new response resolver with chaos effects baked in.
 */
export function withChaos(
  resolver: ResponseResolver,
  schema: ChaosSchema
): ResponseResolver {
  return async (args) => {
    // 1. Apply latency before resolving the response
    if (schema.delay?.fixedMs && schema.delay.fixedMs > 0) {
      await sleep(schema.delay.fixedMs);
    }

    // 2. Call the original resolver to get the base response
    const response = await resolver(args);

    // 3. (Future) Apply chaos transformations to the response itself
    // For example: corrupting the body, changing the status code, etc.

    return response;
  };
}
