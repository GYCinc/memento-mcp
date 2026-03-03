import type { VectorStore, VectorSearchResult } from '../../types/vector-store.js';
import type { Neo4jConnectionManager } from './Neo4jConnectionManager.js';
export interface Neo4jVectorStoreOptions {
    connectionManager: Neo4jConnectionManager;
    indexName?: string;
    dimensions?: number;
    similarityFunction?: 'cosine' | 'euclidean';
    entityNodeLabel?: string;
}
/**
 * Neo4j implementation of VectorStore interface
 * Uses Neo4j's native vector search capabilities
 */
export declare class Neo4jVectorStore implements VectorStore {
    private readonly connectionManager;
    private readonly indexName;
    private readonly dimensions;
    private readonly similarityFunction;
    private readonly entityNodeLabel;
    private initialized;
    private schemaManager;
    constructor(options: Neo4jVectorStoreOptions);
    /**
     * Initialize the Neo4j vector store by ensuring the vector index exists
     */
    initialize(): Promise<void>;
    /**
     * Add or update a vector for an entity
     * @param id Entity ID or name
     * @param vector Embedding vector
     * @param metadata Optional metadata to store with the vector
     */
    addVector(id: string | number, vector: number[], metadata?: Record<string, any>): Promise<void>;
    /**
     * Remove a vector for an entity
     * @param id Entity ID or name
     */
    removeVector(id: string | number): Promise<void>;
    /**
     * Search for entities similar to the provided query vector
     * @param queryVector The query embedding vector
     * @param options Search options including limit, filter, etc.
     * @returns Array of search results with ID, similarity score, and metadata
     */
    search(queryVector: number[], options?: {
        limit?: number;
        filter?: Record<string, any>;
        hybridSearch?: boolean;
        minSimilarity?: number;
    }): Promise<VectorSearchResult[]>;
    /**
     * Calculate basic statistics about a vector for debugging
     */
    private calculateVectorStats;
    /**
     * Checks if a vector has a valid l2-norm for Neo4j vector search
     * Neo4j requires vectors to have positive and finite l2-norm
     */
    private vectorHasValidNorm;
    /**
     * Fallback search method using pattern matching when vector search fails
     */
    private searchByPatternFallback;
    /**
     * Ensure the vector store has been initialized
     * @throws Error if not initialized
     */
    private ensureInitialized;
    /**
     * Diagnostic method to directly retrieve entity embedding info
     * Bypasses any application logic to query Neo4j directly
     */
    diagnosticGetEntityEmbeddings(): Promise<{
        count: number;
        samples: any[];
        indexInfo: any;
        embeddingType: string;
        vectorQueryTest: any;
    }>;
}
