"use client";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useGlobalContext } from "@/Context/store";
import { useState } from "react";
export default function LeftSideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, setData } = useGlobalContext();
  const [currentTab, setCurrentTab] = useState("/");
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/sign-out");
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  function dynamicPath() {
    if (currentTab == "/profile") {
      return `/${data.username}`;
    } else {
      return `/${currentTab}`;
    }
  }
  function dynamicImage(value: string) {
    if (value == "/assets/heart.svg" && data.ping > 0) {
      return "/assets/dotedheart.svg";
    } else {
      return value;
    }
  }
  return (
    <>
      <section className="custom-scrollbar leftsidebar border border-transparent border-r-primary-500">
        <div className="flex w-[20vw] flex-1 flex-col gap-6 px-6  ">
          {sidebarLinks().map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <div
                className="hover:bg-[#2c3640] rounded-full"
                onClick={() => setCurrentTab(link.route)}
              >
                <Link
                  href={link.route + `${dynamicPath()}`}
                  key={link.label}
                  className={`leftsidebar_link rounded-full ${
                    isActive && "bg-primary-500"
                  }`}
                >
                  <Image
                    src={dynamicImage(link.imgURL)}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <p className="text-light-1 max-lg:hidden">{link.label} </p>
                </Link>
              </div>
            );
          })}
        </div>
        <div
          className="mt-10 px-6 hover:bg-[#333] rounded-full"
          onClick={handleLogout}
        >
          <div className="flex cursor-pointer gap-4 p-4">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
            <p className="text-light-1 max-lg:hidden ml-1">Logout</p>
          </div>
        </div>
      </section>
    </>
  );
}
