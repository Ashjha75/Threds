"use client";
import ThreadCard from "../cards/ThreadCard";
interface Props {
  id: string;
  currentUserId: string | null;
  parentId: string;
  content: string;
  image: string;
  name: string;
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
  name,
  image,
  community,
  createdAt,
  contents,
  commentCount,
  likeCount,
  isComment,
  type,
}: Props) {
  console.log(image);
  return (
    <div>
      <ThreadCard
        key={id}
        id={id}
        currentUserId={"64ddb6dfa72514aea656f27c"}
        parentId={parentId}
        content={content}
        author={author}
        image={image}
        name={name}
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
