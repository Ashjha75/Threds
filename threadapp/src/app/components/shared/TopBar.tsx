"use client";
import { useGlobalContext } from "@/Context/store";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
function Topbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const myref = useRef();
  const handleProfile = () => {
    setIsOpen(!isOpen);
  };
  const { data, setData } = useGlobalContext();
  useEffect(() => {
    const closeSidebar = (event: any) => {
      if (isOpen && myref.current && !myref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeSidebar);
    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  }, [isOpen]);
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/sign-out");
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    async function getUserData() {
      const userInfo = await fetchUser(data.id);
      setUserInfo(userInfo);
    }
    getUserData();
  }, []);
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex-1 bg-white">
        <Image
          src="/assets/user-2.png"
          alt={"userData.name"}
          width={45}
          height={45}
          className="rounded-full  shadow-md cursor-pointer absolute top-2 right-8  border-2 border-[#162634]"
          onClick={handleProfile}
        />
        {isOpen ? (
          <div
            className=" transition-[opacity,margin] duration absolute top-12 right-8   min-w-[15rem] bg-[#122738] shadow-md rounded-lg p-2 mt-2 "
            ref={myref}
          >
            {/* <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-light-1 hover:bg-primary-500 focus:ring-2 focus:ring-blue-500  "
              href="#"
            >
              Newsletter
            </a> */}
            <div className="flex flex-col items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-light-1 ">
              <span> Signed in as - {data.name}</span>
              <div className="text-primary-500 text-small-regular ">
                {data.email}
              </div>
            </div>
            <div className="bg-gray-500 w-[100%] h-[1px]"></div>

            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-light-1 hover:bg-primary-500 focus:ring-2 focus:ring-blue-500   "
              href="#"
            >
              Purchases
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-light-1 hover:bg-primary-500 focus:ring-2 focus:ring-blue-500   "
              href="#"
            >
              Downloads
            </a>
            <div
              onClick={handleLogout}
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-light-1 hover:bg-primary-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
                className="ml-5"
              />
              <span>Logout</span>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Topbar;
