import { defineState } from "eve/context";
export const usage = defineState("incident-copilot.usage", () => ({ turns: 0 }));
