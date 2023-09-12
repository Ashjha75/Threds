import { fetchUserByName, fetchUserfollow } from "@/lib/actions/user.actions";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        connectDB();
        const body = await request.json();
        const { username } = body;
        if (!username) {
            return NextResponse.json({
                success: false,
                message: "Please select a valid user",
            },
                {
                    status: 400
                })
        }
        const userData = await fetchUserfollow(username)
        return NextResponse.json({
            success: true,
            message: "Succesfull data fetched",
            data: userData,
        },
            {
                status: 200
            })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong ",
            error: error.message,
        },
            {
                status: 500
            })
    }
}