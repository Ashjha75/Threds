"use client";
import { addLikeUnlike } from "@/lib/actions/thread.actions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/Ai";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NextRequest } from "next/server";
import { useGlobalContext } from "@/Context/store";

const LikeButton = ({ id, likeCount, check }: any, request: NextRequest) => {
  const pathname = usePathname();
  const { data, setData } = useGlobalContext();
  const handleLike = async () => {
    const response = await addLikeUnlike(id, data._id, "LIKE", pathname);
  };
  const handleUnLike = async () => {
    const response = await addLikeUnlike(id, data._id, "UNLIKE", pathname);
  };
  return (
    <div className=" flex justify-center items-center  ">
      <div className="w-[30px] h-[30px]  hover:bg-[#19363a]  rounded-full">
        {check ? (
          <AiFillHeart
            className="cursor-pointer object-contain w-[22px] h-[22px] mt-1 ml-1 text-[#f91880]"
            onClick={handleUnLike}
          />
        ) : (
          <AiOutlineHeart
            className="cursor-pointer object-contain w-[22px] h-[22px] mt-1 ml-1 text-[#5c5c7b] "
            onClick={handleLike}
          />
        )}
      </div>
      <span className="text-gray-400 ">{likeCount == 0 ? "" : likeCount}</span>
    </div>
  );
};

export default LikeButton;
