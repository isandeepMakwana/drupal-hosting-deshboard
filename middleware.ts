import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.next()
  }

  // We'll handle authentication in the client components instead of middleware
  // to avoid issues with the preview environment
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
