"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { connectDB } from "../mongoose"
import { FilterQuery, SortOrder } from "mongoose";
import { decodeToken } from "@/lib/helpers/tokenData";
import Activity from "../models/activity.model";
import Thread from "../models/thread.model";

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
        return await User.findById(userId)
        // .populate({path:'communities',model:'Community'})
    } catch (error: any) {
        throw new Error(`Failed to fetch the user :${error.message}`)
    }
}
export async function fetchByUsername(username: string) {
    try {
        connectDB();
        return await User.findOne({ username: username });
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
export async function fetchAllUsers({ userId, searchString = "", pageNumber = 1, pageSize = 20, sortBy = "desc" }: { userId: string, searchString?: string, pageNumber?: number, pageSize?: number, sortBy?: SortOrder }) {
    try {
        connectDB();
        const skipAmount = (pageNumber - 1) * pageSize;
        // make regex for case insenstive for search
        const regex = new RegExp(searchString, "i");
        // filter out current user
        const querry: FilterQuery<typeof User> = {
            is: { $ne: userId }
        }
        if (searchString.trim() !== "") {
            querry.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }]
        }
        const sortOptions = { createdAt: sortBy };
        const usersQuery = User.find(querry).sort(sortOptions).skip(skipAmount).limit(pageSize);
        const users = await usersQuery.exec();
        const totalUserCount = await User.countDocuments(querry)
        const isNext = totalUserCount > skipAmount + User.length;
        return { users, isNext }
    } catch (error: any) {
        throw new Error(`Failed to fetch the user :${error.message}`)
    }


}

// follows
export async function followUser(userId: string, currentUser: string, type: string, pathname: string) {
    try {
        connectDB();
        const followedAccount = await User.findOne({ _id: userId });
        const followersAccount = await User.findOne({ _id: currentUser });
        if (type == "FOLLOW") {
            await followedAccount.updateOne({ $addToSet: { followers: currentUser } });
            await followedAccount.save();
            await followersAccount.updateOne({ $addToSet: { follow: userId } })
            await followersAccount.save();
            await pushNotification(userId, currentUser, pathname, "follows");
        }
        else if (type == "UNFOLLOW") {
            await followedAccount.updateOne({ $pull: { followers: currentUser } });
            await followedAccount.save();
            await followersAccount.updateOne({ $pull: { follow: userId } });
            await followersAccount.save();
        }
        revalidatePath(pathname);
    } catch (error: any) {
        throw new Error(`Failed to follow the user :${error.message}`)
    }

}
export async function fetchUserfollow(username: string) {
    try {
        connectDB();
        return await User.findOne({ username: username }).populate({ path: 'follow', model: User, select: "_id name username image" }).populate({ path: 'followers', model: User, select: "_id name username image" }).exec();
    } catch (error: any) {
        throw new Error(`Failed to fetch the user :${error.message}`)
    }
}

// activities
export async function pushNotification(id: string, currentUser: string, pathname: string, types: string) {
    try {
        connectDB();
        const type = types;


        const userAccount = await User.findOne({ _id: id });
        if (!userAccount) {
            throw new Error(`User not found with id: ${id}`);
        }
        if (types == "follows") {
            const notification = await Activity.create({
                type, data: { follows: currentUser }
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
// export async function fetchUserActivities(userId: string) {
//     try {
//         connectDB();
//         const userAccount = await User.findOne({ _id: userId })
//             .populate({ path: 'activities', model: Activity, populate: { path: 'data.follows', model: User, select: "_id name username image" } })

//             .exec();
//         if (!userAccount) {
//             throw new Error(`User not found with id: ${userId}`);
//         }

//         await userAccount.save();
//         return userAccount.activities;
//     } catch (error: any) {
//         throw new Error(`Failed to fetch user activities :${error.message}`)
//     }
// }
export async function fetchUserActivities(userId: string) {
    try {
        connectDB();
        const userAccount = await User.findOne({ _id: userId });

        if (!userAccount) {
            throw new Error(`User not found with id: ${userId}`);
        }

        // Combine the match condition for both "likes" and "comment" types
        const likesAndCommentsMatch = {
            $or: [
                { 'data.likes': { $exists: true }, type: 'likes' },
                { 'data.comment': { $exists: true }, type: 'comment' },
            ],
        };

        // Populate notifications based on their type
        await userAccount.populate({
            path: 'activities',
            model: Activity,
            populate: [
                {
                    path: 'data.follows',
                    model: User,
                    select: '_id name username image',
                    match: { type: 'follows' }, // Populate only if type is "follows"
                },
                {
                    path: 'data.likes.ThreadId',
                    model: Thread,
                    select: '_id content',
                    match: likesAndCommentsMatch, // Populate for both "likes" and "comment" types
                },
                {
                    path: 'data.comment.ThreadId',
                    model: Thread,
                    select: '_id content',
                    match: likesAndCommentsMatch, // Populate for both "likes" and "comment" types
                },
                // Populate likerId for both "likes" and "comment" types
                {
                    path: 'data.likes.likerId',
                    model: User,
                    select: '_id name username image',
                    match: likesAndCommentsMatch, // Populate for both "likes" and "comment" types
                },
                {
                    path: 'data.comment.likerId',
                    model: User,
                    select: '_id name username image',
                    match: likesAndCommentsMatch, // Populate for both "likes" and "comment" types
                },
            ],
        });

        return userAccount.activities;
    } catch (error: any) {
        throw new Error(`Failed to fetch user activities: ${error.message}`);
    }
}

export async function updateActivities(pingId: string, pathname: string) {
    try {
        connectDB();
        const userId = await decodeToken();
        const ping = await Activity.findOne({ _id: pingId });
        if (!ping) {
            throw new Error(`User not found with id: ${pingId}`);
        }
        const userAccount = await User.findOne({ _id: userId })
        if (!userAccount) {
            throw new Error(`User not found with id: ${userId}`);
        }
        if (ping.readed == false && userAccount.newActivity > 0) {
            userAccount.newActivity = +(userAccount.newActivity - 1);
            await userAccount.save();
            ping.readed = true;
            await ping.save();
        }


        revalidatePath(pathname)
    } catch (error: any) {
        throw new Error(`Failed to fetch user activities :${error.message}`)
    }
}