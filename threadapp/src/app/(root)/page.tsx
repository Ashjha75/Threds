import { fetchPost } from "@/lib/actions/thread.actions";
import ThreadCard from "../components/cards/ThreadCard";

export default async function Home() {
  const { posts, isNext } = await fetchPost(1, 30);
  console.log(posts);
  console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}");
  return (
    <div>
      <section className="mt-9 flex flex-col ">
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
                image={post.author.image}
                name={post.author.name}
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
