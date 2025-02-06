import auth from "./lib/auth";

const { NextResponse } = require("next/server");

export async function middleware(request) {
  const user = await auth.getUser();
  // console.log("user in middleware:", user?.$id);
  if (!user) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    return response;
  }
  if (user.mfa === "verify") {
    return NextResponse.redirect(new URL(user.message, request.url));
  } else if (user.mfa === "error") {
    return NextResponse.redirect(new URL("/login/error", request.url));
  }

  const isAdmin = user.labels?.includes("admin");
  const isUser = user.labels?.includes("user");

  const { pathname } = request.nextUrl;

  // Check if user roles are accessing routes that don't match their roles
  if (isAdmin && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/overview", request.url));
  } else if (isUser && !pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/user/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/user/:path*"],
};
