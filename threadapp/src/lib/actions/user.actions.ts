"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { ObjectId } from 'bson';
import { connectDB } from "../mongoose"
interface Params {
    userId: string, username: string, name: string, image: string, bio: string, path: string;
}
export async function updateUser({ userId, username, name, image, bio, path }: Params) {
    connectDB()
    try {
        await User.findByIdAndUpdate({ _id: userId }, {
            username: username.toLowerCase(),
            name, bio, onboarded: true, image
        }, { upsert: true })

        if (path === '/profile/edit') {
            revalidatePath(path)
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user:${error.message}`)
    }

}

export async function fetchUser(userId: string) {
    try {
        connectDB();
        console.log(userId)
        return await User.findById({ userId })
        // .populate({path:'communities',model:'Community'})
    } catch (error: any) {
        throw new Error(`Failed to fetch the user :${error.message}`)
    }
}