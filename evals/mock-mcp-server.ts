import http from "node:http";
import type { AddressInfo } from "node:net";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { accounts, deployments, forIncident, incidents, logs, tickets } from "../lib/mock-data.ts";

export function createMockMcpServer() {
  const inputSchema = z.object({ incidentId: z.enum(["INC-1042", "INC-1043"]) });
  const output = (records: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(records) }] });

  const handler = createMcpHandler((server) => {
    server.registerTool("list_incidents", { title: "List demo incidents", description: "List the two fictional incidents available for investigation.", inputSchema: z.object({}) }, async () => output(incidents));
    server.registerTool("search_tickets", { title: "Search support tickets", description: "Get timestamped customer support tickets for an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(tickets, incidentId)));
    server.registerTool("query_logs", { title: "Query service logs", description: "Get timestamped application logs for an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(logs, incidentId)));
    server.registerTool("list_deployments", { title: "List deployments", description: "Get deployment records and changes for an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(deployments, incidentId)));
    server.registerTool("get_account", { title: "Get customer account", description: "Get the fictional customer account attached to an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(accounts, incidentId)));
  });

  const server = http.createServer(async (req, res) => {
    try {
      const url = `http://${req.headers.host || "127.0.0.1"}${req.url}`;
      const method = req.method || "GET";
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) {
          if (Array.isArray(value)) {
            for (const v of value) headers.append(key, v);
          } else {
            headers.set(key, value);
          }
        }
      }

      let body: Buffer | undefined = undefined;
      if (method !== "GET" && method !== "HEAD") {
        const chunks: Buffer[] = [];
        for await (const chunk of req) {
          chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
        }
        body = Buffer.concat(chunks);
      }

      const webReq = new Request(url, {
        method,
        headers,
        body,
        // @ts-expect-error duplex is needed when body is present in Node fetch/Request
        duplex: "half",
      });

      const webRes = await handler(webReq);
      res.statusCode = webRes.status;
      webRes.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });

      if (webRes.body) {
        const reader = webRes.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      }
      res.end();
    } catch (err) {
      res.statusCode = 500;
      res.end(String(err));
    }
  });

  return server;
}

export async function startMockMcpServer(): Promise<{ url: string; close: () => Promise<void> }> {
  if (process.env.MOCK_MCP_URL) {
    return { url: process.env.MOCK_MCP_URL, close: async () => {} };
  }

  try {
    const res = await fetch("http://127.0.0.1:3000/api/mock-mcp", { method: "HEAD", signal: AbortSignal.timeout(500) });
    if (res.ok || res.status === 405 || res.status === 404) {
      process.env.MOCK_MCP_URL = "http://127.0.0.1:3000/api/mock-mcp";
      return { url: process.env.MOCK_MCP_URL, close: async () => {} };
    }
  } catch {
    // Port 3000 not reachable, start standalone server
  }

  const server = createMockMcpServer();
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const port = (server.address() as AddressInfo).port;
  const url = `http://127.0.0.1:${port}/api/mock-mcp`;
  process.env.MOCK_MCP_URL = url;

  return {
    url,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
  };
}

