import { ChaosConfig } from '../schema';

// A simple async sleep utility
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Applies chaos effects based on a given configuration.
 * This class encapsulates the logic for deciding which chaos to apply and when.
 */
export class ChaosHandler {
    constructor(private readonly config: ChaosConfig) {}

    /**
     * Applies configured chaos effects before the original response is sent.
     * This method is called by the network interceptor.
     */
    public async apply(): Promise<void> {
        // Apply latency if configured
        if (this.config.latency) {
            await this.applyLatency();
        }

        // In the future, other chaos like status code overrides or body corruption will be applied here.
    }

    /**
     * Handles latency injection based on the config.
     */
    private async applyLatency(): Promise<void> {
        if (!this.config.latency) return;

        switch (this.config.latency.type) {
            case 'fixed':
                await sleep(this.config.latency.delayMs);
                break;
            // Jitter algorithms (e.g., 'uniform', 'gaussian') will be added here.
            default:
                console.warn(`[TypeGlitch] Unsupported latency type specified.`);
                break;
        }
    }
}
