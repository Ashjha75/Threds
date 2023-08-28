"use client";
import React, { useEffect, useState } from "react";
import { profileTabs } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchUsersData } from "@/lib/helpers/UserData";
import ThreadCard from "../cards/ThreadCard";

const ProfileTab = ({ userData }: any) => {
  const [userInfo, setuserInfo] = useState();

  console.log(userInfo);
  const [selectedTab, setSelectedTab] = useState("replies");
  const router = useRouter();

  useEffect(() => {
    router.push(
      `/profile/${userData}?tab=${selectedTab.toLowerCase()}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [selectedTab, router]);

  const dynamicComponent = dynamic(() => import(`./${selectedTab}`), {
    ssr: false,
  });
  return (
    <>
      <section className="w-full flex justify-evenly items-center mt-10">
        {profileTabs.map((link) => {
          const isActive = selectedTab == link.label;
          return (
            <div className=" flex justify-center hover:bg-[#2c3640] relative rounded-full ">
              <div
                key={link.label}
                className={`flex  gap-x-3 p-4  cursor-pointer relative ${
                  isActive && ""
                }`}
                onClick={() => setSelectedTab(link.label)}
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-light-1 mr-3 max-lg:hidden">{link.label} </p>
              </div>
              <span
                className={`absolute  w-[80px] bottom-0 h-1 rounded-full ${
                  isActive && " bg-primary-500"
                }`}
              ></span>
            </div>
          );
        })}
      </section>
      <hr className="border bg-transparent border-t-0 border-gray-400 mt-1" />
      <section className="bg-[#333]">
        {" "}
        {/* {userInfo.threads.reverse().map((post: any) => (
          <div className="mt-5">
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={"64ddb6dfa72514aea656f27c"}
              parentId={post.parentId}
              content={post.content}
              author={userData.username}
              community={post.community}
              createdAt={post.createdAt}
              contents={post.children}
              commentCount={post.childrenCount}
              likeCount={post.likeCount}
              type={"PROFILE"}
              isComment={false}
            />
          </div>
        ))} */}
      </section>
    </>
  );
};

export default ProfileTab;
