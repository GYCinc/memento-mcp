import type { EmbeddingService } from './EmbeddingService.js';
/**
 * Configuration options for embedding services
 */
export interface EmbeddingServiceConfig {
    provider?: string;
    model?: string;
    dimensions?: number;
    apiKey?: string;
    [key: string]: unknown;
}
/**
 * Type definition for embedding service provider creation function
 */
type EmbeddingServiceProvider = (config?: EmbeddingServiceConfig) => EmbeddingService;
/**
 * Factory for creating embedding services
 */
export declare class EmbeddingServiceFactory {
    /**
     * Registry of embedding service providers
     */
    private static providers;
    /**
     * Register a new embedding service provider
     *
     * @param name - Provider name
     * @param provider - Provider factory function
     */
    static registerProvider(name: string, provider: EmbeddingServiceProvider): void;
    /**
     * Reset the provider registry - used primarily for testing
     */
    static resetRegistry(): void;
    /**
     * Get a list of available provider names
     *
     * @returns Array of provider names
     */
    static getAvailableProviders(): string[];
    /**
     * Create a service using a registered provider
     *
     * @param config - Configuration options including provider name and service-specific settings
     * @returns The created embedding service
     * @throws Error if the provider is not registered
     */
    static createService(config?: EmbeddingServiceConfig): EmbeddingService;
    /**
     * Create an embedding service from environment variables
     *
     * @returns An embedding service implementation
     */
    static createFromEnvironment(): EmbeddingService;
    /**
     * Create an OpenAI embedding service
     *
     * @param apiKey - OpenAI API key
     * @param model - Optional model name
     * @param dimensions - Optional embedding dimensions
     * @returns OpenAI embedding service
     */
    static createOpenAIService(apiKey: string, model?: string, dimensions?: number): EmbeddingService;
    /**
     * Create a default embedding service that generates random vectors
     *
     * @param dimensions - Optional embedding dimensions
     * @returns Default embedding service
     */
    static createDefaultService(dimensions?: number): EmbeddingService;
}
export {};
