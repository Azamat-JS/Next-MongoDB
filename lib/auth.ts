import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import jwt from "jsonwebtoken";

type User = {
    id: string;
    email: string;
    role: string;
}


const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db()


export const auth = betterAuth({

    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true
    },
});;


const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
}

export function generateToken(user: User) {
    return jwt.sign(
        user,
        JWT_SECRET, {
        expiresIn: '1d'
    }
    );
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}