import type { VectorStore } from '../types/vector-store.js';
import type { Neo4jConfig } from './neo4j/Neo4jConfig.js';
export type VectorStoreType = 'neo4j';
export interface VectorStoreFactoryOptions {
    /**
     * The type of vector store to use
     * @default 'neo4j'
     */
    type?: VectorStoreType;
    /**
     * Neo4j configuration options
     */
    neo4jConfig?: Neo4jConfig;
    /**
     * Neo4j vector index name
     * @default 'entity_embeddings'
     */
    indexName?: string;
    /**
     * Dimensions for vector embeddings
     * @default 1536
     */
    dimensions?: number;
    /**
     * Similarity function for vector search
     * @default 'cosine'
     */
    similarityFunction?: 'cosine' | 'euclidean';
    /**
     * Whether to initialize the vector store immediately
     * @default false
     */
    initializeImmediately?: boolean;
}
/**
 * Factory class for creating VectorStore instances
 */
export declare class VectorStoreFactory {
    /**
     * Create a new VectorStore instance based on configuration
     */
    static createVectorStore(options?: VectorStoreFactoryOptions): Promise<VectorStore>;
}
