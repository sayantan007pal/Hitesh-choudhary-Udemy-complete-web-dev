"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");
        
        if (!token) {
            setStatus("error");
            setMessage("No verification token provided");
            return;
        }

        const verifyEmail = async () => {
            try {
                const response = await axios.post("/api/users/verifyemail", { token });
                setStatus("success");
                setMessage(response.data.message || "Email verified successfully!");
            } catch (error: any) {
                setStatus("error");
                setMessage(error.response?.data?.message || "Verification failed");
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Email Verification</h1>
            <hr />
            
            {status === "loading" && <p>Verifying your email...</p>}
            
            {status === "success" && (
                <div>
                    <p style={{ color: "green" }}>{message}</p>
                    <Link href="/login">Go to Login</Link>
                </div>
            )}
            
            {status === "error" && (
                <div>
                    <p style={{ color: "red" }}>{message}</p>
                    <Link href="/signup">Back to Signup</Link>
                </div>
            )}
        </div>
    );
}
