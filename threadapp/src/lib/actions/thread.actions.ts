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
        console.log(author);
        // Update User for thread author
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Failed to create Thread : ${error.message}`)
    }
}
export async function fetchPost(pageNumber = 1, pageSize = 20) {
    connectDB();

    // Calculate the number of posts to skip 
    const skipAmount = (pageNumber - 1) * pageSize;

    //Fetchthe posts that have no parents (top-lavel threads....)
    const postQuerry = Thread.find({ parentId: { $in: [null, undefined] } }).sort({ createdAt: 'desc' }).limit(pageSize).limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
        })

    const totalPostCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });
    const posts = await postQuerry.exec();
    const isNext = totalPostCount > skipAmount + posts.length;
    return { posts, isNext }
}
export async function fetchThreadById(id: string) {
    connectDB();
    try {
        const thread = await Thread.findById(id).populate({
            path: 'author',
            model: User,
            select: "_id id name image"

        })
            .populate({
                path: 'children',
                populate: [{
                    path: 'author',
                    model: User,
                    select: "_id id name parentId image"
                }]
            },
                {
                    path: 'children',
                    model: User,
                    select: "_id id name parentId image"
                }).exec();
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}