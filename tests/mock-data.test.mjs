import { test } from "node:test";
import assert from "node:assert/strict";
import { incidents, tickets, logs, deployments, accounts, forIncident } from "../lib/mock-data.ts";

test("every record belongs to a known incident and has a unique citation ID", () => {
  const ids = new Set(incidents.map((item) => item.id));
  const records = [...tickets, ...logs, ...deployments, ...accounts];
  assert.equal(new Set(records.map((item) => item.id)).size, records.length);
  for (const record of records) assert.ok(ids.has(record.incidentId));
});

test("Acme has correlated deployment, failure, and rollback evidence", () => {
  const incidentId = "INC-1042";
  assert.ok(forIncident(deployments, incidentId).some((item) => item.id === "DEP-221"));
  assert.ok(forIncident(logs, incidentId).some((item) => item.id === "LOG-801"));
  assert.ok(forIncident(logs, incidentId).some((item) => item.id === "LOG-803"));
});

test("Northstar has symptoms without a correlated deployment", () => {
  const incidentId = "INC-1043";
  assert.ok(forIncident(tickets, incidentId).length > 0);
  assert.ok(forIncident(logs, incidentId).length > 0);
  assert.ok(forIncident(deployments, incidentId).every((item) => item.status.includes("no correlated change")));
});
