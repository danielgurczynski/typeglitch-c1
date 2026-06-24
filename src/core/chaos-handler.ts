import { ChaosConfig } from '../schema';
// Assuming MSW is a peer dependency for response/request types.
// This might be abstracted later.
import type { MockedResponse } from 'msw';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Applies configured chaos effects to a given mocked response.
 */
export class ChaosHandler {
  constructor() {}

  /**
   * Applies latency effects like fixed delays.
   */
  private async applyDelay(config: ChaosConfig): Promise<void> {
    const delay = config.latency?.delayMs;
    if (typeof delay === 'number' && delay > 0) {
      await sleep(delay);
    }
  }

  /**
   * The main method to process and apply all configured chaos effects.
   * It acts as a pipeline, calling specialized methods for each chaos type.
   *
   * @param config The chaos configuration for the matched route.
   * @param response The original, un-glitched response.
   * @returns A promise that resolves to the modified (or original) response.
   */
  public async apply(
    config: ChaosConfig,
    response: MockedResponse
  ): Promise<MockedResponse> {
    // 1. Apply Latency
    await this.applyDelay(config);

    // 2. TODO: Apply Status Code Failures

    // 3. TODO: Apply Payload Corruption

    return response;
  }
}
