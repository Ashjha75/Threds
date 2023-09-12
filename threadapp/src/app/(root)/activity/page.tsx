import Pings from "@/app/components/cards/pings";
import { fetchUserActivities } from "@/lib/actions/user.actions";
import { decodeToken } from "@/lib/helpers/tokenData";
import Link from "next/link";

const page = async () => {
  const currentUser = await decodeToken();
  const pings = await fetchUserActivities(currentUser);

  return (
    <>
      {pings.length > 0 &&
        pings
          .map((ping: any) => (
            <Link href={`/profile/${ping.data.follows.username}`}>
              {ping.type != "follows" ? (
                <Pings
                  image={ping.data.follows.image}
                  name={ping.data.follows.name}
                  id={"" + ping._id}
                  user={ping.data.follows._id}
                  readed={ping.readed}
                  type={ping.type}
                />
              ) : (
                <Pings
                  image={ping.data.follows.image}
                  name={ping.data.follows.name}
                  id={"" + ping._id}
                  user={ping.data.follows._id}
                  readed={ping.readed}
                  type={ping.type}
                />
              )}
            </Link>
          ))
          .reverse()}
    </>
  );
};

export default page;
