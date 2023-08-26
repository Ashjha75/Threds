import { fetchPost } from "@/lib/actions/thread.actions";
import ThreadCard from "../components/cards/ThreadCard";

export default async function Home() {
  const { posts, isNext } = await fetchPost(1, 30);

  return (
    <div>
      <h1 className="head-text text-left">Home </h1>
      <section className="mt-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="head-text text-left">No threads found </p>
        ) : (
          <>
            {posts.map((post: any) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={"64ddb6dfa72514aea656f27c"}
                parentId={post.parentId}
                content={post.content}
                author={post.author.username}
                community={post.community}
                createdAt={post.createdAt}
                contents={post.children}
                commentCount={post.childrenCount}
                likeCount={post.likeCount}
                isComment={false}
              />
            ))}
          </>
        )}
        {/* <ThreadCard /> */}
      </section>
    </div>
  );
}
