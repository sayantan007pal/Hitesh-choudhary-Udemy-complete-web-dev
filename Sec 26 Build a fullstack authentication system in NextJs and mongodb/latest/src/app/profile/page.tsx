"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";


export default function ProfilePage(){

   const [userData, setUserData] = useState<any>(null);

    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get(`/api/users/logout`);
            toast.success("Logout successful!");
            router.push("/login");
        } catch (err:any) {
            console.log("Logout failed", err.message);
            toast.error("Logout failed");
        }
    }
    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/users/me");
            console.log("User data fetched successfully", response.data);
            setUserData(response.data.user);
        } catch (err:any) {
            console.log("Failed to fetch user data", err.message);
            toast.error("Failed to fetch user data");
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <div>
            <h1>Profile Page</h1>
            <hr />
            <h2>{userData ? `Welcome, ${userData.userName}` : "Loading..."}</h2>
            <button
            onClick={logout}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Logout
        </button>
        </div>
    )
}

