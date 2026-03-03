/**
 * Handles the read_graph tool request
 * @param args The arguments for the tool request
 * @param knowledgeGraphManager The KnowledgeGraphManager instance
 * @returns A response object with the result content
 */
export declare function handleReadGraph(args: Record<string, unknown>, knowledgeGraphManager: any): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
}>;
