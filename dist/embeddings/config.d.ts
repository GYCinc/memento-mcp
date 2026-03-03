/**
 * Configuration for the embedding subsystem
 */
/**
 * Default settings for embedding job processing
 */
export declare const DEFAULT_EMBEDDING_SETTINGS: {
    /**
     * Maximum batch size for processing embedding jobs
     * Larger batches may be more efficient but use more memory
     */
    BATCH_SIZE: number;
    /**
     * Minimum time in milliseconds between API calls (rate limiting)
     */
    API_RATE_LIMIT_MS: number;
    /**
     * Time-to-live in milliseconds for cached embeddings (default: 30 days)
     */
    CACHE_TTL_MS: number;
    /**
     * Maximum number of entries to keep in the embedding cache
     */
    CACHE_MAX_SIZE: number;
    /**
     * Minimum age in milliseconds for jobs to be eligible for cleanup
     * Default: 30 days
     */
    JOB_CLEANUP_AGE_MS: number;
    /**
     * Status options for embedding jobs
     */
    JOB_STATUS: {
        PENDING: string;
        PROCESSING: string;
        COMPLETED: string;
        FAILED: string;
    };
};
/**
 * Configuration for the LRU cache used for embeddings
 */
export interface EmbeddingCacheOptions {
    /**
     * Maximum number of items to keep in the cache
     */
    max: number;
    /**
     * Time-to-live in milliseconds for cache entries
     */
    ttl: number;
}
/**
 * Configuration for embedding job processing
 */
export interface EmbeddingJobProcessingOptions {
    /**
     * Maximum number of jobs to process in a single batch
     */
    batchSize: number;
    /**
     * Minimum time in milliseconds between API calls
     */
    apiRateLimitMs: number;
    /**
     * Maximum age in milliseconds for jobs to be eligible for cleanup
     */
    jobCleanupAgeMs: number;
}
/**
 * Get configuration for the LRU cache for embeddings
 *
 * @param options - Optional overrides for cache settings
 * @returns Configuration object for the LRU cache
 */
export declare function getEmbeddingCacheConfig(options?: Partial<EmbeddingCacheOptions>): EmbeddingCacheOptions;
/**
 * Get configuration for embedding job processing
 *
 * @param options - Optional overrides for job processing settings
 * @returns Configuration object for job processing
 */
export declare function getJobProcessingConfig(options?: Partial<EmbeddingJobProcessingOptions>): EmbeddingJobProcessingOptions;
