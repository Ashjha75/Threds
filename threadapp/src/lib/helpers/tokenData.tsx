import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const decodeToken = (request: NextRequest) => {
  try {
    const cookieStore = cookies();

    const decoded = jwt.verify(
      cookieStore.get("token")?.value!,
      process.env.SECRET_KEY!
    );
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
