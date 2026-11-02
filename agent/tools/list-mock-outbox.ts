import { defineTool } from "eve/tools";
import { z } from "zod";
import { outbox } from "../lib/outbox";
export default defineTool({ description: "Show customer replies approved and saved to this session's mock outbox.", inputSchema: z.object({}), async execute() { return outbox.get(); } });
