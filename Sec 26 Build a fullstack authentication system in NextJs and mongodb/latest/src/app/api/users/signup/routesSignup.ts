import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connectDB()

export async function POST(request: NextRequest) {
    try {
        const {email, password, username} = await request.json();
        console.log("=> Received data:", { email, password, username });

        if(!email || !password || !username){
            return NextResponse.json({message: "All fields are required"}, {status: 400})
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            email,
            password: hashedPassword,
            username
        })
        const savedUser = await newUser.save();
        console.log("=> User created:", savedUser);
        return NextResponse.json({message: "User created successfully"}, {status: 201})
    } catch (error) {
        console.error("Error in signup route:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}