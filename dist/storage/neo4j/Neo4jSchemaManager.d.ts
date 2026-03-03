import type { Neo4jConnectionManager } from './Neo4jConnectionManager.js';
import { type Neo4jConfig } from './Neo4jConfig.js';
/**
 * Manages Neo4j schema operations like creating constraints and indexes
 */
export declare class Neo4jSchemaManager {
    private connectionManager;
    private config;
    private debug;
    /**
     * Creates a new Neo4j schema manager
     * @param connectionManager A Neo4j connection manager instance
     * @param config Neo4j configuration (optional)
     * @param debug Whether to enable debug logging (defaults to true)
     */
    constructor(connectionManager: Neo4jConnectionManager, config?: Partial<Neo4jConfig>, debug?: boolean);
    /**
     * Log debug messages if debug mode is enabled
     * @param message Debug message to log
     */
    private log;
    /**
     * Lists all constraints in the database
     * @returns Array of constraint information
     */
    listConstraints(): Promise<Record<string, unknown>[]>;
    /**
     * Lists all indexes in the database
     * @returns Array of index information
     */
    listIndexes(): Promise<Record<string, unknown>[]>;
    /**
     * Drops a constraint if it exists
     * @param name Name of the constraint to drop
     */
    dropConstraintIfExists(name: string): Promise<boolean>;
    /**
     * Drops an index if it exists
     * @param name Name of the index to drop
     */
    dropIndexIfExists(name: string): Promise<boolean>;
    /**
     * Creates a unique constraint on entity names
     * @param recreate Whether to drop and recreate the constraint if it exists
     */
    createEntityConstraints(recreate?: boolean): Promise<void>;
    /**
     * Creates a vector index for storing and querying embeddings
     *
     * @param indexName The name of the vector index
     * @param nodeLabel The label of the nodes to index
     * @param propertyName The property containing vector data
     * @param dimensions The number of dimensions in the vector
     * @param similarityFunction The similarity function to use (defaults to config value)
     * @param recreate Whether to drop and recreate the index if it exists
     */
    createVectorIndex(indexName: string, nodeLabel: string, propertyName: string, dimensions: number, similarityFunction?: 'cosine' | 'euclidean', recreate?: boolean): Promise<void>;
    /**
     * Checks if a vector index exists and is ONLINE
     *
     * @param indexName The name of the vector index to check
     * @returns True if the index exists and is ONLINE, false otherwise
     */
    vectorIndexExists(indexName: string): Promise<boolean>;
    /**
     * Initializes the schema by creating necessary constraints and indexes
     * @param recreate Whether to drop and recreate existing constraints and indexes
     */
    initializeSchema(recreate?: boolean): Promise<void>;
    /**
     * Closes the connection manager
     */
    close(): Promise<void>;
}
