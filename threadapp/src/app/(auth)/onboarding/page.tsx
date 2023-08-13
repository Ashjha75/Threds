import AccountProfile from "@/app/components/form/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { NextRequest } from "next/server";
import { decodeToken } from "@/lib/helpers/tokenData";
import User from "@/lib/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function page(request: NextRequest) {
  const cookieStore = cookies();
  const cook = cookieStore.get("token")?.value.toString();

  const userId = jwt.verify(cook, process.env.SECRET_KEY!);
  const userInfo = await User.findOne({ userId });
  // const userData = {
  //   objectId: userInfo?._id,
  //   username: userInfo?.username,
  //   name: userInfo?.name,
  //   bio: userInfo?.bio,
  //   image: userInfo?.image,
  // };
  const userData = userInfo?._id.toString();

  console.log(userData + typeof userData + "bvsjjsjbsakjk");
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile />
      </section>
    </main>
  );
}
