import { eveChannel } from "eve/channels/eve";
import { localDev, type AuthFn, vercelOidc } from "eve/channels/auth";
import { demoCookieFromHeader, verifyDemoCookie } from "@/lib/demo-auth";

const demoSession: AuthFn<Request> = async (request) => {
  const id = await verifyDemoCookie(demoCookieFromHeader(request.headers.get("cookie")));
  if (!id) return null;
  return { attributes: {}, authenticator: "incident-demo-cookie", principalId: id, principalType: "user" };
};

export default eveChannel({
  auth: [demoSession, vercelOidc(), localDev()],
});
