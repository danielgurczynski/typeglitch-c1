import type { StatusErrorConfig } from '../schema';

/**
 * Normalizes a probability value to be between 0.0 and 1.0.
 * @param p The probability input. Defaults to 1.0 if undefined.
 * @returns A number in the range [0, 1].
 */
function normalizeProbability(p: number | undefined): number {
  const defaultProbability = 1.0;
  if (p === undefined) {
    return defaultProbability;
  }
  return Math.max(0.0, Math.min(1.0, p));
}

/**
 * Determines if a status error should be injected based on the configuration
 * and probability, and if so, which status code to use.
 *
 * @param config The status error configuration.
 * @returns An HTTP status code if an error should be injected, otherwise null.
 */
export function getStatusError(config: StatusErrorConfig): number | null {
  const probability = normalizeProbability(config.probability);

  // If the random number is greater than the probability, don't inject an error.
  // e.g., if probability is 0.3, we trigger on Math.random() < 0.3.
  if (Math.random() >= probability) {
    return null;
  }

  const { allowedStatusCodes } = config;
  if (!allowedStatusCodes || allowedStatusCodes.length === 0) {
    // Probability check passed, but no codes configured. Default to 500.
    return 500;
  }

  const randomIndex = Math.floor(Math.random() * allowedStatusCodes.length);
  return allowedStatusCodes[randomIndex];
}
