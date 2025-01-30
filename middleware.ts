import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose"


export async function middleware(requset: NextRequest) {
    // console.log("Middlewaore:", requset.url)
    if (requset.method === "POST") {
        return NextResponse.next()
    }
    const cookieStore = await cookies()
    const token = cookieStore.get("firebaseAuthToken")?.value
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    const decodedToken = decodeJwt(token)
    if (!decodedToken.admin) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin-dashboard"],
}