import { connectDB } from '@/lib/mongoose';
import User from '@/lib/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Please fill all required fields' }, { status: 400 });
        }
        const existingUserEmail = await User.findOne({ email });
        const existingUserName = await User.findOne({ username });
        if (existingUserEmail || existingUserName) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/6.x/pixel-art/svg?seed=${username}`,
        });
        const newUserId = newUser._id




        return NextResponse.json(
            {
                message: "User created successfully",
                data: newUser
            },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}