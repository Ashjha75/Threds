import ThreadCard from "@/app/components/cards/ThreadCard";
import Comment from "@/app/components/form/comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const thread = await fetchThreadById(user.id);
  const userInfo = await fetchUser(user?.id);
  if (userInfo?.onboarded) redirect("/onboarding");
  return (
    <section className="relative">
      <div>
        <ThreadCard />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
    </section>
  );
};

export default page;
