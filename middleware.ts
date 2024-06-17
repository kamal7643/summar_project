import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  try {
    const is_protected =
      req.nextUrl.pathname.includes("/api/user") ||
      req.nextUrl.basePath.includes("/api/my-ai");
    let requestHeaders = new Headers(req.headers);
    if (is_protected) {
      const token =
        req.headers.get("authorization") &&
        req.headers.get("authorization")!.split("Bearer ")[1];
      const {
        payload: { _id },
      } = await jwtVerify(
        token!,
        new TextEncoder().encode(process.env.JWT_SECRET),
      );
      requestHeaders.set("_id", _id as string);
    }
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Authentication failed: Token could not be verified",
      }),
      { status: 401, headers: { "content-type": "application/json" } },
    );
  }
}

export const config = {
  matcher: "/api/(.*)",
};
