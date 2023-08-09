"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectDB } from "../mongoose"

interface Params {
    content: string,
    author: string,
    community: string | null,
    path: string
}
export async function createThread({ content, author, community, path }: Params) {
    connectDB();
    try {
        const createdThread = await Thread.create({
            content, author, community
        });

        // Update User for thread author
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })
        console.log("after findUpdate");

        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Failed to create Thread : ${error.message}`)
    }
}