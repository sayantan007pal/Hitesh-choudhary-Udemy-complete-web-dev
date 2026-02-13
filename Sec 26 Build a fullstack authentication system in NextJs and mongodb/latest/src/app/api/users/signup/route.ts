import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


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
        
        // Send verification email - if it fails, delete the user
        try {
            await sendEmail(email, "VERIFY_EMAIL", savedUser._id);
        } catch (emailError) {
            // Delete the user if email sending fails
            await User.findByIdAndDelete(savedUser._id);
            console.error("Email sending failed, user deleted:", emailError);
            return NextResponse.json(
                { message: "Failed to send verification email. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({message: "User created successfully. Please check your email for verification."}, {status: 201})
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