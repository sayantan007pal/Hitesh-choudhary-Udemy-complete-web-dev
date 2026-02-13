"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";


export default function SignUpPage() {
    const router = useRouter();
    
    const [user, setUser] = useState({email: "", password: "",username: "", fullName: ""});
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const onSignUp = async () => {

       try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", {
            username: user.username,
            email: user.email,
            password: user.password,
            fullName: user.fullName,
        });
        console.log("Signup success", response.data);
        toast.success("Signup successful!");
        router.push("/login");
        return;
    } catch (err:any) {
        console.log("Signup failed", err.message);
        toast.error(err.response?.data?.message || "Signup failed");
    } finally {
        setLoading(false);
    }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 && user.fullName.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <>
        <div>
        <h1>Sign Up</h1>
        <hr />
                <label htmlFor="fullName">Full Name</label>
        <input 
        type="text" 
        id="fullName" 
        value={user.fullName} 
        onChange={(e) => setUser({...user, fullName: e.target.value})} 
        />
        </div>

            <div>
        <label htmlFor="username">Username</label>
        <input 
        type="text" 
        id="username" 
        value={user.username} 
        onChange={(e) => setUser({...user, username: e.target.value})} 
        />
        </div>

        
        <div>
        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        id="email" 
        value={user.email} 
        onChange={(e) => setUser({...user, email: e.target.value})} 
        />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        id="password" 
        value={user.password} 
        onChange={(e) => setUser({...user, password: e.target.value})} 
        />
        </div>
        <div>
        <button onClick={onSignUp} disabled={loading }>
            {loading ? "Signing up..." : "Sign Up"}
        </button>
        </div>
        <Link href="/login"> Visit Login page</Link> 
        </>
    )
}

