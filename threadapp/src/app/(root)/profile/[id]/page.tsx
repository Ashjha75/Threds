import ProfileTab from "@/app/components/shared/ProfileTab";
import { fetchUsersData } from "@/lib/helpers/UserData";
import { formatCreatedAtDate } from "@/lib/helpers/commonFunctions";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
const page = async ({ params }: { params: { id: string } }) => {
  const userData = await fetchUsersData(params.id);
  return (
    <section className="text-light-1">
      <div className="relative ">
        <img
          src="/assets/bg.jpg"
          alt="back Photo"
          className="w-full h-40  rounded-sm object-cover"
        />
      </div>
      <div className="flex  mb-10">
        <div className="flex-1">
          <Image
            src="/assets/user-2.png"
            alt={"userData.name"}
            width={120}
            height={120}
            className="rounded-full shadow-md cursor-pointer absolute top-[15rem]  border-4 border-black"
          />
        </div>
        <div className="">
          <button className="bg-black rounded-3xl mt-4 text-small-regular  border-2 border-gray-300 py-2 px-6  hover:bg-[#2c3640]">
            Edit Profile
          </button>
        </div>
      </div>
      <article className="ml-8">
        <strong>{userData.username}</strong>
        <div className="text-primary-500 ">@{userData.username}</div>
        <div className="mt-5">{userData.bio}</div>
        <div className="text-gray-400 flex gap-x-4 items-center text-small-regular">
          <SlCalender />
          Joined {formatCreatedAtDate(userData.createdAt)}
        </div>
      </article>

      <ProfileTab userData={userData.username} />
    </section>
  );
};

export default page;
