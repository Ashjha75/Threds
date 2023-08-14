"use client";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
export default function LeftSideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/sign-out");
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <section className="custom-scrollbar leftsidebar">
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <div>
                <Link
                  href={link.route}
                  key={link.label}
                  className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
                >
                  <Image
                    src={link.imgURL}
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
          className="mt-10 px-6 hover:bg-[#333] rounded-md"
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
