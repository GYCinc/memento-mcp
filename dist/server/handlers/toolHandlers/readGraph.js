/**
 * Handles the read_graph tool request
 * @param args The arguments for the tool request
 * @param knowledgeGraphManager The KnowledgeGraphManager instance
 * @returns A response object with the result content
 */
export async function handleReadGraph(args, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
knowledgeGraphManager) {
    const result = await knowledgeGraphManager.readGraph();
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}
//# sourceMappingURL=readGraph.js.map