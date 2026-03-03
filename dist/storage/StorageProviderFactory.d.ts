import type { StorageProvider } from './StorageProvider.js';
import type { VectorStoreFactoryOptions } from './VectorStoreFactory.js';
export interface StorageProviderConfig {
    type: 'file' | 'neo4j';
    options?: {
        memoryFilePath?: string;
        enableDecay?: boolean;
        decayConfig?: {
            enabled?: boolean;
            halfLifeDays?: number;
            minConfidence?: number;
        };
        neo4jUri?: string;
        neo4jUsername?: string;
        neo4jPassword?: string;
        neo4jDatabase?: string;
        neo4jVectorIndexName?: string;
        neo4jVectorDimensions?: number;
        neo4jSimilarityFunction?: 'cosine' | 'euclidean';
    };
    vectorStoreOptions?: VectorStoreFactoryOptions;
}
interface CleanableProvider extends StorageProvider {
    cleanup?: () => Promise<void>;
}
/**
 * Factory for creating storage providers
 */
export declare class StorageProviderFactory {
    private connectedProviders;
    /**
     * Create a storage provider based on configuration
     * @param config Configuration for the provider
     * @returns A storage provider instance
     */
    createProvider(config: StorageProviderConfig): StorageProvider;
    /**
     * Get a default storage provider (Neo4j-based)
     * @returns A default Neo4jStorageProvider instance
     */
    getDefaultProvider(): StorageProvider;
    /**
     * Check if a provider is connected
     * @param provider The provider to check
     * @returns True if the provider is connected, false otherwise
     */
    isProviderConnected(provider: StorageProvider): boolean;
    /**
     * Disconnect a provider
     * @param provider The provider to disconnect
     */
    disconnectProvider(provider: StorageProvider): void;
    /**
     * Cleanup provider resources and disconnect
     * @param provider The provider to cleanup
     */
    cleanupProvider(provider: CleanableProvider): Promise<void>;
    /**
     * Cleanup all connected providers
     */
    cleanupAllProviders(): Promise<void>;
}
export {};
