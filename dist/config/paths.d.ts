/**
 * Get the absolute path to the data directory
 * Creates the directory if it doesn't exist
 * @returns The absolute path to the data directory
 */
export declare function getDataDirectoryPath(): string;
/**
 * Resolve the memory file path based on environment variable or default
 * @param envPath Optional path from environment variable
 * @param dataDir Data directory path
 * @returns Resolved path to the memory file
 */
export declare function resolveMemoryFilePath(envPath: string | undefined, dataDir: string): string;
