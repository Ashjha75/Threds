"use server";

import Thread from "../models/thread.model";
import User from "../models/user.model";

export const fetchUsersData = async (username: string) => {
    try {
        const userDatas = await User.findOne({ username: username }).populate(
            {
                path: "threads",
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    select: 'content ',
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name _id username'
                    }
                }
            }
        ).populate(
            {
                path: "replies",
                model: Thread,

                populate: {
                    path: 'author',
                    model: User,
                    select: 'name _id username'
                }
            }
        ).populate(
            {
                path: "likes",
                model: Thread,

                populate: {
                    path: 'author',
                    model: User,
                    select: 'name _id username'
                }
            }
        ).exec()

        return userDatas;
    } catch (error: any) {
        throw new Error(error.message);
    }
}


export const fetchUsersPosts = async (username: string) => {
    try {
        const userDatas = await User.findOne({ username: username }).populate(
            {
                path: "threads",
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    select: 'content ',
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name _id username'
                    }
                }
            }
        ).exec()
        return userDatas;
    }
    catch (error: any) {
        throw new Error(error.message);
    }

}