import Pings from "@/app/components/cards/pings";
import { fetchUserActivities } from "@/lib/actions/user.actions";
import { decodeToken } from "@/lib/helpers/tokenData";
import Link from "next/link";

const page = async () => {
  const currentUser = await decodeToken();
  const pings = await fetchUserActivities(currentUser);
  console.log(
    "```````````````````````````````````````````````````````````````````````````````````````````"
  );
  const ThreadID = pings.map((ping: any) => {
    return ping.data.comment.likerId;
  });
  console.log(ThreadID);
  console.log(
    "....................................................................................."
  );
  return (
    <>
      {pings.length > 0 &&
        pings
          .map((ping: any) => (
            <div>
              {ping.type == "likes" ? (
                <Link href={`/thread/${ping.data.likes.ThreadId._id}`}>
                  <Pings
                    image={ping.data.likes.likerId.image}
                    name={ping.data.likes.likerId.name}
                    id={"" + ping._id}
                    content={ping.data.likes.ThreadId.content}
                    user={ping.data.likes.likerId._id}
                    readed={ping.readed}
                    type={ping.type}
                  />
                </Link>
              ) : ping.type == "comment" ? (
                <Link href={`/thread/${ping.data.comment.ThreadId._id}`}>
                  <Pings
                    image={ping.data.comment.likerId.image}
                    name={ping.data.comment.likerId.name}
                    id={"" + ping._id}
                    content={ping.data.comment.ThreadId.content}
                    user={ping.data.comment.likerId._id}
                    readed={ping.readed}
                    type={ping.type}
                  />
                </Link>
              ) : (
                <Link href={`/profile/${ping.data.follows.username}`}>
                  <Pings
                    image={ping.data.follows.image}
                    name={ping.data.follows.name}
                    id={"" + ping._id}
                    user={ping.data.follows._id}
                    readed={ping.readed}
                    type={ping.type}
                  />
                </Link>
              )}
            </div>
          ))
          .reverse()}
    </>
  );
};

export default page;
