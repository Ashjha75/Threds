import ProfileTab from "@/app/components/shared/ProfileTab";
import ProfileData from "@/app/components/shared/profileData";
import { fetchByUsername, fetchUserByName } from "@/lib/actions/user.actions";
import { decodeToken } from "@/lib/helpers/tokenData";
import mongoose, { Types } from "mongoose";

const page = async ({ params }: { params: { id: string } }) => {
  const userData = await fetchByUsername(params.id);
  const currentUser = await decodeToken();
  const currentUserCheck = userData._id == currentUser;
  const check = userData.followers
    .map((id: Types.ObjectId) => id.toString())
    .includes(currentUser.toString());

  return (
    <section className="text-light-1">
      <ProfileData
        userData={userData}
        check={check}
        currentUserCheck={currentUserCheck}
        currentUser={currentUser}
      />
    </section>
  );
};

export default page;
