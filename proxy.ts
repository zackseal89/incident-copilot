import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE, createDemoCookie, verifyDemoCookie } from "./lib/demo-auth";

export async function proxy(request: NextRequest) {
  const routerHost = process.env.VERCEL_URL;
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (process.env.__VERCEL_DEV_RUNNING === "1" && routerHost && forwardedHost !== routerHost) {
    const target = request.nextUrl.clone();
    target.protocol = "http:";
    target.host = routerHost;
    return NextResponse.redirect(target);
  }
  const response = NextResponse.next();
  if (!await verifyDemoCookie(request.cookies.get(COOKIE)?.value)) {
    response.cookies.set(COOKIE, await createDemoCookie(), {
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8,
    });
  }
  return response;
}
