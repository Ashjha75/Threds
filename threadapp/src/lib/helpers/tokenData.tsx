"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import User from "../models/user.model";

export const decodeToken = () => {
  try {
    const cookieStore = cookies();

    const decoded = jwt.verify(
      cookieStore.get("token")?.value!,
      process.env.SECRET_KEY!
    );
    // Convert payload to formatted JSON string
    const userId = decoded.id;
    return userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const fetchData = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();

    const decoded = jwt.verify(
      cookieStore.get("token")?.value!,
      process.env.SECRET_KEY!
    );
    // Convert payload to formatted JSON string
    const userId = decoded.id;
    const userData = await User.findById({ _id: userId });

    const userDataObject = {
      _id: userData._id.toString(),
      username: userData.username,
      email: userData.email,
      name: userData.name,
      newActivity: userData.newActivity,
      image: userData.image.toString(),
      onboarded: userData.onboarded,
    };
    return userDataObject;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
