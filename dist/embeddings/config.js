/**
 * Configuration for the embedding subsystem
 */
/**
 * Default settings for embedding job processing
 */
export const DEFAULT_EMBEDDING_SETTINGS = {
    /**
     * Maximum batch size for processing embedding jobs
     * Larger batches may be more efficient but use more memory
     */
    BATCH_SIZE: 10,
    /**
     * Minimum time in milliseconds between API calls (rate limiting)
     */
    API_RATE_LIMIT_MS: 1000,
    /**
     * Time-to-live in milliseconds for cached embeddings (default: 30 days)
     */
    CACHE_TTL_MS: 30 * 24 * 60 * 60 * 1000,
    /**
     * Maximum number of entries to keep in the embedding cache
     */
    CACHE_MAX_SIZE: 1000,
    /**
     * Minimum age in milliseconds for jobs to be eligible for cleanup
     * Default: 30 days
     */
    JOB_CLEANUP_AGE_MS: 30 * 24 * 60 * 60 * 1000,
    /**
     * Status options for embedding jobs
     */
    JOB_STATUS: {
        PENDING: 'pending',
        PROCESSING: 'processing',
        COMPLETED: 'completed',
        FAILED: 'failed',
    },
};
/**
 * Get configuration for the LRU cache for embeddings
 *
 * @param options - Optional overrides for cache settings
 * @returns Configuration object for the LRU cache
 */
export function getEmbeddingCacheConfig(options = {}) {
    return {
        max: options.max || DEFAULT_EMBEDDING_SETTINGS.CACHE_MAX_SIZE,
        ttl: options.ttl || DEFAULT_EMBEDDING_SETTINGS.CACHE_TTL_MS,
    };
}
/**
 * Get configuration for embedding job processing
 *
 * @param options - Optional overrides for job processing settings
 * @returns Configuration object for job processing
 */
export function getJobProcessingConfig(options = {}) {
    return {
        batchSize: options.batchSize || DEFAULT_EMBEDDING_SETTINGS.BATCH_SIZE,
        apiRateLimitMs: options.apiRateLimitMs || DEFAULT_EMBEDDING_SETTINGS.API_RATE_LIMIT_MS,
        jobCleanupAgeMs: options.jobCleanupAgeMs || DEFAULT_EMBEDDING_SETTINGS.JOB_CLEANUP_AGE_MS,
    };
}
//# sourceMappingURL=config.js.map