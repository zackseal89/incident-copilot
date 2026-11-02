// Fictional records for a public incident-response demonstration.
export const incidents = [
  { id: "INC-1042", customer: "Acme Retail", service: "checkout", startedAt: "2026-10-29T09:12:00Z", summary: "Checkout requests fail after a deployment." },
  { id: "INC-1043", customer: "Northstar Health", service: "dashboard", startedAt: "2026-10-30T14:20:00Z", summary: "Intermittent dashboard timeouts with no confirmed cause." },
] as const;
export const tickets = [
  { id: "TCK-501", incidentId: "INC-1042", at: "2026-10-29T09:16:00Z", customer: "Acme Retail", text: "Checkout returns 500 for card and wallet payments; cart pages still load." },
  { id: "TCK-502", incidentId: "INC-1042", at: "2026-10-29T09:27:00Z", customer: "Acme Retail", text: "Our team confirms failures in US and EU stores." },
  { id: "TCK-601", incidentId: "INC-1043", at: "2026-10-30T14:23:00Z", customer: "Northstar Health", text: "Some dashboard loads time out; retry often works." },
  { id: "TCK-602", incidentId: "INC-1043", at: "2026-10-30T15:02:00Z", customer: "Northstar Health", text: "No clear pattern by user or location yet." },
] as const;
export const logs = [
  { id: "LOG-801", incidentId: "INC-1042", at: "2026-10-29T09:12:18Z", service: "checkout", level: "error", text: "Payment adapter failed: missing PAYMENT_ROUTING_MODE configuration." },
  { id: "LOG-802", incidentId: "INC-1042", at: "2026-10-29T09:13:05Z", service: "checkout", level: "error", text: "POST /checkout 500; payment adapter initialization failed." },
  { id: "LOG-803", incidentId: "INC-1042", at: "2026-10-29T09:44:00Z", service: "checkout", level: "info", text: "Rollback to previous deployment completed; checkout error rate returned to baseline." },
  { id: "LOG-901", incidentId: "INC-1043", at: "2026-10-30T14:25:00Z", service: "dashboard", level: "warn", text: "GET /dashboard timed out after 10s; trace sample has no downstream span." },
  { id: "LOG-902", incidentId: "INC-1043", at: "2026-10-30T14:41:00Z", service: "dashboard", level: "info", text: "A later retry from the same tenant completed in 1.2s." },
] as const;
export const deployments = [
  { id: "DEP-221", incidentId: "INC-1042", at: "2026-10-29T09:08:00Z", service: "checkout", version: "checkout-2.18.0", change: "Payment adapter configuration refactor", status: "rolled back at 09:44 UTC" },
  { id: "DEP-220", incidentId: "INC-1042", at: "2026-10-28T16:00:00Z", service: "checkout", version: "checkout-2.17.4", change: "Previous stable release", status: "restored" },
  { id: "DEP-330", incidentId: "INC-1043", at: "2026-10-28T11:00:00Z", service: "dashboard", version: "dashboard-4.6.2", change: "Copy and accessibility updates", status: "active; no correlated change found" },
] as const;
export const accounts = [
  { id: "ACC-ACME", incidentId: "INC-1042", customer: "Acme Retail", plan: "Enterprise", region: "US and EU", services: ["checkout", "catalog"], contact: "Mock customer contact; no address stored" },
  { id: "ACC-NORTH", incidentId: "INC-1043", customer: "Northstar Health", plan: "Enterprise", region: "US", services: ["dashboard"], contact: "Mock customer contact; no address stored" },
] as const;
export function forIncident<T extends { incidentId: string }>(records: readonly T[], incidentId: string): T[] {
  return records.filter((record) => record.incidentId === incidentId);
}
