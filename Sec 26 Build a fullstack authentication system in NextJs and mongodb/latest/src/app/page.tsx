"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Auth App</h1>
      <p className="text-lg mb-8 text-gray-600">
        A full-stack authentication system built with Next.js and MongoDB
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
