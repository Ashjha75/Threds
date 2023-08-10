import Image from "next/image";
import Link from "next/link";

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
    isComment: boolean;
  };
}
// export default function ThreadCard({
//   id,
//   currentUserId,
//   parentId,
//   content,
//   author,
//   community,
//   createdAt,
//   contents,
//   iscomment,
// }: Props)
export default function ThreadCard() {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      {/* <h2 className="text-small-regular text-light-2">{content}</h2> */}
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            {/* author.id */}
            <Link href={`/profile/${"s"}`} className="relative h-11 w-11">
              {/* author.image */}
              {/* <Image
                src={"/public/assets/user-2.png"}
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
            <Link href={`/profile/${"s"}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {/* {{author.name}} */}
                include
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio amet
              aliquid nobis voluptates voluptate? Unde ducimus laboriosam
              impedit dolorum dolores ratione quas nostrum quos omnis,
              recusandae deleniti non! Ab, totam?
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                {/* `thread/${id}` */}
                <Link href={`thread/${1}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
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
              {/* {
                iscomment && contents.length>0 &&  (
                  <Link href={`/thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
{contents.length} replies

                    </p>
                  </Link>
                )
              } */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
