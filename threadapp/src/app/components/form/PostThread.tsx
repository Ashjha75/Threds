"use client"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { threadSchema } from "@/lib/Validations/Threads";
import { createThread } from "@/lib/actions/thread.actions";

type ID = { userId: string }
export default function PostThread({ userId }: ID) {
    const router = useRouter();
    const pathname = usePathname();
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(threadSchema) })
    const onsubmit = async (data: any) => {
        console.log(userId + "us");
        await createThread({
            content: data.thread,
            author: userId,
            community: null,
            path: pathname
        })
        router.push('/')
    }
    return (
        <main>
            <form className="mt-10 gap-y-3" onSubmit={handleSubmit(onsubmit)}>

                <div className=" flex w-full flex-col gap-3">
                    <label className='text-blue text-heading4-medium  w-full'>
                        Content</label>
                    <textarea
                        className='account-form_input no-focus placeholder:text-gray-600 placeholder:font-semibold  pl-9 pr-4 pt-9 w-full rounded-sm'
                        placeholder="What is happening?."
                        rows={15}
                        {...register("thread")}
                    ></textarea>
                    <span className="text-red-600  text-small-regular my-[3px]">{errors.thread?.message}</span>
                </div>
                <button type="submit" className='bg-primary-500 mt-4  w-full rounded-md py-2 text-light-1'>Create</button>
            </form>
        </main>
    )
}