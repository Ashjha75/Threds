"use client";
import { addLikeUnlike } from "@/lib/actions/thread.actions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/Ai";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DataType, useGlobalContext } from "@/Context/store";
import { NextRequest } from "next/server";
import { fetchData } from "@/lib/helpers/tokenData";

const LikeButton = ({ id, likeCount }: any, request: NextRequest) => {
  const pathname = usePathname();
  const [isLike, setIsLike] = useState(true);
  const [count, setCount] = useState(likeCount);

  const handleLike = async () => {
    const likeValue = await addLikeUnlike(id, "LIKE", pathname, request);
    setCount(count + 1);
    setIsLike(likeValue!);
  };
  const handleUnLike = async () => {
    const UnlikeValue = await addLikeUnlike(id, "UNLIKE", pathname, request);
    setCount(count - 1);
    setIsLike(UnlikeValue!);
  };
  return (
    <div className="w-[30px] h-[30px] hover:bg-[#19363a] rounded-full flex justify-center items-center ">
      {!isLike || likeCount > 0 ? (
        <AiFillHeart
          className="cursor-pointer object-contain w-[22px] h-[22px] text-[#f91880]"
          onClick={handleUnLike}
        />
      ) : (
        <AiOutlineHeart
          className="cursor-pointer object-contain w-[22px] h-[22px] text-[#5c5c7b] "
          onClick={handleLike}
        />
      )}
      <span className="text-gray-400 ">{count > 0 ? count : ""}</span>
    </div>
  );
};

export default LikeButton;
