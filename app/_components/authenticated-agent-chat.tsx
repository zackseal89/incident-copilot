import { AgentChat } from "./agent-chat";

export async function AuthenticatedAgentChat({
  sessionId,
  sessionless,
}: {
  readonly sessionId?: string;
  readonly sessionless?: boolean;
}) {
  return <AgentChat sessionId={sessionId} sessionless={sessionless} />;
}
