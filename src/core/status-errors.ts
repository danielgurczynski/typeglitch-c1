import { ChaosStatusErrorConfig } from '../schema';

/**
 * Determines if a status error should be injected based on probability.
 * If so, it returns a random status code from the configured list.
 *
 * @param config The status error configuration.
 * @returns A selected HTTP error status code, or undefined if no error is injected.
 */
export function pickStatusError(
  config: ChaosStatusErrorConfig
): number | undefined {
  if (
    !config ||
    Math.random() >= config.probability ||
    !config.codes ||
    config.codes.length === 0
  ) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * config.codes.length);
  const status = config.codes[randomIndex];

  console.log(`[TypeGlitch] Injecting status error: ${status}`);

  return status;
}
