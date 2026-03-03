import { EmbeddingService, type EmbeddingModelInfo } from './EmbeddingService.js';
/**
 * Configuration for OpenAI embedding service
 */
export interface OpenAIEmbeddingConfig {
    /**
     * OpenAI API key
     */
    apiKey: string;
    /**
     * Optional model name to use
     */
    model?: string;
    /**
     * Optional dimensions override
     */
    dimensions?: number;
    /**
     * Optional version string
     */
    version?: string;
}
/**
 * Service implementation that generates embeddings using OpenAI's API
 */
export declare class OpenAIEmbeddingService extends EmbeddingService {
    private apiKey;
    private model;
    private dimensions;
    private version;
    private apiEndpoint;
    /**
     * Create a new OpenAI embedding service
     *
     * @param config - Configuration for the service
     */
    constructor(config: OpenAIEmbeddingConfig);
    /**
     * Generate an embedding for a single text
     *
     * @param text - Text to generate embedding for
     * @returns Promise resolving to embedding vector
     */
    generateEmbedding(text: string): Promise<number[]>;
    /**
     * Generate embeddings for multiple texts
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
     * Extract error message from error object
     *
     * @private
     * @param error - Error object
     * @returns Error message string
     */
    private _getErrorMessage;
    /**
     * Normalize a vector to unit length (L2 norm)
     *
     * @private
     * @param vector - Vector to normalize in-place
     */
    private _normalizeVector;
}
