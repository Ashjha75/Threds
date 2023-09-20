import Image from "next/image";
import Link from "next/link";
import LikeButton from "../shared/LikeButton";
import { formatCreatedAtDate } from "@/lib/helpers/commonFunctions";
import { fetchByUsername, fetchUser } from "@/lib/actions/user.actions";
import { decodeToken } from "@/lib/helpers/tokenData";
import { Types } from "mongoose";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import ShareButton from "../shared/shareButton";

interface Props {
  id: string;
  currentUserId: string | null;
  parentId: string;
  content: string;
  name: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  image?: string;
  contents: {
    author: {
      image: string;
    }[];
  };
  commentCount: string;
  likeCount: string;
  isComment: boolean;
  type?: "PROFILE" | "COMMENT" | "OTHERS";
}

export default async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  image,
  name,
  community,
  createdAt,
  contents,
  commentCount,
  likeCount,
  isComment,
  type,
}: Props) {
  const currentuser = await decodeToken();
  const ThreadData = await fetchThreadById(id);
  const check = ThreadData.likes
    .map((id: Types.ObjectId) => id.toString())
    .includes(currentuser.toString());
  return (
    <article
      className={`flex w-full flex-col  bg-[#122738] border-collapse  border border-transparent border-b-primary-500 ${
        isComment ? "px-0 xs:px-7 mt-5" : "bg-[#192735] p-7"
      }`}
    >
      {/* <h2 className="text-small-regular text-light-2">{content}</h2> */}
      <div className="relative flex items-start ">
        {type == "COMMENT" ? (
          <div className="absolute -bottom-6 -left-4 text-small-semibold">
            Replied to{" "}
            <Link href={`/profile/${contents}`} className="text-blue">
              @{contents}
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author}`} className="relative h-11 w-11">
              {/*  */}
              <img
                src={image}
                alt="profile image"
                width={40}
                height={40}
                className="cursor-pointer h-11 mb-2 rounded-full"
              />
            </Link>
            <div className="thread-card_bar"></div>
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author}`} className="w-fit flex">
              <span>
                <h4 className="cursor-pointer text-base-semibold text-light-1 hover:underline">
                  {name}
                </h4>
                <p className="text-small-medium ml-2 text-gray-1">@{author}</p>
              </span>
              <p className="text-small-medium ml-5 text-gray-1">
                {formatCreatedAtDate(createdAt, 2)}
              </p>
            </Link>

            <Link href={`/thread/${id}`}>
              {" "}
              <p className="mt-2 text-small-regular text-light-2">{content}</p>
            </Link>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex justify-evenly">
                <span className="flex  justify-around">
                  <LikeButton
                    id={id}
                    likeCount={ThreadData.likes.length}
                    check={check}
                  />
                </span>
                <Link href={`/thread/${id}`}>
                  <span className="flex  justify-around w-[30px] h-[30px]  hover:bg-[#19363a]  rounded-full">
                    <Image
                      src="/assets/reply.svg"
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain ml-1.5"
                    />
                    <span className="text-gray-400 mt-1 ml-1 ">
                      {commentCount != "0" ? commentCount : null}
                    </span>
                  </span>
                </Link>
                <span className="w-[30px] h-[30px] relative rounded-full  hover:bg-[#19363a]">
                  {" "}
                  <ShareButton />
                </span>
                <span className="w-[30px] h-[30px]  hover:bg-[#19363a]  rounded-full">
                  <Image
                    src="/assets/share.svg"
                    alt="share"
                    width={24}
                    height={24}
                    className="cursor-pointer mt-1 ml-1 object-contain"
                  />
                </span>
              </div>
              {/* {isComment && contents.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {contents.length} replies
                  </p>
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
