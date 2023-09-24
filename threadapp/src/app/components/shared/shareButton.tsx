"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import Image from "next/image";

const ShareButton = () => {
  const myref = useRef();

  const [isClicked, setIsClicked] = useState(false);
  const handleClicked = () => {
    setIsClicked(!isClicked);
  };
  useEffect(() => {
    const closeSidebar = (event: any) => {
      if (isClicked && myref.current && !myref.current.contains(event.target)) {
        setIsClicked(false);
      }
    };
    document.addEventListener("mousedown", closeSidebar);
    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  }, [isClicked]);
  return (
    <div className="group">
      <span
        className="w-[30px] h-[30px]  group-hover:bg-[#19363a]  rounded-full"
        onClick={handleClicked}
      >
        <Image
          src="/assets/repost.svg"
          alt="repost"
          width={24}
          height={24}
          className="cursor-pointer ml-1  mt-1  object-contain"
        />
      </span>
      {isClicked ? (
        <div
          className="flex items-center  absolute  -left-[100px] top-0 w-fit p-4 gap-2.5 bg-[#15232d] border-[1px] border-[#637684] rounded-md shadow-2xl "
          ref={myref}
        >
          <FacebookShareButton
            url={"https://github.com/next-share"}
            quote={
              "next-share is a social share buttons for your next React apps."
            }
            hashtag={"#nextshare"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TelegramShareButton
            url={"https://github.com/next-share"}
            title={
              "next-share is a social share buttons for your next React apps."
            }
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TwitterShareButton
            url={"https://github.com/next-share"}
            title={
              "next-share is a social share buttons for your next React apps."
            }
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={"https://github.com/next-share"}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      ) : null}
    </div>
  );
};

export default ShareButton;
