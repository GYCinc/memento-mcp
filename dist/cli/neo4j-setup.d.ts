#!/usr/bin/env node
/**
 * Neo4j CLI Utility
 *
 * This script provides command-line utilities for managing Neo4j
 * operations for the Memento MCP project.
 */
import { Neo4jConnectionManager } from '../storage/neo4j/Neo4jConnectionManager.js';
import { Neo4jSchemaManager } from '../storage/neo4j/Neo4jSchemaManager.js';
import { type Neo4jConfig } from '../storage/neo4j/Neo4jConfig.js';
export type ConnectionManagerFactory = (config: Neo4jConfig) => Neo4jConnectionManager;
export type SchemaManagerFactory = (connectionManager: Neo4jConnectionManager, debug: boolean) => Neo4jSchemaManager;
/**
 * Parse command line arguments into a Neo4j configuration object
 *
 * @param argv Command line arguments array
 * @returns Object containing configuration and options
 */
export declare function parseArgs(argv: string[]): {
    config: Neo4jConfig;
    options: {
        debug: boolean;
        recreate: boolean;
    };
};
/**
 * Test the connection to Neo4j
 *
 * @param config Neo4j configuration
 * @param debug Enable debug mode
 * @param connectionManagerFactory Factory for creating connection managers (for testing)
 * @returns true if connection is successful, false otherwise
 */
export declare function testConnection(config: Neo4jConfig, debug?: boolean, connectionManagerFactory?: ConnectionManagerFactory): Promise<boolean>;
/**
 * Initialize Neo4j schema
 *
 * @param config Neo4j configuration
 * @param debug Enable debug mode
 * @param recreate Force recreation of constraints and indexes
 * @param connectionManagerFactory Factory for creating connection managers (for testing)
 * @param schemaManagerFactory Factory for creating schema managers (for testing)
 */
export declare function initializeSchema(config: Neo4jConfig, debug?: boolean, recreate?: boolean, connectionManagerFactory?: ConnectionManagerFactory, schemaManagerFactory?: SchemaManagerFactory): Promise<void>;
/**
 * Print help message
 */
export declare function printHelp(): void;
/**
 * Main CLI function
 */
export declare function main(): Promise<void>;
