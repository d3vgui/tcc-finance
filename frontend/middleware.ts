import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/Home') || request.nextUrl.pathname.startsWith('/Dashboard')

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/Home/:path*',
        '/Dashboard/:path*'
    ]
}