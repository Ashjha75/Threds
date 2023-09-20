"use client";
import { updateActivities } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  image: string;
  name: string;
  content?: string;
  id: string;
  user: string;
  readed: string;
  type: string;
}
const Pings = ({ image, name, content, id, user, readed, type }: Props) => {
  const pathname = usePathname();
  async function updateValues() {
    await updateActivities(id, pathname);
  }

  return (
    <>
      <div
        className={` hover:bg-[#1c2732] cursor-pointer py-2 border-y-[1px] border-[#38444d]  ${
          readed ? "" : "bg-[#23567eba] hover:bg-[#215a85d4]"
        }
              `}
        onClick={updateValues}
      >
        <div className="flex items-center">
          {type == "likes" ? (
            <img
              className="w-9 h-9 rounded-full mx-8"
              src="/assets/heart-filled.svg"
              alt="User2"
            />
          ) : type == "comment" ? (
            <img
              className="w-9 h-9  mx-8"
              src="/assets/comment.svg"
              alt="User2"
            />
          ) : (
            <img
              className="w-9 h-9 rounded-full mx-8"
              src="/assets/users.svg"
              alt="User2"
            />
          )}
          <img className="w-9 h-9  rounded-full" src={image} alt="User2" />
        </div>
        <div className="ml-20 mt-2 text-base-medium text-slate-300">
          {type == "follows" ? (
            <span>
              <span className="text-heading4-medium text-light-2">{name}</span>{" "}
              followed you
            </span>
          ) : type == "likes" ? (
            <span>
              <span className="text-heading4-medium text-light-2">{name}</span>{" "}
              liked your post
            </span>
          ) : (
            <span>
              <span className="text-heading4-medium text-light-2">{name}</span>{" "}
              commented on your post
            </span>
          )}
        </div>
        {type != "follows" && (
          <div className="ml-20 mr-4 mt-2 text-small-regular text-slate-500">
            {content}
          </div>
        )}
      </div>
    </>
  );
};

export default Pings;
