import nodemailer from 'nodemailer';
import { User } from '@/models/userModel';
import bcrypt from 'bcryptjs';

export async function sendEmail(to: string, emailType: string, userId: string) {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 12); // Hash the userId to use as a token in the email link
        
        if(emailType === "verification"){
        await User.findByIdAndUpdate(userId, {
            emailVerificationExpiry: Date.now() + 3600000, // Set token expiry time (e.g., 1 hour)
            emailVerificationToken: hashedToken }); // Store the hashed token in the user's document for later verification
        } 
        else if(emailType === "reset"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordExpiry: Date.now() + 3600000, // Set token expiry time (e.g., 1 hour)
                forgotPasswordToken: hashedToken }); // Store the hashed token in the user's document for later verification
        } 
        else {
            throw new Error("Invalid email type");
        }
        
            const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject: emailType === "verification" ? "Verify your email" : "Reset your password",
            html: `<p>Please click the link below to ${emailType === "verification" ? "verify your email" : "reset your password"}:</p>
                   <a href="${process.env.DOMAIN}/${emailType}?token=${hashedToken}">Click here</a>`
        };

        await transporter.sendMail(mailOptions);

        console.log(`Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
        
    }
}