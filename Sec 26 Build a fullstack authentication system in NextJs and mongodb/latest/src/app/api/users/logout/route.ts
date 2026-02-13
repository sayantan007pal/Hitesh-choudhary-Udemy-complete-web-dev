import { NextResponse } from "next/server";


export async function GET() {
    try {
        // Clear the token cookie by setting it to an empty value and expiring it immediately
        const response = NextResponse.json({ message: "Logged out successfully" });
        response.cookies.set("token", "", { path: "/", expires: new Date(0) });
        return response;
    } catch (error) {
        console.error("Error in logout route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}