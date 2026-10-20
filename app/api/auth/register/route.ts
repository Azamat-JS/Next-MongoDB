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
        const { name, email, password } = body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof email !== "string" || typeof password !== "string"

        ) {
            return NextResponse.json(
                { message: "Invalid product data" },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.create({
            name,
            email, password
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Register failed:", error);
        return NextResponse.json(
            { message: "Failed to create product" },
            { status: 500 }
        );
    }
}