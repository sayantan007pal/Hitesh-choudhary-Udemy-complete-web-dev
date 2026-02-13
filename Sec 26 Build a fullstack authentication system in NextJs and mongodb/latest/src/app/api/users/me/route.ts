import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";

connectDB()

export async function GET(request: NextRequest) {
    try {
        const userData = getDataFromToken(request);
        if (!userData || typeof userData === "string") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findById(userData.id).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user, message: "User found" }, { status: 200 });
    } catch (error) {
        console.error("Error in profile route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}