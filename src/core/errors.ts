import { HttpErrorOptions } from '../schema';

/**
 * Determines if an HTTP error should be injected based on probability.
 * If an error is to be injected, it returns a randomly selected status code
 * from the allowed list.
 *
 * @param config The HTTP error configuration for a specific endpoint.
 * @returns An HTTP status code number, or null if no error should be injected.
 */
export function getProbabilisticHttpError(
  config?: HttpErrorOptions
): number | null {
  if (
    !config ||
    config.probability <= 0 ||
    !config.allowedStatusCodes ||
    config.allowedStatusCodes.length === 0
  ) {
    return null;
  }

  const shouldInjectError = Math.random() < config.probability;

  if (shouldInjectError) {
    const randomIndex = Math.floor(
      Math.random() * config.allowedStatusCodes.length
    );
    return config.allowedStatusCodes[randomIndex];
  }

  return null;
}
