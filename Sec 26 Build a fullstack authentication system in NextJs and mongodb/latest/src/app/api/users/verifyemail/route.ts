import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        console.log("=> Received token:", token);
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const user = await User.findOne({ 
            emailVerificationToken: token, 
            isEmailVerified: false, 
            emailVerificationExpiry: { $gt: new Date() } });

        console.log("=> User found for token:", user);
            
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in verify email route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}