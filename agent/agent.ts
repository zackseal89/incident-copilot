import { defineAgent } from "eve";
import { mockModel } from "eve/evals";

export default defineAgent({
  model: process.env.MOCK_MODEL
    ? mockModel(({ userMessages, lastUserMessage, toolResults }) => {
        const prompt = lastUserMessage ?? "";

        // Outbox / customer reply
        if (prompt.toLowerCase().includes("reply") || prompt.toLowerCase().includes("outbox")) {
          if (toolResults.length === 0) {
            return {
              toolCalls: [
                {
                  name: "send-customer-reply",
                  input: {
                    incidentId: "INC-1042",
                    reply: "We investigated the checkout failures and completed a rollback of DEP-221. Normal service is restored.",
                  },
                },
              ],
            };
          }
          const replyResult = toolResults.find((r) => r.name === "send-customer-reply");
          if (replyResult?.isError) {
            return "Approval was denied. The reply was not saved to the mock outbox.";
          }
          return "Approval received. The reply was successfully saved to the mock outbox.";
        }

        // INC-1042 investigation
        if (prompt.includes("INC-1042") || prompt.includes("Acme")) {
          if (toolResults.length === 0) {
            return {
              toolCalls: [
                { name: "eve__tool", input: { name: "mock-systems__search_tickets", input: { incidentId: "INC-1042" } } },
                { name: "eve__tool", input: { name: "mock-systems__query_logs", input: { incidentId: "INC-1042" } } },
                { name: "eve__tool", input: { name: "mock-systems__list_deployments", input: { incidentId: "INC-1042" } } },
                { name: "eve__tool", input: { name: "mock-systems__get_account", input: { incidentId: "INC-1042" } } },
              ],
            };
          }
          return "Investigation for INC-1042 (Acme Retail): Deployment [DEP-221] refactored payment adapter configuration without setting PAYMENT_ROUTING_MODE, causing error [LOG-801]. Rollback completed at 09:44 UTC in [LOG-803].";
        }

        // INC-1043 investigation
        if (prompt.includes("INC-1043") || prompt.includes("Northstar")) {
          if (toolResults.length === 0) {
            return {
              toolCalls: [
                { name: "eve__tool", input: { name: "mock-systems__search_tickets", input: { incidentId: "INC-1043" } } },
                { name: "eve__tool", input: { name: "mock-systems__query_logs", input: { incidentId: "INC-1043" } } },
                { name: "eve__tool", input: { name: "mock-systems__list_deployments", input: { incidentId: "INC-1043" } } },
                { name: "eve__tool", input: { name: "mock-systems__get_account", input: { incidentId: "INC-1043" } } },
              ],
            };
          }
          return "Investigation for INC-1043 (Northstar Health): Symptoms reported in [TCK-601] and dashboard timeout logged in [LOG-901]. Deployment [DEP-330] has no correlated change. There is insufficient evidence for a root cause.";
        }

        return `Turn ${userMessages.length}: ${prompt}`;
      })
    : "zai/glm-5.3-fast",
});
