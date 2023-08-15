"use client";
import PostThread from "@/app/components/form/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { decodeToken } from "@/lib/helpers/tokenData";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";

export default function Page(request: NextRequest) {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    decodeToken(request)
      .then((decodedUserId) => {
        setUserId(decodedUserId);
      })
      .catch((error: any) => {
        console.error("Error decoding token:", error);
      });
  }, []);
  return (
    <>
      <h1 className="head-text text-center">Create Thread</h1>
      <PostThread userId={userId}></PostThread>
    </>
  );
}
