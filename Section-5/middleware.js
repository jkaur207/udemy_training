import { NextResponse } from "next/server";

// All request will be logged
export function middleware(request){
    console.log(request);
    return NextResponse.next();
}

// This filters all the request fetched
export const config = {
    matcher: '/news'
};