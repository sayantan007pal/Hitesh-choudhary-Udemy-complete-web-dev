import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
        return null;
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken;
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error("Invalid token");
    }
}