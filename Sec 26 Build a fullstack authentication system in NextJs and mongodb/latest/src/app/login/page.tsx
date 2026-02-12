"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";


export default function LoginPage() {
    
    const [user, setUser] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    
    const onLogin = async () => {
    
    }
    return (
        <>
        <div>
        <h1>Login</h1>
        <hr />
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
        <button onClick={onLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
        </button>
        </div>
        <Link href="/signup"> Visit Sign Up page</Link> 
        </>
    )
}









// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function LoginPage() {
//   const router = useRouter();
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const onLogin = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/users/login", user);
//       console.log("Login success", response.data);
//       toast.success("Login successful!");
//       router.push("/profile");
//     } catch (error: any) {
//       console.log("Login failed", error.message);
//       toast.error(error.response?.data?.error || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-4xl font-bold mb-8">
//         {loading ? "Processing..." : "Login"}
//       </h1>
//       <hr />

//       <label htmlFor="email" className="mt-4">
//         Email
//       </label>
//       <input
//         className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
//         id="email"
//         type="email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="Email"
//       />

//       <label htmlFor="password" className="mt-4">
//         Password
//       </label>
//       <input
//         className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
//         id="password"
//         type="password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder="Password"
//       />

//       <button
//         onClick={onLogin}
//         disabled={loading}
//         className="p-2 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:border-gray-600 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>

//       <Link href="/signup" className="mt-4 text-blue-500 hover:underline">
//         Don&apos;t have an account? Sign up
//       </Link>
//     </div>
//   );
// }
