import connectDB from "@/lib/db";
import ProductModel from "@/lib/models/Product";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
        const products = await ProductModel.find();
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ message: "Server error", status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, price, category } = body;

        if (!name || !price) {
            return NextResponse.json('All fields are required')
        }

        const newProduct = await ProductModel.create({
            name, price, category
        });
        return NextResponse.json(newProduct, { status: 201 })
    } catch (error) {
        return NextResponse.json('Server error')
    }
}