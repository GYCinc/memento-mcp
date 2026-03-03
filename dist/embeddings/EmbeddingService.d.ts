/**
 * Provider information for embedding services
 */
export interface EmbeddingProviderInfo {
    /**
     * Name of the embedding provider
     */
    provider: string;
    /**
     * Name of the embedding model
     */
    model: string;
    /**
     * Number of dimensions in the embedding vectors
     */
    dimensions: number;
}
/**
 * Model information for embedding models
 */
export interface EmbeddingModelInfo {
    /**
     * Name of the embedding model
     */
    name: string;
    /**
     * Number of dimensions in the embedding vectors
     */
    dimensions: number;
    /**
     * Version of the model
     */
    version: string;
}
/**
 * Interface for text embedding services
 */
export interface IEmbeddingService {
    /**
     * Generate embedding vector for text
     *
     * @param text - Text to embed
     * @returns Embedding vector
     */
    generateEmbedding(text: string): Promise<number[]>;
    /**
     * Generate embeddings for multiple texts
     *
     * @param texts - Array of texts to embed
     * @returns Array of embedding vectors
     */
    generateEmbeddings(texts: string[]): Promise<number[][]>;
    /**
     * Get information about the embedding model
     *
     * @returns Model information
     */
    getModelInfo(): EmbeddingModelInfo;
    /**
     * Get information about the embedding provider
     *
     * @returns Provider information
     */
    getProviderInfo(): EmbeddingProviderInfo;
}
/**
 * Abstract class for embedding services
 */
export declare class EmbeddingService implements IEmbeddingService {
    /**
     * Generate embedding vector for text
     *
     * @param text - Text to embed
     * @returns Embedding vector
     */
    generateEmbedding(_text: string): Promise<number[]>;
    /**
     * Generate embeddings for multiple texts
     *
     * @param texts - Array of texts to embed
     * @returns Array of embedding vectors
     */
    generateEmbeddings(_texts: string[]): Promise<number[][]>;
    /**
     * Get information about the embedding model
     *
     * @returns Model information
     */
    getModelInfo(): EmbeddingModelInfo;
    /**
     * Get information about the embedding provider
     *
     * @returns Provider information
     */
    getProviderInfo(): EmbeddingProviderInfo;
}
