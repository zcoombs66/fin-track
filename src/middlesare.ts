import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
    const {pathname} = request.nextUrl;

    console.log(`Restricted rout hit: ${pathname}`)
    console.log("Can't go there!");
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: [
        "/Create-item",
        "/update-item/:item"
    ]
}

export default middleware;