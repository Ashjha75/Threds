import { fetchUsersData } from "@/lib/helpers/UserData";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {

    try {
        await connectDB();
        const reqBody = await request.json();
        const { params } = reqBody;
        console.log(params)
        console.log("---------------------------------")
        const userData = await fetchUsersData(params);
        console.log("userData")
        console.log("------------------0-----------------------")

        return NextResponse.json({
            success: true,
            message: "Successfull fetched",
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
