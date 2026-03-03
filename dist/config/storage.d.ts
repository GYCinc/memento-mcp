import { StorageProviderFactory } from '../storage/StorageProviderFactory.js';
import type { VectorStoreFactoryOptions } from '../storage/VectorStoreFactory.js';
/**
 * Determines the storage type based on the environment variable
 * @param envType Storage type from environment variable
 * @returns Storage type ('file' or 'neo4j')
 */
export declare function determineStorageType(envType: string | undefined): 'file' | 'neo4j';
/**
 * Configuration for storage providers
 */
export interface StorageConfig {
    type: 'file' | 'neo4j';
    options: {
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
/**
 * Creates a storage configuration object
 * @param storageType Storage type
 * @returns Storage provider configuration
 */
export declare function createStorageConfig(storageType: string | undefined): StorageConfig;
/**
 * Initializes the storage provider based on environment variables
 * @returns Configured storage provider
 */
export declare function initializeStorageProvider(): ReturnType<StorageProviderFactory['createProvider']>;
