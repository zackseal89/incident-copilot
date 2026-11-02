import { defineEval } from "eve/evals";

export default defineEval({
  description: "Test rate limit hook",
  async test(t) {
    const session = await t.session();

    for (let i = 1; i <= 12; i++) {
      const turn = await session.send(`Turn ${i}`);
      turn.expectOk();
    }

    const turn13 = await session.send("Turn 13");
    t.log(`Turn 13 status: ${turn13.status}`);
    t.log(`Turn 13 outcome: ${JSON.stringify(turn13.outcome)}`);
    t.log(`Turn 13 reply: ${turn13.reply}`);
    t.log(`Turn 13 events: ${JSON.stringify(turn13.events.map((e) => ({ type: e.type, data: (e as any).data })))}`);
  },
});
