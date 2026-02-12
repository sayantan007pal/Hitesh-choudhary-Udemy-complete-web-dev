"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";


export default function SignUpPage() {
    
    const [user, setUser] = useState({email: "", password: "",username: ""});
    const [loading, setLoading] = useState(false);
    
    const onSignUp = async () => {
    
    }
    return (
        <>
        <div>
        <h1>Sign Up</h1>
        <hr />
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
        <button onClick={onSignUp} disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
        </button>
        </div>
        <Link href="/login"> Visit Login page</Link> 
        </>
    )
}

