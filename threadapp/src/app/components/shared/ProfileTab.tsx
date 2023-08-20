"use client";
import React, { useState } from "react";
import { profileTabs } from "@/constants";
import Link from "next/link";
import Image from "next/image";
const ProfileTab = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <section className="w-full flex justify-evenly items-center mt-10">
        {profileTabs.map((link) => {
          return (
            <div className=" hover:bg-[#2c3640] rounded-full ">
              <div
                key={link.label}
                className={`flex  gap-x-3 p-4  cursor-pointer ${
                  isActive && " border-b-4 rounded-sm  border-primary-500"
                }`}
                onClick={() => setIsActive(!isActive)}
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-light-1 mr-3 max-lg:hidden">{link.label} </p>
              </div>
            </div>
          );
        })}
      </section>
      <hr className="border bg-transparent border-t-0 border-gray-400 " />
    </>
  );
};

export default ProfileTab;
