import { ChaosConfig } from '../schema';

/**
 * A utility function to introduce an artificial delay.
 * @param ms - The duration to wait in milliseconds.
 */
const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Applies configured latency chaos based on the provided configuration.
 * Currently supports a fixed delay.
 *
 * @param config - The chaos configuration for the current operation.
 */
async function applyLatencyChaos(config: ChaosConfig): Promise<void> {
  const delayMs = config.latency?.delayMs;

  if (delayMs && delayMs > 0) {
    // In a real application, this log might be behind a `debug` flag.
    console.log(`[TypeGlitch] Applying delay of ${delayMs}ms.`);
    await delay(delayMs);
  }
}

/**
 * The main chaos handler orchestrates applying different types of chaos.
 */
export class ChaosHandler {
  private config: ChaosConfig;

  constructor(config: ChaosConfig = {}) {
    this.config = config;
  }

  /**
   * Applies all configured chaos effects for a given operation.
   * This is the main entry point for applying chaos.
   */
  public async apply(): Promise<void> {
    // We apply different chaos types in a specific order.
    // Latency is usually applied first to simulate network travel time.
    await applyLatencyChaos(this.config);

    // Future chaos functions (e.g., applyErrorChaos, applyDataCorruption)
    // will be called here.
  }

  /**
   * Updates the chaos configuration at runtime.
   * @param newConfig - The new partial configuration to merge.
   */
  public updateConfig(newConfig: Partial<ChaosConfig>) {
    this.config = { ...this.config, ...newConfig };
    console.log('[TypeGlitch] Chaos configuration updated.');
  }
}
