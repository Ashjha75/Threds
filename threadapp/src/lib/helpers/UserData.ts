"use server";

import User from "../models/user.model";

export const fetchUsersData = (username: any) => {
    try {
        const userDatas = User.findOne({ username: username }).populate(
            "threads"
        ).exec()
        return userDatas;
    } catch (error: any) {
        throw new Error(error.message);
    }
}