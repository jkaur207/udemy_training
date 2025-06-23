import { NextResponse } from "next/server";

// Middleware acts like a guard checking every request before pages load
// This function runs first on matching routes
export function middleware(request) {
  console.log(request); // Just logging the request for now
  return NextResponse.next(); // Let the request continue to the page
}

// The matcher tells middleware which URLs to watch
// Here, it only checks requests going to /news
export const config = {
  matcher: '/news'
};
