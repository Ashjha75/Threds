"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { signupSchema } from "@/lib/Validations/Signup";

export default function signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSignup = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/signup", user);
      toast.success(response.data.message);
      router.push("/onboarding");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
    }
  };
  // const handleChange = (e: any) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex flex-col h-screen items-center justify-center ">
        <h1>Signup</h1>
        <form
          className="p-10 backdrop-blur-sm bg-white/30 rounded-md border-2 border-white flex flex-col m-20 w-[380px] gap-y-5 "
          onSubmit={handleSubmit(onSignup)}
        >
          <label htmlFor="first">UserName</label>
          <input
            className="p-3 text-black outline-none rounded-md"
            placeholder="userName"
            type="text"
            {...register("username")}
            // onChange={handleChange}
          />
          <span className="text-red-500 text-small-regular mt-[2px]">
            {errors.username?.message}
          </span>
          <label htmlFor="last">Email</label>
          <input
            className="p-3 text-black outline-none rounded-md"
            type="text"
            placeholder="email"
            {...register("email")}
            // onChange={handleChange}
          />
          <span className="text-red-500 text-small-regular mt-[2px]">
            {errors.email?.message}
          </span>
          <label htmlFor="last">Password</label>
          <input
            className="p-3  text-black outline-none rounded-md"
            type="password"
            placeholder="password"
            {...register("password")}
            // onChange={handleChange}
          />
          <span className="text-red-500 text-small-regular mt-[2px]">
            {errors.password?.message}
          </span>

          <button
            className="p-2 w-[80px] mx-auto border-2 bg-black border-white rounded-md"
            type="submit"
            onClick={onSignup}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
