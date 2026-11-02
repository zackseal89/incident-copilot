import { defineEvalConfig } from "eve/evals";
import { startMockMcpServer } from "./mock-mcp-server.ts";

export default defineEvalConfig({
  async setup() {
    process.env.MOCK_MODEL = "true";
    const mcp = await startMockMcpServer();
    return { mcp };
  },
  async teardown(context) {
    await context?.mcp.close();
  },
});
