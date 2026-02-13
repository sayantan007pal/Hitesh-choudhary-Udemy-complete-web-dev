import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const {email, password} = await request.json();
        console.log("=> Received data:", { email, password });
        //check if email and password are provided
        if(!email || !password){
            return NextResponse.json({message: "Email and password are required"}, {status: 400})
        }
        //check if user exists
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return NextResponse.json({message: "Invalid credentials"}, {status: 401})
        }
        //compare password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            return NextResponse.json({message: "Invalid credentials"}, {status: 401})
        }
        
        //check if email is verified
        if(!existingUser.isEmailVerified){
            return NextResponse.json({message: "Please verify your email before logging in"}, {status: 403})
        }
        
        console.log("=> Login successful for user:", existingUser);

        //create session or token data
        const sessionToken ={
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
        }
        //create session or token logic here 
        const token = await jwt.sign(sessionToken, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response =  NextResponse.json({
            message: "Login successful", success: true}, {status: 200})

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
        })
        return response;
    } catch (error) {
        console.error("Error in login route:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}
