import { fetchUsersData } from "@/lib/helpers/UserData";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {

    try {
        await connectDB();
        const reqBody = await request.json();
        const { username } = reqBody;
        const userDatas = await fetchUsersData(username);

        return NextResponse.json({
            success: true,
            message: "Successfull fetched",
            data: userDatas,
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
