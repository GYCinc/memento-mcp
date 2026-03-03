/**
 * Abstract class for embedding services
 */
export class EmbeddingService {
    /**
     * Generate embedding vector for text
     *
     * @param text - Text to embed
     * @returns Embedding vector
     */
    async generateEmbedding(_text) {
        throw new Error('Method not implemented');
    }
    /**
     * Generate embeddings for multiple texts
     *
     * @param texts - Array of texts to embed
     * @returns Array of embedding vectors
     */
    async generateEmbeddings(_texts) {
        throw new Error('Method not implemented');
    }
    /**
     * Get information about the embedding model
     *
     * @returns Model information
     */
    getModelInfo() {
        throw new Error('Method not implemented');
    }
    /**
     * Get information about the embedding provider
     *
     * @returns Provider information
     */
    getProviderInfo() {
        return {
            provider: 'default',
            model: this.getModelInfo().name,
            dimensions: this.getModelInfo().dimensions,
        };
    }
}
//# sourceMappingURL=EmbeddingService.js.map