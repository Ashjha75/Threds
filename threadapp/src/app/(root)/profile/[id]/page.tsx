import ProfileTab from "@/app/components/shared/ProfileTab";
import { fetchUsersData } from "@/lib/helpers/UserData";
import { formatCreatedAtDate } from "@/lib/helpers/commonFunctions";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import ThreadCard from "@/app/components/cards/ThreadCard";
import Posts from "@/app/components/shared/threads";
const page = async ({ params }: { params: { id: string } }) => {
  const userData = await fetchUsersData(params.id);
  return (
    <section className="text-light-1">
      <div className="relative ">
        <img
          src="/assets/bg.jpg"
          alt="back Photo"
          className="w-full h-40  rounded-sm object-cover"
        />
      </div>
      <div className="flex  mb-10">
        <div className="flex-1">
          <Image
            src="/assets/user-2.png"
            alt={"userData.name"}
            width={120}
            height={120}
            className="rounded-full shadow-md cursor-pointer absolute top-[15rem]  border-4 border-[#193549]"
          />
        </div>
        <div className="">
          <button className="bg-transparent rounded-3xl mt-4 text-small-regular  border-[1px] border-gray-300 py-2 px-6  hover:bg-[#2c3640]">
            Edit Profile
          </button>
        </div>
      </div>
      <article className="ml-8">
        <strong>{userData.name}</strong>
        <div className="text-primary-500 ">@{userData.username}</div>
        <div className="mt-5">{userData.bio}</div>
        <div className="text-gray-400 flex gap-x-4 items-center text-small-regular">
          <SlCalender />
          Joined {formatCreatedAtDate(userData.createdAt)}
        </div>
      </article>
      <div className="text-light-1">Posts</div>

      <ProfileTab userData={params.id} />
      {userData.threads.reverse().map((post: any) => (
        <div className="mt-5">
          <Posts
            key={post._id}
            id={post._id}
            currentUserId={"64ddb6dfa72514aea656f27c"}
            parentId={post.parentId}
            content={post.content}
            author={userData.username}
            community={post.community}
            createdAt={post.createdAt}
            contents={post.author.username}
            commentCount={post.childrenCount}
            likeCount={post.likeCount}
            type={"COMMENT"}
            isComment={false}
          />
        </div>
      ))}
      <div className="text-light-1">replies</div>

      {userData.replies.reverse().map((post: any) => (
        <div className="mt-5">
          <Posts
            key={post._id}
            id={post._id}
            currentUserId={"64ddb6dfa72514aea656f27c"}
            parentId={post.parentId}
            content={post.content}
            author={userData.username}
            community={post.community}
            createdAt={post.createdAt}
            contents={post.author.username}
            commentCount={post.childrenCount}
            likeCount={post.likeCount}
            type={"COMMENT"}
            isComment={false}
          />
        </div>
      ))}
      <div className="text-light-1">Likes</div>
      {userData.likes.reverse().map((post: any) => (
        <Posts
          key={post._id}
          id={post._id}
          currentUserId={"64ddb6dfa72514aea656f27c"}
          parentId={post.parentId}
          content={post.content}
          author={userData.username}
          community={post.community}
          createdAt={post.createdAt}
          contents={post.author.username}
          commentCount={post.childrenCount}
          likeCount={post.likeCount}
          type={"COMMENT"}
          isComment={false}
        />
      ))}
    </section>
  );
};

export default page;
