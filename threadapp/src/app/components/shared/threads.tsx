import { fetchUserAllPost } from "@/lib/actions/thread.actions";
import ThreadCard from "../cards/ThreadCard";

const Posts = async ({ userData }: any) => {
  const posts = userData.Threads;
  return (
    <div>
      {posts.map((post: any) => (
        <ThreadCard
          key={post._id}
          id={post._id}
          currentUserId={"64ddb6dfa72514aea656f27c"}
          parentId={post.parentId}
          content={post.content}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          contents={post.children}
          commentCount={post.childrenCount}
          likeCount={post.likeCount}
          isComment={false}
        />
      ))}
    </div>
  );
};

export default Posts;
