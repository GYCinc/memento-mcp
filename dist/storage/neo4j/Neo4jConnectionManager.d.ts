import { type Session, type QueryResult } from 'neo4j-driver';
import { type Neo4jConfig } from './Neo4jConfig.js';
/**
 * Options for configuring a Neo4j connection
 * @deprecated Use Neo4jConfig instead
 */
export interface Neo4jConnectionOptions {
    uri?: string;
    username?: string;
    password?: string;
    database?: string;
}
/**
 * Manages connections to a Neo4j database
 */
export declare class Neo4jConnectionManager {
    private driver;
    private readonly config;
    /**
     * Creates a new Neo4j connection manager
     * @param config Connection configuration
     */
    constructor(config?: Partial<Neo4jConfig> | Neo4jConnectionOptions);
    /**
     * Gets a Neo4j session for executing queries
     * @returns A Neo4j session
     */
    getSession(): Promise<Session>;
    /**
     * Executes a Cypher query
     * @param query The Cypher query
     * @param parameters Query parameters
     * @returns Query result
     */
    executeQuery(query: string, parameters: Record<string, unknown>): Promise<QueryResult>;
    /**
     * Closes the Neo4j driver connection
     */
    close(): Promise<void>;
}
