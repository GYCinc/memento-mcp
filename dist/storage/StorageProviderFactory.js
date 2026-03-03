import { FileStorageProvider } from './FileStorageProvider.js';
import { Neo4jStorageProvider } from './neo4j/Neo4jStorageProvider.js';
/**
 * Factory for creating storage providers
 */
export class StorageProviderFactory {
    constructor() {
        // Track connected providers
        this.connectedProviders = new Set();
    }
    /**
     * Create a storage provider based on configuration
     * @param config Configuration for the provider
     * @returns A storage provider instance
     */
    createProvider(config) {
        if (!config) {
            throw new Error('Storage provider configuration is required');
        }
        if (!config.type) {
            throw new Error('Storage provider type is required');
        }
        if (!config.options) {
            throw new Error('Storage provider options are required');
        }
        let provider;
        switch (config.type.toLowerCase()) {
            case 'file': {
                if (!config.options.memoryFilePath) {
                    throw new Error('memoryFilePath is required for file provider');
                }
                provider = new FileStorageProvider({
                    filePath: config.options.memoryFilePath,
                    vectorStoreOptions: config.vectorStoreOptions,
                });
                break;
            }
            case 'neo4j': {
                // Configure Neo4j provider
                const neo4jConfig = {
                    uri: config.options.neo4jUri,
                    username: config.options.neo4jUsername,
                    password: config.options.neo4jPassword,
                    database: config.options.neo4jDatabase,
                    vectorIndexName: config.options.neo4jVectorIndexName,
                    vectorDimensions: config.options.neo4jVectorDimensions,
                    similarityFunction: config.options.neo4jSimilarityFunction,
                };
                provider = new Neo4jStorageProvider({
                    config: neo4jConfig,
                    decayConfig: config.options.decayConfig
                        ? {
                            enabled: config.options.decayConfig.enabled ?? true,
                            halfLifeDays: config.options.decayConfig.halfLifeDays,
                            minConfidence: config.options.decayConfig.minConfidence,
                        }
                        : undefined,
                });
                break;
            }
            default:
                throw new Error(`Unsupported provider type: ${config.type}`);
        }
        // Track the provider as connected
        this.connectedProviders.add(provider);
        return provider;
    }
    /**
     * Get a default storage provider (Neo4j-based)
     * @returns A default Neo4jStorageProvider instance
     */
    getDefaultProvider() {
        // Create a Neo4j provider with default settings
        const provider = new Neo4jStorageProvider();
        this.connectedProviders.add(provider);
        return provider;
    }
    /**
     * Check if a provider is connected
     * @param provider The provider to check
     * @returns True if the provider is connected, false otherwise
     */
    isProviderConnected(provider) {
        return this.connectedProviders.has(provider);
    }
    /**
     * Disconnect a provider
     * @param provider The provider to disconnect
     */
    disconnectProvider(provider) {
        this.connectedProviders.delete(provider);
    }
    /**
     * Cleanup provider resources and disconnect
     * @param provider The provider to cleanup
     */
    async cleanupProvider(provider) {
        if (this.isProviderConnected(provider)) {
            if (provider.cleanup) {
                await provider.cleanup();
            }
            this.disconnectProvider(provider);
        }
    }
    /**
     * Cleanup all connected providers
     */
    async cleanupAllProviders() {
        const providers = Array.from(this.connectedProviders);
        await Promise.all(providers.map((provider) => this.cleanupProvider(provider)));
    }
}
//# sourceMappingURL=StorageProviderFactory.js.map