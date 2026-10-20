import { NextResponse } from "next/server";

const products = [
    {
        name: "Non",
        price: 4000,
    },
]

export async function GET() {
    return NextResponse.json(products)
}