/**
 * Handles the CallTool request.
 * Delegates to the appropriate tool handler based on the tool name.
 *
 * @param request The CallTool request object
 * @param knowledgeGraphManager The KnowledgeGraphManager instance
 * @returns A response object with the result content
 * @throws Error if the tool is unknown or arguments are missing
 */
export declare function handleCallToolRequest(request: {
    params?: {
        name?: string;
        arguments?: Record<string, unknown>;
    };
}, knowledgeGraphManager: any): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
}>;
