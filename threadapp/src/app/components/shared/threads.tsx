"use client";
import { fetchUser, fetchUserByName } from "@/lib/actions/user.actions";
import { fetchUsersData } from "@/lib/helpers/UserData";
import { useEffect, useState } from "react";

const Posts = () => {
  const [userdata, setuserdata] = useState();

  useEffect(() => {
    async function getData() {
      const data = await fetchUserByName("Ashish");
      setuserdata(data);
    }
    getData();
  }, []);
  console.log(userdata);

  console.log("///////////.............,,,,,,,,,,,,,,,,");
  return (
    <div className="bg-blue">h</div>
    // <div>
    //   {userDatas.threads.map((post: any) => (
    //     <ThreadCard
    //       key={post._id}
    //       id={post._id}
    //       currentUserId={"64ddb6dfa72514aea656f27c"}
    //       parentId={post.parentId}
    //       content={post.content}
    //       author={post.author}
    //       community={post.community}
    //       createdAt={post.createdAt}
    //       contents={post.children}
    //       commentCount={post.childrenCount}
    //       likeCount={post.likeCount}
    //       isComment={false}
    //     />
    //   ))}
    // </div>
  );
};

export default Posts;
