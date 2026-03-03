/**
 * Handles the create_relations tool request
 * @param args The arguments for the tool request
 * @param knowledgeGraphManager The KnowledgeGraphManager instance
 * @returns A response object with the result content
 */
export declare function handleCreateRelations(args: Record<string, unknown>, knowledgeGraphManager: any): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
}>;
