import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  // console.log("checking token", token);

  // If the user is not logged in and trying to access a protected route
  if (!token && pathname !== "/signin" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If the user is logged in and trying to access signin or signup pages
  if (token && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
