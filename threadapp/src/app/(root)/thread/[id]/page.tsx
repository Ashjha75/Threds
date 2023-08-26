import ThreadCard from "@/app/components/cards/ThreadCard";
import { NextRequest } from "next/server";

import { useGlobalContext } from "@/Context/store";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comment from "@/app/components/form/comment";
const page = async (
  { params }: { params: { id: string } },
  request: NextRequest
) => {
  const thread = await fetchThreadById(params.id);
  return (
    <section>
      <div className="text-white">
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={"64ddb6dfa72514aea656f27c"}
          parentId={thread.parentId}
          content={thread.content}
          author={thread.author.name}
          community={thread.community}
          createdAt={thread.createdAt}
          contents={thread.children}
          commentCount={thread.childrenCount}
          likeCount={thread.likeCount}
          isComment={false}
          type="OTHERS"
        />
        <div className="mt-10 -mb-7 text-gray-400">
          Replying to{" "}
          <span className="text-[#1c80c3] hover:underline cursor-pointer">
            @{thread.author.name}
          </span>
        </div>
        <div>
          <Comment threadsId={thread.id} />
        </div>
        <div className="mt-10">
          {thread.children.map((childrenItem: any) => (
            <ThreadCard
              key={childrenItem._id}
              id={childrenItem._id}
              currentUserId={"64ddb6dfa72514aea656f27c"}
              parentId={childrenItem.parentId}
              content={childrenItem.content}
              author={childrenItem.author.name}
              community={childrenItem.community}
              createdAt={childrenItem.createdAt}
              contents={childrenItem.children}
              commentCount={childrenItem.childrenCount}
              likeCount={childrenItem.likeCount}
              isComment={true}
              type={"OTHERS"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
