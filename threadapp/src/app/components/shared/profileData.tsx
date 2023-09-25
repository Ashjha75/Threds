"use client";
import { followUser } from "@/lib/actions/user.actions";
import { formatCreatedAtDate } from "@/lib/helpers/commonFunctions";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import ProfileTab from "./ProfileTab";
const ProfileData = ({
  userData,
  check,
  currentUserCheck,
  currentUser,
}: any) => {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Following");
  const handleFollow = async () => {
    await followUser(userData._id, currentUser, "FOLLOW", pathname);
  };
  const handleUnFollow = async () => {
    await followUser(userData._id, currentUser, "UNFOLLOW", pathname);
  };

  const handleDynamic = (e: any) => {
    const currentTab = e.target.id;
    setSelectedTab(currentTab);
    setIsLoaded(true);
  };
  const DynamicHeader = dynamic(() => import("./FollowersList"), {
    ssr: false,
    loading: () => (
      <div className="  flex justify-center items-center">
        <div className=" w-6 h-6 mr-4  rounded-full border-[3px]  border-primary-500 border-b-transparent animate-spin"></div>
        <h1>Loading...</h1>
      </div>
    ),
  });

  return (
    <div className="text-light-1">
      {isLoaded ? (
        <DynamicHeader
          value={userData.username}
          selectedTab={selectedTab}
          setIsLoaded={setIsLoaded}
        />
      ) : (
        <>
          <div className="relative ">
            <img
              src="/assets/bg.jpg"
              alt="back Photo"
              className="w-full h-40  rounded-sm object-cover"
            />
          </div>
          <div className="flex  mb-10">
            <div className="flex-1 ">
              <img
                src={userData.image}
                alt={"userData.name"}
                width={120}
                height={120}
                className="rounded-full bg-primary-500 shadow-md cursor-pointer absolute top-[15rem]  border-4 border-[#193549]"
              />
            </div>
            <div className="">
              {currentUserCheck ? (
                <button className="bg-transparent rounded-3xl mt-4 text-small-regular  border-[1px] border-gray-300 py-2 px-6 mr-2  hover:bg-[#2b597a] ">
                  Edit Profile
                </button>
              ) : null}
              {check && (
                <button
                  className="group bg-transparent rounded-3xl mt-4 text-small-regular  border-[1px] border-gray-300 py-2 px-6 mr-2  hover:bg-[#2b597a]"
                  onClick={handleUnFollow}
                >
                  <span className="group-hover:hidden">Following</span>
                  <span className="hidden group-hover:block px-1 text-red-500">
                    Unfollow
                  </span>
                </button>
              )}
              {check == false && !currentUserCheck ? (
                <button
                  className="rounded-3xl mt-4   border-[1px] border-gray-300 py-2 px-6 text-black  text-small-semibold mr-2 bg-white"
                  onClick={handleFollow}
                >
                  Follow
                </button>
              ) : null}
            </div>
          </div>
          <article className="ml-8">
            <strong>{userData.name}</strong>
            <div className="text-primary-500 ">@{userData.username}</div>
            <div className="mt-5">{userData.bio}</div>
            <div className="text-gray-400 flex gap-x-4 items-center text-small-regular">
              <img
                src="/assets/calender.svg"
                alt="calender"
                className="w-4 h-4"
              />
              Joined {formatCreatedAtDate(userData.createdAt, 1)}
            </div>
            <div className="flex gap-10 mt-5 items-center text-small-regular">
              <div
                className="hover:underline text-gray-400 cursor-pointer"
                onClick={handleDynamic}
                id="following"
              >
                <span className="text-white  text-small-semibold">
                  {userData.follow.length}
                </span>{" "}
                Following
              </div>
              <div
                className="hover:underline cursor-pointer text-gray-400"
                onClick={handleDynamic}
                id="followers"
              >
                <span className="text-white text-small-semibold">
                  {userData.followers.length}
                </span>{" "}
                Followers
              </div>
            </div>
          </article>
          <ProfileTab userData={userData.username} />
        </>
      )}
    </div>
  );
};

export default ProfileData;
