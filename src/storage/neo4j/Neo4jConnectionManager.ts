import neo4j, { type Driver, type Session, type QueryResult } from 'neo4j-driver';
import { DEFAULT_NEO4J_CONFIG, type Neo4jConfig } from './Neo4jConfig.js';
import { logger } from '../../utils/logger.js';

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
export class Neo4jConnectionManager {
  private driver: Driver;
  private readonly config: Neo4jConfig;

  /**
   * Validates and normalizes a Neo4j URI
   * @param uri The URI to validate
   * @returns Normalized URI with proper scheme
   * @throws Error if URI is invalid
   */
  private validateAndNormalizeUri(uri: string): string {
    // Log the original URI for debugging
    logger.debug(`Validating Neo4j URI: ${uri}`);

    try {
      const url = new URL(uri);
      const scheme = url.protocol.replace(':', '').toLowerCase();

      // Allowed schemes for Neo4j driver
      const allowedSchemes = ['bolt', 'bolt+s', 'neo4j', 'neo4j+s'];

      if (!allowedSchemes.includes(scheme)) {
        // Special handling for common mistakes
        if (scheme === 'http' || scheme === 'https') {
          throw new Error(
            `HTTP scheme detected: "${scheme}". ` +
              `The Neo4j driver uses the bolt:// or neo4j:// protocols, not HTTP. ` +
              `If you're trying to connect to Neo4j Aura, use "neo4j+s://". ` +
              `If you're using a local Neo4j instance, use "bolt://". ` +
              `Your Neo4j URI appears to be: ${uri}`
          );
        }
        throw new Error(
          `Invalid Neo4j URI scheme: "${scheme}". ` +
            `Allowed schemes: ${allowedSchemes.join(', ')}. ` +
            `If you're trying to connect to Neo4j Aura, use "neo4j+s://". ` +
            `If you're using a local Neo4j instance, use "bolt://" or "neo4j://".`
        );
      }

      return uri;
    } catch (error) {
      // If URL parsing fails, maybe the URI is missing a scheme
      if (error instanceof TypeError && error.message.includes('Invalid URL')) {
        // Try adding bolt:// scheme
        if (!uri.includes('://')) {
          const normalized = `bolt://${uri}`;
          logger.warn(`URI missing scheme, assuming bolt://: ${normalized}`);
          return normalized;
        }
      }
      // Re-throw the error
      throw error;
    }
  }

  /**
   * Creates a new Neo4j connection manager
   * @param config Connection configuration
   */
  constructor(config?: Partial<Neo4jConfig> | Neo4jConnectionOptions) {
    // Handle deprecated options
    if (config && 'uri' in config) {
      this.config = {
        ...DEFAULT_NEO4J_CONFIG,
        ...config,
      };
    } else {
      this.config = {
        ...DEFAULT_NEO4J_CONFIG,
        ...config,
      };
    }

    // Validate and normalize the URI
    const normalizedUri = this.validateAndNormalizeUri(this.config.uri);
    this.config.uri = normalizedUri;

    logger.info('Creating Neo4j driver connection', {
      uri: this.config.uri,
      username: this.config.username,
      database: this.config.database,
      vectorIndexName: this.config.vectorIndexName,
      passwordLength: this.config.password?.length ?? 0,
      passwordSet: !!this.config.password,
    });

    try {
      this.driver = neo4j.driver(
        this.config.uri,
        neo4j.auth.basic(this.config.username, this.config.password),
        {}
      );
      logger.debug('Neo4j driver created successfully');
    } catch (error) {
      logger.error('Failed to create Neo4j driver', {
        error: error instanceof Error ? error.message : String(error),
        uri: this.config.uri,
        username: this.config.username,
      });
      throw new Error(
        `Failed to connect to Neo4j at ${this.config.uri}. ` +
          `Please check your NEO4J_URI, NEO4J_USERNAME, and NEO4J_PASSWORD environment variables. ` +
          `Original error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Gets a Neo4j session for executing queries
   * @returns A Neo4j session
   */
  async getSession(): Promise<Session> {
    return this.driver.session({
      database: this.config.database,
    });
  }

  /**
   * Executes a Cypher query
   * @param query The Cypher query
   * @param parameters Query parameters
   * @returns Query result
   */
  async executeQuery(query: string, parameters: Record<string, unknown>): Promise<QueryResult> {
    const session = await this.getSession();
    try {
      return await session.run(query, parameters);
    } finally {
      await session.close();
    }
  }

  /**
   * Closes the Neo4j driver connection
   */
  async close(): Promise<void> {
    await this.driver.close();
  }
}
