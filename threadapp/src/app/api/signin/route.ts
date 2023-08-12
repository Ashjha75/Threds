import { connectDB } from '@/lib/mongoose';
import User from '@/lib/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextApiResponse } from 'next';
export async function POST(request: NextRequest, resonse: NextApiResponse) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { email, password } = reqBody;
        // validate fields
        if (!email || !password) {
            return NextResponse.json({ message: 'Please fill all required fields' }, { status: 400 });
        }
        // Check for existing user
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return NextResponse.json({
                success: false,
                message: "User does not exists"
            }, {
                status: 400
            })
        }

        // verify password 

        const passwordMatched = await bcryptjs.compare(password, existUser.password);
        if (!passwordMatched) {
            return NextResponse.json({
                success: false,
                message: "Wrong email or password"
            }, {
                status: 400
            })
        }

        // set token in cookeies
        const tokenData = {
            id: existUser._id,
            userName: existUser.userName,
            email: existUser.email,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY!, { expiresIn: "1h" });

        const res = NextResponse.json({
            success: true,
            message: "successfully signin"
        },
            {
                status: 200
            })
        // res.cookies.set("access-medium", token)
        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
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
