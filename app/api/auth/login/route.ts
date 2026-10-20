
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password
        ) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectDB();

        const foundUser = await User.findOne({
            email: email.trim().toLowerCase(),
        });


        if (!foundUser) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }


        const isPasswordCorrect = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }


        const token = generateToken({
            id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
        });

        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: {
                    id: foundUser._id.toString(),
                    name: foundUser.name,
                    email: foundUser.email,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login failed:", error);

        return NextResponse.json(
            { message: "Login failed" },
            { status: 500 }
        );
    }
}
