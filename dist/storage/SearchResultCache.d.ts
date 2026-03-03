/**
 * Cache system for search results to improve performance for repeated queries
 */
/**
 * Cache configuration
 */
export interface SearchCacheConfig {
    maxSize?: number;
    defaultTtl?: number;
    enableStats?: boolean;
}
/**
 * Cache statistics
 */
export interface CacheStats {
    hits: number;
    misses: number;
    hitRate: number;
    currentSize: number;
    maxSize: number;
    entryCount: number;
    evictions: number;
    averageLookupTime: number;
}
/**
 * A memory-efficient cache for search results
 */
export declare class SearchResultCache<T> {
    private cache;
    private maxSize;
    private currentSize;
    private defaultTtl;
    private enableStats;
    private hits;
    private misses;
    private evictions;
    private totalLookupTime;
    private totalLookups;
    /**
     * Create a new SearchResultCache
     * @param config Configuration options
     */
    constructor(config?: SearchCacheConfig);
    /**
     * Estimate the size of an object in bytes
     * @param obj The object to measure
     * @returns Approximate size in bytes
     */
    private estimateSize;
    /**
     * Generate a cache key from a query and parameters
     * @param query Original query string
     * @param params Optional parameters that affect the query
     * @returns A cache key string
     */
    private generateKey;
    /**
     * Evict the oldest or least valuable entries to free up space
     * @param requiredSpace The amount of space needed
     */
    private evictEntries;
    /**
     * Set a cache entry
     * @param query The original query
     * @param params Optional parameters that affect the results
     * @param data The data to cache
     * @param ttl Optional time-to-live in milliseconds
     */
    set(query: string, data: T, params?: Record<string, unknown>, ttl?: number): void;
    /**
     * Get a value from the cache
     * @param query The original query
     * @param params Optional parameters that affect the results
     * @returns The cached data or undefined if not found or expired
     */
    get(query: string, params?: Record<string, unknown>): T | undefined;
    /**
     * Remove all expired entries from the cache
     */
    removeExpired(): void;
    /**
     * Clear the entire cache
     */
    clear(): void;
    /**
     * Get cache statistics
     * @returns Cache statistics
     */
    getStats(): CacheStats;
    /**
     * Get the current number of entries in the cache
     * @returns Number of entries
     */
    size(): number;
    /**
     * Check if the cache contains a specific key
     * @param query The original query
     * @param params Optional parameters that affect the results
     * @returns True if the key exists and is not expired
     */
    has(query: string, params?: Record<string, unknown>): boolean;
}
