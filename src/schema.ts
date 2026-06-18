/**
 * Defines the chaos configuration for a specific request handler.
 * Each property represents a type of chaos that can be applied.
 */
export interface ChaosConfig {
  /**
   * Fixed delay to add to the response, in milliseconds.
   * @default 0
   */
  delay?: number;
}

/**
 * Defines the top-level options for initializing TypeGlitch.
 */
export interface TypeGlitchOptions {
  /**
   * A default chaos configuration to apply to all handlers
   * that don't have a specific override.
   */
  defaultConfig?: ChaosConfig;

  /**
   * Whether chaos is globally enabled.
   * @default true
   */
  enabled?: boolean;
}
