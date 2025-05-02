import { NextResponse } from "next/server";

export function middleware(req) {
  const accessToken = req.cookies.get("access_token")?.value;

  const protectedRoutes = [
    "/dashboard", 
    "/user-management",
    "/library-department",
    "/resources",
    "/configuration",
    "/profile",
    "/logs",
    "/notification",
    "/reports",
    "/search",
    "/student-profile",
    "/advance-search-filter",
    "/change-password",
    "/e-news-clipping"
  ];
  
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/user-management/:path*",
    "/library-department/:path*",
    "/resources/:path*",
    "/configuration/:path*",
    "/profile/:path*",
    "/logs/:path*",
    "/notification/:path*",
    "/reports/:path*",
    "/search/:path*",
    "/advance-search-filter/:path*",
    "/student-profile/:path*",
    "/change-password/:path*",
    "/e-news-clipping/:path*"
  ],
};
