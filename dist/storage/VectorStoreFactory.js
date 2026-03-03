import { Neo4jVectorStore } from './neo4j/Neo4jVectorStore.js';
import { Neo4jConnectionManager } from './neo4j/Neo4jConnectionManager.js';
import { logger } from '../utils/logger.js';
/**
 * Factory class for creating VectorStore instances
 */
export class VectorStoreFactory {
    /**
     * Create a new VectorStore instance based on configuration
     */
    static async createVectorStore(options = {}) {
        const storeType = options.type || 'neo4j';
        const initializeImmediately = options.initializeImmediately ?? false;
        let vectorStore;
        if (storeType === 'neo4j') {
            logger.info('Creating Neo4jVectorStore instance');
            // Ensure Neo4j config is provided
            if (!options.neo4jConfig) {
                throw new Error('Neo4j configuration is required for Neo4j vector store');
            }
            // Create connection manager
            const connectionManager = new Neo4jConnectionManager(options.neo4jConfig);
            // Create vector store
            vectorStore = new Neo4jVectorStore({
                connectionManager,
                indexName: options.indexName || 'entity_embeddings',
                dimensions: options.dimensions || 1536,
                similarityFunction: options.similarityFunction || 'cosine',
            });
        }
        else {
            throw new Error(`Unsupported vector store type: ${storeType}`);
        }
        // Initialize if requested
        if (initializeImmediately) {
            await vectorStore.initialize();
        }
        return vectorStore;
    }
}
//# sourceMappingURL=VectorStoreFactory.js.map