"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { threadSchema } from "@/lib/Validations/Threads";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useGlobalContext } from "@/Context/store";

interface Props {
  threadsId: string;
}

const Comment = ({ threadsId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, setData } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(threadSchema) });
  const onsubmit = async (datas: any) => {
    await addCommentToThread(threadsId, datas.thread, data._id, pathname);
    router.push("/");
  };
  return (
    <main>
      <form className="comment-form" onSubmit={handleSubmit(onsubmit)}>
        <div className=" flex w-full items-center gap-3">
          <label className="text-blue text-heading4-medium ">
            <Image
              src="/assets/user-2.png"
              alt="user"
              width={48}
              height={48}
              className="rounded-full"
            />
          </label>
          <input
            type="text"
            className=" no-focus w-full p-2 bg-transparent border-none text-light-1 outline-none rounded-sm"
            placeholder="Comment..."
            {...register("thread")}
          />

          <button type="submit" className="comment-form_btn">
            Reply
          </button>
        </div>
      </form>
    </main>
  );
};

export default Comment;
