"use client";
import ThreadCard from "@/app/components/cards/ThreadCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { decodeToken } from "@/lib/helpers/tokenData";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/Context/store";
const page = ({ params }: { params: { id: string } }, request: NextRequest) => {
  // if (!params.id) return null;
  // const [userIds, setUserIds] = useState("");
  // useEffect(() => {
  //   decodeToken(request)
  //     .then((decodedUserId: any) => {
  //       setUserIds(decodedUserId);
  //     })
  //     .catch((error: any) => {
  //       console.error("Error decoding token:", error);
  //     });
  // }, []);
  // if (!userIds) return null;
  const { userId, setUserId, data, setData } = useGlobalContext();

  return (
    <section>
      <div className="text-white">
        {/* <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={"64ddb6dfa72514aea656f27c"}
          parentId={thread.parentId}
          content={thread.content}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          contents={thread.children}
        /> */}
        {/* {params.id} */}
        {userId}
      </div>
    </section>
  );
};

export default page;
