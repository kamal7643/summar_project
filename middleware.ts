import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  try {
    let requestHeaders = new Headers(req.headers);
    if (req.nextUrl.pathname.includes("/api/user")) {
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
    } else {
      const token =
        req.headers.get("authorization") &&
        req.headers.get("authorization")!.split("Bearer ")[1];
      if (token) {
        try {
          const {
            payload: { _id },
          } = await jwtVerify(
            token!,
            new TextEncoder().encode(process.env.JWT_SECRET),
          );
          requestHeaders.set("_id", _id as string);
        } catch (e) {
          //
        }
      }
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
