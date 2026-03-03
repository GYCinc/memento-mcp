/**
 * Handles the ListTools request.
 * Returns a list of all available tools with their schemas.
 */
export declare function handleListToolsRequest(): Promise<{
    tools: Array<Record<string, unknown>>;
}>;
