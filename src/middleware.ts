import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const {auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const {pathname} = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname);

    const publicPaths = [
        "/", 
        "/about",
        "/contact", 
        "/signin", 
        "/signup", 
        "/demotransactionhistory", 
        "/api/auth", 
    ];

    if(!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

     console.log(`Restricted rout hit: ${pathname}`)
     console.log("Can't go there!");
     return NextResponse.redirect(new URL("/", request.url));

}

export const config = {
    matcher: [
        "/editTransaction/:path*",
    ]
};

export default middleware;