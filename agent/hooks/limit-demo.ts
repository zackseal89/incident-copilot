import { defineHook } from "eve/hooks";
import { usage } from "../lib/usage";

export default defineHook({
  events: {
    async "turn.started"(_event, ctx) {
      const { turns } = usage.get();
      if (turns >= 12) {
        ctx.cancel("This demo session has reached its 12-turn limit. Start a new chat to continue.");
        return;
      }
      usage.update(() => ({ turns: turns + 1 }));
    },
  },
});
