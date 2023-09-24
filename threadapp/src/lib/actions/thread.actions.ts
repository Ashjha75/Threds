"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectDB } from "../mongoose"
import { decodeToken, fetchData } from "../helpers/tokenData";
import { NextRequest } from "next/server";
// import { pushNotification } from "./user.actions";
import Activity from "../models/activity.model";

interface Params {
    content: string,
    author: string,
    community: string | null,
    pathname: string
}


export async function createThread({ content, author, community, pathname }: Params) {
    connectDB();
    try {
        const createdThread = await Thread.create({
            content, author, community
        });
        // Update User for thread author
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })

        revalidatePath(pathname)
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
            select: "_id username id name image"

        })
            .populate({
                path: 'children',
                populate: [{
                    path: 'author',
                    model: User,
                    select: "_id id username name parentId image"
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name username parentId image"
                    }
                }]
            }).exec();
        return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}
export async function addCommentToThread(threadId: string, commentText: string, userId: string, pathname: string) {

    connectDB();
    try {
        // find the original thread by its Id
        const originalThread = await Thread.findById(threadId);
        //find user for replies push
        const originalUser = await User.findOne({ _id: userId });
        if (!originalThread) {
            throw new Error("Thread not found")
        }
        else if (!originalUser) {
            throw new Error("User not found")
        }
        // Create a new thread with the comment text
        const commentThread = new Thread({
            content: commentText,
            author: userId,
            parentId: threadId
        })
        await pushNotification(threadId, originalThread.author, userId, pathname, "comment");
        // Save the new thread
        const savedCommentThread = await commentThread.save();
        // update the original Thread 
        originalThread.children.push(savedCommentThread);
        // Update the original user 
        originalUser.replies.push(savedCommentThread);
        originalThread.childrenCount = +(originalThread.children.length)
        // save the original Thread
        await originalThread.save();
        await originalUser.save();
        revalidatePath(pathname)
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}
export async function addsLikesUnlike(id: string, action: string, path: any) {
    const userData = decodeToken()
    connectDB()
    try {
        const originalThread = await Thread.findById(id);
        const originalUser = await User.findOne({ _id: userData });
        if (!originalThread) {
            throw new Error("Thread not found")
        }
        if (action == "LIKE") {
            await originalUser.updateOne({ $addToSet: { likes: id } }); // Use $addToSet to prevent duplicates
            await originalUser.save();
            await originalThread.updateOne({ $addToSet: { likes: id } }); // Use $addToSet to prevent duplicates
            originalThread.likeCount = (originalThread.likes.length);
            await originalThread.save();
            return false;
        }
        if (action == "UNLIKE") {
            await originalUser.updateOne({ $pull: { likes: id } }); // Use $pull to remove the thread ID
            await originalUser.save();
            await originalThread.updateOne({ $pull: { likes: id } }); // Use $pull to remove the thread ID
            originalThread.likeCount = (originalThread.likes.length)
            await originalThread.save();
            return true;
        }
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Error fetching thread:${error.message}`)

    }
}

export async function addLikeUnlike(userId: string, currentUser: string, type: string, pathname: string) {
    try {
        connectDB();

        const originalThread = await Thread.findOne({ _id: userId });
        const originalUser = await User.findOne({ _id: currentUser });
        if (type == "LIKE") {
            await pushNotification(userId, originalThread.author, currentUser, pathname, "likes");
            await originalThread.updateOne({ $addToSet: { likes: currentUser } })
            await originalThread.save();
            await originalUser.updateOne({ $addToSet: { likes: userId } })
            await originalUser.save();

        }
        else if (type == "UNLIKE") {
            await originalThread.updateOne({ $pull: { likes: currentUser } });
            await originalThread.save();
            await originalUser.updateOne({ $pull: { likes: userId } });
            await originalUser.save();
        }
        revalidatePath(pathname);
    } catch (error: any) {
        throw new Error(`Failed to like the user :${error.message}`)
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

export async function pushNotification(id: string, authorId: string, currentUser: string, pathname: string, types: string) {
    try {
        connectDB();
        const type = types;
        const Threads = await Thread.findOne({ _id: id });
        const userAccount = await User.findOne({ _id: authorId });
        if (!Threads) {
            throw new Error(`User not found with id: ${id}`);
        }
        if (types == "likes") {

            const notification = await Activity.create({
                type, data: {
                    likes: {
                        ThreadId: Threads._id,
                        likerId: currentUser,
                    },

                }
            })

            await userAccount.updateOne({ $push: { activities: notification._id } })
            userAccount.newActivity = +(userAccount.newActivity + 1);
            await userAccount.save();
        }
        else if (types == "comment") {
            const notification = await Activity.create({
                type, data: {
                    comment: {
                        ThreadId: Threads._id,
                        likerId: currentUser,
                    },

                }
            })

            await userAccount.updateOne({ $push: { activities: notification._id } })
            userAccount.newActivity = +(userAccount.newActivity + 1);
            await userAccount.save();
        }

        revalidatePath(pathname)
    } catch (error: any) {
        throw new Error(`Failed to push notification :${error.message}`)
    }
}
