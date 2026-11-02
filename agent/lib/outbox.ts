import { defineState } from "eve/context";
export const outbox = defineState("incident-copilot.mock-outbox", () => [] as Array<{ id: string; incidentId: string; reply: string; createdAt: string }>);
