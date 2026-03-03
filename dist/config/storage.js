import { StorageProviderFactory } from '../storage/StorageProviderFactory.js';
import { logger } from '../utils/logger.js';
/**
 * Determines the storage type based on the environment variable
 * @param envType Storage type from environment variable
 * @returns Storage type ('file' or 'neo4j')
 */
export function determineStorageType(envType) {
    if (envType === 'file') {
        return 'file';
    }
    // Default to neo4j
    return 'neo4j';
}
/**
 * Creates a storage configuration object
 * @param storageType Storage type
 * @returns Storage provider configuration
 */
export function createStorageConfig(storageType) {
    const type = determineStorageType(storageType);
    if (type === 'file') {
        logger.info('Configuring file storage provider', {
            filePath: process.env.MEMORY_FILE_PATH || '/tmp/memento-memory.json',
        });
        return {
            type: 'file',
            options: {
                memoryFilePath: process.env.MEMORY_FILE_PATH || '/tmp/memento-memory.json',
            },
        };
    }
    // Neo4j configuration
    logger.info('Configuring Neo4j storage provider', {
        uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
        database: process.env.NEO4J_DATABASE || 'neo4j',
        vectorIndex: process.env.NEO4J_VECTOR_INDEX || 'entity_embeddings',
    });
    return {
        type: 'neo4j',
        options: {
            neo4jUri: process.env.NEO4J_URI || 'bolt://localhost:7687',
            neo4jUsername: process.env.NEO4J_USERNAME || 'neo4j',
            neo4jPassword: process.env.NEO4J_PASSWORD || 'memento_password',
            neo4jDatabase: process.env.NEO4J_DATABASE || 'neo4j',
            neo4jVectorIndexName: process.env.NEO4J_VECTOR_INDEX || 'entity_embeddings',
            neo4jVectorDimensions: process.env.NEO4J_VECTOR_DIMENSIONS
                ? parseInt(process.env.NEO4J_VECTOR_DIMENSIONS, 10)
                : 1536,
            neo4jSimilarityFunction: process.env.NEO4J_SIMILARITY_FUNCTION || 'cosine',
        },
    };
}
/**
 * Initializes the storage provider based on environment variables
 * @returns Configured storage provider
 */
export function initializeStorageProvider() {
    const factory = new StorageProviderFactory();
    const config = createStorageConfig(process.env.MEMORY_STORAGE_TYPE);
    return factory.createProvider(config);
}
//# sourceMappingURL=storage.js.map