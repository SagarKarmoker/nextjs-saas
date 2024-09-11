import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher([
    '/',
    '/home',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
]);

const publicApiRoute = createRouteMatcher([
    '/api/videos',
]);

export default clerkMiddleware((auth, req) => {
    const { userId } = auth();
    const currentUrl = new URL(req.url);
    const isHome = currentUrl.pathname === '/home';
    const isApiRequest = currentUrl.pathname.startsWith('/api');

    // TODO: Fix this redirect
    // if (userId && publicRoutes(req) && !isHome) {
    //     return NextResponse.redirect(new URL('/home'), req.url);
    // }

    // if user is not logged in 
    // if (!userId) {
    //     if (!publicRoutes(req) && !publicApiRoute(req)) {
    //         return NextResponse.redirect(new URL('/sign-in'), req.url);
    //     }

    //     if (isApiRequest && !publicApiRoute(req)) {
    //         return NextResponse.redirect(new URL('/sign-in'), req.url);
    //     }
    // }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};