import type { StorageProvider, SearchOptions } from './StorageProvider.js';
import * as fs from 'fs';
import type { KnowledgeGraph, Relation } from '../KnowledgeGraphManager.js';
import type { VectorStoreFactoryOptions } from './VectorStoreFactory.js';
interface FileStorageProviderOptions {
    memoryFilePath?: string;
    filePath?: string;
    vectorStoreOptions?: VectorStoreFactoryOptions;
}
/**
 * A storage provider that uses the file system to store the knowledge graph
 * @deprecated This storage provider is deprecated and will be removed in a future version.
 * Please migrate to SqliteStorageProvider.
 */
export declare class FileStorageProvider implements StorageProvider {
    private _fs;
    private filePath;
    private graph;
    private vectorStoreOptions?;
    /**
     * Create a new FileStorageProvider
     * @param options Configuration options for the file storage provider
     * @deprecated This storage provider is deprecated and will be removed in a future version.
     * Please migrate to SqliteStorageProvider.
     */
    constructor(options?: FileStorageProviderOptions);
    /**
     * Set the fs module (for testing purposes)
     */
    setFs(fsModule: typeof fs): void;
    /**
     * Load the entire knowledge graph from the file
     * @returns Promise resolving to the loaded KnowledgeGraph
     */
    loadGraph(): Promise<KnowledgeGraph>;
    /**
     * Save the entire knowledge graph to the file
     * @param graph The KnowledgeGraph to save
     * @returns Promise that resolves when the save is complete
     */
    saveGraph(graph: KnowledgeGraph): Promise<void>;
    /**
     * Search for nodes in the graph that match the query
     * @param query The search query string
     * @param options Optional search parameters
     * @returns Promise resolving to a KnowledgeGraph containing matching nodes
     */
    searchNodes(query: string, options?: SearchOptions): Promise<KnowledgeGraph>;
    /**
     * Open specific nodes by their exact names
     * @param names Array of node names to open
     * @returns Promise resolving to a KnowledgeGraph containing the specified nodes
     */
    openNodes(names: string[]): Promise<KnowledgeGraph>;
    /**
     * Create new relations between entities
     * @param relations Array of relations to create
     * @returns Promise resolving to array of newly created relations
     */
    createRelations(relations: Relation[]): Promise<Relation[]>;
    /**
     * Add observations to entities
     * @param observations Array of observations to add
     * @returns Promise resolving to array of added observations
     */
    addObservations(observations: {
        entityName: string;
        contents: string[];
    }[]): Promise<{
        entityName: string;
        addedObservations: string[];
    }[]>;
    /**
     * Delete entities and their relations from the knowledge graph
     * @param entityNames Array of entity names to delete
     * @returns Promise that resolves when deletion is complete
     */
    deleteEntities(entityNames: string[]): Promise<void>;
    /**
     * Delete specific observations from entities
     * @param deletions Array of objects with entity name and observations to delete
     * @returns Promise that resolves when deletion is complete
     */
    deleteObservations(deletions: {
        entityName: string;
        observations: string[];
    }[]): Promise<void>;
    /**
     * Delete relations from the graph
     * @param relations Array of relations to delete
     * @returns Promise that resolves when deletion is complete
     * @deprecated FileStorageProvider is deprecated. Use SqliteStorageProvider instead.
     */
    deleteRelations(relations: Relation[]): Promise<void>;
    /**
     * Get a specific relation by its identifying properties
     * @param from Source entity name
     * @param to Target entity name
     * @param relationType Type of relation
     * @returns Promise resolving to the relation or null if not found
     */
    getRelation(from: string, to: string, relationType: string): Promise<Relation | null>;
    /**
     * Update an existing relation with new properties
     * @param relation The relation with updated properties (from, to, and relationType identify the relation)
     * @returns Promise that resolves when the update is complete
     * @throws Error if the relation doesn't exist
     */
    updateRelation(relation: Relation): Promise<void>;
    /**
     * Create new entities in the knowledge graph
     * @param entities Array of entities to create
     * @returns Promise resolving to the array of created entities with timestamps
     * @deprecated FileStorageProvider is deprecated. Use SqliteStorageProvider instead.
     */
    createEntities(entities: any[]): Promise<any[]>;
    /**
     * Get an entity by name
     * @param entityName Name of the entity to retrieve
     * @returns Promise resolving to the entity or null if not found
     * @deprecated FileStorageProvider is deprecated. Use SqliteStorageProvider instead.
     */
    getEntity(entityName: string): Promise<any | null>;
}
export {};
