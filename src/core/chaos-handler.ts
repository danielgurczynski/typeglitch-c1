import { http, HttpResponse, type RequestHandler, type StrictResponse } from 'msw';
import { type ChaosSchema } from '../schema';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Creates MSW request handlers from a given set of TypeGlitch chaos schemas.
 * 
 * @param schemas An array of ChaosSchema definitions.
 * @returns An array of MSW RequestHandler instances.
 */
export function createChaosHandlers(schemas: ChaosSchema[]): RequestHandler[] {
  return schemas.map((schema) => {
    // The main resolver function for MSW. Now async to handle delays.
    const resolver = async (info: { request: Request; }): Promise<StrictResponse<any>> => {
      const { config } = schema;

      // Apply latency if configured
      if (config.delayMs && config.delayMs > 0) {
        await delay(config.delayMs);
      }

      // Future chaos logic (e.g., status errors, data corruption) will be added here.
      console.log(`[TypeGlitch] Intercepted ${schema.method.toUpperCase()} ${info.request.url}`);
      
      // For now, returns a simple placeholder response.
      // A full implementation would either forward the request or use a defined mock.
      return HttpResponse.json({ "message": `Response for ${info.request.url} after chaos.` });
    };

    return http[schema.method](schema.path, resolver);
  });
}
