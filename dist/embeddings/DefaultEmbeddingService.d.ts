import { EmbeddingService, type EmbeddingModelInfo } from './EmbeddingService.js';
import type { EmbeddingServiceConfig } from './EmbeddingServiceFactory.js';
/**
 * Default embedding service implementation that generates random vectors.
 * This is a fallback service for testing and development environments
 * where an external API provider is not available.
 */
export declare class DefaultEmbeddingService extends EmbeddingService {
    private dimensions;
    private modelName;
    private modelVersion;
    /**
     * Create a new default embedding service instance
     *
     * @param config - Configuration options or dimensions
     * @param modelName - Name to use for the model (legacy parameter)
     * @param modelVersion - Version to use for the model (legacy parameter)
     */
    constructor(config?: EmbeddingServiceConfig | number, // Default to OpenAI's dimensions for better test compatibility
    modelName?: string, modelVersion?: string);
    /**
     * Generate an embedding vector for text
     *
     * @param text - Text to generate embedding for
     * @returns Promise resolving to a vector as Array
     */
    generateEmbedding(text: string): Promise<number[]>;
    /**
     * Generate embedding vectors for multiple texts
     *
     * @param texts - Array of texts to generate embeddings for
     * @returns Promise resolving to array of embedding vectors
     */
    generateEmbeddings(texts: string[]): Promise<number[][]>;
    /**
     * Get information about the embedding model
     *
     * @returns Model information
     */
    getModelInfo(): EmbeddingModelInfo;
    /**
     * Generate a simple hash from a string for deterministic random generation
     *
     * @private
     * @param text - Input text to hash
     * @returns Numeric hash value
     */
    private _hashString;
    /**
     * Seeded random number generator
     *
     * @private
     * @param seed - Seed value
     * @returns Random value between 0 and 1
     */
    private _seededRandom;
    /**
     * Normalize a vector to unit length
     *
     * @private
     * @param vector - Vector to normalize
     */
    private _normalizeVector;
}
