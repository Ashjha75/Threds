import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const decodeToken = (request: NextRequest) => {
  try {
    const cookieStore = cookies();

    const decoded = jwt
      .verify(cookieStore.get("token")?.value!, process.env.SECRET_KEY!)
      .toString();
    const decodedString = JSON.stringify(decoded, null, 2); // Convert payload to formatted JSON string
    console.log(decodedString);
    console.log(
      decodedString +
        "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
    );
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
