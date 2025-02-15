import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the token from cookies
  const token = request.cookies.get("access_token")?.value;

  // If user is not logged in, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/authentication/sign-in", request.url));
  }
  
//   return NextResponse.next(); // Allow access if token exists
    return "hello middleware";
}

// Define which routes to protect
export const config = {
  matcher: ["/user-management/:path*", "/profile/:path*"], // Protect dashboard and profile pages
};
