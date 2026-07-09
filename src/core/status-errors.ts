import { StatusGlitchConfig } from '../schema';

function getRandomCode(codes: number[]): number {
  return codes[Math.floor(Math.random() * codes.length)];
}

/**
 * Checks the status glitch configuration and, if triggered by probability,
 * returns a new Response object representing the glitch.
 *
 * @param config The status glitch configuration.
 * @returns A Response object if a glitch is applied, otherwise null.
 */
export function applyStatusGlitch(
  config: StatusGlitchConfig | undefined
): Response | null {
  if (!config || Math.random() > config.probability) {
    return null;
  }

  switch (config.type) {
    case 'statusCode': {
      const randomStatus = getRandomCode(config.codes);
      console.log(`[TypeGlitch] Injecting status code error: ${randomStatus}`);
      return new Response(null, { status: randomStatus });
    }
    case 'silent': {
      console.log('[TypeGlitch] Injecting silent fail (200 OK with empty body)');
      // Return 200 OK, but with an empty body, which can trip up parsers.
      return new Response(null, { status: 200 });
    }
    default:
      return null;
  }
}
