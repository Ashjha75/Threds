// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware
// Copy the middleware code as it is from the above resource

import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export default authMiddleware({
    // An array of public routes that don't require authentication.
    publicRoutes: ["/api/webhook/clerk"],

    // An array of routes to be ignored by the authentication middleware.
    ignoredRoutes: ["/api/webhook/clerk"],
});

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = request.cookies.get("access-medium")?.value || "";

    // if (isPublicPath && token) {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }
    // if (!isPublicPath && !token) {
    //     return NextResponse.redirect(new URL('/login', request.nextUrl))
    // }
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export function tokenVlaue(request: NextRequest) {
    return request.cookies.get("access-medium")?.value || "";
}