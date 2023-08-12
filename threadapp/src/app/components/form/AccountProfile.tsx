"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

// Define a variable with ObjectId type

// interface Props {
//     user: {
//         id: string,
//         objectId: string,
//         username: string,
//         name: string,
//         bio: string,
//         image: string
//     }
//     btnTitle: string
// }
export default function AccountProfile({ userId }: any) {
  console.log(userId + "insak");
  const router = useRouter();
  const pathname = usePathname();
  const [imgsrc, setImgsrc] = useState("/assets/logo.svg");
  const { startUpload } = useUploadThing("media");
  const schema = yup.object().shape({
    name: yup.string().required("Name is required *"),
    username: yup.string().required("Username is required *"),
    bio: yup.string().required("Bio is required *"),
    profileImg: yup.mixed().required("Required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onsubmit = async (data: any) => {
    const profilePhoto = data.profileImg;
    const hasImageChanged = isBase64Image(profilePhoto);
    if (hasImageChanged) {
      const imgRes = await startUpload(profilePhoto);
      if (imgRes && imgRes[0].fileUrl) {
        data.profileImg = imgRes[0].fileUrl;
      }
    }
    await updateUser({
      username: data.username,
      name: data.name,
      path: pathname,
      bio: data.bio,
      userId: userId,
    });
    router.push("/");
  };
  const handleChange = (e: any) => {
    setImgsrc(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <form className="gap-y-3" onSubmit={handleSubmit(onsubmit)}>
        <div className="flex mb-5 items-center justify-center  text-light-1">
          <label className="flex border-4 rounded-full">
            <Image
              src={imgsrc}
              alt="profile_icon"
              width={96}
              height={96}
              priority
              className="rounded-full object-cover w-[96px] h-[96px]  absolute z-index-10"
            />
            <input
              type="file"
              accept="image/*"
              placeholder="Add profile photo"
              className="account-form_image-input w-[96px] h-[96px] rounded-full text-[10px] text-grey-500
                        file:mr-5 file:py-2 file:px-6
                        file:rounded-full file:border-0
                        file:text-sm file:font-medium
                        file:bg-blue-50 file:text-blue-700
                        hover:file:cursor-pointer hover:file:bg-amber-50
                        hover:file:text-amber-700 opacity-0"
              {...register("profileImg")}
              onChange={handleChange}
              //   onChange={(e) => handleImage(e, field.onChange)}
            />
          </label>
        </div>
        <span className="text-red-500 text-small-regular mt-[2px]">
          {errors.profileImg?.message}
        </span>

        <div className="mb-5">
          <label className=" text-base-semibold text-light-2">
            Name
            <input
              type="text"
              className="account-form_input no-focus p-1 flex w-full flex-col gap-3"
              {...register("name")}
            />
          </label>
          <span className="text-red-500 text-small-regular mt-[2px]">
            {errors.name?.message}
          </span>
        </div>

        <div className="mb-5">
          <label className=" text-base-semibold text-light-2">
            Username
            <input
              type="text"
              className="account-form_input no-focus p-1 flex w-full flex-col gap-3"
              {...register("username")}
            />
          </label>
          <span className="text-red-500 text-small-regular mt-[2px]">
            {errors.username?.message}
          </span>
        </div>
        <div className="mb-5">
          <label className=" text-base-semibold text-light-2">
            Bio
            <textarea
              className="account-form_input no-focus"
              rows={12}
              cols={65}
              {...register("bio")}
            ></textarea>
          </label>
          <span className="text-red-600 text-small-regular mt-[2px]">
            {errors.bio?.message}
          </span>
        </div>
        <button
          type="submit"
          className="bg-primary-500  w-full rounded-md py-2 text-light-1"
        >
          Submit
        </button>
      </form>
    </>
  );
}
