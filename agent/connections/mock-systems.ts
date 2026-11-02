import { defineMcpClientConnection } from "eve/connections";
export default defineMcpClientConnection({
  url: process.env.MOCK_MCP_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/mock-mcp` : "http://127.0.0.1:3000/api/mock-mcp"),
  description: "Fictional incident records: support tickets, application logs, deployments, and customer accounts. Search these tools before making incident claims.",
});
