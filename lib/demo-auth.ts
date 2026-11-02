const COOKIE = "incident_demo";
const encoder = new TextEncoder();

function secret() {
  const value = process.env.DEMO_SESSION_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return "local-demo-only-secret";
  throw new Error("DEMO_SESSION_SECRET must be set in production");
}

async function signature(id: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(id)));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createDemoCookie() {
  const id = crypto.randomUUID();
  return `${id}.${await signature(id)}`;
}

export async function verifyDemoCookie(value: string | undefined) {
  if (!value) return null;
  const [id, mac, extra] = value.split(".");
  if (!id || !mac || extra || !/^[0-9a-f-]{36}$/.test(id) || !/^[0-9a-f]{64}$/.test(mac)) return null;
  const expected = await signature(id);
  let diff = 0;
  for (let i = 0; i < 64; i++) diff |= mac.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0 ? id : null;
}

export function demoCookieFromHeader(header: string | null) {
  return header?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
}
export { COOKIE };
