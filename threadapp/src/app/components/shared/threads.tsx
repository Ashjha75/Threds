"use client";
import { fetchUser, fetchUserByName } from "@/lib/actions/user.actions";
import { fetchUsersData } from "@/lib/helpers/UserData";
import { useEffect, useState } from "react";
import ThreadCard from "../cards/ThreadCard";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
interface Props {
  id: string;
  currentUserId: string | null;
  parentId: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  contents: {
    author: {
      image: string;
    }[];
  };
  commentCount: string;
  likeCount: string;
  isComment: boolean;
  type?: "PROFILE" | "COMMENT" | "OTHERS";
}
export default function Posts({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  contents,
  commentCount,
  likeCount,
  isComment,
  type,
}: Props) {
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  console.log(hostname);
  console.log(origin);
  return (
    <div>
      <ThreadCard
        key={id}
        id={id}
        currentUserId={"64ddb6dfa72514aea656f27c"}
        parentId={parentId}
        content={content}
        author={author}
        community={community}
        createdAt={createdAt}
        contents={contents}
        commentCount={commentCount}
        likeCount={likeCount}
        isComment={false}
      />
    </div>
  );
}
