import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

type User = {
    name: string,
    email: string,
    password: string
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (

            typeof email !== "string" || typeof password !== "string"

        ) {
            return NextResponse.json(
                { message: "Invalid user data" },
                { status: 400 }
            );
        }

        await connectDB();
        const foundUser = await User.findOne({
            email
        });

        if (foundUser.password !== password) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 400 }
            );
        }

        return NextResponse.json(foundUser, { status: 200 });
    } catch (error) {
        console.error("Register failed:", error);
        return NextResponse.json(
            { message: "Failed to create product" },
            { status: 500 }
        );
    }
}