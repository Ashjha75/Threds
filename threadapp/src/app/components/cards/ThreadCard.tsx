import { addLikeUnlike } from "@/lib/actions/thread.actions";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../shared/LikeButton";

interface Props {
  id: string;
  currentUserId: string | null;
  parentId: string;
  content: string;
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

export default function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  contents,
  commentCount,
  likeCount,
  isComment,
  type,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl  ${
        isComment ? "px-0 xs:px-7 mt-5" : "bg-dark-2 p-7"
      }`}
    >
      {/* <h2 className="text-small-regular text-light-2">{content}</h2> */}
      <div className="relative flex items-start justify-between">
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
              {/* <Image
                src={author.image}
                alt="profile image"
                fill
                className="cursor-pointer rounded-full"
              /> */}
              <img
                src="https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                width="40px"
                className="cursor-pointer h-11 mb-2 rounded-full"
              />
            </Link>
            <div className="thread-card_bar"></div>
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1 hover:underline">
                {author}
              </h4>
            </Link>

            <Link href={`/thread/${id}`}>
              {" "}
              <p className="mt-2 text-small-regular text-light-2">{content}</p>
            </Link>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <span className="flex w-fit justify-around">
                  <LikeButton id={id} />
                  <span className="text-gray-400 ">{likeCount}</span>
                </span>
                <Link href={`/thread/${id}`}>
                  <span className="flex w-fit justify-around">
                    <Image
                      src="/assets/reply.svg"
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                    <span className="text-gray-400 ">
                      {commentCount != "0" ? commentCount : null}
                    </span>
                  </span>
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
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
