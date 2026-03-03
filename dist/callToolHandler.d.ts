import type { KnowledgeGraphManager } from './KnowledgeGraphManager.js';
export declare function handleToolCall(manager: KnowledgeGraphManager, toolCall: {
    name: string;
    args: Record<string, unknown>;
}): Promise<unknown>;
