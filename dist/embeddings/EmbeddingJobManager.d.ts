import { LRUCache } from 'lru-cache';
import type { StorageProvider } from '../storage/StorageProvider.js';
import type { EmbeddingService } from './EmbeddingService.js';
import type { Entity } from '../KnowledgeGraphManager.js';
import type { EntityEmbedding } from '../types/entity-embedding.js';
/**
 * Interface for embedding cache options
 */
interface CacheOptions {
    size: number;
    ttl: number;
    maxItems?: number;
    ttlHours?: number;
}
/**
 * Interface for rate limiting options
 */
interface RateLimiterOptions {
    tokensPerInterval: number;
    interval: number;
}
/**
 * Interface for job processing results
 */
interface JobProcessResults {
    processed: number;
    successful: number;
    failed: number;
}
/**
 * Interface for the rate limiter status
 */
interface RateLimiterStatus {
    availableTokens: number;
    maxTokens: number;
    resetInMs: number;
}
/**
 * Interface for a cached embedding entry
 */
interface CachedEmbedding {
    embedding: number[];
    timestamp: number;
    model: string;
}
/**
 * Interface for a logger
 */
interface Logger {
    debug: (message: string, meta?: Record<string, unknown>) => void;
    info: (message: string, meta?: Record<string, unknown>) => void;
    warn: (message: string, meta?: Record<string, unknown>) => void;
    error: (message: string, meta?: Record<string, unknown>) => void;
}
/**
 * Interface for embedding storage provider, extending the base provider
 */
interface EmbeddingStorageProvider extends StorageProvider {
    /**
     * Access to the underlying database
     */
    db: any;
    /**
     * Get an entity by name
     */
    getEntity(entityName: string): Promise<Entity | null>;
    /**
     * Store an entity vector embedding
     */
    storeEntityVector(entityName: string, embedding: EntityEmbedding): Promise<void>;
}
/**
 * Return structure for queue status
 */
interface QueueStatus {
    pending: number;
    processing: number;
    completed: number;
    failed: number;
    totalJobs: number;
}
/**
 * Manages embedding jobs for semantic search
 */
export declare class EmbeddingJobManager {
    private storageProvider;
    private embeddingService;
    rateLimiter: {
        tokens: number;
        lastRefill: number;
        tokensPerInterval: number;
        interval: number;
    };
    cache: LRUCache<string, CachedEmbedding>;
    private cacheOptions;
    private logger;
    /**
     * Creates a new embedding job manager
     *
     * @param storageProvider - Provider for entity storage
     * @param embeddingService - Service to generate embeddings
     * @param rateLimiterOptions - Optional configuration for rate limiting
     * @param cacheOptions - Optional configuration for caching
     * @param logger - Optional logger for operation logging
     */
    constructor(storageProvider: EmbeddingStorageProvider, embeddingService: EmbeddingService, rateLimiterOptions?: RateLimiterOptions | null, cacheOptions?: CacheOptions | null, logger?: Logger | null);
    /**
     * Initialize the database schema for embedding jobs
     *
     * @private
     */
    private _initializeDatabase;
    /**
     * Schedule an entity for embedding generation
     *
     * @param entityName - Name of the entity to generate embedding for
     * @param priority - Optional priority (higher priority jobs are processed first)
     * @returns Job ID
     */
    scheduleEntityEmbedding(entityName: string, priority?: number): Promise<string>;
    /**
     * Process a batch of pending embedding jobs
     *
     * @param batchSize - Maximum number of jobs to process
     * @returns Result statistics
     */
    processJobs(batchSize?: number): Promise<JobProcessResults>;
    /**
     * Get the current status of the job queue
     *
     * @returns Queue statistics
     */
    getQueueStatus(): Promise<QueueStatus>;
    /**
     * Retry failed embedding jobs
     *
     * @returns Number of jobs reset for retry
     */
    retryFailedJobs(): Promise<number>;
    /**
     * Clean up old completed jobs
     *
     * @param threshold - Age in milliseconds after which to delete completed jobs, defaults to 7 days
     * @returns Number of jobs cleaned up
     */
    cleanupJobs(threshold?: number): Promise<number>;
    /**
     * Update a job's status in the database
     *
     * @private
     * @param jobId - ID of the job to update
     * @param status - New status
     * @param attempts - Optional attempts count update
     * @param error - Optional error message
     * @returns Database result
     */
    private _updateJobStatus;
    /**
     * Check rate limiter and consume a token if available
     *
     * @private
     * @returns Object with success flag
     */
    _checkRateLimiter(): {
        success: boolean;
    };
    /**
     * Get the current status of the rate limiter
     *
     * @returns Rate limiter status information
     */
    getRateLimiterStatus(): RateLimiterStatus;
    /**
     * Retrieve a cached embedding or generate a new one
     *
     * @param text - Text to generate embedding for
     * @returns Embedding vector
     */
    _getCachedEmbeddingOrGenerate(text: string): Promise<number[]>;
    /**
     * Store an embedding in the cache
     *
     * @private
     * @param text - Original text
     * @param embedding - Embedding vector
     */
    private _cacheEmbedding;
    /**
     * Generate a deterministic cache key for text
     *
     * @private
     * @param text - Text to hash
     * @returns Cache key
     */
    _generateCacheKey(text: string): string;
    /**
     * Prepare text for embedding from an entity
     *
     * @private
     * @param entity - Entity to prepare text from
     * @returns Processed text ready for embedding
     */
    private _prepareEntityText;
    /**
     * Get a cached embedding entry (used for testing)
     *
     * @param key - Cache key
     * @returns Cached embedding or undefined
     */
    getCacheEntry(key: string): CachedEmbedding | undefined;
}
export {};
