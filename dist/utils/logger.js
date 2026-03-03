/**
 * Simple logger utility that wraps console methods
 * Avoids direct console usage which can interfere with MCP stdio
 */
export const logger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: (message, ...args) => {
        process.stderr.write(`[INFO] ${message}\n`);
        if (args.length > 0) {
            process.stderr.write(`${JSON.stringify(args, null, 2)}\n`);
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (message, error) => {
        process.stderr.write(`[ERROR] ${message}\n`);
        if (error) {
            process.stderr.write(`${error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}\n`);
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (message, ...args) => {
        process.stderr.write(`[DEBUG] ${message}\n`);
        if (args.length > 0) {
            process.stderr.write(`${JSON.stringify(args, null, 2)}\n`);
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn: (message, ...args) => {
        process.stderr.write(`[WARN] ${message}\n`);
        if (args.length > 0) {
            process.stderr.write(`${JSON.stringify(args, null, 2)}\n`);
        }
    },
};
//# sourceMappingURL=logger.js.map