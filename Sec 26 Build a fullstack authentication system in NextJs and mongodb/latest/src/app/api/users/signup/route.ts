import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendEmail";


connectDB()

export async function POST(request: NextRequest) {
    try {
        const {email, password, username, fullName} = await request.json();
        console.log("=> Received data:", { email, password, username, fullName });

        if(!email || !password || !username || !fullName){
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
            username,
            fullName
        })
        const savedUser = await newUser.save();
        console.log("=> User created:", savedUser);
        //send verification email logic here

        await sendEmail(to: email, emailType: "VERIFY_EMAIL", userId: savedUser._id); // Call the email sending function

        return NextResponse.json({message: "User created successfully"}, {status: 201})
    } catch (error: any) {
        console.error("Error in signup route:", error);
        // Handle MongoDB duplicate key error (code 11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return NextResponse.json(
                { message: `${field} already exists` },
                { status: 400 }
            );
        }
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}