/**
 * Simple logger utility that wraps console methods
 * Avoids direct console usage which can interfere with MCP stdio
 */
export declare const logger: {
    info: (message: string, ...args: any[]) => void;
    error: (message: string, error?: any) => void;
    debug: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
};
