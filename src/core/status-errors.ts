import { ResponseComposition, RestContext } from 'msw';
import { ChaosStatusConfig } from '../schema';

const DEFAULT_ERROR_CODES = [400, 401, 403, 404, 500, 503];

// If silent fails are enabled, this is the chance they'll be chosen over a standard error code.
const SILENT_FAIL_RATIO = 0.3;

/**
 * Applies a status code error based on the provided chaos configuration.
 *
 * This can be either a standard HTTP error status (e.g., 404, 500) or
 * a 'Silent Fail', which returns a 200 OK with an empty body to test
 * client-side data handling.
 *
 * @returns A modified MSW response handler or null if no error should be applied.
 */
export function applyStatusError(
  res: ResponseComposition,
  ctx: RestContext,
  config: ChaosStatusConfig
) {
  if (Math.random() >= config.probability) {
    return null; // Don't apply any error
  }

  // Determine if this error should be a 'Silent Fail'
  if (config.includeSilentFail && Math.random() < SILENT_FAIL_RATIO) {
    // Return 200 OK but with an empty JSON object body, a common source of bugs.
    return res(ctx.status(200), ctx.json({}));
  }

  // Otherwise, proceed with a standard HTTP error code
  const codes = config.allowedCodes ?? DEFAULT_ERROR_CODES;
  const selectedCode = codes[Math.floor(Math.random() * codes.length)];

  return res(ctx.status(selectedCode));
}
