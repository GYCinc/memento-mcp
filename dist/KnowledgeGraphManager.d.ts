import { fs } from './utils/fs.js';
import type { StorageProvider } from './storage/StorageProvider.js';
import type { Relation } from './types/relation.js';
import type { EntityEmbedding } from './types/entity-embedding.js';
import type { EmbeddingJobManager } from './embeddings/EmbeddingJobManager.js';
import { type VectorStoreFactoryOptions } from './storage/VectorStoreFactory.js';
export interface Entity {
    name: string;
    entityType: string;
    observations: string[];
    embedding?: EntityEmbedding;
}
export { Relation } from './types/relation.js';
export { SemanticSearchOptions } from './types/entity-embedding.js';
export interface KnowledgeGraph {
    entities: Entity[];
    relations: Relation[];
    total?: number;
    timeTaken?: number;
    diagnostics?: Record<string, unknown>;
}
export interface SearchResult {
    entity: Entity;
    score: number;
    matches?: Array<{
        field: string;
        score: number;
        textMatches?: Array<{
            start: number;
            end: number;
            text: string;
        }>;
    }>;
    explanation?: unknown;
}
export interface SearchResponse {
    results: SearchResult[];
    total: number;
    facets?: Record<string, {
        counts: Record<string, number>;
    }>;
    timeTaken: number;
}
interface KnowledgeGraphManagerOptions {
    storageProvider?: StorageProvider;
    memoryFilePath?: string;
    embeddingJobManager?: EmbeddingJobManager;
    vectorStoreOptions?: VectorStoreFactoryOptions;
}
export declare class KnowledgeGraphManager {
    private memoryFilePath;
    private storageProvider?;
    private embeddingJobManager?;
    private vectorStore?;
    protected fsModule: typeof fs;
    constructor(options?: KnowledgeGraphManagerOptions);
    /**
     * Initialize the vector store with the given options
     *
     * @param options - Options for the vector store
     */
    private initializeVectorStore;
    /**
     * Ensure vector store is initialized
     *
     * @returns Promise that resolves when the vector store is initialized
     */
    private ensureVectorStore;
    /**
     * Update an entity's embedding in both the storage provider and vector store
     *
     * @param entityName - Name of the entity
     * @param embedding - The embedding to store
     * @private
     */
    private updateEntityEmbedding;
    /**
     * Load the knowledge graph from storage
     * @deprecated Direct file-based storage is deprecated. Use a StorageProvider implementation instead.
     * @private
     */
    private loadGraph;
    /**
     * Save the knowledge graph to storage
     * @deprecated Direct file-based storage is deprecated. Use a StorageProvider implementation instead.
     * @private
     */
    private saveGraph;
    createEntities(entities: Entity[]): Promise<Entity[]>;
    createRelations(relations: Relation[]): Promise<Relation[]>;
    deleteEntities(entityNames: string[]): Promise<void>;
    deleteObservations(deletions: {
        entityName: string;
        observations: string[];
    }[]): Promise<void>;
    deleteRelations(relations: Relation[]): Promise<void>;
    searchNodes(query: string): Promise<KnowledgeGraph>;
    openNodes(names: string[]): Promise<KnowledgeGraph>;
    /**
     * Add observations to entities
     * @param observations Array of observation objects
     * @returns Promise resolving to array of added observations
     */
    addObservations(observations: Array<{
        entityName: string;
        contents: string[];
        strength?: number;
        confidence?: number;
        metadata?: Record<string, unknown>;
        [key: string]: unknown;
    }>): Promise<{
        entityName: string;
        addedObservations: string[];
    }[]>;
    /**
     * Find entities that are semantically similar to the query
     * @param query The query text to search for
     * @param options Search options including limit and threshold
     * @returns Promise resolving to an array of matches with scores
     */
    findSimilarEntities(query: string, options?: {
        limit?: number;
        threshold?: number;
    }): Promise<Array<{
        name: string;
        score: number;
    }>>;
    /**
     * Read the entire knowledge graph
     *
     * This is an alias for loadGraph() for backward compatibility
     * @returns The knowledge graph
     */
    readGraph(): Promise<KnowledgeGraph>;
    /**
     * Search the knowledge graph with various options
     *
     * @param query The search query string
     * @param options Search options
     * @returns Promise resolving to a knowledge graph with search results
     */
    search(query: string, options?: {
        semanticSearch?: boolean;
        hybridSearch?: boolean;
        limit?: number;
        threshold?: number;
        minSimilarity?: number;
        entityTypes?: string[];
        facets?: string[];
        offset?: number;
    }): Promise<KnowledgeGraph>;
    /**
     * Perform semantic search on the knowledge graph
     *
     * @param query The search query string
     * @param options Search options
     * @returns Promise resolving to a knowledge graph with semantic search results
     */
    private semanticSearch;
    /**
     * Get a specific relation by its from, to, and type identifiers
     *
     * @param from The name of the entity where the relation starts
     * @param to The name of the entity where the relation ends
     * @param relationType The type of the relation
     * @returns The relation or null if not found
     */
    getRelation(from: string, to: string, relationType: string): Promise<Relation | null>;
    /**
     * Update a relation with new properties
     *
     * @param relation The relation to update
     * @returns The updated relation
     */
    updateRelation(relation: Relation): Promise<Relation>;
    /**
     * Update an entity with new properties
     *
     * @param entityName The name of the entity to update
     * @param updates Properties to update
     * @returns The updated entity
     */
    updateEntity(entityName: string, updates: Partial<Entity>): Promise<Entity>;
    /**
     * Get a version of the graph with confidences decayed based on time
     *
     * @returns Graph with decayed confidences
     */
    getDecayedGraph(): Promise<KnowledgeGraph & {
        decay_info?: Record<string, unknown>;
    }>;
    /**
     * Get the history of an entity
     *
     * @param entityName The name of the entity to retrieve history for
     * @returns Array of entity versions
     */
    getEntityHistory(entityName: string): Promise<Entity[]>;
    /**
     * Get the history of a relation
     *
     * @param from The name of the entity where the relation starts
     * @param to The name of the entity where the relation ends
     * @param relationType The type of the relation
     * @returns Array of relation versions
     */
    getRelationHistory(from: string, to: string, relationType: string): Promise<Relation[]>;
    /**
     * Get the state of the knowledge graph at a specific point in time
     *
     * @param timestamp The timestamp (in milliseconds since epoch) to query the graph at
     * @returns The knowledge graph as it existed at the specified time
     */
    getGraphAtTime(timestamp: number): Promise<KnowledgeGraph>;
}
