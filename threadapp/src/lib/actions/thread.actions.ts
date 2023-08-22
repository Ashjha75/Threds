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
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    }
                }]
            }).exec();
        return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}
export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string) {

    connectDB();
    try {
        // find the original thread by its Id
        const originalThread = await Thread.findById(threadId);
        if (!originalThread) {
            throw new Error("Thread not found")
        }
        // Create a new thread with the comment text
        const commentThread = new Thread({
            content: commentText,
            author: userId,
            parentId: threadId
        })
        // Save the new thread
        const savedCommentThread = await commentThread.save();
        // update the original Thread 
        originalThread.children.push(savedCommentThread);
        originalThread.childrenCount = +(originalThread.children.length)
        // save the original Thread
        await originalThread.save();

        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}
export async function addLikeUnlike(id: string, action: string, path: any) {
    connectDB()
    try {
        const originalThread = await Thread.findById(id);
        if (!originalThread) {
            throw new Error("Thread not found")
        }
        originalThread.likeCount = +(originalThread.likeCount + 1);
        if (action == "LIKE") {
            return false;
        }
        if (action == "UNLIKE") {
            return true;
        }
        // if (action == "LIKE") {
        //     originalThread.likeCount += 1
        // } if (action == "UNLIKE") {
        //     originalThread.likeCount -= 1
        // }
        // else {
        //     throw new Error("Invalid Actions")
        // }
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}
export async function fetchUserAllPost(id: string) {
    connectDB();
    try {
        const thread = await User.findById({ username: id });
        return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}