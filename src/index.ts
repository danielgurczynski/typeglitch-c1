/**
 * TypeGlitch
 * A TypeScript-first chaos engineering library for mocking unpredictable API behaviors.
 */

export { createChaosHandler } from './core/chaos-handler';
export type { GenericHandler } from './core/chaos-handler';
export type { ChaosConfig } from './schema';
export { ChaosConfigSchema } from './schema';
