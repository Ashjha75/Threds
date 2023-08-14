import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
export async function POST() {
    try {
        await connectDB();

        const res = NextResponse.json({
            success: true,
            message: "successfully sign-out"
        },
            {
                status: 200
            })
        cookies().set({
            name: "token",
            value: "",
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        })
        return res;

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong ",
        },
            {
                status: 500
            })

    }
}
