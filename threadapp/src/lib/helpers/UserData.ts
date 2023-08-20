"use server";

import User from "../models/user.model";

export const fetchUsersData = (userId: any) => {
    try {
        console.log(userId)
        const userDatas = User.findById({ _id: userId })
        return userDatas;
    } catch (error: any) {
        throw new Error(error.message);
    }
}