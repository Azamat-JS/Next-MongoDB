import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });


        if (existingUser) {
            return NextResponse.json(
                { message: "Email is already registered" },
                { status: 409 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email, password: hashedPassword
        });

        return NextResponse.json(
            {
                message: "Registration successful",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Register failed:", error);
        return NextResponse.json(
            { message: "Failed to create product" },
            { status: 500 }
        );
    }
}