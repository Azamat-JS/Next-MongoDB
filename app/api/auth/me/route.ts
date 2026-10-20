
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { JwtPayload } from "jsonwebtoken";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.slice(7);
        const payload = verifyToken(token);

        if (
            typeof payload === "string" ||
            typeof (payload as JwtPayload).userId !== "string"
        ) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        const userId = (payload as JwtPayload & {
            userId: string;
        }).userId;

        await connectDB();

        const user = await User.findById(userId).select(
            "_id name email"
        );

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        });
    } catch {
        return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
        );
    }
}
