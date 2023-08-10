import PostThread from "@/app/components/form/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await currentUser();
    if (!user) return null;
    console.log(user.id + "jjsh.>>>>>>>>");
    const userInfo = await fetchUser(user.id);
    console.log(userInfo + "22222.....");
    // if (!userInfo?.onboarded) redirect('/onboarding');
    return (<><h1 className="head-text text-center">Create Thread</h1>
        <PostThread userId={userInfo?._id} ></PostThread>
    </>)
}