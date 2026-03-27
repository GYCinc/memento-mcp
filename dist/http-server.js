#!/usr/bin/env node
/**
 * HTTP Server for Memento MCP
 * Runs 24/7 so other agents/services can connect via HTTP
 */
import http from 'http';
import { KnowledgeGraphManager } from './KnowledgeGraphManager.js';
import { initializeStorageProvider } from './config/storage.js';
import { EmbeddingJobManager } from './embeddings/EmbeddingJobManager.js';
import { EmbeddingServiceFactory } from './embeddings/EmbeddingServiceFactory.js';
import { logger } from './utils/logger.js';
const PORT = parseInt(process.env.MEMENTO_PORT || '3000', 10);
// Initialize storage
const storageProvider = initializeStorageProvider();
// Initialize embedding job manager
let embeddingJobManager;
try {
    const embeddingService = EmbeddingServiceFactory.createFromEnvironment();
    const rateLimiterOptions = {
        tokensPerInterval: 20,
        interval: 60 * 1000,
    };
    const adaptedStorageProvider = {
        ...storageProvider,
        getEntity: async (name) => {
            if (typeof storageProvider.getEntity === 'function') {
                return storageProvider.getEntity(name);
            }
            const result = await storageProvider.openNodes([name]);
            return result.entities[0] || null;
        },
        storeEntityVector: async (name, embedding) => {
            const formattedEmbedding = {
                vector: embedding.vector || embedding,
                model: embedding.model || 'unknown',
                lastUpdated: embedding.lastUpdated || Date.now(),
            };
            if (typeof storageProvider.updateEntityEmbedding === 'function') {
                return await storageProvider.updateEntityEmbedding(name, formattedEmbedding);
            }
            throw new Error('storeEntityVector not implemented');
        },
    };
    embeddingJobManager = new EmbeddingJobManager(adaptedStorageProvider, embeddingService, rateLimiterOptions, null, logger);
    setInterval(async () => {
        try {
            await embeddingJobManager?.processJobs(10);
        }
        catch (error) {
            logger.error('Error in scheduled job processing', { error });
        }
    }, 10000);
}
catch (error) {
    logger.error('Failed to initialize EmbeddingJobManager', { error });
}
const knowledgeGraphManager = new KnowledgeGraphManager({
    storageProvider,
    embeddingJobManager,
});
// HTTP Server
const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    // Health check
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
        return;
    }
    // Add entity
    if (req.url === '/add' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            const result = await knowledgeGraphManager.createEntities([body]);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, result }));
        }
        catch (error) {
            sendError(res, 400, error);
        }
        return;
    }
    // Search entities
    if (req.url === '/search' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            const results = await knowledgeGraphManager.openNodes(body.names || []);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
        catch (error) {
            sendError(res, 400, error);
        }
        return;
    }
    // Semantic search
    if (req.url === '/semantic' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            const results = await knowledgeGraphManager.search(body.query, { semanticSearch: true });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
        catch (error) {
            sendError(res, 400, error);
        }
        return;
    }
    // Add observation
    if (req.url === '/observe' && req.method === 'POST') {
        try {
            const body = await parseBody(req);
            await knowledgeGraphManager.addObservations([{
                    entityName: body.entityName,
                    contents: Array.isArray(body.observations) ? body.observations : [body.observations],
                }]);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        }
        catch (error) {
            sendError(res, 400, error);
        }
        return;
    }
    // 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(data));
            }
            catch (e) {
                reject(e);
            }
        });
        req.on('error', reject);
    });
}
function sendError(res, code, error) {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: error instanceof Error ? error.message : String(error)
    }));
}
server.listen(PORT, '127.0.0.1', () => {
    logger.info(`🚀 Memento HTTP Server running on http://127.0.0.1:${PORT}`);
    console.log(`🚀 Memento HTTP Server running on http://127.0.0.1:${PORT}`);
    console.log(`Endpoints:`);
    console.log(`  GET  /health       - Health check`);
    console.log(`  POST /add          - Add entity`);
    console.log(`  POST /search       - Search entities`);
    console.log(`  POST /semantic     - Semantic search`);
    console.log(`  POST /observe      - Add observations`);
});
export default server;
//# sourceMappingURL=http-server.js.map