import { defineTool } from "eve/tools";
import { always } from "eve/tools/approval";
import { z } from "zod";
import { outbox } from "../lib/outbox";
export default defineTool({
  description: "Submit a proposed customer reply to the session's mock outbox. Requires human approval. Never contacts a real customer.",
  inputSchema: z.object({ incidentId: z.enum(["INC-1042", "INC-1043"]), reply: z.string().min(20).max(2000) }),
  approval: always(),
  async execute({ incidentId, reply }, ctx) {
    const item = { id: crypto.randomUUID(), incidentId, reply, createdAt: new Date().toISOString() };
    outbox.update((items) => [...items, item]);
    return { status: "saved_to_mock_outbox", sessionId: ctx.session.id, item };
  },
});
