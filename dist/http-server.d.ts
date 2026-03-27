#!/usr/bin/env node
/**
 * HTTP Server for Memento MCP
 * Runs 24/7 so other agents/services can connect via HTTP
 */
import http from 'http';
declare const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export default server;
