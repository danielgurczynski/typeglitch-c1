import { Latency } from '../schema';

/**
 * Calculates the total delay based on fixed delay and jitter settings.
 */
function calculateDelay(latency: Latency): number {
  let totalDelay = latency.delayMs || 0;

  if (latency.jitter?.distribution === 'uniform') {
    totalDelay += Math.random() * latency.jitter.maxMs;
  }

  // NOTE: Gaussian distribution for jitter is not yet implemented.

  return Math.max(0, totalDelay);
}

/**
 * Applies latency effects based on the provided configuration.
 * Returns a promise that resolves after the calculated delay,
 * or a promise that never resolves if `hang` is enabled.
 */
export function applyLatency(latency: Latency | undefined): Promise<void> {
  if (!latency) {
    return Promise.resolve();
  }

  // Hanging connections take precedence over other latency settings.
  if (latency.hang === true) {
    console.log('[TypeGlitch] Simulating hanging connection.');
    // By returning a promise that never resolves, we effectively hang the request.
    return new Promise(() => {});
  }

  const delay = calculateDelay(latency);

  if (delay > 0) {
    console.log(`[TypeGlitch] Delaying response by ${delay.toFixed(0)}ms.`);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return Promise.resolve();
}
