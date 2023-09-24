"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Users from "../cards/Users";
import axios from "axios";
const FollowersList = (props: any) => {
  const router = useRouter();
  const [selectedTab, setselectedTab] = useState(props.selectedTab);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/Followers", {
          username: props.value,
        });
        setUserInfo(response.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  console.log(userInfo);

  return (
    <section className="text-white w-full h-24 -mt-10 border-b-0 border-gray-400">
      <div className="flex">
        <BiArrowBack
          className=" hover:bg-[#537187] w-9 h-9 rounded-full ml-3 mt-4  items-center cursor-pointer"
          onClick={(e: any) => props.setIsLoaded(false)}
        />
        <div className="ml-5">
          <div className=" text-[22px] font-medium">Ashish jha</div>
          <div className="text-small-medium text-gray-1">@user1</div>
        </div>
      </div>
      <div className="mt-6  flex justify-evenly items-center border-b-[1px] pb-2 border-gray-400">
        <span
          className={`cursor-pointer text-[16px] relative px-5 py-2 rounded-full hover:bg-slate-400 font-medium ${
            selectedTab == "following" && "bg-slate-500"
          }`}
          onClick={(e) => setselectedTab("following")}
        >
          Following
        </span>
        <span
          className={`cursor-pointer text-[16px] relative px-5 py-2 rounded-full hover:bg-slate-400 font-medium ${
            selectedTab == "followers" && "bg-slate-500"
          }`}
          onClick={(e) => setselectedTab("followers")}
        >
          Followers
        </span>
      </div>
      <div className="text-white text-[30px] font-medium">
        <div>
          {userInfo != null &&
          selectedTab == "following" &&
          selectedTab != "followers" ? (
            <>
              {userInfo.follow.map((user: any) => (
                <>
                  <Users
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    image={user.image}
                    username={user.username}
                    personType="USER"
                  />
                </>
              ))}
            </>
          ) : null}
        </div>
        <div>
          {userInfo != null && selectedTab == "followers" ? (
            <>
              {userInfo.followers.map((user: any) => (
                <>
                  <Users
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    image={user.image}
                    username={user.username}
                    personType="USER"
                  />
                </>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FollowersList;
