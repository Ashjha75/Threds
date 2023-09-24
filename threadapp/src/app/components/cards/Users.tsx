import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  id: string;
  name: string;
  username: string;
  image: string;
  personType: string;
}
const Users = ({ id, name, username, image, personType }: Props) => {
  return (
    <article className="ml-4">
      <Link href={`/profile/${username}`}>
        <div className="user-card">
          <div className="user-card_avatar ">
            <img
              src={image}
              alt="logo"
              width={48}
              height={48}
              className="rounded-full "
            />
            <div className=" text-ellipsis w-[95%]">
              <h4 className="text-base-semibold text-light-1">{name}</h4>
              <p className="text-small-medium text-gray-1">@{username}</p>
            </div>
            <div className="w-[30%]">
              <button className="user-card_btn p-2 w-[10%]">View</button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Users;
