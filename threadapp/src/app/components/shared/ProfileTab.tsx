"use client";
import React, { useEffect, useState } from "react";
import { profileTabs } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchUsersData } from "@/lib/helpers/UserData";
import ThreadCard from "../cards/ThreadCard";
import axios from "axios";
import Posts from "./threads";
import Loadder from "./loadder";

const ProfileTab = ({ userData }: any) => {
  const [userInfo, setuserInfo] = useState(null);

  const data = {
    username: userData,
  };
  const [selectedTab, setSelectedTab] = useState("Threads");
  const router = useRouter();

  useEffect(() => {
    router.replace(
      `/profile/${userData}?tab=${selectedTab.toLowerCase()}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [selectedTab, router]);
  const [info, setInfo] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/profileData", data);
        setuserInfo(response.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="w-full flex justify-evenly items-center mt-10">
        {profileTabs.map((link) => {
          const isActive = selectedTab == link.label;
          return (
            <div className=" flex justify-center hover:bg-slate-500 relative rounded-full ">
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
      {userInfo ? (
        <section className="">
          {" "}
          {userInfo && selectedTab == "Threads"
            ? userInfo.threads

                .map((post: any) => (
                  <div>
                    <ThreadCard
                      key={post._id}
                      id={post._id}
                      currentUserId={"64ddb6dfa72514aea656f27c"}
                      parentId={post.parentId}
                      content={post.content}
                      author={userData[0]}
                      name={userInfo.name}
                      community={post.community}
                      image={userInfo.image}
                      createdAt={post.createdAt}
                      contents={post.author.username}
                      commentCount={post.childrenCount}
                      likeCount={post.likeCount}
                      type={"PROFILE"}
                      isComment={false}
                    />
                  </div>
                ))
                .reverse()
            : null}
          {userInfo && selectedTab == "Replies"
            ? userInfo.replies
                .map((post: any) => (
                  <div>
                    <ThreadCard
                      key={post._id}
                      id={post._id}
                      currentUserId={"64ddb6dfa72514aea656f27c"}
                      parentId={post.parentId}
                      content={post.content}
                      author={userData[0]}
                      name={userInfo.name}
                      community={post.community}
                      image={userInfo.image}
                      createdAt={post.createdAt}
                      contents={post.author.username}
                      commentCount={post.childrenCount}
                      likeCount={post.likeCount}
                      type={"COMMENT"}
                      isComment={false}
                    />
                  </div>
                ))
                .reverse()
            : null}
          {userInfo && selectedTab == "Tagged"
            ? userInfo.likes
                .map((post: any) => (
                  <div>
                    <ThreadCard
                      key={post._id}
                      id={post._id}
                      currentUserId={"64ddb6dfa72514aea656f27c"}
                      parentId={post.parentId}
                      content={post.content}
                      author={userData[0]}
                      community={post.community}
                      image={userInfo.image}
                      name={userInfo.name}
                      createdAt={post.createdAt}
                      contents={post.author.username}
                      commentCount={post.childrenCount}
                      likeCount={post.likeCount}
                      type={"PROFILE"}
                      isComment={false}
                    />
                  </div>
                ))
                .reverse()
            : null}
          {selectedTab == "Tagged" && userInfo.likes.length < 0 ? (
            <div className="mt-10 flex justify-center items-center">
              <img
                src="/assets/noData.svg"
                alt="NoData"
                width={40}
                height={20}
              />
              <h1 className="no-result ml-4 text-heading1-semibold">
                No Data Found
              </h1>
            </div>
          ) : null}
        </section>
      ) : (
        <div className="flex mt-5 justify-center items-center">
          <Loadder />
        </div>
      )}
    </>
  );
};

export default ProfileTab;
