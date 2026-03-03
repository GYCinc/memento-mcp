import type { StorageProvider, SearchOptions } from '../StorageProvider.js';
import type { KnowledgeGraph } from '../../KnowledgeGraphManager.js';
import type { Relation } from '../../types/relation.js';
import type { EntityEmbedding, SemanticSearchOptions } from '../../types/entity-embedding.js';
import { Neo4jConnectionManager } from './Neo4jConnectionManager.js';
import { type Neo4jConfig } from './Neo4jConfig.js';
/**
 * Configuration options for Neo4j storage provider
 */
export interface Neo4jStorageProviderOptions {
    /**
     * Neo4j connection configuration
     */
    config?: Partial<Neo4jConfig>;
    /**
     * Pre-configured connection manager (optional)
     */
    connectionManager?: Neo4jConnectionManager;
    /**
     * Configuration for temporal confidence decay
     */
    decayConfig?: {
        /**
         * Whether confidence decay is enabled
         */
        enabled: boolean;
        /**
         * Number of days for confidence to decay by half (default: 30)
         */
        halfLifeDays?: number;
        /**
         * Minimum confidence threshold below which confidence won't decay (default: 0.1)
         */
        minConfidence?: number;
    };
}
/**
 * Extended SemanticSearchOptions with additional properties needed for Neo4j
 */
interface Neo4jSemanticSearchOptions extends SemanticSearchOptions {
    queryVector?: number[];
}
/**
 * Knowledge graph with optional diagnostics
 */
interface KnowledgeGraphWithDiagnostics extends KnowledgeGraph {
    diagnostics?: Record<string, unknown>;
}
/**
 * A storage provider that uses Neo4j to store the knowledge graph
 */
export declare class Neo4jStorageProvider implements StorageProvider {
    private connectionManager;
    private schemaManager;
    private readonly config;
    private readonly decayConfig;
    private vectorStore;
    private embeddingService;
    /**
     * Create a new Neo4jStorageProvider
     * @param options Configuration options
     */
    constructor(options?: Neo4jStorageProviderOptions);
    /**
     * Get the connection manager (primarily for testing)
     */
    getConnectionManager(): Neo4jConnectionManager;
    /**
     * Initialize Neo4j schema
     */
    private initializeSchema;
    /**
     * Close Neo4j connections
     */
    close(): Promise<void>;
    /**
     * Convert a Neo4j node to an entity object
     * @param node Neo4j node properties
     * @returns Entity object
     */
    private nodeToEntity;
    /**
     * Parse a Neo4j relationship into a relation object
     * @param rel Relationship properties
     * @param fromNode From node name
     * @param toNode To node name
     * @returns Relation object
     */
    /**
     * Parse a Neo4j relationship into a relation object
     * @param rel Relationship properties
     * @param fromNode From node name
     * @param toNode To node name
     * @returns Relation object
     */
    private relationshipToRelation;
    /**
     * Load the complete knowledge graph from Neo4j
     */
    loadGraph(): Promise<KnowledgeGraph>;
    /**
     * Save a complete knowledge graph to Neo4j (warning: this will overwrite existing data)
     * @param graph The knowledge graph to save
     */
    saveGraph(graph: KnowledgeGraph): Promise<void>;
    /**
     * Search for nodes in the graph that match the query
     * @param query The search query string
     * @param options Optional search parameters
     */
    searchNodes(query: string, options?: SearchOptions): Promise<KnowledgeGraph>;
    /**
     * Open specific nodes by their exact names
     * @param names Array of node names to open
     */
    openNodes(names: string[]): Promise<KnowledgeGraph>;
    /**
     * Create new entities in the knowledge graph
     * @param entities Array of entities to create
     */
    createEntities(entities: any[]): Promise<any[]>;
    /**
     * Create new relations between entities
     * @param relations Array of relations to create
     */
    createRelations(relations: Relation[]): Promise<Relation[]>;
    /**
     * Add observations to entities
     * @param observations Array of objects with entity name and observation contents
     */
    addObservations(observations: {
        entityName: string;
        contents: string[];
    }[]): Promise<{
        entityName: string;
        addedObservations: string[];
    }[]>;
    /**
     * Delete entities and their relations
     * @param entityNames Array of entity names to delete
     */
    deleteEntities(entityNames: string[]): Promise<void>;
    /**
     * Delete observations from entities
     * @param deletions Array of objects with entity name and observations to delete
     */
    deleteObservations(deletions: {
        entityName: string;
        observations: string[];
    }[]): Promise<void>;
    /**
     * Delete relations from the graph
     * @param relations Array of relations to delete
     */
    deleteRelations(relations: Relation[]): Promise<void>;
    /**
     * Get an entity by name
     * @param entityName Name of the entity to retrieve
     */
    getEntity(entityName: string): Promise<any | null>;
    /**
     * Get a specific relation by its source, target, and type
     * @param from Source entity name
     * @param to Target entity name
     * @param type Relation type
     */
    getRelation(from: string, to: string, type: string): Promise<Relation | null>;
    /**
     * Update an existing relation with new properties
     * @param relation The relation with updated properties
     */
    updateRelation(relation: Relation): Promise<void>;
    /**
     * Get the history of all versions of an entity
     * @param entityName The name of the entity to retrieve history for
     */
    getEntityHistory(entityName: string): Promise<any[]>;
    /**
     * Get the history of all versions of a relation
     * @param from Source entity name
     * @param to Target entity name
     * @param relationType Type of the relation
     */
    getRelationHistory(from: string, to: string, relationType: string): Promise<any[]>;
    /**
     * Get the state of the knowledge graph at a specific point in time
     * @param timestamp The timestamp to get the graph state at
     */
    getGraphAtTime(timestamp: number): Promise<KnowledgeGraph>;
    /**
     * Get the current knowledge graph with confidence decay applied to relations
     * based on their age and the configured decay settings
     */
    getDecayedGraph(): Promise<KnowledgeGraph>;
    /**
     * Store or update the embedding vector for an entity
     * @param entityName The name of the entity to update
     * @param embedding The embedding data to store
     */
    updateEntityEmbedding(entityName: string, embedding: EntityEmbedding): Promise<void>;
    /**
     * Get the embedding vector for an entity
     * @param entityName The name of the entity
     * @returns Promise resolving to the EntityEmbedding or null if not found
     */
    getEntityEmbedding(entityName: string): Promise<EntityEmbedding | null>;
    /**
     * Find entities similar to a query vector
     * @param queryVector The vector to compare against
     * @param limit Maximum number of results to return
     */
    findSimilarEntities(queryVector: number[], limit?: number): Promise<any[]>;
    /**
     * Search for entities using semantic search
     * @param query The search query text
     * @param options Search options including semantic search parameters
     */
    semanticSearch(query: string, options?: SearchOptions & Neo4jSemanticSearchOptions): Promise<KnowledgeGraphWithDiagnostics>;
    /**
     * Direct diagnostic method to check Neo4j vector embeddings
     * Bypasses all abstractions to query the database directly
     */
    diagnoseVectorSearch(): Promise<Record<string, unknown>>;
}
export {};
