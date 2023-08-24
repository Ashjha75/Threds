"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { ObjectId } from 'bson';
import { connectDB } from "../mongoose"
interface Params {
    userId: string, username: string, name: string, image: string, bio: string, path: string;
}
export async function updateUser({
    userId,
    bio,
    name,
    path,
    username,
    image,
}: Params): Promise<void> {
    try {
        connectDB();

        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
        connectDB();
        return await User.findById({ userId })
        // .populate({path:'communities',model:'Community'})
    } catch (error: any) {
        throw new Error(`Failed to fetch the user :${error.message}`)
    }
}
export async function fetchUserByName(username: string) {
    try {
        connectDB();
        return await User.findOne({ username: username }).populate("threads").exec()
        // .populate({path:'communities',model:'Community'})
    } catch (error: any) {
        throw new Error(`Failed to fetch the user :${error.message}`)
    }
}