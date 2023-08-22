"use client";
import { addLikeUnlike } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/Ai";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const LikeButton = ({ id }: any) => {
  console.log(id);
  const pathname = usePathname();
  const [isLike, setIsLike] = useState(true);
  const handleLike = async () => {
    const likeValue = await addLikeUnlike(id, "LIKE", pathname);
    setIsLike(likeValue!);
  };
  const handleUnLike = async () => {
    const UnlikeValue = await addLikeUnlike(id, "UNLIKE", pathname);
    setIsLike(UnlikeValue!);
  };
  return (
    <div className="w-[30px] h-[30px] hover:bg-[#19363a] rounded-full flex justify-center items-center ">
      {isLike ? (
        <AiOutlineHeart
          className="cursor-pointer object-contain w-[22px] h-[22px] text-[#5c5c7b] "
          onClick={handleLike}
        />
      ) : (
        <AiFillHeart
          className="cursor-pointer object-contain w-[22px] h-[22px] text-[#f91880]"
          onClick={handleUnLike}
        />
      )}
    </div>
  );
};

export default LikeButton;
