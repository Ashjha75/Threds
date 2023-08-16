"use server";

import User from "../models/user.model";

export const fetchUsersData = ({ userId }: any) => {
    try {
        const userDatas = User.findById({ id: userId })
        return userDatas;
    } catch (error: any) {
        throw new Error(error.message);
    }
}