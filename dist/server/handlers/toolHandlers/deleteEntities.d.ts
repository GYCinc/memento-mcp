/**
 * Handles the delete_entities tool request
 * @param args The arguments for the tool request
 * @param knowledgeGraphManager The KnowledgeGraphManager instance
 * @returns A response object with the success message
 */
export declare function handleDeleteEntities(args: Record<string, unknown>, knowledgeGraphManager: any): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
}>;
