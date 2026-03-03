/**
 * Default Neo4j configuration
 */
export const DEFAULT_NEO4J_CONFIG = {
    uri: 'bolt://localhost:7687',
    username: 'neo4j',
    password: 'memento_password',
    database: 'neo4j',
    vectorIndexName: 'entity_embeddings',
    vectorDimensions: 1536,
    similarityFunction: 'cosine',
};
//# sourceMappingURL=Neo4jConfig.js.map