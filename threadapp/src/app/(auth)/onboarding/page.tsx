import AccountProfile from "@/app/components/form/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { NextRequest } from "next/server";
import { decodeToken } from "@/lib/helpers/tokenData";

export default async function page(request: NextRequest) {
  const userId = await decodeToken(request);
  const userInfo = await fetchUser(userId?.id);
  console.log(userInfo);
  const userData = {
    objectId: userInfo?._id,
    username: userInfo?.username,
    name: userInfo?.name,
    bio: userInfo?.bio,
    image: userInfo?.image,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile userId={userId?.id.toString()} />
      </section>
    </main>
  );
}