import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { accounts, deployments, forIncident, incidents, logs, tickets } from "@/lib/mock-data";

const inputSchema = z.object({ incidentId: z.enum(["INC-1042", "INC-1043"]) });
const output = (records: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(records) }] });
const handler = createMcpHandler((server) => {
  server.registerTool("list_incidents", { title: "List demo incidents", description: "List the two fictional incidents available for investigation.", inputSchema: z.object({}) }, async () => output(incidents));
  server.registerTool("search_tickets", { title: "Search support tickets", description: "Get timestamped customer support tickets for an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(tickets, incidentId)));
  server.registerTool("query_logs", { title: "Query service logs", description: "Get timestamped application logs for an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(logs, incidentId)));
  server.registerTool("list_deployments", { title: "List deployments", description: "Get deployment records and changes for an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(deployments, incidentId)));
  server.registerTool("get_account", { title: "Get customer account", description: "Get the fictional customer account attached to an incident.", inputSchema }, async ({ incidentId }) => output(forIncident(accounts, incidentId)));
});
export { handler as GET, handler as POST };
